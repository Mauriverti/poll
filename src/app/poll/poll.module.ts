import { NgModule } from '@angular/core';
import { PollDataModule } from './data/poll.data.module';
import { PollDomainModule } from './domain/poll.domain.module';
import { PollPresentationModule } from './presentation/poll.presentation.module';

@NgModule({
  imports: [
    PollPresentationModule,
    PollDomainModule,
    PollDataModule,
  ]
})
export class PollModule { }
