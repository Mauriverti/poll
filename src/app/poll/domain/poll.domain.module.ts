import { NgModule } from '@angular/core';
import { AddPollUseCase } from './use-cases/add-poll.use-case';
import { DeletePollUseCase } from './use-cases/delete-poll.use-case';
import { ListPollsUseCase } from './use-cases/list-polls.use-case';

@NgModule({
  providers: [
    AddPollUseCase,
    ListPollsUseCase,
    DeletePollUseCase,
  ]
})
export class PollDomainModule { }
