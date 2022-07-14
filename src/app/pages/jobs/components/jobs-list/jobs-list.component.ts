import { Component, Input } from '@angular/core';
import { JobModel } from 'src/app/pages/jobs/models';
import { Store } from '@ngrx/store';
import { updateJob } from '../../actions/jobs-api.actions';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent {
  @Input() jobs: JobModel[];

  constructor(private store: Store) {
  }

  toggleJob(event, job: JobModel): void {
    event.stopPropagation();
    if (!job) {
      return;
    }
    const temp = {...job};
    temp.activated = !temp.activated;
    this.store.dispatch(updateJob(temp));
  }

}
