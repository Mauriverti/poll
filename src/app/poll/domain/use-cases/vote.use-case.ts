import { Injectable } from '@angular/core';
import { AuthenticateUseCase } from 'src/app/auth/domain/use-cases/authenticate.use-case';
import { v4 as uuidv4 } from 'uuid';
import { VoteGateway } from '../../data/vote.gateway';
import { Vote } from '../models/vote';

@Injectable()
export class VoteUseCase {

  constructor(
    private auth: AuthenticateUseCase,
    private gateway: VoteGateway,
  ) { }

  vote(vote: Vote): void {
    vote.id = uuidv4();
    vote.voter = this.auth.fetchAuthData().id;
    this.saveVote(vote);
  }

  saveVote(vote: Vote): void {
    const savedVotes = this.gateway.loadVotes();
    savedVotes.push(vote);
    this.gateway.storeVotes(savedVotes);
  }

  storeVotes(votes: Vote[]): void {
    this.gateway.storeVotes(votes);
  }

}
