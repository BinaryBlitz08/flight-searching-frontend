import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './booking-history.html',
  styleUrls: ['./booking-history.css']
})
export class BookingHistory implements OnInit {
  bookings: any[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.loading = true;
    this.api.getBookingHistory().subscribe({
      next: (res) => {
        this.bookings = res.bookings || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Load history error:', err);
        alert('Failed to load booking history');
        this.loading = false;
      }
    });
  }

  downloadTicket(pdfUrl: string): void {
    if (!pdfUrl) {
      alert('PDF URL not available');
      return;
    }
    const fullUrl = 'http://localhost:5000' + pdfUrl; 
    window.open(fullUrl, '_blank');
  }
}