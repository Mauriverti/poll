import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vote } from 'src/app/poll/domain/models/vote';

@Component({
  selector: 'vote-poll-list-item',
  templateUrl: 'vote-poll-list-item.component.html'
})
export class VotePollListItemComponent {

  @Input() vote!: Vote;

  @Output() deleteVote = new EventEmitter<Vote>();
  @Output() editVote = new EventEmitter<Vote>();

  edit(currentVote: Vote): void {
    this.editVote.emit(currentVote);
  }

  delete(currentVote: Vote): void {
    this.deleteVote.emit(currentVote);
  }
}
