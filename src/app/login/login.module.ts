import { NgModule } from '@angular/core';
import { LoginDomainModule } from './domain/login.domain.module';
import { LoginPresenterModule } from './presentation/login.presentation.module';

@NgModule({
  imports: [
    LoginPresenterModule,
    LoginDomainModule,
  ]
})
export class LoginModule { }
