import { Injectable } from '@angular/core';
import { AuthenticateUseCase } from 'src/app/auth/domain/use-cases/authenticate.use-case';
import { v4 as uuidv4 } from 'uuid';
import { PollGateway } from '../../data/poll.gateway';
import { Vote } from '../models/vote';

@Injectable()
export class VoteUseCase {

  constructor(
    private auth: AuthenticateUseCase,
    private gateway: PollGateway,
  ) { }

  vote(vote: Vote): void {
    vote.id = uuidv4();
    vote.voter = this.auth.fetchAuthData().id;
    this.gateway.saveVote(vote);
  }
}
