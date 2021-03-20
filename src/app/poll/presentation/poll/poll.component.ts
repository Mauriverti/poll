import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/auth/domain/services/session.service';
import { LoginService } from 'src/app/login/domain/services/login.service';
import { AppRoutes } from 'src/app/shared/app-routes';

@Component({
  selector: 'poll',
  styleUrls: ['./poll.component.sass'],
  templateUrl: './poll.component.html'
})
export class PollComponent {

  isAnonymous?: boolean;

  constructor(
    private router: Router,
    private auth: LoginService,
    private session: SessionService,
  ) {
    this.isAnonymous = this.session.fetchAuthData().anonymous;
  }

  login(): void {
    this.auth.logout();
    this.toLogin();
  }

  logout(): void {
    this.auth.logout();
    this.toLogin();
  }

  toLogin(): void {
    this.router.navigate([AppRoutes.LOGIN]);
  }
}
