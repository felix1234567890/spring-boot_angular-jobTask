import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { endOfDay, startOfMonth } from 'date-fns';

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
  public maxDate: any = endOfDay(new Date())
  public min = startOfMonth(new Date())

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
      timeArrived: new Date(this.form.value.timeArrived),
      timeLeft: new Date(this.form.value.timeLeft)
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
    this.maxDate = endOfDay(event.target.value)
  }
  goBack(): void {
    this.router.navigate(['employees']);
  }
}
