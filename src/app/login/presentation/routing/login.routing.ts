import { LoginComponent } from '../login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NewAccountComponent } from '../new-account/new-account.component';

/**
 * app
 * '- login
 *    '- new
 */

export const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: LoginComponent },
      { path: 'new', component: NewAccountComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRouting { }
