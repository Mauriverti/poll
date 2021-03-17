import { Injectable } from '@angular/core';
import { AuthGateway } from '../../data/auth.gateway';
import { v4 as uuidv4 } from 'uuid';
import { Auth } from '../model/auth';
import { User } from 'src/app/login/domain/models/user';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticateUseCase {

  constructor(private gateway: AuthGateway) { }

  createSession(): Auth {
    const auth = new Auth(uuidv4());
    return this.storeCredentials(auth);
  }

  storeCredentials(auth: Auth): Auth {
    return this.gateway.createSession(auth);
  }

  loadAuth(): Auth | undefined {
    return this.gateway.getSession();
  }

  initAuth(): Auth {
    const auth = this.loadAuth();
    if (!auth) {
      return this.createSession();
    }
    return auth;
  }

  fetchAuthData(): Auth {
    return this.initAuth();
  }

  login(user: User): Observable<any> {
    return this.gateway.login(user);
  }

  logout(): Observable<any> {
    return this.gateway.logout();
  }

  createAccount(user: User): Observable<any> {
    return this.gateway.createAccount(user);
  }
}
