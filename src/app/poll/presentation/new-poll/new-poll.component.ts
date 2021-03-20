import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Poll } from '../../domain/models/poll';
import { AddPollUseCase } from '../../domain/use-cases/add-poll.use-case';
import { PollRoutes } from '../routing/poll-routes';

@Component({
  selector: 'new-poll',
  styleUrls: ['./new-poll.component.sass'],
  templateUrl: './new-poll.component.html'
})
export class NewPollComponent {

  newPoll: FormGroup;
  options: FormArray;

  constructor(
    private createPoll: AddPollUseCase,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.newPoll = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      publicPoll: new FormControl(false),
      options: new FormArray([new FormControl('')]),
    });

    this.options = this.newPoll.get('options') as FormArray;
  }

  addPoll(poll: FormGroup): void {
    this.createPoll.addPoll(poll.value as Poll);
    this.toList();
  }

  addOption(): void {
    const options = this.newPoll.get('options') as FormArray;
    options.push(new FormControl(''));
  }

  removeOption(index: number): void {
    const options = this.newPoll.get('options') as FormArray;
    options.removeAt(index);
  }

  toList(): void {
    this.router.navigate([`../${PollRoutes.LIST}`], { relativeTo: this.route });
  }
}
