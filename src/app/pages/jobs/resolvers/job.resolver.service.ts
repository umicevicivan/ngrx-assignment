import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JobModel } from '../models';
import { JobsService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class JobResolver implements Resolve<JobModel> {

  constructor(private jobsService: JobsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobModel> {
    return this.jobsService.load(route.paramMap.get('id'));
  }
}
