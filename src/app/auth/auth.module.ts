import { NgModule } from '@angular/core';
import { AuthDataModule } from './data/auth.data.module';
import { AuthDomainModule } from './domain/auth.domain.module';

@NgModule({
  imports: [
    AuthDomainModule,
    AuthDataModule,
  ]
})
export class AuthModule { }
