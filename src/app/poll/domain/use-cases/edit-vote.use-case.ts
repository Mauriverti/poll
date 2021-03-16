import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Vote } from '../models/vote';
import { VoteUseCase } from './vote.use-case';
import { LoadVotesUseCase } from './load-votes.use-case';

@Injectable()
export class EditVoteUseCase implements OnDestroy {

  destroyed$ = new Subject<void>();

  constructor(
    private loadVotes: LoadVotesUseCase,
    private voteUseCase: VoteUseCase,
  ) { }

  editVote(vote: Vote): void {
    // this.loadVotes.loadVotesById(vote.id)
    // .pipe(takeUntil(this.destroyed$))
    // .subscribe((vote) => {
    //   if (vote) {
    //     this.voteUseCase.saveVote(vote);
    //   }
    // });
    this.loadVotes.loadVotes().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((votes) => {
      const edited = votes.map((currentVote) => {
        if (currentVote.id === vote.id) {
          return vote;
        }
        return currentVote;
      });
      this.voteUseCase.storeVotes(edited);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
