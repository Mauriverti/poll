import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PollGateway } from '../../data/poll.gateway';
import { Poll } from '../models/poll';

@Injectable()
export class EditPollUseCase {

  constructor(private gateway: PollGateway) { }

  editPoll(poll: Poll): Observable<Poll> {
    if (!poll.id) {
      throw new Error('Id is not valid, impossible to edit');
    }
    return this.gateway.edit(poll);
  }
}
