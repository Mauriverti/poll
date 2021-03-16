import { Injectable } from '@angular/core';
import { AuthenticateUseCase } from 'src/app/auth/domain/use-cases/authenticate.use-case';
import { v4 as uuidv4 } from 'uuid';
import { VoteRepository } from '../../data/vote.repository';
import { Vote } from '../models/vote';

@Injectable()
export class VoteUseCase {

  constructor(
    private auth: AuthenticateUseCase,
    private repository: VoteRepository,
  ) { }

  vote(vote: Vote): void {
    vote.id = uuidv4();
    vote.voter = this.auth.fetchAuthData().id;
    this.saveVote(vote);
  }

  saveVote(vote: Vote): void {
    this.repository.saveVotes(vote);
  }

  storeVotes(votes: Vote[]): void {
    this.repository.storeVotes(votes);
  }

}
