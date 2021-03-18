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

  loadById(id: string): Observable<Poll | undefined> {
    const savedPolls = this.loadPolls();
    return of(savedPolls.find((currPoll) => currPoll.id === id));
  }
}
