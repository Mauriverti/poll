import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NewAccountUseCase } from '../../domain/use-cases/new-account.use-case';

@Component({
  selector: 'poll-new-accont',
  templateUrl: './new-account.component.html'
})
export class NewAccountComponent implements OnDestroy {

  newAccountForm: FormGroup;

  private readonly emailRegex = /\S+@\S+\.\S+/;
  destroyed$ = new Subject<void>();

  constructor(
    private router: Router,
    private newAccount: NewAccountUseCase,
  ) {
    this.newAccountForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailRegex)
      ]),
      password: new FormControl('', [
        Validators.minLength(6),
      ])
    });
  }

  create(newAccount: FormGroup): void {
    this.newAccount.createAccount(newAccount.value).pipe(
      takeUntil(this.destroyed$)
    ).subscribe({
      next: () => this.goBack(),
      error: (error: { message: string }) => {
        this.showErrorMessage(error.message);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['..']);
  }

  showErrorMessage(message: string): void {
    alert(message);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
