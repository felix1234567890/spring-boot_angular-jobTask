package com.example.employees.models;

import com.example.employees.CustomJsonDateDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "timesheets")
public class Timesheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Temporal(TemporalType.DATE)
    private Date date;

    @Temporal(TemporalType.TIME)
    private Date timeArrived;

    @Temporal(TemporalType.TIME)
    private Date timeLeft;

    @Column()
    private String totalTime;

    @ManyToOne()
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    public Timesheet() {
    }

    public Timesheet(Date date, Date timeArrived, Date timeLeft,String totalTime, Employee employee) {
        this.date = date;
        this.timeArrived = timeArrived;
        this.timeLeft = timeLeft;
        this.totalTime = totalTime;
        this.employee = employee;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    @JsonDeserialize(using = CustomJsonDateDeserializer.class)
    public void setDate(Date date) {
        this.date = date;
    }

    public Date getTimeArrived() {
        return timeArrived;
    }

    @JsonDeserialize(using = CustomJsonDateDeserializer.class)
    public void setTimeArrived(Date timeArrived) {
        this.timeArrived = timeArrived;
    }

    public Date getTimeLeft() {
        return timeLeft;
    }

    @JsonDeserialize(using = CustomJsonDateDeserializer.class)
    public void setTimeLeft(Date timeLeft) {
        this.timeLeft = timeLeft;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(String totalTime) {
        this.totalTime = totalTime;
    }
}
