import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthenticateUseCase } from 'src/app/auth/domain/use-cases/authenticate.use-case';
import { VoteRepository } from '../../data/vote.repository';
import { Vote } from '../models/vote';

@Injectable()
export class LoadUserVotesUseCase {

  constructor(
    private repository: VoteRepository,
    private auth: AuthenticateUseCase,
    ) { }

  loadVotes(): Observable<Vote[]> {
    return this.repository.fetchVotes().pipe(
      // just show user votes
      map((votes) => votes.filter((vote) => vote.voter === this.auth.fetchAuthData().id))
    );
  }
}
