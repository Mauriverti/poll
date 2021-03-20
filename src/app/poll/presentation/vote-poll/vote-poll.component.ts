import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SessionService } from 'src/app/auth/domain/services/session.service';
import { AppRoutes } from 'src/app/shared/app-routes';
import { Poll } from '../../domain/models/poll';
import { LoadPollUseCase } from '../../domain/use-cases/load-poll.use-case';
import { VoteUseCase } from '../../domain/use-cases/vote.use-case';

@Component({
  selector: 'vote-poll',
  styleUrls: ['./vote-poll.component.sass'],
  templateUrl: './vote-poll.component.html'
})
export class VotePollComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject<void>();

  poll?: Poll;

  voteForm: FormGroup;

  userCanVote?: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadPolls: LoadPollUseCase,
    private sessionService: SessionService,
    private vote: VoteUseCase,
  ) {
    this.voteForm = new FormGroup({
      pollId: new FormControl(),
      pollTitle: new FormControl(),
      option: new FormControl(),
    });
  }

  ngOnInit(): void {
    const pollId = this.getPollId();

    if (pollId) {
      this.loadPolls.loadById(pollId).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: (poll) => {
          if (poll) {
            this.userCanSeePoll(poll.publicPoll);
            this.initValues(poll);
          }
        }
      });
    } else {
      this.toList();
    }
  }

  private getPollId(): string | null {
    const routeParams = this.route.snapshot.paramMap;
    return routeParams.get('id');
  }

  userCanSeePoll(publicPoll?: boolean): void {
    this.userCanVote = !!(publicPoll || !this.sessionService.fetchAuthData().anonymous);
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

  toLogin(): void {
    this.getPollId();
    this.router.navigate([AppRoutes.LOGIN]);
  }
}
