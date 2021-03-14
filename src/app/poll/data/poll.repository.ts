import { Observable } from 'rxjs';
import { Poll } from '../domain/models/poll';

export abstract class PollRepository {
  abstract save(poll: Poll): Observable<Poll>;
  abstract list(): Observable<Poll[]>;
  abstract delete(poll: Poll): Observable<void>;
  abstract edit(poll: Poll): Observable<Poll>;
  abstract loadById(id: string): Observable<Poll | undefined>;
}
