import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NewAccountUseCase } from '../../domain/use-cases/new-account.use-case';

@Component({
  selector: 'poll-new-accont',
  templateUrl: './new-account.component.html'
})
export class NewAccountComponent {

  newAccountForm: FormGroup;

  constructor(
    private router: Router,
    private newAccount: NewAccountUseCase,
    ) {
    this.newAccountForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  create(newAccount: FormGroup): void {
    this.newAccount.createAccount(newAccount.value);
  }

  goBack(): void {
    this.router.navigate(['..']);
  }

}
