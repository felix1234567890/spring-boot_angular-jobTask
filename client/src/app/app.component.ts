import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  actualTime: string;
  city: string;
  temperature: string;
  tempDescription: string;

  constructor(private http: HttpClient, public router: Router) {
    this.getCurrentTime();
  }

  ngOnInit(): void {
    if (!navigator.geolocation) {
      this.http
        .get<any>(
          `https://api.openweathermap.org/data/2.5/weather?q=Zagreb&units=metric&lang=hr&appid=${environment.apiKey}`
        )
        .subscribe(({ name, main, weather }) => {
          this.city = name;
          this.temperature = main.temp;
          this.tempDescription = weather[0].description;
        });
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.http
          .get<any>(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=hr&appid=${environment.apiKey}`
          )
          .subscribe(({ name, main, weather }) => {
            this.city = name;
            this.temperature = main.temp;
            this.tempDescription = weather[0].description;
          });
      });
    }
    setInterval(() => this.getCurrentTime(), 1000);
  }
  getCurrentTime(): void {
    let now: Date;
    let hours: number | string;
    let minutes: number | string;
    let seconds: number | string;
    now = new Date();
    hours = now.getHours();
    if (hours.toString().length === 1) {
      hours = `0${hours}`;
    }
    minutes = now.getMinutes();

    if (minutes.toString().length === 1) {
      minutes = `0${minutes}`;
    }
    seconds = now.getSeconds();
    if (seconds.toString().length === 1) {
      seconds = `0${seconds}`;
    }
    this.actualTime = `${hours}:${minutes}:${seconds}`;
  }
  createEmployee(): void {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role !== 'EMPLOYEE') {
        this.router.navigate(['createEmployee']);
      }
    }
  }
}
