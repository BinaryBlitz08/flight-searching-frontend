import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './flight-card.html',
  styleUrls: ['./flight-card.css']
})
export class FlightCard {
  @Input() flight!: any;
  @Output() booked = new EventEmitter<void>();

  constructor(private api: ApiService) {}

  bookFlight() {
    this.api.bookFlight(this.flight._id).subscribe({
      next: (res) => {
        const booking = res.booking || res;
        alert(`Booking Successful! 🎉\nPNR: ${booking.pnr}\nAmount Paid: ₹${booking.amountPaid}`);

        // Surge alert if price is higher than base
        if (booking.amountPaid > this.flight.basePrice) {
          alert('⚠️ High Demand! Surge pricing applied (+10%)');
        }

        // Refresh wallet in navbar
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (res.user) {
          user.wallet = res.user.wallet;
        } else {
          user.wallet -= booking.amountPaid;
        }
        localStorage.setItem('user', JSON.stringify(user));

        this.booked.emit();
      },
      error: (err) => {
        const msg = err.error?.message || 'Booking failed. Try again.';
        alert('❌ ' + msg);
      }
    });
  }
}