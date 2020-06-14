package com.example.employees.models;

import com.example.employees.DTO.RoleEnum;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "first_name", nullable = false)
    @NotBlank(message = "First name is required")
    @Size(min = 2, message = "Your first name should have at least 2 characters")
    private String firstName;

    @Column(name = "last_Name", nullable = false)
    @NotBlank(message = "Last Name is required")
    private String lastName;

    @Column(name = "email", unique = true)
    @NotBlank(message = "Email is required")
    @Email(message = "This is not valid email")
    private String email;

    //@Column(nullable=false)
//    @NotEmpty
//    @Size(min=6)
//    private String password;

    @Enumerated(EnumType.STRING)
    @Column(length = 10, columnDefinition = "varchar(10) default 'EMPLOYEE'")
    private RoleEnum role = RoleEnum.EMPLOYEE;

    @OneToMany(mappedBy = "employee")
    private Set<Timesheet> timesheets;
    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private EmployeeImage employeeImage;

    public Employee() {
    }

    public Employee(long id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public RoleEnum getRole() {
        return role;
    }

    public void setRole(RoleEnum role) {
        this.role = role;
    }

    public EmployeeImage getEmployeeImage() {
        return employeeImage;
    }

    public void setEmployeeImage(EmployeeImage employeeImage) {
        this.employeeImage = employeeImage;
    }
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

}
