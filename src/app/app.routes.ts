import { RouterModule, Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Home } from './pages/home/home';
import { History } from './pages/history/history';
import { authGuard } from './guards/auth-guard';
import { Register } from './auth/register/register';
export const routes: Routes = [
  { path: 'login', component: Login },
    { path: 'register', component: Register },

  { path: '', component: Home, canActivate: [authGuard] },
  { path: 'history', component: History, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },

];


