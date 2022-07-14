import { createAction } from '@ngrx/store';
import { JobModel } from '../models';

export const getJobs = createAction('[Jobs API] Get Jobs');
export const getJobsSuccess = createAction(
  '[Jobs API] Get Jobs success',
  (jobs: ReadonlyArray<JobModel>) => ({jobs}));

export const addJob = createAction(
  '[Jobs API] Add job',
  (job: JobModel) => ({job})
);

export const addJobSuccess = createAction(
  '[Jobs API] Add job success',
  (job: JobModel) => ({job})
);

export const deleteJob = createAction(
  '[Jobs API] Delete job',
  (jobId: string) => ({jobId})
);

export const deleteJobSuccess = createAction(
  '[Jobs API] Delete job success',
  (jobId: string) => ({jobId})
);

export const updateJob = createAction(
  '[Jobs API] Update job',
  (job: JobModel) => ({job})
);

export const updateJobSuccess = createAction(
  '[Jobs API] Update job success',
  (job: JobModel) => ({job})
);
