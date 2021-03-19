import { Injectable } from '@angular/core';
import { SessionService } from 'src/app/auth/domain/services/session.service';
import { v4 as uuidv4 } from 'uuid';
import { PollFirebaseRepository } from '../../data/poll-firebase.repository';
import { Poll } from '../models/poll';

@Injectable()
export class AddPollUseCase {

  constructor(
    private service: SessionService,
    private repository: PollFirebaseRepository,
  ) { }

  addPoll(poll: Poll): void {
    poll = this.prepareEntity(poll);
    this.repository.storePoll(poll);
  }

  private prepareEntity(poll: Poll): Poll {
    poll.id = uuidv4();
    poll.createdBy = this.service.fetchAuthData().id;
    return poll;
  }
}
