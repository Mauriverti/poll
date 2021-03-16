import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Vote } from 'src/app/poll/domain/models/vote';
import { DeleteVoteUseCase } from 'src/app/poll/domain/use-cases/delete-vote.use-case';
import { LoadUserVotesUseCase } from 'src/app/poll/domain/use-cases/load-user-votes.use-case';

@Component({
  selector: 'poll-vote-list',
  templateUrl: './poll-vote-list.component.html'
})
export class PollVoteListComponent {

  votes$: Observable<Vote[]>;

  constructor(
    private loadVotes: LoadUserVotesUseCase,
    private deleteVotes: DeleteVoteUseCase,
  ) {
    this.votes$ = this.loadVotes.loadVotes();
  }

  delete(vote: Vote): void {
    this.deleteVotes.deleteVote(vote);
  }

  edit(vote: Vote): void {
    console.log('edit');
  }
}
