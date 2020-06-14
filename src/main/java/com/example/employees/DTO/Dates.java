package com.example.employees.DTO;

import com.example.employees.CustomJsonDateDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.Date;

public class Dates {
    private Date dateStarted;
    private Date dateEnded;

    public Date getDateStarted() {
        return dateStarted;
    }
    @JsonDeserialize(using = CustomJsonDateDeserializer.class)
    public void setDateStarted(Date dateStarted) {
        this.dateStarted = dateStarted;
    }

    public Date getDateEnded() {
        return dateEnded;
    }
    @JsonDeserialize(using = CustomJsonDateDeserializer.class)
    public void setDateEnded(Date dateEnded) {
        this.dateEnded = dateEnded;
    }
}
