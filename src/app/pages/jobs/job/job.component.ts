import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addJob, deleteJob, getJobs, updateJob } from '../actions/jobs-api.actions';
import { ActivatedRoute } from '@angular/router';
import { JobModel } from '../models';
import { Subscription } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { jobsSelector } from '../../../shared/state';
import { Language } from '../models/language.model';

@Component({
  selector: 'app-create',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy {

  private referenceExistsSub$: Subscription;

  job: JobModel;
  form: FormGroup;
  languages: FormArray | null = null;

  get languageControls(): any[] {
    return (this.form.get('languages') as any).controls;
  }

  constructor(private store: Store, private fb: FormBuilder, private route: ActivatedRoute) {
    this.form = fb.group({
      title: fb.control(null, Validators.required),
      description: fb.control(null, Validators.required),
      ref: fb.control(null, Validators.required),
      productType: fb.control(1, Validators.required),
      activated: fb.control(false, Validators.required),
      languages: fb.array([]),
      skills: fb.control(null),
    });
    this.referenceExistsSub$ = this.form.get('ref').valueChanges.pipe(
      debounceTime(400),
      switchMap(reference => {
        return this.store.select(jobsSelector).pipe(map(jobs => {
          return jobs.map(job => job.ref).includes(reference);
        }));
      })).subscribe(data => {
      if (!data || (this.job && this.job.ref === this.form.get('ref').value)) {
        return;
      }
      this.form.get('ref').setErrors({referenceExists: data});
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.job = data.job;
    });
    if (this.job) {
      this.form.patchValue(this.job);
      if (this.job.skills) {
        this.form.get('skills').setValue(this.job.skills.join(','));
      }
      if (this.job.languages && this.job.languages.length > 0) {
        this.form.setControl('languages', this.fb.array(this.job.languages.map(language => this.createLanguage(language))));
      }
    }
    this.store.dispatch(getJobs());
  }

  ngOnDestroy(): void {
    this.referenceExistsSub$.unsubscribe();
  }

  isRequired(field: string): boolean {
    const control = this.form.get(field);
    if (!control.validator) {
      return false;
    }
    const validator = control.validator({} as AbstractControl);
    return (validator && validator.required);
  }

  save(): void {
    if (!this.form.valid) {
      return;
    }
    const values = this.form.getRawValue();
    if (values.skills) {
      values.skills = values.skills.split(',');
    }
    values.productType = +values.productType;
    if (this.job && this.job.id) {
      values.id = this.job.id;
      this.store.dispatch(updateJob(values));
    } else {
      this.store.dispatch(addJob(values));
    }
  }

  delete(job: JobModel): void {
    this.store.dispatch(deleteJob(job.id));
  }

  removeLanguageItem(index: number): void {
    this.languages = this.form.get('languages') as FormArray;
    this.languages.removeAt(index);
  }

  addLanguage(): void {
    this.languages = this.form.get('languages') as FormArray;
    this.languages.push(this.createLanguage());
  }

  private createLanguage(language: Language = new Language()): FormGroup {
    return this.fb.group({
      name: this.fb.control(language?.name || null, Validators.required),
      level: this.fb.control(language?.level || 1),
    });
  }
}
