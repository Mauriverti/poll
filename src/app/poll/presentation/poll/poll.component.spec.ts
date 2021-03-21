import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Auth } from 'src/app/auth/domain/model/auth';
import { SessionService } from 'src/app/auth/domain/services/session.service';
import { User } from 'src/app/login/domain/models/user';
import { LoginService } from 'src/app/login/domain/services/login.service';
import { PollComponent } from './poll.component';

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

class FakeLoginService {
  private readonly fakeUser = {
    uid: 'userId'
  };

  login(user: User): Observable<any> {
    return of(this.fakeUser);
  }

  logout(): Observable<any> {
    return of({});
  }
}

describe('PollComponent', () => {
  let component: PollComponent;
  let fixture: ComponentFixture<PollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
      ],
      providers: [
        { provide: SessionService, useClass: FakeSessionService },
        { provide: LoginService, useClass: FakeLoginService }
      ],
      declarations: [
        PollComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollComponent);
    component = fixture.componentInstance;
  });

  it('should create PollComponent', () => {
    expect(component).toBeTruthy();
  });
});
