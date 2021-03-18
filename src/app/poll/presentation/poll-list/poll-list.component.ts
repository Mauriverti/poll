import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateUseCase } from 'src/app/auth/domain/use-cases/authenticate.use-case';
import { AppRoutes } from 'src/app/shared/app-routes';

@Component({
  selector: 'poll-list',
  templateUrl: './poll-list.component.html'
})
export class PollListComponent {

  constructor(
    private router: Router,
    private auth: AuthenticateUseCase,
    ) { }

  logoff(): void {
    this.auth.logout();
    this.router.navigate([AppRoutes.LOGIN]);
  }
}
