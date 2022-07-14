import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { jobsSelector, State, } from '../../../shared/state';
import { getJobs } from '../actions/jobs-api.actions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  jobs$ = this.store.select(jobsSelector);
  form: FormGroup;

  constructor(private store: Store<State>, fb: FormBuilder) {
    this.form = fb.group({
      sortBy: fb.control('ALL'),
      productType: fb.control('ALL'),
    });
    this.jobs$ = this.form.valueChanges.pipe(
      startWith({sortBy: 'ALL', productType: 'ALL'}),
      switchMap(formValues => {
        return this.store.select(jobsSelector).pipe(
          map(jobs => {
            if (jobs && jobs.length > 0) {
              return jobs.filter(job => {
                if (formValues.sortBy === 'ALL' && formValues.productType === 'ALL') {
                  return job;
                }
                if (formValues.sortBy !== 'ALL' && formValues.productType === 'ALL') {
                  return formValues.sortBy === 'ACTIVATED' ? job.activated : !job.activated && job;
                }

                if (formValues.sortBy === 'ALL' && formValues.productType !== 'ALL') {
                  return +formValues.productType === job.productType && job;
                }

                if (formValues.sortBy !== 'ALL' && formValues.productType !== 'ALL') {
                  const act = formValues.sortBy === 'ACTIVATED';
                  const pt = +formValues.productType;
                  return job.activated === act && job.productType === pt && job;
                }
              });
            }
          }));
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(getJobs());
  }
}
