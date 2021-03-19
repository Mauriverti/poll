import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Poll } from '../domain/models/poll';
import { PollRepository } from './poll.repository';

@Injectable()
export class PollFirebaseRepository implements PollRepository {

  private readonly collection = 'poll';

  constructor(
    private db: AngularFirestore,
  ) { }

  loadPolls(): Observable<Poll[]> {
    return this.db.collection(this.collection).get().pipe(
      map((polls) => polls.docs.map((poll) => poll.data() as Poll))
    );
  }

  loadPollsByCreator(id: string): Observable<Poll[]> {
    return this.loadPolls().pipe(
      map(polls => polls.filter(poll => poll.createdBy === id))
    );
  }


  // storePolls(polls: Poll[]): void {
  //   localStorage.setItem('polls', JSON.stringify(polls));
  // }

  async storePoll(poll: Poll): Promise<void> {
    await this.db.collection(this.collection).doc(poll.id).set({
      id: poll.id,
      title: poll.title,
      description: poll.description,
      createdBy: poll.createdBy,
      publicPoll: poll.publicPoll,
      options: poll.options
    });
  }

  async editPoll(poll: Poll): Promise<void> {
    await this.db.collection(this.collection).doc(poll.id).update({
      id: poll.id,
      title: poll.title,
      description: poll.description,
      createdBy: poll.createdBy,
      publicPoll: poll.publicPoll,
      options: poll.options
    });
  }

  loadById(id: string): Observable<Poll | undefined> {
    const savedPolls = this.loadPolls();
    return savedPolls.pipe(
      map((polls) => polls.find((poll) => poll.id === id)),
    );
  }

  deletePoll(poll: Poll): void {
    this.db.collection(this.collection).doc(poll.id).delete();
  }
}
