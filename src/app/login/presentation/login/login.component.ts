import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Auth } from 'src/app/auth/domain/model/auth';
import { SessionService } from 'src/app/auth/domain/services/session.service';
import { AppRoutes } from 'src/app/shared/app-routes';
import { LoginService } from '../../domain/services/login.service';
import { LoginRoutes } from '../routing/login-routes';

@Component({
  selector: 'poll-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {

  loginForm: FormGroup;
  destroyed$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private sessionService: SessionService,
  ) {

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  login(loginForm: FormGroup): void {
    console.log('login', loginForm.value);

    this.loginService.login(loginForm.value).pipe(
      takeUntil(this.destroyed$)
    ).subscribe((user) => {
      console.log('user', user);
      this.sessionService.storeCredentials(new Auth(user.user.uid, false));
      this.toDefaultModule();
    });
  }

  toDefaultModule(): void {
    this.router.navigate([AppRoutes.DEFAULT]);
  }

  newAccount(): void {
    console.log('new account');
    this.router.navigate([`../${LoginRoutes.NEW}`], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
