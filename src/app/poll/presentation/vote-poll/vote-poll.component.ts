import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticateUseCase } from 'src/app/auth/domain/use-cases/authenticate.use-case';
import { Poll } from '../../domain/models/poll';
import { VoteUseCase } from '../../domain/use-cases/vote.use-case';
import { LoadPollUseCase } from '../../domain/use-cases/load-poll.use-case';

@Component({
  selector: 'vote-poll',
  templateUrl: 'vote-poll.component.html'
})
export class VotePollComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject<void>();

  poll?: Poll;

  voteForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadPolls: LoadPollUseCase,
    private auth: AuthenticateUseCase,
    private vote: VoteUseCase,
  ) {
    this.voteForm = new FormGroup({
      pollId: new FormControl(),
      pollTitle: new FormControl(),
      option: new FormControl(),
    });
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const pollId = routeParams.get('id');

    console.log('pollId', pollId);
    if (pollId) {
      this.loadPolls.loadById(pollId).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: (poll) => {
          console.log('poll', poll);
          if (poll) {
            this.validatePublic(poll.publicPoll);
            this.initValues(poll);
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
  initValues(poll: Poll): void {
    this.poll = poll;
    this.voteForm.setValue({ pollId: poll.id, option: null, pollTitle: poll.title });
  }

  toAuth(): void {
    this.router.navigate([]);
  }

  clear(): void {
    this.voteForm.reset();
  }

  toList(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  submit(form: FormGroup): void {
    this.vote.vote(form.value);
    this.toList();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
