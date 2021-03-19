import { NgModule } from '@angular/core';
import { LoginService } from './services/login.service';
import { NewAccountUseCase } from './use-cases/new-account.use-case';

@NgModule({
  providers: [LoginService, NewAccountUseCase]
})
export class LoginDomainModule { }
