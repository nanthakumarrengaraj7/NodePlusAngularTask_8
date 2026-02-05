import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth-guard';
import { UserDashboard } from './pages/user-dashboard/user-dashboard';
import { Register } from './pages/register/register';

export const routes: Routes = [
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    {
        path: '', redirectTo: 'register', pathMatch: 'full'
    },
    {
        path: 'admin',
        component: AdminDashboard,
        canActivate: [authGuard],
        data: { role: 'admin' }
    },
    {
        path: 'user',
        component: UserDashboard,
        canActivate: [authGuard],
        data: { role: 'user' }
    },
    // wildCard Route:

    {
        path: '**',
        redirectTo: 'register'
    }
];
