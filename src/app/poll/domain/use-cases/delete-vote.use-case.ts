import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { VoteGateway } from '../../data/vote.gateway';
import { Vote } from '../models/vote';

@Injectable()
export class DeleteVoteUseCase {

  constructor(private gateway: VoteGateway) { }

  deleteVote(vote: Vote): Observable<void> {
    const savedVotes = this.gateway.loadVotes();
    const deleted = savedVotes.filter(v => v.id !== vote.id);
    this.gateway.storeVotes(deleted);
    return EMPTY;
  }

  deleteVoteByPollId(pollId: string): void {
    const savedVotes = this.gateway.loadVotes();
    const deleted = savedVotes.filter(v => v.pollId !== pollId);
    this.gateway.storeVotes(deleted);
  }
}
