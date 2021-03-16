import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateUseCase } from 'src/app/auth/domain/use-cases/authenticate.use-case';
import { Poll } from 'src/app/poll/domain/models/poll';
import { PollFirebaseRepository } from './poll-firebase.repository';
import { PollLocalStorageRepository } from './poll-localstorage.repository';


@Injectable()
export class PollGateway {
  private userAuthenticated;

  constructor(
    private loggedInRepository: PollFirebaseRepository,
    private loggedOutRepository: PollLocalStorageRepository,
    private auth: AuthenticateUseCase,
  ) {
    this.userAuthenticated = !this.auth.fetchAuthData().anonymous;
  }

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

  loadPolls(): Poll[] {
    if (this.userAuthenticated) {
      return this.loggedInRepository.loadPolls();
    }
    return this.loggedOutRepository.loadPolls();
  }

  storePolls(polls: Poll[]): void {
    if (this.userAuthenticated) {
      return this.loggedInRepository.storePolls(polls);
    }
    return this.loggedOutRepository.storePolls(polls);
  }
}
