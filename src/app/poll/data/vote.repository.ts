import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vote } from '../domain/models/vote';

@Injectable()
export class VoteRepository {

  loadVotes(): Vote[] {
    const oldValues = localStorage.getItem('pollVotes');
    const savedPolls: Vote[] = oldValues ? JSON.parse(oldValues) : [];
    return savedPolls;
  }

  storeVotes(votes: Vote[]): void {
    localStorage.setItem('pollVotes', JSON.stringify(votes));
  }

  fetchVotes(): Observable<Vote[]> {
    return of(this.loadVotes());
  }
}
