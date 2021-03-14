import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll } from '../models/poll';
import { PollGateway } from '../../data/poll.gateway';

@Injectable()
export class AddPollUseCase {

  constructor(private gateway: PollGateway) { }

  addPoll(poll: Poll): Observable<Poll> {
    return this.gateway.createPoll(poll);
  }
}
