package com.example.employees.repositories;

import com.example.employees.models.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TimeSheetRepository extends JpaRepository<Timesheet, Long> {
    @Query("select timesheet from Timesheet timesheet where timesheet.date between :x and :y")
    public List<Timesheet> getTimesheetsByDate(@Param("x") Date dateStart, @Param("y") Date dateEnd);

    @Query("FROM Timesheet timesheet where timesheet.employee.id = :employeeId")
    List<Timesheet> findAllByUser(@Param("employeeId") Long employeeId);
}
