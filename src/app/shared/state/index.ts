import { JobModel } from '../../pages/jobs/models';

export interface State {
  jobs: ReadonlyArray<JobModel>;
}

/**
 * Jobs Selectors
 */
export const jobsSelector = (state: State) => state.jobs;
