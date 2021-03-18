import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticateUseCase } from 'src/app/auth/domain/use-cases/authenticate.use-case';
import { PollGateway } from '../../data/poll.gateway';
import { Poll } from '../models/poll';

@Injectable()
export class ListPollsUseCase {

  constructor(private gateway: PollGateway, private auth: AuthenticateUseCase) { }

  listUserPolls(): Observable<Poll[]> {
    const savedPolls = this.list();

    return savedPolls.pipe(
      // only show polls created by the user
      map(polls => polls.filter((poll) => poll.createdBy === this.auth.fetchAuthData().id))
    );
  }

  list(): Observable<Poll[]> {
    return of(this.gateway.loadPolls());
  }
}
