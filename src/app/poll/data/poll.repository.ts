import { Observable } from 'rxjs';
import { Poll } from '../domain/models/poll';

export abstract class PollRepository {
  abstract save(poll: Poll): Observable<Poll>;
}
