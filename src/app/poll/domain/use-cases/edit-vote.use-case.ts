import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { VoteFirebaseRepository } from '../../data/vote-firebase.repository';
import { Vote } from '../models/vote';

@Injectable()
export class EditVoteUseCase implements OnDestroy {

  destroyed$ = new Subject<void>();

  constructor(
    private repository: VoteFirebaseRepository,
  ) { }

  editVote(vote: Vote): void {
    this.repository.editVote(vote);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
