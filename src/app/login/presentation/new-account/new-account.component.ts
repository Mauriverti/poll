import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'poll-new-accont',
  templateUrl: './new-account.component.html'
})
export class NewAccountComponent {

  newAccountForm: FormGroup;

  constructor(private router: Router) {
    this.newAccountForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  create(newAccount: FormGroup): void {
    console.log('create', newAccount.value);
  }

  goBack(): void {
    this.router.navigate(['..']);
  }

}
