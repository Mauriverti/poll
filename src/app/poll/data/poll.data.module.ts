import { NgModule } from '@angular/core';
import { PollFirebaseRepository } from './poll-firebase.repository';
import { PollLocalStorageRepository } from './poll-localstorage.repository';
import { VoteGateway } from './vote.gateway';
import { VoteRepository } from './vote.repository';

@NgModule({
  providers: [
    PollLocalStorageRepository,
    VoteRepository,
    VoteGateway,
    PollFirebaseRepository,
  ]
})
export class PollDataModule { }
