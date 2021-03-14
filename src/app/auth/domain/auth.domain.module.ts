import { NgModule } from '@angular/core';
import { AuthenticateUseCase } from './use-cases/authenticate.use-case';

@NgModule({
  providers: [AuthenticateUseCase]
})
export class AuthDomainModule { }
