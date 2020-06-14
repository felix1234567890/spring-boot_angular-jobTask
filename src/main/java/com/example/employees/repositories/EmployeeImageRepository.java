package com.example.employees.repositories;

import com.example.employees.models.EmployeeImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeImageRepository extends JpaRepository<EmployeeImage,Long> {
    @Query("FROM EmployeeImage empImage where empImage.employee.id = :employeeId")
    EmployeeImage findByUser(@Param("employeeId") Long employeeId);
}
