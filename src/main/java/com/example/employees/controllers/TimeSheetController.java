package com.example.employees.controllers;

import com.example.employees.DTO.Dates;
import com.example.employees.models.Employee;
import com.example.employees.models.Timesheet;
import com.example.employees.repositories.EmployeeRepository;
import com.example.employees.repositories.TimeSheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping(path = "/timesheets")
public class TimeSheetController {
    @Autowired
    TimeSheetRepository timeSheetRepository;
    @Autowired
    EmployeeRepository employeeRepository;

    @PostMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public void createTimeSheet(@RequestBody Timesheet timeSheetData, @PathVariable("id") Long id) throws IOException {
        Employee employee = employeeRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Employee with that ID doesn't exist"));
        long duration = timeSheetData.getTimeLeft().getTime() - timeSheetData.getTimeArrived().getTime();
        long hours = TimeUnit.MILLISECONDS.toHours(duration);
        long minutes = TimeUnit.MILLISECONDS.toMinutes(duration) % 60;
        String  totalTime =  String.format("%02d:%02d",hours,minutes);
        Timesheet timesheet = new Timesheet(timeSheetData.getDate(), timeSheetData.getTimeArrived(),timeSheetData.getTimeLeft(),totalTime, employee);
        timeSheetRepository.save(timesheet);
    }
    @PostMapping("/filter")
    public List<Timesheet> getTimesheets(@RequestBody Dates dates){
        return timeSheetRepository.getTimesheetsByDate(dates.getDateStarted(),dates.getDateEnded());
    }
    @GetMapping(value = "/{id}")
    public List<Timesheet> findTimesheetsById(@PathVariable("id") Long id){
        return timeSheetRepository.findAllByUser(id);
    }
}
