import { NgModule } from '@angular/core';
import { AuthGateway } from './auth.gateway';
import { AuthRepository } from './auth.repository';
import { LocalStoreAuthRepository } from './local-store-auth.repository';

@NgModule({
  providers: [
    {
      provide: AuthRepository,
      useClass: LocalStoreAuthRepository
    },
    AuthGateway,
  ]
})
export class AuthDataModule { }
