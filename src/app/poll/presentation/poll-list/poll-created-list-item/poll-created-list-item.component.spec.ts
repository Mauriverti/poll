import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Vote } from 'src/app/poll/domain/models/vote';
import { LoadVotesUseCase } from 'src/app/poll/domain/use-cases/load-votes.use-case';
import { PollCraetedListItemComponent } from './poll-created-list-item.component';

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

describe('PollCraetedListItemComponent', () => {

  let component: PollCraetedListItemComponent;
  let fixture: ComponentFixture<PollCraetedListItemComponent>;
  let db: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTooltipModule,
      ],
      providers: [
        { provide: LoadVotesUseCase, useClass: FakeLoadVotesUseCase },
      ],
      declarations: [
        PollCraetedListItemComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollCraetedListItemComponent);
    component = fixture.componentInstance;
    db = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create PollCraetedListItemComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should enable edit button when poll has not been voted', () => {
    component.canEdit = true;
    expect(db.query(By.css('button')).nativeElement.disabled).toBeFalse();
  });

  // it('should block edit button when poll has been voted', fakeAsync(() => {
  //   component.canEdit = false;
  //   tick();
  //   expect(db.query(By.css('button')).nativeElement.disabled).toBeTrue();
  // }));
});
