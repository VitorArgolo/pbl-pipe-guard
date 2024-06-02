import { Component, OnInit } from '@angular/core';
import { MonitoringService } from '../monitoring.service';

@Component({
  selector: 'app-monitoring-list',
  templateUrl: './monitoring-list.component.html',
  styleUrls: ['./monitoring-list.component.css']
})
export class MonitoringListComponent implements OnInit {
  logs: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;


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

}
