import { NgModule } from '@angular/core';
import { PollLocalStorageRepository } from './poll-localstorage.repository';
import { PollGateway } from './poll.gateway';
import { VoteGateway } from './vote.gateway';
import { VoteRepository } from './vote.repository';

@NgModule({
  providers: [
    PollLocalStorageRepository,
    PollGateway,
    VoteRepository,
    VoteGateway,
  ]
})
export class PollDataModule { }
