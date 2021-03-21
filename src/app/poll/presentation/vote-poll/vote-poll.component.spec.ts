import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Auth } from 'src/app/auth/domain/model/auth';
import { SessionService } from 'src/app/auth/domain/services/session.service';
import { Poll } from '../../domain/models/poll';
import { Vote } from '../../domain/models/vote';
import { LoadPollUseCase } from '../../domain/use-cases/load-poll.use-case';
import { VoteUseCase } from '../../domain/use-cases/vote.use-case';
import { VotePollComponent } from './vote-poll.component';

class FakeSessionService {
  private readonly fakeUser = {
    uid: 'userId'
  };

  private readonly fakeSession: Auth = {
    id: '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    anonymous: false
  };

  createSession(): Auth {
    return this.fakeSession;
  }

  async storeCredentials(auth: Auth): Promise<void> {
    return new Promise(() => { });
  }


  /** load current session data */
  loadAuth(): Auth | undefined {
    return this.fakeSession;
  }

  /** returns current session */
  fetchAuthData(): Auth {
    return this.initAuth();
  }

  /** returns current session, if doesn't have one, creates a new session then return it */
  initAuth(): Auth {
    return this.fakeSession;
  }

  cleanLocalSession(): void { }
}

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

class FakeVoteUseCase {
  vote(vote: Vote): void { }

  saveVote(vote: Vote): void { }
}

describe('VotePollComponent', () => {
  let component: VotePollComponent;
  let fixture: ComponentFixture<VotePollComponent>;
  let db: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [
        { provide: SessionService, useClass: FakeSessionService },
        { provide: LoadPollUseCase, useClass: FakeLoadPollUseCase },
        { provide: VoteUseCase, useClass: FakeVoteUseCase },
      ],
      declarations: [
        VotePollComponent
      ],
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotePollComponent);
    component = fixture.componentInstance;
    db = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the VotePollComponent', () => {
    expect(component).toBeTruthy();
  });

  it('anonymous user can see public poll', () => {
    component.userCanSeePoll(true, true);
    expect(component.userCanVote).toBeTrue();
  });

  it('anonymous user can not see private poll', () => {
    component.userCanSeePoll(false, true);
    expect(component.userCanVote).toBeFalse();
  });

  it('logged in user can see public poll', () => {
    component.userCanSeePoll(true, false);
    expect(component.userCanVote).toBeTrue();
  });

  it('logged in user can see private poll', () => {
    component.userCanSeePoll(false, false);
    expect(component.userCanVote).toBeTrue();
  });

  it('should show loading message while it is loading if user can vote the poll', () => {
    component.userCanVote = undefined;
    expect(db.query(By.css('span')).nativeElement.innerText).toBe('Loading..');
  });

  // it('should show prohibit message when user can not vote the poll', fakeAsync(() => {
  //   component.userCanVote = false;
  //   tick(5000);
  //   expect(db.query(By.css('span')).nativeElement.innerText).toBe('Oops, to vote this poll you must be authenticated!');
  // }));

  // it('should show poll form when user can vote the poll', fakeAsync(() => {
  //   component.userCanVote = true;
  //   tick(5000);
  //   expect(db.query(By.css('form')).nativeElement.innerText).toBeTruthy();
  // }));


});
