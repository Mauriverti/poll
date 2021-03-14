import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { EditPollComponent } from './edit-poll/edit-poll.component';
import { NewPollComponent } from './new-poll/new-poll.component';
import { PollAnsweredListComponent } from './poll-list/poll-answered-list/poll-answered-list.component';
import { PollCraetedListItemComponent } from './poll-list/poll-created-list-item/poll-created-list-item.component';
import { PollCreatedListComponent } from './poll-list/poll-created-list/poll-created-list.component';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollComponent } from './poll/poll.component';
import { PollRouting } from './routing/poll.routing';

@NgModule({
  imports: [
    CommonModule,
    PollRouting,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  declarations: [
    PollComponent,
    PollListComponent,
    PollAnsweredListComponent,
    PollCreatedListComponent,
    PollCraetedListItemComponent,
    NewPollComponent,
    EditPollComponent,
  ]
})
export class PollPresentationModule { }
