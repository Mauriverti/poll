import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/auth/domain/model/auth';
import { AuthenticateUseCase } from 'src/app/auth/domain/use-cases/authenticate.use-case';
import { User } from '../models/user';

@Injectable()
export class LoginUseCase {

  constructor(private auth: AuthenticateUseCase) { }

  login(user: User): Observable<any> {
    return this.auth.login(user);
  }

  storeCredentials(id: string): Auth {
    const auth = new Auth(id, false);
    return this.auth.storeCredentials(auth);
  }
}
