import { Injectable } from '@angular/core';
import { SessionService } from 'src/app/auth/domain/services/session.service';
import { v4 as uuidv4 } from 'uuid';
import { VoteFirebaseRepository } from '../../data/vote-firebase.repository';
import { Vote } from '../models/vote';

@Injectable()
export class VoteUseCase {

  constructor(
    private sessionService: SessionService,
    private repository: VoteFirebaseRepository,
  ) { }

  vote(vote: Vote): void {
    vote.id = uuidv4();
    vote.voter = this.sessionService.fetchAuthData().id;
    this.saveVote(vote);
  }

  saveVote(vote: Vote): void {
    this.repository.storeVote(vote);
  }
}
