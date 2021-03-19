import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PollFirebaseRepository } from '../../data/poll-firebase.repository';
import { VoteFirebaseRepository } from '../../data/vote-firebase.repository';

@Injectable()
export class MergeUsersUserCase {

  destroyed$ = new Subject<void>();

  constructor(
    private pollRepository: PollFirebaseRepository,
    private voteRepository: VoteFirebaseRepository,
  ) { }

  /** It Migrates all created polls and votes from a user to another */
  mergeUsers(previousUserId: string, newUserId: string): void {
    this.mergePolls(previousUserId, newUserId);
    this.mergeVotes(previousUserId, newUserId);
  }

  /** It Migrates all created polls from a user to another */
  mergePolls(previousUserId: string, newUserId: string): void {
    this.pollRepository.loadPollsByCreator(previousUserId).pipe(
      takeUntil(this.destroyed$)
    ).subscribe({
      next: (polls) => {
        polls.forEach(poll => {
          poll.createdBy = newUserId;
          this.pollRepository.editPoll(poll);
        });
      }
    });
  }

  /** It Migrates all votes from a user to another */
  mergeVotes(previousUserId: string, newUserId: string): void {
    this.voteRepository.loadVotesByCreator(previousUserId).pipe(
      takeUntil(this.destroyed$)
    ).subscribe({
      next: (votes) => {
        votes.forEach(vote => {
          vote.voter = newUserId;
          this.voteRepository.editVote(vote);
        });
      }
    });
  }
}
