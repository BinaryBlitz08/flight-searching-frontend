import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,CommonModule,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   isLoggedIn = false;
  protected readonly title = signal('flight-booking-frontend');
   ngOnInit() {
    this.checkLoginStatus();
  
    window.addEventListener('storage', this.checkLoginStatus.bind(this));
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; 
  }
}
