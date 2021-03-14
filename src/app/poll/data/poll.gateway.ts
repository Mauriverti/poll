import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Poll } from 'src/app/poll/domain/models/poll';
import { PollFirebaseRepository } from './poll-firebase.repository';
import { PollLocalStorageRepository } from './poll-localstorage.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PollGateway {
  private userAuthenticated = false;

  constructor(
    private loggedInRepository: PollFirebaseRepository,
    private loggedOutRepository: PollLocalStorageRepository,
  ) { }

  createPoll(poll: Poll): Observable<Poll> {
    poll.id = poll.id ?? uuidv4();


    if (this.userAuthenticated) {
      return this.loggedInRepository.save(poll);
    }
    return this.loggedOutRepository.save(poll);
  }

  list(): Observable<Poll[]> {
    if (this.userAuthenticated) {
      return this.loggedInRepository.list();
    }
    return this.loggedOutRepository.list();
  }

  delete(poll: Poll): Observable<void> {
    if (this.userAuthenticated) {
      return this.loggedInRepository.delete(poll);
    }
    return this.loggedOutRepository.delete(poll);
  }
}
