import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, timer, Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { tap, catchError, debounce } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api-login-pptt.onrender.com';
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());
  authState$ = this.authState.asObservable();
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  private inactivityTimer: Subscription | undefined;

  constructor(private http: HttpClient, private router: Router) {
    this.initInactivityTimer();
    this.loadUserDetails();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.authState.next(true);
        this.showWelcomeAlert();
        this.resetInactivityTimer();
        this.loadUserDetails();
        this.router.navigate(['/incidents']);
      }),
      catchError(error => {
        // Sinaliza que houve um erro de login
        localStorage.setItem('loginError', 'true');
        this.router.navigate(['/login']);
        return throwError(error);
      })
    );
  }

  register(username: string, password: string, name: string, phone: string): Observable<any> {
    const user = { username, password, name, phone };
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authState.next(false);
    this.userSubject.next(null);
    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  getUserDetails(): Observable<any> {
    return this.user$;
  }

  private loadUserDetails(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.userSubject.next(null);
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(`${this.apiUrl}/me`, { headers }).pipe(
      tap((user: any) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      })
    ).subscribe(
      user => this.userSubject.next(user),
      error => this.userSubject.next(null)
    );
  }

  showWelcomeAlert(): void {
    Swal.fire({
      title: 'Seja bem-vindo!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  showErrorAlert(title: string, text: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  private initInactivityTimer(): void {
    const inactivityDuration = 15 * 60 * 1000;
    this.inactivityTimer = timer(inactivityDuration).pipe(
      debounce(() => timer(inactivityDuration))
    ).subscribe(() => {
      this.logout().subscribe(() => {
        console.log('Sessão expirada, usuário desconectado.');
      });
    });
  }

  private resetInactivityTimer(): void {
    if (this.inactivityTimer !== undefined) {
      this.inactivityTimer.unsubscribe();
    }
    this.initInactivityTimer();
  }
}
