import { Component, OnInit } from '@angular/core';
import { AuthenticateUseCase } from './auth/domain/use-cases/authenticate.use-case';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthenticateUseCase) { }
  ngOnInit(): void {
    this.auth.initAuth();
  }
}
