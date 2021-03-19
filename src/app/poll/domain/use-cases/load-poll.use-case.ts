import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PollFirebaseRepository } from '../../data/poll-firebase.repository';
import { Poll } from '../models/poll';

@Injectable()
export class LoadPollUseCase {
  constructor(private repository: PollFirebaseRepository) { }

  loadById(id: string): Observable<Poll | undefined> {
    return this.repository.loadById(id);
  }
}
