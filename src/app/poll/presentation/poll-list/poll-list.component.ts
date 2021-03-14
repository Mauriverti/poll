import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/app-routes';

@Component({
  selector: 'poll-list',
  templateUrl: './poll-list.component.html'
})
export class PollListComponent {

  constructor(private router: Router) { }

  logoff(): void {
    this.router.navigate([AppRoutes.LOGIN]);
  }
}
