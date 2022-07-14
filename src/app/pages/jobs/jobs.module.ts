import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { JobComponent } from './job/job.component';
import { ListComponent } from './list/list.component';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { ProductTypePipe } from './pipes/product-type.pipe';
import { LanguageLevelPipe } from './pipes/language-level.pipe';
import { JobsApiEffects } from './effects/jobs.effect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobResolver } from './resolvers/job.resolver.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ListComponent},
      {path: 'create', component: JobComponent},
      {path: ':id', component: JobComponent, resolve: {job: JobResolver}},
    ]),
    EffectsModule.forFeature([JobsApiEffects]),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    JobsListComponent,
    ListComponent,
    JobComponent,
    ProductTypePipe,
    LanguageLevelPipe

  ]
})
export class JobsModule {
}
