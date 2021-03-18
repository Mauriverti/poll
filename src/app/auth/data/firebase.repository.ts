import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from 'src/app/login/domain/models/user';

interface UserCredential {
  idToken: string;
  email: string;
}

@Injectable()
export class FirebaseRepository {

  userData: Observable<any>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

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
