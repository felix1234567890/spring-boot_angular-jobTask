import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormGroupDirective,
  FormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../employee-list/employee-list.component';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  createEmployeeForm: FormGroup;
  employee: Employee;
  id: string;
  loading = false;
  @ViewChild('formDirective') formGroupDirective: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.createEmployeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: new FormControl(false),
    });
  }

  get f() {
    return this.createEmployeeForm.controls;
  }

  ngOnInit(): void {
    if (this.id) {
      this.http
        .get<Employee>(`http://localhost:8080/employees/${this.id}`)
        .subscribe((data) => {
          this.employee = data;
          this.createEmployeeForm.patchValue({
            firstName: this.employee.firstName,
            lastName: this.employee.lastName,
            email: this.employee.email,
            role: this.employee.role === 'ADMIN' ? true : false,
          });
        });
    }
  }
  onSubmit(): void {
    if (this.createEmployeeForm.invalid) {
      return;
    }
    if (typeof this.createEmployeeForm.value.role === 'boolean') {
      this.createEmployeeForm.value.role = this.createEmployeeForm.value.role
        ? 'ADMIN'
        : 'EMPLOYEE';
    }

    this.loading = true;
    if (this.id) {
      this.http
        .put(
          `http://localhost:8080/employees/${this.id}`,
          this.createEmployeeForm.value
        )
        .subscribe((_) => {
          this.router.navigate(['employees']);
        });
      return;
    }
    this.http
      .post('http://localhost:8080/employees', this.createEmployeeForm.value)
      .subscribe((data) => {
        if (localStorage.getItem('user')) {
          localStorage.removeItem('user');
        }
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['employees']);
        this.loading = false;
        // setTimeout(() => this.formGroupDirective.resetForm(), 0);
      });
  }
  setRole(event) {
    const role = event.checked ? 'ADMIN' : 'EMPLOYEE';
    this.createEmployeeForm.value.role = role;
  }
}
