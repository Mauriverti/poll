import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { Poll } from '../domain/models/poll';
import { PollRepository } from './poll.repository';

@Injectable()
export class PollFirebaseRepository implements PollRepository {

  save(poll: Poll): Observable<Poll> {
    console.log('salvou firebase');
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
}
