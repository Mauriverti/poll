import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Poll } from 'src/app/poll/domain/models/poll';
import { DeletePollUseCase } from 'src/app/poll/domain/use-cases/delete-poll.use-case';
import { ListPollsUseCase } from 'src/app/poll/domain/use-cases/list-polls.use-case';
import { PollCraetedListItemComponent } from '../poll-created-list-item/poll-created-list-item.component';
import { PollCreatedListComponent } from './poll-created-list.component';

class FakeListPollsUseCase {

  private readonly fakePoll = new Poll(
    '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    'fakePoll',
    'fakePoll',
    true,
    '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    ['option1', 'option2']
  );

  listUserPolls(): Observable<Poll[]> {
    return of([this.fakePoll]);
  }

  list(): Observable<Poll[]> {
    return of([this.fakePoll]);
  }
}

class FakeDeletePollUseCase {
  delete(poll: Poll): void { }
}

describe('PollCreatedListComponent', () => {

  let component: PollCreatedListComponent;
  let fixture: ComponentFixture<PollCreatedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
      ],
      providers: [
        { provide: ListPollsUseCase, useClass: FakeListPollsUseCase },
        { provide: DeletePollUseCase, useClass: FakeDeletePollUseCase },
      ],
      declarations: [
        PollCreatedListComponent,
        PollCraetedListItemComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollCreatedListComponent);
    component = fixture.componentInstance;
  });

  it('should create PollCreatedListComponent', () => {
    expect(component).toBeTruthy();
  });
});
