import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginRouting } from './routing/login.routing';
import { LoginComponent } from './login/login.component';
import { NewAccountComponent } from './new-account/new-account.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRouting,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    LoginComponent,
    NewAccountComponent,
  ]
})
export class LoginPresenterModule { }
