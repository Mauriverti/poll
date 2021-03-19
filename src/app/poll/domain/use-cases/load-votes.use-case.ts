import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from 'src/app/auth/domain/services/session.service';
import { VoteFirebaseRepository } from '../../data/vote-firebase.repository';
import { Vote } from '../models/vote';

@Injectable()
export class LoadVotesUseCase {

  constructor(
    private repository: VoteFirebaseRepository,
    private service: SessionService,
  ) { }

  loadUserVotes(): Observable<Vote[]> {
    const creator = this.service.fetchAuthData().id;
    return this.repository.loadVotesByCreator(creator);
  }

  loadVotes(): Observable<Vote[]> {
    return this.repository.loadVotes();
  }

  loadVotesByPoll(pollId: string): Observable<Vote[]> {
    return this.repository.loadVotes().pipe(
      map((votes) => votes.filter((vote) => vote.pollId === pollId))
    );
  }

  pollWithVotes(pollId: string): Observable<boolean> {
    return this.loadVotesByPoll(pollId).pipe(
      map((votes) => votes && votes.length > 0)
    );
  }

  loadVotesById(voteId: string): Observable<Vote | undefined> {
    return this.repository.loadById(voteId);
  }
}
