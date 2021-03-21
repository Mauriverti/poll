import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { MergeUsersUserCase } from 'src/app/poll/domain/use-cases/merge-users.use-case';
import { FirebaseAuthRepository } from '../../data/firebase-auth.repository';
import { LocalStorageAuthRepository } from '../../data/localstorage-auth.repository';
import { Auth } from '../model/auth';
import { SessionService } from './session.service';

class FakeLocalStorageAuthRepository {
  private readonly fakeSession: Auth = {
    id: '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    anonymous: false
  };

  loadAuth(): Auth | undefined {
    return this.fakeSession;
  }

  saveAuth(auth: Auth): Auth {
    return auth;
  }

  clearAuth(): void { }
}

class FakeFirebaseAuthRepository {
  private readonly fakeSession: Auth = {
    id: '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    anonymous: false
  };

  loadAuth(): Observable<Auth[]> {
    return of([this.fakeSession]);
  }

  async saveAuth(auth: Auth): Promise<any> {
    return new Promise(() => { });
  }

  clearAuth(id: string): void { }
}

class FakeMergeUsersUserCase {
  mergeUsers(previousUserId: string, newUserId: string): void {
    this.mergePolls(previousUserId, newUserId);
    this.mergeVotes(previousUserId, newUserId);
  }

  mergePolls(previousUserId: string, newUserId: string): void { }

  mergeVotes(previousUserId: string, newUserId: string): void { }
}

describe('SessionService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        SessionService,
        { provide: LocalStorageAuthRepository, useClass: FakeLocalStorageAuthRepository },
        { provide: FirebaseAuthRepository, useClass: FakeFirebaseAuthRepository },
        { provide: MergeUsersUserCase, useClass: FakeMergeUsersUserCase },
      ]
    }).compileComponents();
  });

  it('should create a new nonNull session', () => {
    const service = TestBed.inject(SessionService);
    const session = service.createSession();
    const nonNullSession = session.anonymous !== undefined && session.anonymous !== null && !!session.id;
    expect(nonNullSession).toBeTrue();
  });

  it('should mantain previous session when it already exists', () => {
    const fakeSession: Auth = {
      id: '21596b82-4c52-4d1e-bcc7-5dc92607592d',
      anonymous: false
    };

    const service = TestBed.inject(SessionService);
    const session = service.initAuth();

    const sameProperties = fakeSession.anonymous === session.anonymous && fakeSession.id === session.id;
    expect(sameProperties).toBeTrue();
  });
});
