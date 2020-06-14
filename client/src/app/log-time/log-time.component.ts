import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-time',
  templateUrl: './log-time.component.html',
  styleUrls: ['./log-time.component.css'],
})
export class LogTimeComponent {
  @ViewChild('picker') picker: any;
  @ViewChild('picker2') picker2: any;
  form: FormGroup;
  employeeId: string;
  public maxDate: any = moment().endOf('day').format();
  public min = moment().startOf('month').format();

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.form = new FormGroup({
      timeArrived: new FormControl(null, Validators.required),
      timeLeft: new FormControl(null, Validators.required),
    });
  }
  logData(): void {
    if (!this.form.valid) {
      return;
    }
    this.form.patchValue({
      timeArrived: moment(this.form.value.timeArrived).format(),
      timeLeft: moment(this.form.value.timeLeft).format(),
    });
    this.http
      .post(`http://localhost:8080/timesheets/${this.employeeId}`, {
        ...this.form.value,
        date: this.form.value.timeArrived,
      })
      .subscribe((data) => {
        this.form.reset();
        Object.keys(this.form.controls).forEach((key) => {
          this.form.controls[key].setErrors(null);
        });
        this.router.navigate([`timesheets/${this.employeeId}`]);
      });
  }
  setMaxDate(event): void {
    this.maxDate = moment(event.target.value).endOf('day').toDate();
  }
  goBack(): void {
    this.router.navigate(['employees']);
  }
}
