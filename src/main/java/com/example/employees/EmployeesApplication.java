package com.example.employees;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@EnableConfigurationProperties({
		FileStorageProperties.class
})
public class EmployeesApplication  {

	public static void main(String[] args) {
		SpringApplication.run(EmployeesApplication.class, args);
	}
}
