import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { VotePollListItemComponent } from './vote-poll-list-item.component';

describe('VotePollListItemComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
      ],
      declarations: [
        VotePollListItemComponent
      ],
    }).compileComponents();
  });

  it('should create VotePollListItemComponent', () => {
    const fixture = TestBed.createComponent(VotePollListItemComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
