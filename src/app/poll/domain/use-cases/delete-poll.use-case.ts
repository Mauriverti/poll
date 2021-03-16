import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { PollGateway } from '../../data/poll.gateway';
import { Poll } from '../models/poll';
import { DeleteVoteUseCase } from './delete-vote.use-case';

@Injectable()
export class DeletePollUseCase {

  constructor(
    private gateway: PollGateway,
    private deleteVote: DeleteVoteUseCase,
  ) { }

  delete(poll: Poll): Observable<void> {
    const savedPolls = this.gateway.loadPolls();
    const filtered = savedPolls.filter((currPoll) => currPoll.id !== poll.id);
    this.gateway.storePolls(filtered);
    this.deleteVote.deleteVoteByPollId(poll.id);
    return EMPTY;
  }
}
