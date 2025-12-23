import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  name = '';
  email = '';
  password = '';
  error = '';
  success = '';
  loading = false;

  constructor(private api: ApiService, private router: Router) {}

  onRegister() {
    this.error = '';
    this.success = '';
    this.loading = true;

    // Trim inputs and validate
    const trimmedName = this.name.trim();
    const trimmedEmail = this.email.trim().toLowerCase();
    const trimmedPassword = this.password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      this.error = 'All fields are required';
      this.loading = false;
      return;
    }

    if (trimmedPassword.length < 6) {
      this.error = 'Password must be at least 6 characters';
      this.loading = false;
      return;
    }

    // Call backend register endpoint
    this.api.register(trimmedName, trimmedEmail, trimmedPassword).subscribe({
      next: (res) => {
        this.success = 'Registration successful! Redirecting to login...';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Registration failed. Email may already exist.';
        this.loading = false;
      }
    });
  }
}