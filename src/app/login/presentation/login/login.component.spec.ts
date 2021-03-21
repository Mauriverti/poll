import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Auth } from 'src/app/auth/domain/model/auth';
import { SessionService } from 'src/app/auth/domain/services/session.service';
import { User } from '../../domain/models/user';
import { LoginService } from '../../domain/services/login.service';
import { LoginComponent } from './login.component';

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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [
        { provide: LoginService, useClass: FakeLoginService },
        { provide: SessionService, useClass: FakeSessionService }
      ],
      declarations: [
        LoginComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create LoginComponent', () => {
    expect(component).toBeTruthy();
  });
});
