// status-servidor-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusServidorApiService {
  private apiUrl = 'https://api-incidents-1.onrender.com';

  constructor(private http: HttpClient) { }

  login(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiUrl}/login`, { username: 'admim', password: 'admim' }, { headers })
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }

  getServerInfo(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/server-info`, { headers })
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }
}
