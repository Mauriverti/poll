import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll } from 'src/app/poll/domain/models/poll';
import { PollLocalStorageRepository } from './poll-localstorage.repository';


@Injectable()
export class PollGateway {

  constructor(private repository: PollLocalStorageRepository) { }

  loadById(id: string): Observable<Poll | undefined> {
    return this.repository.loadById(id);
  }

  loadPolls(): Poll[] {
    return this.repository.loadPolls();
  }

  storePolls(polls: Poll[]): void {
    return this.repository.storePolls(polls);
  }
}
