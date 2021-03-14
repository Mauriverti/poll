import { Observable } from 'rxjs';
import { Poll } from '../domain/models/poll';
import { Vote } from '../domain/models/vote';

export abstract class PollRepository {
  abstract save(poll: Poll): Observable<Poll>;
  abstract list(): Observable<Poll[]>;
  abstract delete(poll: Poll): Observable<void>;
  abstract edit(poll: Poll): Observable<Poll>;
  abstract loadById(id: string): Observable<Poll | undefined>;
  abstract saveVotes(vote: Vote): Observable<Vote>;
}
