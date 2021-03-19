import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseRepository } from 'src/app/auth/data/firebase.repository';
import { User } from '../models/user';

@Injectable()
export class NewAccountUseCase {

  constructor(private signInRepository: FirebaseRepository) { }

  createAccount(user: User): Observable<any> {
    return this.signInRepository.signUp(user);
  }
}
