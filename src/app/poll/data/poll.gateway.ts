import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll } from 'src/app/poll/domain/models/poll';
import { PollFirebaseRepository } from './poll-firebase.repository';
import { PollLocalStorageRepository } from './poll-localstorage.repository';


@Injectable()
export class PollGateway {
  private userAuthenticated = false;

  constructor(
    private loggedInRepository: PollFirebaseRepository,
    private loggedOutRepository: PollLocalStorageRepository,
  ) { }

  createPoll(poll: Poll): Observable<Poll> {
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

  edit(poll: Poll): Observable<Poll> {
    if (this.userAuthenticated) {
      return this.loggedInRepository.edit(poll);
    }
    return this.loggedOutRepository.edit(poll);
  }

  loadById(id: string): Observable<Poll | undefined> {
    if (this.userAuthenticated) {
      return this.loggedInRepository.loadById(id);
    }
    return this.loggedOutRepository.loadById(id);
  }
}
