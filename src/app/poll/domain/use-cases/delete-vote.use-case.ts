import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { VoteRepository } from '../../data/vote.repository';
import { Vote } from '../models/vote';

@Injectable()
export class DeleteVoteUseCase {

  constructor(
    private repository: VoteRepository,
  ) { }

  deleteVote(vote: Vote): Observable<void> {
    const savedVotes = this.repository.loadVotes();
    const deleted = savedVotes.filter(v => v.id !== vote.id);
    this.repository.storeVotes(deleted);
    return EMPTY;
  }

  deleteVoteByPollId(pollId: string): void {
    const savedVotes = this.repository.loadVotes();
    const deleted = savedVotes.filter(v => v.pollId !== pollId);
    this.repository.storeVotes(deleted);
  }
}
