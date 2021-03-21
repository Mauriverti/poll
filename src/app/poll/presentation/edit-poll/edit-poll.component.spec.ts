import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';
import { Poll } from '../../domain/models/poll';
import { EditPollUseCase } from '../../domain/use-cases/edit-poll.use-case';
import { LoadPollUseCase } from '../../domain/use-cases/load-poll.use-case';
import { EditPollComponent } from './edit-poll.component';

class FakeEditPollUseCase {
  editPoll(poll: Poll): void { }
}

class FakeLoadPollUseCase {
  private readonly fakePoll = new Poll(
    '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    'fakePoll',
    'fakePoll',
    true,
    '21596b82-4c52-4d1e-bcc7-5dc92607592d',
    ['option1', 'option2']
  );

  loadById(id: string): Observable<Poll | undefined> {
    return of(this.fakePoll);
  }
}

describe('EditPollComponent', () => {
  let component: EditPollComponent;
  let fixture: ComponentFixture<EditPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSlideToggleModule,
      ],
      providers: [
        { provide: LoadPollUseCase, useClass: FakeLoadPollUseCase },
        { provide: EditPollUseCase, useClass: FakeEditPollUseCase },
      ],
      declarations: [
        EditPollComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPollComponent);
    component = fixture.componentInstance;
  });

  it('should create EditPollComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should increase options by one calling addOption() and decrease by one calling removeOption()', () => {
    const lenght = component.options.controls.length;
    component.addOption();
    const lenghtPlus1 = component.options.controls.length;
    expect(lenght + 1).toEqual(lenghtPlus1);

    component.removeOption(0);
    const lenghtPlus1Minus1 = component.options.controls.length;
    expect(lenght).toEqual(lenghtPlus1Minus1);
  });

  it('should add options by loaded poll', () => {
    const optionsLenght = 4;
    component.initiateOptions(optionsLenght);
    expect(component.options.length).toEqual(optionsLenght);
  });
});
