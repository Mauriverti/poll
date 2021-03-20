import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/domain/services/login.service';
import { AppRoutes } from 'src/app/shared/app-routes';

@Component({
  selector: 'poll',
  styleUrls: ['./poll.component.sass'],
  templateUrl: './poll.component.html'
})
export class PollComponent {
  constructor(
    private router: Router,
    private auth: LoginService,
  ) { }

  logout(): void {
    this.auth.logout();
    this.router.navigate([AppRoutes.LOGIN]);
  }
}
