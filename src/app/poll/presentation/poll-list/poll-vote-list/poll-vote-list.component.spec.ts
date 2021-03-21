import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Vote } from 'src/app/poll/domain/models/vote';
import { DeleteVoteUseCase } from 'src/app/poll/domain/use-cases/delete-vote.use-case';
import { LoadVotesUseCase } from 'src/app/poll/domain/use-cases/load-votes.use-case';
import { VotePollListItemComponent } from '../poll-vote-list-item/vote-poll-list-item.component';
import { PollVoteListComponent } from './poll-vote-list.component';

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

class FakeDeleteVoteUseCase {
  deleteVote(vote: Vote): void { }

  deleteVoteByPollId(pollId: string): void { }
}

describe('PollVoteListComponent', () => {

  let component: PollVoteListComponent;
  let fixture: ComponentFixture<PollVoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
      ],
      providers: [
        { provide: LoadVotesUseCase, useClass: FakeLoadVotesUseCase },
        { provide: DeleteVoteUseCase, useClass: FakeDeleteVoteUseCase },
      ],
      declarations: [
        PollVoteListComponent,
        VotePollListItemComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollVoteListComponent);
    component = fixture.componentInstance;
  });

  it('should create PollVoteListComponent', () => {
    expect(component).toBeTruthy();
  });
});
