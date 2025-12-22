import { Component } from '@angular/core';
import { SearchForm } from '../../components/search-form/search-form';
import { FlightCard } from '../../components/flight-card/flight-card';
import { CommonModule } from '@angular/common';

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

  onFlightsFound(flights: any[]) {
    this.flights = flights;
  }
}