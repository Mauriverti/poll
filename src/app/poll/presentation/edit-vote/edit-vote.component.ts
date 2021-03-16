import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AuthenticateUseCase } from 'src/app/auth/domain/use-cases/authenticate.use-case';
import { Poll } from '../../domain/models/poll';
import { Vote } from '../../domain/models/vote';
import { EditVoteUseCase } from '../../domain/use-cases/edit-vote.use-case';
import { LoadPollUseCase } from '../../domain/use-cases/load-poll.use-case';
import { LoadVotesUseCase } from '../../domain/use-cases/load-votes.use-case';

@Component({
  selector: 'edit-vote',
  templateUrl: 'edit-vote.component.html'
})
export class EditVoteComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject<void>();
  poll?: Poll;
  editVoteForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthenticateUseCase,
    private loadPolls: LoadPollUseCase,
    private editVote: EditVoteUseCase,
    private loadVotes: LoadVotesUseCase,
  ) {
    this.editVoteForm = new FormGroup({
      id: new FormControl(),
      pollId: new FormControl(),
      voter: new FormControl(),
      pollTitle: new FormControl(),
      option: new FormControl(),
    });

  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const pollId = routeParams.get('id');
    const voteId = routeParams.get('voteId');

    if (pollId && voteId) {

      const loadPollData = this.loadPolls.loadById(pollId);
      const loadVoteData = this.loadVotes.loadVotesById(voteId);

      combineLatest([loadPollData, loadVoteData]).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: ([poll, vote]) => {
          if (poll && vote) {
            this.validatePublic(poll.publicPoll);
            this.initValues(poll, vote);
          } else {
            this.toList();
          }
        }
      });
    } else {
      this.toList();
    }
  }

  validatePublic(publicPoll?: boolean): void {
    if (!publicPoll && this.auth.fetchAuthData().anonymous) {
      this.toAuth();
    }
  }
  initValues(poll: Poll, vote: Vote): void {
    this.poll = poll;
    this.editVoteForm.setValue(vote);
  }

  toAuth(): void {
    this.router.navigate([]);
  }

  clear(): void {
    this.editVoteForm.reset();
  }

  toList(): void {
    this.router.navigate(['../../../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  submit(form: FormGroup): void {
    this.editVote.editVote(form.value);
    this.toList();
  }
}
