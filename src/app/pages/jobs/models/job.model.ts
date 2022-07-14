import { LanguageModel } from './language.model';

export interface JobModel {
  id: string;
  ref: string;
  title: string;
  description: string;
  skills?: string[];
  languages: LanguageModel[];
  productType: number;
  activated: boolean;
}

export type JobRequiredProps = Pick<JobModel, 'ref' | 'title' | 'description' | 'productType' | 'languages' | 'activated'>;


