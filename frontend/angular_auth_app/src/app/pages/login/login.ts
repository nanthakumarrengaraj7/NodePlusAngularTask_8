import { Component } from '@angular/core';
import { AuthService } from '../../auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }
  login() {
    this.auth.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          this.auth.saveToken(res);

          if (res.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user']);
          }
        },
        error: () => {
          this.error = 'Invalid Email or Password';
        }
      });
  }
}

