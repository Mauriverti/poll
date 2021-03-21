import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Auth } from 'src/app/auth/domain/model/auth';
import { Poll } from '../../domain/models/poll';
import { Vote } from '../../domain/models/vote';
import { EditVoteUseCase } from '../../domain/use-cases/edit-vote.use-case';
import { LoadPollUseCase } from '../../domain/use-cases/load-poll.use-case';
import { LoadVotesUseCase } from '../../domain/use-cases/load-votes.use-case';
import { EditVoteComponent } from './edit-vote.component';

class FakeLoadPollUseCase {
  loadById(id: string): Observable<Poll | undefined> {
    const fakePoll = new Poll(
      '21596b82-4c52-4d1e-bcc7-5dc92607592d',
      'fakePoll',
      'fakePoll',
      true,
      '21596b82-4c52-4d1e-bcc7-5dc92607592d',
      ['option1', 'option2']
    );
    return of(fakePoll);
  }
}

class FakeEditVoteUseCase {
  editVote(vote: Vote): void { }
}

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

describe('EditVoteComponent', () => {
  let component: EditVoteComponent;
  let fixture: ComponentFixture<EditVoteComponent>;
  let db: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatRadioModule,
      ],
      providers: [
        { provide: LoadVotesUseCase, useClass: FakeLoadVotesUseCase },
        { provide: EditVoteUseCase, useClass: FakeEditVoteUseCase },
        { provide: LoadPollUseCase, useClass: FakeLoadPollUseCase },
      ],
      declarations: [
        EditVoteComponent
      ],
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVoteComponent);
    component = fixture.componentInstance;
    db = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the EditVoteComponent', () => {
    expect(component).toBeTruthy();
  });
});
