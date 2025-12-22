import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    MatProgressSpinnerModule
  ],
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class History implements OnInit {
  bookings: any[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.loading = true;
    this.api.getBookingHistory().subscribe({
      next: (res) => {
        this.bookings = res.bookings || [];
        this.loading = false;
      },
      error: (err) => {
        alert('Failed to load history: ' + err.error?.message);
        this.loading = false;
      }
    });
  }

  downloadTicket(pdfUrl: string) {
    const fullUrl = 'http://localhost:5000' + pdfUrl;
    window.open(fullUrl, '_blank');
  }
}