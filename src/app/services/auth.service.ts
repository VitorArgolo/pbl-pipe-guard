import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api-login-pptt.onrender.com';
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());
  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.authState.next(true);
      })
    );
  }

  register(username: string, password: string, name: string, phone: string): Observable<any> {
    const user = { username, password, name, phone };
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authState.next(false);
  }

  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable(observer => {
        observer.error('No token found');
      });
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/me`, { headers }).pipe(
      tap((user: any) => {
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }
}
