import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from 'src/app/auth/domain/services/session.service';
import { PollGateway } from '../../data/poll.gateway';
import { Poll } from '../models/poll';

@Injectable()
export class ListPollsUseCase {

  constructor(
    private gateway: PollGateway,
    private service: SessionService,
  ) { }

  listUserPolls(): Observable<Poll[]> {
    const savedPolls = this.list();

    return savedPolls.pipe(
      // only show polls created by the user
      map(polls => polls.filter((poll) => poll.createdBy === this.service.fetchAuthData().id))
    );
  }

  list(): Observable<Poll[]> {
    return of(this.gateway.loadPolls());
  }
}
