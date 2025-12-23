import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
  
  ],
  templateUrl: './search-form.html',
  styleUrls: ['./search-form.css']
})
export class SearchForm {
  @Output() flightsFound = new EventEmitter<any[]>();

  from = 'Delhi';
  to = 'Mumbai';
  date = '2025-01-10';

  constructor(private api: ApiService) {}

 loading = false;

search() {
  this.loading = true;
  console.log('Searching for:', this.from, this.to, this.date);

  this.api.searchFlights(this.from, this.to, this.date).subscribe({
    next: (res) => {
      console.log('API response:', res); 
      this.flightsFound.emit(res.flights || res || []);
      this.loading = false;
    },
    error: (err) => {
      console.error('Search error:', err);
      alert('No flights found or server error');
      this.flightsFound.emit([]); 
      this.loading = false;
    }
  });
}
}