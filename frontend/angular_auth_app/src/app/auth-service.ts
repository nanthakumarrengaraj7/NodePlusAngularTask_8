import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface registerResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:8000/api/auth';

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post<any>(`${this.api}/login`, data);
  }

  register(data: any): Observable<registerResponse> {
    return this.http.post<registerResponse>(`${this.api}/register`, data);
  }

  saveToken(res: any) {
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('role', res.role);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  logout() {
    localStorage.clear();
  }
}
