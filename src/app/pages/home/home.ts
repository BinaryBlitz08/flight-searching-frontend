import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchForm } from '../../components/search-form/search-form';
import { FlightCard } from '../../components/flight-card/flight-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchForm,
    FlightCard
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  flights: any[] = [];
  wallet: number = 50000; // Default

  constructor() {
    this.loadWallet();
    window.addEventListener('storage', () => this.loadWallet());
  }

  loadWallet() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.wallet = user.wallet || 50000;
    }
  }

  onFlightsFound(flights: any[]) {
    this.flights = flights || [];
  }
}