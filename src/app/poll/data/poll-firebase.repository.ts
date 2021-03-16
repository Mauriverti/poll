import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { Poll } from '../domain/models/poll';
import { Vote } from '../domain/models/vote';
import { PollRepository } from './poll.repository';

@Injectable()
export class PollFirebaseRepository implements PollRepository {

  loadPolls(): Poll[] {
    const poll = new Poll('1', '2', '3', false, '5', ['6']);
    return [poll];
  }

  storePolls(polls: Poll[]): void { }

  save(poll: Poll): Observable<Poll> {
    return of(poll);
  }

  list(): Observable<Poll[]> {
    return of([]);
  }

  delete(poll: Poll): Observable<void> {
    return EMPTY;
  }

  edit(poll: Poll): Observable<Poll> {
    return of(poll);
  }

  loadById(id: string): Observable<Poll | undefined> {
    return of(undefined);
  }

  saveVotes(vote: Vote): Observable<Vote> {
    return of(vote);
  }
}
