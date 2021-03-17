import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateUseCase } from 'src/app/auth/domain/use-cases/authenticate.use-case';
import { User } from '../models/user';

@Injectable()
export class NewAccountUseCase {

  constructor(private auth: AuthenticateUseCase) { }

  createAccount(user: User): Observable<any> {
    return this.auth.createAccount(user);
  }
}
