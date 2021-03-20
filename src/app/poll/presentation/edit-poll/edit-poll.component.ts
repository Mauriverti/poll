import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditPollUseCase } from '../../domain/use-cases/edit-poll.use-case';
import { LoadPollUseCase } from '../../domain/use-cases/load-poll.use-case';

@Component({
  selector: 'edit-poll',
  styleUrls: ['./edit-poll.component.sass'],
  templateUrl: './edit-poll.component.html'
})
export class EditPollComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject<void>();

  editPoll: FormGroup;
  options: FormArray;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadPolls: LoadPollUseCase,
    private editPollUseCase: EditPollUseCase,
  ) {
    this.editPoll = new FormGroup({
      id: new FormControl(),
      createdBy: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      publicPoll: new FormControl(false),
      options: new FormArray([]),
    });

    this.options = this.editPoll.get('options') as FormArray;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const pollId = routeParams.get('id');

    if (pollId) {
      this.loadPolls.loadById(pollId).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: (poll) => {
          if (poll) {
            this.initiateOptions(poll.options?.length ?? 0);
            this.editPoll.setValue(poll);
          }
        }
      });
    } else {
      this.toList();
    }
  }

  private initiateOptions(length: number): void {
    for (let i = 0; i < length ; i++) {
      this.addOption();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  toList(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  savePoll(form: FormGroup): void {
    this.editPollUseCase.editPoll(form.value);
    this.toList();
  }

  addOption(): void {
    const options = this.editPoll.get('options') as FormArray;
    options.push(new FormControl(''));
  }

  removeOption(index: number): void {
    const options = this.editPoll.get('options') as FormArray;
    options.removeAt(index);
  }

}
