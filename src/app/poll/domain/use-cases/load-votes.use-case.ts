import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthenticateUseCase } from 'src/app/auth/domain/use-cases/authenticate.use-case';
import { VoteRepository } from '../../data/vote.repository';
import { Vote } from '../models/vote';

@Injectable()
export class LoadVotesUseCase {

  constructor(
    private repository: VoteRepository,
    private auth: AuthenticateUseCase,
    ) { }

  loadUserVotes(): Observable<Vote[]> {
    return this.repository.fetchVotes().pipe(
      // just show user votes
      map((votes) => votes.filter((vote) => vote.voter === this.auth.fetchAuthData().id))
    );
  }

  loadVotes(): Observable<Vote[]> {
    return this.repository.fetchVotes();
  }

  loadVotesByPoll(pollId: string): Observable<Vote[]> {
    return this.repository.fetchVotes().pipe(
      map((votes) => votes.filter((vote) => vote.pollId === pollId))
    );
  }

  pollWithVotes(pollId: string): Observable<boolean> {
    return this.loadVotesByPoll(pollId).pipe(
      map((votes) => votes && votes.length > 0)
    );
  }

  loadVotesById(voteId: string): Observable<Vote | undefined> {
    return this.repository.fetchVotes().pipe(
      map((votes) => votes?.find((vote) => vote.id === voteId))
    );
  }
}
