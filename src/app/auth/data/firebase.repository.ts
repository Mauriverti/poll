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
      // .then((res: any) => {
      //   console.log('Successfully signed up!', res);
      // })
      // .catch((error: any) => {
      //   console.log('Something is wrong:', error.message);
      // });
  }

  signIn(user: User): Observable<any> {
    return from(this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password));
      // .then((res: any) => {
      //   console.log('Successfully signed in!');
      // })
      // .catch((err: any) => {
      //   console.log('Something is wrong:', err.message);
      // });
  }

  signOut(): Observable<any> {
    return from(this.angularFireAuth.signOut());
  }
}
