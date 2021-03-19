import { NgModule } from '@angular/core';
import { PollFirebaseRepository } from './poll-firebase.repository';
import { VoteFirebaseRepository } from './vote-firebase.repository';

@NgModule({
  providers: [
    PollFirebaseRepository,
    VoteFirebaseRepository,
  ]
})
export class PollDataModule { }
