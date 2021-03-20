import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  styleUrls: ['./login.component.sass'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {

  loginForm: FormGroup;
  private readonly emailRegex = /\S+@\S+\.\S+/;
  destroyed$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private sessionService: SessionService,
  ) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailRegex)
      ]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required
      ])
    });
  }

  login(loginForm: FormGroup): void {
    this.loginService.login(loginForm.value).pipe(
      takeUntil(this.destroyed$)
    ).subscribe({
      next: (user) => {
        this.sessionService.storeCredentials(new Auth(user.user.uid, false));
        this.toDefaultModule();
      },
      error: (error: { message: string }) => {
        this.showErrorMessage(error.message);
      }
    });
  }

  toDefaultModule(): void {
    this.router.navigate([AppRoutes.DEFAULT]);
  }

  newAccount(): void {
    this.router.navigate([`../${LoginRoutes.NEW}`], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  showErrorMessage(message: string): void {
    alert(message);
  }
}
