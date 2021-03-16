import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { Poll } from '../domain/models/poll';
import { PollRepository } from './poll.repository';

@Injectable()
export class PollLocalStorageRepository implements PollRepository {

  loadPolls(): Poll[] {
    const oldValues = localStorage.getItem('polls');
    const savedPolls: Poll[] = oldValues ? JSON.parse(oldValues) : [];
    return savedPolls;
  }

  storePolls(polls: Poll[]): void {
    localStorage.setItem('polls', JSON.stringify(polls));
  }

  save(poll: Poll): Observable<Poll> {
    const savedPolls = this.loadPolls();
    savedPolls.push(poll);
    this.storePolls(savedPolls);
    return of(poll);
  }

  list(): Observable<Poll[]> {
    return of(this.loadPolls());
  }

  edit(poll: Poll): Observable<Poll> {
    const savedPolls = this.loadPolls();
    const edited = savedPolls.map((currPoll) => {
      if (poll.id === currPoll.id) {
        return poll;
      }
      return currPoll;
    });

    this.storePolls(edited);
    return of(poll);
  }

  loadById(id: string): Observable<Poll | undefined> {
    const savedPolls = this.loadPolls();
    return of(savedPolls.find((currPoll) => currPoll.id === id));
  }
}
