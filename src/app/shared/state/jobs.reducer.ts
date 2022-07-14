import { createReducer, on } from '@ngrx/store';
import { JobModel } from '../../pages/jobs/models';
import { addJobSuccess, deleteJobSuccess, getJobsSuccess, updateJobSuccess } from '../../pages/jobs/actions/jobs-api.actions';

export const initialState: ReadonlyArray<JobModel> = [];

export const jobReducer = createReducer(
  initialState,
  on(getJobsSuccess, (state, {jobs}) => [...jobs]),
  on(addJobSuccess, (state, {job}) => [...state, job]),
  on(deleteJobSuccess, (state, {jobId}) =>
    state.filter((job) => job.id !== jobId)
  ),
  on(updateJobSuccess, (state, {job: job}) => {
    return state.map((j) => {
      if (j.id === job.id) {
        return job;
      }
      return j;
    });
  })
);


