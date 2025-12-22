import { Component } from '@angular/core';
import { BookingHistory } from '../../components/booking-history/booking-history';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [BookingHistory],
  template: '<app-booking-history></app-booking-history>',
  styles: []
})
export class History {}