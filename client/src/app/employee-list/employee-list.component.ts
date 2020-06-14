import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  role: 'ADMIN' | 'EMPLOYEE';
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  constructor(private http: HttpClient, public router: Router) {}
  employees: Array<Employee>;
  dataSource: MatTableDataSource<Employee>;
  public readonly displayedColumns: string[] = [
    'profilePicture',
    'firstName',
    'lastName',
    'email',
    'actions',
  ];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.getTableData();
  }
  deleteEmployee(id: number) {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'ADMIN') {
        if (user.id === id) {
          localStorage.removeItem('user');
        }
        this.http
          .delete(`http://localhost:8080/employees/${id}`)
          .subscribe((_) => {
            this.getTableData();
            return;
          });
      }
      if (user.id === id && user.role === 'EMPLOYEE') {
        localStorage.removeItem('user');
        this.http
          .delete(`http://localhost:8080/employees/${id}`)
          .subscribe((_) => {
            this.getTableData();
            return;
          });
      }
    }
  }
  getTableData() {
    this.http
      .get<Employee[]>('http://localhost:8080/employees')
      .subscribe((data) => {
        this.employees = data;

        this.employees.forEach((employee) => {
          this.http
            .get(`http://localhost:8080/employeeImage/${employee.id}`)
            .subscribe((res: any) => {
              if (res) {
                employee.profilePicture = res.fileUrl;
              }
            });
        });

        this.dataSource = new MatTableDataSource<Employee>(this.employees);
        this.dataSource.sort = this.sort;
      });
  }
  updateEmployee(employee: Employee) {
    this.router.navigate([`updateEmployee/${employee.id}`]);
  }
  changeProfilePicture(id: number, event) {
    const uploadImage = new FormData();
    const selectedFile = event.target.files[0];
    uploadImage.append('imageFile', selectedFile);

    this.http
      .post<any>(
        `http://localhost:8080/employeeImage/uploadFile/${id}`,
        uploadImage
      )
      .subscribe((_) => {
        this.getTableData();
      });
  }
  goToTimesheets(id) {
    this.router.navigate([`/timesheets/${id}`]);
  }
  goToLog(id) {
    this.router.navigate([`/logTime/${id}`]);
  }
}
