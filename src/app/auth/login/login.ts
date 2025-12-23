import { Component } from '@angular/core';
import { ApiService } from '../../services/api';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [FormsModule,MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,CommonModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  onLogin() {
    this.error = '';
    this.api.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user || { wallet: 50000 }));
        window.location.href = '/';
      
      },
     
      error: (err) => {
        this.error = err.error.message || 'Invalid email or password';
      }
    });
  }
}
