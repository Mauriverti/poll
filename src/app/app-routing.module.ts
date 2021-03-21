import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './shared/app-routes';

export const routes: Routes = [
  { path: '', redirectTo: AppRoutes.LOGIN, pathMatch: 'full' },
  { path: AppRoutes.LOGIN, loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: AppRoutes.POLL, loadChildren: () => import('./poll/poll.module').then(m => m.PollModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
