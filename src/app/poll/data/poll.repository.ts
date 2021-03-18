import { Observable } from 'rxjs';
import { Poll } from '../domain/models/poll';

export abstract class PollRepository {
  abstract loadById(id: string): Observable<Poll | undefined>;
}
