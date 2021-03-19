import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from '../domain/model/auth';
import { AuthRepository } from './auth.repository';

@Injectable()
export class FirebaseAuthRepository implements AuthRepository {

  private readonly collection = 'auth';

  constructor(
    private db: AngularFirestore
  ) { }


  loadAuth(): Observable<Auth[]> {
    return this.db.collection(this.collection).get().pipe(
      map((sessions) => sessions.docs.map((session) => session.data() as Auth))
    );
  }

  async saveAuth(auth: Auth): Promise<any> {
    return this.db.collection(this.collection).doc(auth.id).set({
      id: auth.id,
      anonymous: auth.anonymous
    });
  }

  clearAuth(id: string): void {
    this.db.collection(this.collection).doc(id).delete();
  }
}
