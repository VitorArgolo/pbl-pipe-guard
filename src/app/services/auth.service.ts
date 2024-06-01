import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, timer, Subscription } from 'rxjs';
import { tap, debounce } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api-login-pptt.onrender.com';
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());
  authState$ = this.authState.asObservable();
  private inactivityTimer: Subscription | undefined;

  constructor(private http: HttpClient) {
    // Inicia o temporizador de inatividade
    this.initInactivityTimer();
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
        // Reinicia o temporizador de inatividade após o login bem-sucedido
        this.resetInactivityTimer();
      })
    );
  }

  register(username: string, password: string, name: string, phone: string): Observable<any> {
    const user = { username, password, name, phone };
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  logout(): Observable<any> {
    // Remove o token e os detalhes do usuário do armazenamento local
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Define o estado de autenticação como falso
    this.authState.next(false);
    // Retorna um observable vazio ou de uma operação assíncrona, se necessário
    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
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

  showWelcomeAlert(): void {
    Swal.fire({
      title: 'Seja bem-vindo!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  // Inicia o temporizador de inatividade
  private initInactivityTimer(): void {
    const inactivityDuration = 15 * 60 * 1000; // 15 minutos em milissegundos
    this.inactivityTimer = timer(inactivityDuration).pipe(
      debounce(() => timer(inactivityDuration))
    ).subscribe(() => {
      // Chama o método de logout após o tempo de inatividade
      this.logout().subscribe(() => {
        console.log('Sessão expirada, usuário desconectado.');
      });
    });
  }

  // Reinicia o temporizador de inatividade
  private resetInactivityTimer(): void {
    // Cancela a subscrição anterior do temporizador
    if (this.inactivityTimer !== undefined) {
      this.inactivityTimer.unsubscribe();
    }
    // Inicia o temporizador novamente
    this.initInactivityTimer();
  }
}
