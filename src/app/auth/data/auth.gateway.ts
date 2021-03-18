import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/login/domain/models/user';
import { Auth } from '../domain/model/auth';
import { AuthRepository } from './auth.repository';
import { FirebaseRepository } from './firebase.repository';

@Injectable()
export class AuthGateway {

  constructor(
    private repository: AuthRepository,
    private firebaseRepository: FirebaseRepository,
  ) { }

  getSession(): Auth | undefined {
    return this.repository.loadAuth();
  }

  createSession(auth: Auth): Auth {
    this.repository.saveAuth(auth);
    return auth;
  }

  login(user: User): Observable<any> {
    return this.firebaseRepository.signIn(user);
  }

  logout(): Observable<any> {
    return this.firebaseRepository.signOut();
  }

  createAccount(user: User): Observable<any> {
    return this.firebaseRepository.signUp(user);
  }

  clearAuth(): void {
    this.repository.clearAuth();
  }
}
