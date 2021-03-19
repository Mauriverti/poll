import { Injectable } from '@angular/core';
import { Auth } from '../domain/model/auth';

@Injectable()
export class LocalStorageAuthRepository {

  loadAuth(): Auth | undefined {
    const stored = localStorage.getItem('pollAuth');
    const auth: Auth = stored ? JSON.parse(stored) : undefined;
    return auth;
  }

  saveAuth(auth: Auth): Auth {
    localStorage.setItem('pollAuth', JSON.stringify(auth));
    return auth;
  }

  clearAuth(): void {
    localStorage.removeItem('pollAuth');
  }

}
