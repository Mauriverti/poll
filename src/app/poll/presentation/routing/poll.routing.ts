import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPollComponent } from '../edit-poll/edit-poll.component';
import { NewPollComponent } from '../new-poll/new-poll.component';
import { PollListComponent } from '../poll-list/poll-list.component';
import { PollComponent } from '../poll/poll.component';

/**
 * app
 * '- poll
 *    '- list
 */

const routes: Routes = [
  {
    path: '', component: PollComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: PollListComponent },
      { path: 'new', component: NewPollComponent },
      { path: ':id/edit', component: EditPollComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollRouting { }
