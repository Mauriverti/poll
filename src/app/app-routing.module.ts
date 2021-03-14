import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './shared/app-routes';

const routes: Routes = [
  { path: '', redirectTo: AppRoutes.LOGIN, pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'poll', loadChildren: () => import('./poll/poll.module').then(m => m.PollModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
