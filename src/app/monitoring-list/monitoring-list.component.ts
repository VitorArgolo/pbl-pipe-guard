// monitoring-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MonitoringService } from '../monitoring.service';

@Component({
  selector: 'app-monitoring-list',
  templateUrl: './monitoring-list.component.html',
  styleUrls: ['./monitoring-list.component.css']
})
export class MonitoringListComponent implements OnInit {
  logs: any[] = [];

  constructor(private monitoringService: MonitoringService) { }

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.monitoringService.getLogs().subscribe(
      logs => {
        this.logs = logs;
      },
      error => {
        console.error('Error fetching logs:', error);
      }
    );
  }
  getLogClass(method: string): string {
    
    switch (method) {
      case 'GET':
        return 'get-log';
      case 'POST':
        return 'post-log';
      case 'PUT':
        return 'put-log';
      case 'DELETE':
        return 'delete-log';
      default:
        return '';
    }
  }
  getHttpMethod(message: string): string {
    const regex = /(GET|POST|PUT|DELETE)/i; // Expressão regular para encontrar o método HTTP
    const match = message.match(regex);
    return match ? match[0].toUpperCase() : ''; // Retorna o método encontrado em maiúsculas ou uma string vazia se não for encontrado
  }
  
}
