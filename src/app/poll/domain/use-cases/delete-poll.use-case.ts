import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PollGateway } from '../../data/poll.gateway';
import { Poll } from '../models/poll';

@Injectable()
export class DeletePollUseCase {

  constructor(private gateway: PollGateway) { }

  delete(poll: Poll): Observable<void> {
    return this.gateway.delete(poll);
  }
}
