import { Injectable } from '@angular/core';
import { PollFirebaseRepository } from '../../data/poll-firebase.repository';
import { Poll } from '../models/poll';

@Injectable()
export class EditPollUseCase {

  constructor(private repository: PollFirebaseRepository) { }

  editPoll(poll: Poll): void {
    this.validatePoll(poll);
    this.repository.editPoll(poll);
  }

  validatePoll(poll: Poll): void {
    if (!poll.id) {
      throw new Error('Id is not valid, impossible to edit');
    }
  }
}
