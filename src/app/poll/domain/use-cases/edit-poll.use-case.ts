import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PollGateway } from '../../data/poll.gateway';
import { Poll } from '../models/poll';

@Injectable()
export class EditPollUseCase {

  constructor(private gateway: PollGateway) { }

  editPoll(poll: Poll): Observable<Poll> {
    this.validatePoll(poll);

    const savedPolls = this.gateway.loadPolls();
    const edited = savedPolls.map((currPoll) => {
      if (poll.id === currPoll.id) {
        return poll;
      }
      return currPoll;
    });

    this.gateway.storePolls(edited);
    return of(poll);
  }

  private validatePoll(poll: Poll): void {
    if (!poll.id) {
      throw new Error('Id is not valid, impossible to edit');
    }
  }
}
