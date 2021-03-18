import { NgModule } from '@angular/core';
import { AuthGateway } from './auth.gateway';
import { AuthRepository } from './auth.repository';
import { FirebaseRepository } from './firebase.repository';
import { LocalStorageAuthRepository } from './localstorage-auth.repository';

@NgModule({
  providers: [
    {
      provide: AuthRepository,
      useClass: LocalStorageAuthRepository
    },
    AuthGateway,
    FirebaseRepository,
  ]
})
export class AuthDataModule { }
