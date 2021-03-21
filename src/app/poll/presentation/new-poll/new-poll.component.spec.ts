import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterTestingModule } from '@angular/router/testing';
import { Poll } from '../../domain/models/poll';
import { AddPollUseCase } from '../../domain/use-cases/add-poll.use-case';
import { NewPollComponent } from './new-poll.component';

class FakeAddPollUseCase {
  addPoll(poll: Poll): void { }

  private prepareEntity(poll: Poll): Poll {
    return poll;
  }
}

describe('PollComponent', () => {
  let component: NewPollComponent;
  let fixture: ComponentFixture<NewPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSlideToggleModule,
      ],
      providers: [
        { provide: AddPollUseCase, useClass: FakeAddPollUseCase },
      ],
      declarations: [
        NewPollComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPollComponent);
    component = fixture.componentInstance;
  });

  it('should create NewPollComponent', () => {
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
});
