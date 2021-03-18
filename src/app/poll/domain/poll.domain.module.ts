import { NgModule } from '@angular/core';
import { AddPollUseCase } from './use-cases/add-poll.use-case';
import { DeletePollUseCase } from './use-cases/delete-poll.use-case';
import { EditPollUseCase } from './use-cases/edit-poll.use-case';
import { ListPollsUseCase } from './use-cases/list-polls.use-case';
import { LoadPollUseCase } from './use-cases/load-poll.use-case';
import { VoteUseCase } from './use-cases/vote.use-case';
import { LoadVotesUseCase } from './use-cases/load-votes.use-case';
import { DeleteVoteUseCase } from './use-cases/delete-vote.use-case';
import { EditVoteUseCase } from './use-cases/edit-vote.use-case';
import { MergeUsersUserCase } from './use-cases/merge-users.use-case';

@NgModule({
  providers: [
    AddPollUseCase,
    ListPollsUseCase,
    DeletePollUseCase,
    LoadPollUseCase,
    EditPollUseCase,
    VoteUseCase,
    LoadVotesUseCase,
    DeleteVoteUseCase,
    EditVoteUseCase,
    MergeUsersUserCase,
  ]
})
export class PollDomainModule { }
