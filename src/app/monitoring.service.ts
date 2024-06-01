// monitoring.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  private apiUrl = 'https://api-monitoramento-1.onrender.com/logs';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
