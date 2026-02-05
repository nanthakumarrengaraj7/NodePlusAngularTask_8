import { Component } from '@angular/core';
import { AuthService } from '../../auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  name = '';
  email = '';
  password = '';
  role = 'user';
  message = '';
  error = '';


  constructor(private auth: AuthService, private router: Router) { }

  register() {

    if (!this.name || !this.email || !this.password) {
      this.error = 'All fields are required';
      return;
    }

    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.auth.register(payload).subscribe({
      next: (res) => {
        this.message = res.message; // "User Registered Successfully"
        this.error = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.error = err.error.message; // backend message
        this.message = '';
      }
    });
  }

}
