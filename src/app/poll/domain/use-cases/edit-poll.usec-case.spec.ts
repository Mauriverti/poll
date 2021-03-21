import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { PollFirebaseRepository } from '../../data/poll-firebase.repository';
import { Poll } from '../models/poll';
import { EditPollUseCase } from './edit-poll.use-case';

class FakePollFirebaseRepository {

  private readonly fakePoll = new Poll(
    '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    'fakePoll',
    'fakePoll',
    true,
    '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    ['option1', 'option2']
  );

  loadPolls(): Observable<Poll[]> {
    return of([this.fakePoll]);
  }

  loadPollsByCreator(id: string): Observable<Poll[]> {
    return of([this.fakePoll]);
  }

  async storePoll(poll: Poll): Promise<void> {
    return new Promise(() => { });
  }

  async editPoll(poll: Poll): Promise<void> {
    return new Promise(() => { });
  }

  loadById(id: string): Observable<Poll | undefined> {
    return of(this.fakePoll);
  }

  deletePoll(poll: Poll): void { }
}

describe('EditPollUseCase', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditPollUseCase,
        { provide: PollFirebaseRepository, useClass: FakePollFirebaseRepository },
      ]
    });
  });

  it('should pass with poll with id', () => {
    const useCase = TestBed.inject(EditPollUseCase);
    const fakePoll = new Poll(
      '21596b82-4c52-4d1e-bcc7-5dc92607592d',
      'fakePoll',
      'fakePoll',
      true,
      '21596b82-4c52-4d1e-bcc7-5dc92607592d',
      ['option1', 'option2']
    );
    expect(useCase.validatePoll(fakePoll)).toBeUndefined();
  });

  it('should throw error if poll does\'t has an id', () => {
    const useCase = TestBed.inject(EditPollUseCase);
    const pollWithoutId = new Poll(
      '',
      'fakePoll',
      'fakePoll',
      true,
      '21596b82-4c52-4d1e-bcc7-5dc92607592d',
      ['option1', 'option2']
    );
    expect(() => useCase.validatePoll(pollWithoutId)).toThrow(new Error('Id is not valid, impossible to edit'));
  });
});
