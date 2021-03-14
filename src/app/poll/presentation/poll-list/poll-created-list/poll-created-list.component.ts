import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Poll } from 'src/app/poll/domain/models/poll';
import { DeletePollUseCase } from 'src/app/poll/domain/use-cases/delete-poll.use-case';
import { ListPollsUseCase } from 'src/app/poll/domain/use-cases/list-polls.use-case';
import { PollRoutes } from '../../routing/poll-routes';

@Component({
  selector: 'poll-created-list',
  templateUrl: './poll-created-list.component.html'
})
export class PollCreatedListComponent {

  polls$: Observable<Poll[]>;

  constructor(
    private router: Router,
    private listPolls: ListPollsUseCase,
    private deletePoll: DeletePollUseCase,
  ) {
    this.polls$ = this.listPolls.list();
  }

  newPoll(): void {
    console.log('new poll');
    this.router.navigate([PollRoutes.NEW]);
  }

  delete(poll: Poll): Observable<void> {
    return this.deletePoll.delete(poll);
  }
}
