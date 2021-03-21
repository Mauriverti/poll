import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Auth } from 'src/app/auth/domain/model/auth';
import { SessionService } from 'src/app/auth/domain/services/session.service';
import { PollFirebaseRepository } from '../../data/poll-firebase.repository';
import { Poll } from '../models/poll';
import { AddPollUseCase } from './add-poll.use-case';

class FakePollFirebaseRepository {

  private readonly fakePoll = new Poll(
    '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    'fakePoll',
    'fakePoll',
    true,
    '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    ['option1', 'option2']
  );

  loadPolls(): Observable<Poll[]> {
    return of([this.fakePoll]);
  }

  loadPollsByCreator(id: string): Observable<Poll[]> {
    return of([this.fakePoll]);
  }

  async storePoll(poll: Poll): Promise<void> {
    return new Promise(() => { });
  }

  async editPoll(poll: Poll): Promise<void> {
    return new Promise(() => { });
  }

  loadById(id: string): Observable<Poll | undefined> {
    return of(this.fakePoll);
  }

  deletePoll(poll: Poll): void { }
}

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

describe('AddPollUseCase', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddPollUseCase,
        { provide: PollFirebaseRepository, useClass: FakePollFirebaseRepository },
        { provide: SessionService, useClass: FakeSessionService },
      ]
    });
  });

  it('should create a poll with valid id and createdBy, using valid poll', () => {
    const useCase = TestBed.inject(AddPollUseCase);
    const fakePoll = new Poll(
      '21596b82-4c52-4d1e-bcc7-5dc92607592d',
      'fakePoll',
      'fakePoll',
      true,
      '21596b82-4c52-4d1e-bcc7-5dc92607592d',
      ['option1', 'option2']
    );

    const preparedEntity = useCase.prepareEntity(fakePoll);
    const validId = !!preparedEntity.id;
    const validCreatedBy = !!preparedEntity.createdBy;

    expect(validId && validCreatedBy).toBeTrue();
  });

  it('should create a poll with valid id and createdBy, using invalid poll', () => {
    const useCase = TestBed.inject(AddPollUseCase);
    const fakePoll = new Poll(
      '',
      'fakePoll',
      'fakePoll',
      true,
      '',
      ['option1', 'option2']
    );

    const preparedEntity = useCase.prepareEntity(fakePoll);
    const validId = !!preparedEntity.id;
    const validCreatedBy = !!preparedEntity.createdBy;

    expect(validId && validCreatedBy).toBeTrue();
  });
});
