import { NgModule } from '@angular/core';
import { PollFirebaseRepository } from './poll-firebase.repository';
import { PollLocalStorageRepository } from './poll-localstorage.repository';
import { PollGateway } from './poll.gateway';
import { VoteRepository } from './vote.repository';

@NgModule({
  providers: [
    PollFirebaseRepository,
    PollLocalStorageRepository,
    PollGateway,
    VoteRepository,
  ]
})
export class PollDataModule { }
