import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthenticateUseCase } from 'src/app/auth/domain/use-cases/authenticate.use-case';
import { v4 as uuidv4 } from 'uuid';
import { PollGateway } from '../../data/poll.gateway';
import { Poll } from '../models/poll';

@Injectable()
export class AddPollUseCase {

  constructor(
    private gateway: PollGateway,
    private auth: AuthenticateUseCase,
  ) { }

  addPoll(poll: Poll): Observable<Poll> {
    const savedPolls = this.gateway.loadPolls();
    poll = this.prepareEntity(poll);
    savedPolls.push(poll);
    this.gateway.storePolls(savedPolls);
    return of(poll);
  }

  private prepareEntity(poll: Poll): Poll {
    poll.id = uuidv4();
    poll.createdBy = this.auth.fetchAuthData().id;
    return poll;
  }
}
