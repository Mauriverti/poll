import { Injectable } from '@angular/core';
import { PollFirebaseRepository } from '../../data/poll-firebase.repository';
import { Poll } from '../models/poll';
import { DeleteVoteUseCase } from './delete-vote.use-case';

@Injectable()
export class DeletePollUseCase {

  constructor(
    private repository: PollFirebaseRepository,
    private deleteVote: DeleteVoteUseCase,
  ) { }

  delete(poll: Poll): void {
    this.repository.deletePoll(poll);
    this.deleteVote.deleteVoteByPollId(poll.id);
  }
}
