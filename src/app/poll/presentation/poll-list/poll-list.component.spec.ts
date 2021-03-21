import { TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Poll } from '../../domain/models/poll';
import { Vote } from '../../domain/models/vote';
import { DeletePollUseCase } from '../../domain/use-cases/delete-poll.use-case';
import { DeleteVoteUseCase } from '../../domain/use-cases/delete-vote.use-case';
import { ListPollsUseCase } from '../../domain/use-cases/list-polls.use-case';
import { LoadVotesUseCase } from '../../domain/use-cases/load-votes.use-case';
import { PollCreatedListComponent } from './poll-created-list/poll-created-list.component';
import { PollListComponent } from './poll-list.component';
import { PollVoteListComponent } from './poll-vote-list/poll-vote-list.component';

class FakeLoadVotesUseCase {
  private readonly fakeVote = new Vote(
    '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    'option1',
    'fakePoll'
  );
  loadUserVotes(): Observable<Vote[]> {
    return of([this.fakeVote]);
  }

  loadVotes(): Observable<Vote[]> {
    return of([this.fakeVote]);
  }

  loadVotesByPoll(pollId: string): Observable<Vote[]> {
    return of([this.fakeVote]);
  }

  pollWithVotes(pollId: string): Observable<boolean> {
    return of(true);
  }

  loadVotesById(voteId: string): Observable<Vote | undefined> {
    return of(this.fakeVote);
  }
}

class FakeListPollsUseCase {

  private readonly fakePoll = new Poll(
    '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    'fakePoll',
    'fakePoll',
    true,
    '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    ['option1', 'option2']
  );

  listUserPolls(): Observable<Poll[]> {
    return of([this.fakePoll]);
  }

  list(): Observable<Poll[]> {
    return of([this.fakePoll]);
  }
}

class FakeDeletePollUseCase {
  delete(poll: Poll): void { }
}

class FakeDeleteVoteUseCase {
  deleteVote(vote: Vote): void { }

  deleteVoteByPollId(pollId: string): void { }
}

describe('PollListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatTabsModule,
      ],
      providers: [
        { provide: LoadVotesUseCase, useClass: FakeLoadVotesUseCase },
        { provide: ListPollsUseCase, useClass: FakeListPollsUseCase },
        { provide: DeletePollUseCase, useClass: FakeDeletePollUseCase },
        { provide: DeleteVoteUseCase, useClass: FakeDeleteVoteUseCase },
      ],
      declarations: [
        PollListComponent,
        PollVoteListComponent,
        PollCreatedListComponent,
      ],
    }).compileComponents();
  });

  it('should create PollListComponent', () => {
    const fixture = TestBed.createComponent(PollListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
