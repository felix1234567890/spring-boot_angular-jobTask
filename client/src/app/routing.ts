import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { LogTimeComponent } from './log-time/log-time.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'createEmployee',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
  },
  {
    path: 'createEmployee',
    component: CreateEmployeeComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'updateEmployee/:id',
    component: CreateEmployeeComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'timesheets/:id',
    component: TimesheetComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'logTime/:id',
    component: LogTimeComponent,
    canActivate: [RouteGuardService],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
