package com.example.employees.services;

import com.example.employees.models.Employee;

import java.util.List;

public interface IEmployeeService {
    List<Employee> getEmployees();

    Employee getEmployeeById(Long id);

    Employee saveEmployee(Employee employee);

    void deleteEmployee(Long id);

    Employee updateEmployee(Employee employee, Long id);
}
