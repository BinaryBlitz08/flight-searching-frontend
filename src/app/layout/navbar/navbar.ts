import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit, OnDestroy {
  wallet: number = 0;  // ← Start with 0, load from storage

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadWallet();

    window.addEventListener('storage', this.loadWallet.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.loadWallet.bind(this));
  }

  loadWallet() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.wallet = user.wallet || 0;
    } else {
      this.wallet = 0;
    }
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}