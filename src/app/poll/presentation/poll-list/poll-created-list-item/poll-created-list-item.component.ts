import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Poll } from 'src/app/poll/domain/models/poll';
import { LoadVotesUseCase } from 'src/app/poll/domain/use-cases/load-votes.use-case';

@Component({
  selector: 'poll-created-list-item',
  templateUrl: './poll-created-list-item.component.html'
})
export class PollCraetedListItemComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject<void>();

  @Input() poll!: Poll;
  canEdit = false;

  @Output() deletePoll = new EventEmitter<Poll>();
  @Output() editPoll = new EventEmitter<Poll>();
  @Output() votePoll = new EventEmitter<Poll>();
  @Output() sharePoll = new EventEmitter<Poll>();
  @Output() resultsPoll = new EventEmitter<Poll>();

  constructor(private voteUseCase: LoadVotesUseCase) { }

  ngOnInit(): void {
    this.voteUseCase.pollWithVotes(this.poll.id).pipe(
      takeUntil(this.destroyed$)
    ).subscribe({
      next: (hasVotes) => this.canEdit = !hasVotes
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  share(currentPoll: Poll): void {
    this.sharePoll.emit(currentPoll);
  }

  edit(currentPoll: Poll): void {
    this.editPoll.emit(currentPoll);
  }

  delete(currentPoll: Poll): void {
    this.deletePoll.emit(currentPoll);
  }

  vote(currentPoll: Poll): void {
    this.votePoll.emit(currentPoll);
  }

  results(currentPoll: Poll): void {
    this.resultsPoll.emit(currentPoll);
  }
}
