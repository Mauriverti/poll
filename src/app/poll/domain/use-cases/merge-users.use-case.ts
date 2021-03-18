import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PollGateway } from '../../data/poll.gateway';
import { VoteGateway } from '../../data/vote.gateway';

@Injectable()
export class MergeUsersUserCase {

  destroyed$ = new Subject<void>();

  constructor(
    private pollGateway: PollGateway,
    private voteGateway: VoteGateway,
  ) { }

  /** It Migrates all created polls and votes from a user to another */
  mergeUsers(previousUserId: string, newUserId: string): void {
    this.mergePolls(previousUserId, newUserId);
    this.mergeVotes(previousUserId, newUserId);
  }

  /** It Migrates all created polls from a user to another */
  mergePolls(previousUserId: string, newUserId: string): void {
    const savedPolls = this.pollGateway.loadPolls();
    const edited = savedPolls.map((currPoll) => {
      if (currPoll.createdBy === previousUserId) {
        currPoll.createdBy = newUserId;
      }
      return currPoll;
    });

    this.pollGateway.storePolls(edited);
  }

  /** It Migrates all votes from a user to another */
  mergeVotes(previousUserId: string, newUserId: string): void {
    const savedVotes = this.voteGateway.loadVotes();

    const edited = savedVotes.map((currVote) => {
      if (currVote.voter === previousUserId) {
        currVote.voter = newUserId;
      }
      return currVote;
    });
    this.voteGateway.storeVotes(edited);
  }
}
