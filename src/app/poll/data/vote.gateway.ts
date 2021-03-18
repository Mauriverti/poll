import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vote } from '../domain/models/vote';
import { VoteRepository } from './vote.repository';

@Injectable()
export class VoteGateway {

  constructor(private repository: VoteRepository) { }

  loadVotes(): Vote[] {
    return this.repository.loadVotes();
  }

  storeVotes(votes: Vote[]): void {
    return this.repository.storeVotes(votes);
  }

  fetchVotes(): Observable<Vote[]> {
    return this.repository.fetchVotes();
  }
}
