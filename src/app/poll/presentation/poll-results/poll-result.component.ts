import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Poll } from '../../domain/models/poll';
import { LoadPollUseCase } from '../../domain/use-cases/load-poll.use-case';
import { LoadVotesUseCase } from '../../domain/use-cases/load-votes.use-case';

interface Result {
  option: string;
  ammount: number;
}

@Component({
  selector: 'poll-result',
  styleUrls: ['./poll-result.component.sass'],
  templateUrl: './poll-result.component.html'
})
export class PollResultComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject<void>();
  poll?: Poll;
  results: Result[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadPolls: LoadPollUseCase,
    private loadVotes: LoadVotesUseCase,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const pollId = routeParams.get('id');

    if (pollId) {
      const poll = this.loadPolls.loadById(pollId);
      const votes = this.loadVotes.loadVotesByPoll(pollId);

      combineLatest([poll, votes]).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: ([currentPoll, allVotes]) => {
          if (currentPoll) {
            this.poll = currentPoll;
            currentPoll.options.forEach(option => {
              this.results.push({
                option,
                ammount: 0,
              });
            });

            allVotes.forEach(vote => {
              this.addVoteToResults(vote.option);
            });
          }
        }
      });
    }
  }

  addVoteToResults(option: string): void {
    this.results.forEach(result => {
      if (result.option === option) {
        result.ammount++;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  toList(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
