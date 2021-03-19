import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vote } from '../domain/models/vote';

@Injectable()
export class VoteFirebaseRepository {

  private readonly collection = 'vote';

  constructor(private db: AngularFirestore) { }

  loadVotes(): Observable<Vote[]> {
    return this.db.collection(this.collection).get().pipe(
      map((votes) => votes.docs.map((vote) => vote.data() as Vote))
    );
  }

  loadVotesByCreator(id: string): Observable<Vote[]> {
    return this.loadVotes().pipe(
      map(votes => votes.filter(vote => vote.voter === id))
    );
  }

  async storeVote(vote: Vote): Promise<void> {
    await this.db.collection(this.collection).doc(vote.id).set({
      id: vote.id,
      voter: vote.voter,
      pollId: vote.pollId,
      option: vote.option,
      pollTitle: vote.pollTitle,
    });
  }

  async editVote(vote: Vote): Promise<void> {
    await this.db.collection(this.collection).doc(vote.id).update({
      id: vote.id,
      voter: vote.voter,
      pollId: vote.pollId,
      option: vote.option,
      pollTitle: vote.pollTitle,
    });
  }

  loadById(id: string): Observable<Vote | undefined> {
    const savedVotes = this.loadVotes();
    return savedVotes.pipe(
      map((votes) => votes.find((vote) => vote.id === id)),
    );
  }

  deleteVote(vote: Vote): void {
    this.db.collection(this.collection).doc(vote.id).delete();
  }
}
