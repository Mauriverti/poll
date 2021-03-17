import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppRoutes } from 'src/app/shared/app-routes';
import { LoginUseCase } from '../../domain/use-cases/login.use-case';
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
    private loginUseCase: LoginUseCase,
  ) {

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  login(loginForm: FormGroup): void {
    console.log('login', loginForm.value);

    this.loginUseCase.login(loginForm.value).pipe(
      takeUntil(this.destroyed$)
    ).subscribe((user) => {
      console.log('user', user);
      this.loginUseCase.storeCredentials(user.user.uid);
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
