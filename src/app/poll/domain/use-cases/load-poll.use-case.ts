import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PollGateway } from '../../data/poll.gateway';
import { Poll } from '../models/poll';

@Injectable()
export class LoadPollUseCase {
  constructor(private gateway: PollGateway) { }

  loadById(id: string): Observable<Poll | undefined> {
    return this.gateway.loadById(id);
  }
}
