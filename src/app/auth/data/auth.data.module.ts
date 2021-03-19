import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AuthGateway } from './auth.gateway';
import { FirebaseAuthRepository } from './firebase-auth.repository';
import { FirebaseRepository } from './firebase.repository';
import { LocalStorageAuthRepository } from './localstorage-auth.repository';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [
    // {
    //   provide: AuthRepository,
    //   useClass: FirebaseAuthRepository
    // },
    LocalStorageAuthRepository,
    FirebaseAuthRepository,
    AuthGateway,
    FirebaseRepository,
  ]
})
export class AuthDataModule { }
