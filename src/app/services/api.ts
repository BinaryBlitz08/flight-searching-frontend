import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api'; 

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password });
  }

  searchFlights(from: string, to: string, date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/flights/search?from=${from}&to=${to}&date=${date}`, { headers: this.getHeaders() });
  }

  bookFlight(flightId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/bookings/book`, { flightId }, { headers: this.getHeaders() });
  }

  getBookingHistory(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bookings/history`, { headers: this.getHeaders() });
  }
}