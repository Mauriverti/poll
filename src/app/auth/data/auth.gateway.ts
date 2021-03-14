import { Injectable } from '@angular/core';
import { Auth } from '../domain/model/auth';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthGateway {

  constructor(private repository: AuthRepository) { }

  getSession(): Auth | undefined {
    return this.repository.loadAuth();
  }

  createSession(auth: Auth): Auth {
    this.repository.saveAuth(auth);
    return auth;
  }
}
