import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticateUseCase } from 'src/app/auth/domain/use-cases/authenticate.use-case';
import { VoteGateway } from '../../data/vote.gateway';
import { Vote } from '../models/vote';

@Injectable()
export class LoadVotesUseCase {

  constructor(
    private gateway: VoteGateway,
    private auth: AuthenticateUseCase,
  ) { }

  loadUserVotes(): Observable<Vote[]> {
    return this.gateway.fetchVotes().pipe(
      // just show user votes
      map((votes) => votes.filter((vote) => vote.voter === this.auth.fetchAuthData().id))
    );
  }

  loadVotes(): Observable<Vote[]> {
    return this.gateway.fetchVotes();
  }

  loadVotesByPoll(pollId: string): Observable<Vote[]> {
    return this.gateway.fetchVotes().pipe(
      map((votes) => votes.filter((vote) => vote.pollId === pollId))
    );
  }

  pollWithVotes(pollId: string): Observable<boolean> {
    return this.loadVotesByPoll(pollId).pipe(
      map((votes) => votes && votes.length > 0)
    );
  }

  loadVotesById(voteId: string): Observable<Vote | undefined> {
    return this.gateway.fetchVotes().pipe(
      map((votes) => votes?.find((vote) => vote.id === voteId))
    );
  }
}
