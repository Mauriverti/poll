import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/domain/services/login.service';
import { AppRoutes } from 'src/app/shared/app-routes';

@Component({
  selector: 'poll-list',
  templateUrl: './poll-list.component.html'
})
export class PollListComponent {

  constructor(
    private router: Router,
    private auth: LoginService,
  ) { }

  logoff(): void {
    this.auth.logout();
    this.router.navigate([AppRoutes.LOGIN]);
  }
}
