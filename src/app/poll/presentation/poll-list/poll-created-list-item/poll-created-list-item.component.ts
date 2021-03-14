import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Poll } from 'src/app/poll/domain/models/poll';

@Component({
  selector: 'poll-created-list-item',
  templateUrl: './poll-created-list-item.component.html'
})
export class PollCraetedListItemComponent {

  constructor() { }

  @Input() poll!: Poll;

  @Output() deletePoll = new EventEmitter<Poll>();
  @Output() editPoll = new EventEmitter<Poll>();
  @Output() votePoll = new EventEmitter<Poll>();
  @Output() sharePoll = new EventEmitter<Poll>();

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
}
