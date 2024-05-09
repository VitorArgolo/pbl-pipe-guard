// status-servidor-api.component.ts
import { Component, OnInit } from '@angular/core';
import { StatusServidorApiService } from '../status-servidor-api.service';

@Component({
  selector: 'app-status-servidor-api',
  templateUrl: './status-servidor-api.component.html',
  styleUrls: ['./status-servidor-api.component.css']
})
export class StatusServidorApiComponent implements OnInit {
  token: string ='';
  serverInfo: any;

  constructor(private statusServidorApiService: StatusServidorApiService) { }

  ngOnInit(): void {
    this.login();
    setInterval(() => {
      this.getServerInfo();
    }, 5000); // Atualiza os dados a cada 5 segundos
  }

  login(): void {
    this.statusServidorApiService.login()
      .subscribe(
        (response: any) => {
          this.token = response.token;
          this.getServerInfo();
        },
        (error: any) => {
          console.error('Erro ao fazer login:', error);
        }
      );
  }

  getServerInfo(): void {
    this.statusServidorApiService.getServerInfo(this.token)
      .subscribe(
        (response: any) => {
          this.serverInfo = response;
        },
        (error: any) => {
          console.error('Erro ao obter informações do servidor:', error);
        }
      );
  }

  formatUptime(uptime: number): string {
    const days = Math.floor(uptime / (3600 * 24));
    const hours = Math.floor((uptime % (3600 * 24)) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  formatMemory(memory: number): string {
    const gb = memory / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  }

  formatLoadAverage(loadAverage: number[]): string {
    return loadAverage.map(load => load.toFixed(2)).join(', ');
  }

  formatTime(time: number): string {
    const hours = Math.floor(time / (3600 * 1000));
    const minutes = Math.floor((time % (3600 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }
}
