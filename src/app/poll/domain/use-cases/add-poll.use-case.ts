import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    poll.createdBy = this.auth.fetchAuthData().id;
    poll.id = poll.id ?? uuidv4();
    return this.gateway.createPoll(poll);
  }
}
