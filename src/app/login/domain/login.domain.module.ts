import { NgModule } from '@angular/core';
import { LoginUseCase } from './use-cases/login.use-case';
import { NewAccountUseCase } from './use-cases/new-account.use-case';

@NgModule({
  providers: [LoginUseCase, NewAccountUseCase]
})
export class LoginDomainModule { }
