import { Component, OnInit } from '@angular/core';
import { SessionService } from './auth/domain/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private service: SessionService) { }
  ngOnInit(): void {
    this.service.initAuth();
  }
}
