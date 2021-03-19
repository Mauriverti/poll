import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from 'src/app/auth/domain/services/session.service';
import { PollFirebaseRepository } from '../../data/poll-firebase.repository';
import { Poll } from '../models/poll';

@Injectable()
export class ListPollsUseCase {

  constructor(
    private service: SessionService,
    private repository: PollFirebaseRepository,
  ) { }

  listUserPolls(): Observable<Poll[]> {
    const savedPolls = this.list();

    return savedPolls.pipe(
      // only show polls created by the user
      map(polls => polls.filter((poll) => poll.createdBy === this.service.fetchAuthData().id))
    );
  }

  list(): Observable<Poll[]> {
    return this.repository.loadPolls();
  }
}
