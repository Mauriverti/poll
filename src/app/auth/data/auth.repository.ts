import { Injectable } from '@angular/core';
import { Auth } from '../domain/model/auth';

@Injectable()
export abstract class AuthRepository {

  abstract loadAuth(): Auth | undefined;
  abstract saveAuth(auth: Auth): Auth;
  abstract clearAuth(): void;
}
