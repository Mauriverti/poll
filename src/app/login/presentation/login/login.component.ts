import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/app-routes';
import { LoginRoutes } from '../routing/login-routes';

@Component({
  selector: 'poll-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute) {

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  login(loginForm: FormGroup): void {
    console.log('login', loginForm.value);

    if (loginForm.valid) {
      this.router.navigate([AppRoutes.POLL]);
    }
  }

  newAccount(): void {
    console.log('new account');
    this.router.navigate([`../${LoginRoutes.NEW}`], { relativeTo: this.route });
  }
}
