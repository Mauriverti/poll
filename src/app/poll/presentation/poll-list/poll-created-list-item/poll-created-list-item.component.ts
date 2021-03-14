import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Poll } from 'src/app/poll/domain/models/poll';
import { DeletePollUseCase } from 'src/app/poll/domain/use-cases/delete-poll.use-case';

@Component({
  selector: 'poll-created-list-item',
  templateUrl: './poll-created-list-item.component.html'
})
export class PollCraetedListItemComponent {

  constructor() { }

  @Input() poll!: Poll;

  @Output() deletePoll = new EventEmitter<Poll>();

  share(currentPoll: Poll): void {
    console.log('share');
    if (currentPoll.id) {
      const link = window.location.href.replace('/list', currentPoll.id);
    }
  }

  edit(currentPoll: Poll): void {
    console.log('edit');
  }

  delete(currentPoll: Poll): void {
    this.deletePoll.emit(currentPoll);
  }
}
