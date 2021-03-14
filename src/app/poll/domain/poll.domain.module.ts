import { NgModule } from '@angular/core';
import { AddPollUseCase } from './use-cases/add-poll.use-case';
import { DeletePollUseCase } from './use-cases/delete-poll.use-case';
import { EditPollUseCase } from './use-cases/edit-poll.use-case';
import { ListPollsUseCase } from './use-cases/list-polls.use-case';
import { LoadPollUseCase } from './use-cases/load-poll.use-case';
import { VoteUseCase } from './use-cases/add-vote.use-case';

@NgModule({
  providers: [
    AddPollUseCase,
    ListPollsUseCase,
    DeletePollUseCase,
    LoadPollUseCase,
    EditPollUseCase,
    VoteUseCase,
  ]
})
export class PollDomainModule { }
