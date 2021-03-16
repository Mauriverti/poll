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

  saveVotes(vote: Vote): Observable<Vote> {
    const savedVotes = this.loadVotes();
    savedVotes.push(vote);
    this.storeVotes(savedVotes);
    return of(vote);
  }

  fetchVotes(): Observable<Vote[]> {
    return of(this.loadVotes());
  }
}
