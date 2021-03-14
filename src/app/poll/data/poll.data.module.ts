import { NgModule } from '@angular/core';
import { PollFirebaseRepository } from './poll-firebase.repository';
import { PollLocalStorageRepository } from './poll-localstorage.repository';
import { PollGateway } from './poll.gateway';

@NgModule({
  providers: [
    PollFirebaseRepository,
    PollLocalStorageRepository,
    PollGateway
  ]
})
export class PollDataModule { }
