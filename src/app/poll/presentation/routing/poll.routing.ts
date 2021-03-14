import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PollComponent } from '../poll/poll.component';
import { PollListComponent } from '../poll-list/poll-list.component';
import { NewPollComponent } from '../new-poll/new-poll.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollRouting { }
