import { Injectable } from '@angular/core';
import { AuthGateway } from '../../data/auth.gateway';
import { v4 as uuidv4 } from 'uuid';
import { Auth } from '../model/auth';
import { User } from 'src/app/login/domain/models/user';
import { Observable } from 'rxjs';
import { MergeUsersUserCase } from 'src/app/poll/domain/use-cases/merge-users.use-case';

@Injectable()
export class AuthenticateUseCase {

  constructor(
    private gateway: AuthGateway,
    private migrateUsers: MergeUsersUserCase,
    ) { }

  /** creates and stores a new session */
  createSession(): Auth {
    const auth = new Auth(uuidv4());
    return this.storeCredentials(auth);
  }

  /** creates a new session with a new user, if user already have a session, merge both */
  storeCredentials(auth: Auth): Auth {
    const oldAuth = this.gateway.getSession();
    // debugger;
    if (oldAuth) {
      this.migrateUsers.mergeUsers(oldAuth.id, auth.id);
    }
    return this.gateway.createSession(auth);
  }


  /** load current session data */
  loadAuth(): Auth | undefined {
    return this.gateway.getSession();
  }

  /** returns current session, if doesn't have one, creates a new session then return it */
  initAuth(): Auth {
    const auth = this.loadAuth();
    if (!auth) {
      return this.createSession();
    }
    return auth;
  }

  /** returns current session */
  fetchAuthData(): Auth {
    return this.initAuth();
  }

  login(user: User): Observable<any> {
    return this.gateway.login(user);
  }

  logout(): Observable<any> {
    this.cleanSession();
    return this.gateway.logout();
  }

  cleanSession(): void {
    const auth = this.gateway.getSession();
    if (auth && !auth.anonymous) {
      this.gateway.clearAuth();
    }
  }

  createAccount(user: User): Observable<any> {
    return this.gateway.createAccount(user);
  }
}
