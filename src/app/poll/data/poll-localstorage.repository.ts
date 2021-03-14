import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { Poll } from '../domain/models/poll';
import { PollRepository } from './poll.repository';

@Injectable()
export class PollLocalStorageRepository implements PollRepository {

  private loadPolls(): Poll[] {
    const oldValues = localStorage.getItem('polls');
    const savedPolls: Poll[] = oldValues ? JSON.parse(oldValues) : [];
    return savedPolls;
  }

  save(poll: Poll): Observable<Poll> {
    const savedPolls = this.loadPolls();
    savedPolls.push(poll);
    localStorage.setItem('polls', JSON.stringify(savedPolls));
    return of(poll);
  }

  list(): Observable<Poll[]> {
    return of(this.loadPolls());
  }

  delete(poll: Poll): Observable<void> {
    const savedPolls = this.loadPolls();
    const filtered = savedPolls.filter((currPoll) => currPoll.id !== poll.id);
    localStorage.setItem('polls', JSON.stringify(filtered));
    return EMPTY;
  }
}
