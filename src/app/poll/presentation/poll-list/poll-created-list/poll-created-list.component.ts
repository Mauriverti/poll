import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private listPolls: ListPollsUseCase,
    private deletePoll: DeletePollUseCase,
  ) {
    this.polls$ = this.listPolls.listUserPolls();
  }

  newPoll(): void {
    this.router.navigate([`../${PollRoutes.NEW}`], { relativeTo: this.route });
  }

  delete(poll: Poll): void {
    this.deletePoll.delete(poll);
    this.polls$ = this.listPolls.listUserPolls();
  }

  edit(poll: Poll): void {
    this.router.navigate([`../${poll.id}/${PollRoutes.EDIT}`], { relativeTo: this.route });
  }

  vote(poll: Poll): void {
    this.router.navigate([`../${poll.id}/${PollRoutes.VOTE}`], { relativeTo: this.route });
  }

  toResult(poll: Poll): void {
    this.router.navigate([`../${poll.id}/${PollRoutes.RESULT}`], { relativeTo: this.route });
  }

  share(poll: Poll): void {
    alert(this.createShareLink(poll)); // TODO, automatically copy to clipboard or open a dialog that do that
  }

  createShareLink(poll: Poll): string {
    let link = window.location.href;
    link = link.replace('list', `${poll.id}/${PollRoutes.VOTE}`);
    return link;
  }
}
