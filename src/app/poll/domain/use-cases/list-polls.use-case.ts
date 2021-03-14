import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PollGateway } from '../../data/poll.gateway';
import { Poll } from '../models/poll';

@Injectable()
export class ListPollsUseCase {

  constructor(private gateway: PollGateway) { }

  list(): Observable<Poll[]> {
    return this.gateway.list();
  }
}
