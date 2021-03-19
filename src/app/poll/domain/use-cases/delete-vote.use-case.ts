import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VoteFirebaseRepository } from '../../data/vote-firebase.repository';
import { Vote } from '../models/vote';

@Injectable()
export class DeleteVoteUseCase implements OnDestroy {

  destroyed$ = new Subject<void>();

  constructor(private repository: VoteFirebaseRepository) { }

  deleteVote(vote: Vote): void {
    this.repository.deleteVote(vote);
  }

  deleteVoteByPollId(pollId: string): void {
    this.repository.loadVotes().pipe(
      takeUntil(this.destroyed$)
    ).subscribe({
      next: (votes) => {
        votes.forEach(vote => {
          if (vote.pollId === pollId) {
            this.repository.deleteVote(vote);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
