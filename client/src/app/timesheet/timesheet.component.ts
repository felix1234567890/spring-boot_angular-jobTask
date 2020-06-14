import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

interface TimeSheet {
  id: number;
  date: string;
  timeArrived: string;
  timeLeft: string;
  totalTime: string;
}

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
})
export class TimesheetComponent implements OnInit {
  timeSheetData: Array<TimeSheet>;
  public maxDate: any = moment().endOf('day').format();
  public min = moment().startOf('month').format();
  public hideTime = true;
  public readonly displayedColumns: string[] = [
    'date',
    'timeArrived',
    'timeLeft',
    'totalTime',
  ];
  dataSource: MatTableDataSource<TimeSheet>;
  filter = false;
  filtered = false;
  filterForm: FormGroup;
  employeeId: string;

  @ViewChild('formDirective') formGroupDirective: FormGroupDirective;
  @ViewChild('filter1') filter1: any;
  @ViewChild('filter2') filter2: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.filterForm = new FormGroup({
      filterStart: new FormControl(null, Validators.required),
      filterEnd: new FormControl(null, Validators.required),
    });
  }

  setMaxDate(event): void {
    this.maxDate = moment(event.target.value).endOf('day').toDate();
  }
  ngOnInit(): void {
    this.getTimeSheetData();
  }
  getTimeSheetData(): void {
    this.http
      .get<TimeSheet[]>(`http://localhost:8080/timesheets/${this.employeeId}`)
      .subscribe((data) => {
        this.timeSheetData = data;
        this.timeSheetData.sort((a, b) => {
          return new Date(a.date).valueOf() - new Date(b.date).valueOf();
        });
        this.dataSource = new MatTableDataSource<TimeSheet>(this.timeSheetData);
      });
  }
  filterTimesheets(): void {
    if (!this.filterForm.valid) {
      return;
    }
    this.filtered = true;
    this.filterForm.patchValue({
      filterStart: moment(this.filterForm.value.filterStart)
        .startOf('day')
        .format(),
      filterEnd: moment(this.filterForm.value.filterEnd).endOf('day').format(),
    });
    const filteredData = this.timeSheetData.filter((timesheet) => {
      if (
        new Date(timesheet.date).getTime() >=
          new Date(this.filterForm.value.filterStart).getTime() &&
        new Date(timesheet.date).getTime() <=
          new Date(this.filterForm.value.filterEnd).getTime()
      ) {
        return true;
      }
      return false;
    });
    this.dataSource.data = filteredData;
    setTimeout(() => this.formGroupDirective.resetForm(), 0);
  }
  clearFilter(): void {
    this.dataSource.data = this.timeSheetData;
    this.filter = false;
  }
  goBack(): void {
    this.router.navigate(['employees']);
  }
}
