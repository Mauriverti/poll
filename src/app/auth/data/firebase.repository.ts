import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from 'src/app/login/domain/models/user';

@Injectable()
export class FirebaseRepository {

  constructor(private angularFireAuth: AngularFireAuth) { }

  signUp(user: User): Observable<any> {
    return from(this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password));
  }

  signIn(user: User): Observable<any> {
    return from(this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password));
  }

  signOut(): Observable<any> {
    return from(this.angularFireAuth.signOut());
  }
}
