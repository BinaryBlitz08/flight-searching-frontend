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
    MatButtonModule,
    
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
      const booking = res.booking;
      alert(`Booking Successful! 🎉\nPNR: ${booking.pnr}\nPaid: ₹${booking.amountPaid}`);

      if (booking.amountPaid > this.flight.basePrice) {
        alert('⚠️ Surge Price Applied (+10%)');
      }

      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (res.user && res.user.wallet !== undefined) {
        user.wallet = res.user.wallet;
      } else {
        user.wallet -= booking.amountPaid;
      }
      localStorage.setItem('user', JSON.stringify(user));

      window.dispatchEvent(new Event('storage'));

      this.booked.emit();
    },
    error: (err) => {
      alert('Booking failed: ' + (err.error?.message || 'Try again'));
    }
  });
}
}