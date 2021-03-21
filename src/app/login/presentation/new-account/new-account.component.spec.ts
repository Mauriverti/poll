import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { User } from '../../domain/models/user';
import { NewAccountComponent } from './new-account.component';
import { NewAccountUseCase } from '../../domain/use-cases/new-account.use-case';

class FakeNewAccountUseCase {
  createAccount(user: User): Observable<any> {
    return of({});
  }
}

describe('NewAccountComponent', () => {
  let component: NewAccountComponent;
  let fixture: ComponentFixture<NewAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [
        { provide: NewAccountUseCase, useClass: FakeNewAccountUseCase }
      ],
      declarations: [
        NewAccountComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccountComponent);
    component = fixture.componentInstance;
  });

  it('should create NewAccountComponent', () => {
    expect(component).toBeTruthy();
  });
});
