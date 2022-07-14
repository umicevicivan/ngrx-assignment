import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { JobsService } from '../services';
import {
  addJob,
  addJobSuccess,
  deleteJob,
  deleteJobSuccess,
  getJobs,
  getJobsSuccess,
  updateJob,
  updateJobSuccess
} from '../actions/jobs-api.actions';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JobsApiEffects {
  constructor(private jobsService: JobsService, private actions$: Actions, private router: Router) {
  }

  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getJobs),
      exhaustMap(() =>
        this.jobsService.all().pipe(
          map((jobs) => getJobsSuccess(jobs)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addJob),
      concatMap(({job}) =>
        this.jobsService.create(job).pipe(
          map((newJob) => {
            this.router.navigateByUrl('/jobs');
            return addJobSuccess(newJob);
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteJob),
      mergeMap(({jobId}) =>
        this.jobsService.delete(jobId).pipe(
          map(() => {
            this.router.navigateByUrl('/jobs');
            return deleteJobSuccess(jobId);
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateJob),
      concatMap(({job}) =>
        this.jobsService.update(job.id, job).pipe(
          map(() => {
            this.router.navigateByUrl('/jobs');
            return updateJobSuccess(job);
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
