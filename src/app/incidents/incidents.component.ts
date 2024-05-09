import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IIncident, fillIncidents } from '../incidents'; // Removendo incidentsPromise daqui
import { IncidentsService } from '../incidents.service';
import { Pipe, PipeTransform } from '@angular/core';
import { incidentsPromise, IIncidentsProgresso } from '../incidents';
incidentsPromise.then(incidents =>incidents);

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})

export class IncidentsComponent implements OnInit {
  incidents: IIncident[] = []; // Inicializando como uma array vazia

  constructor(
    private incidentsService: IncidentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    fillIncidents().then(incidents => { // Esperando pela resolução da Promise
      this.incidents = incidents; // Atribuindo os incidentes preenchidos
    }).catch(error => {
      console.error('Erro ao preencher incidentes:', error);
    });

    this.route.queryParamMap.subscribe(params => {
      const title = params.get("title")?.toLowerCase();

      if (title) {
        this.incidents = this.incidents.filter(incident => incident.title.toLowerCase().includes(title));
        return; 
      }
      this.incidents = this.incidentsService.getAll(); 
    });
  }
  getHeaderColor(severity: string): string {
    switch (severity) {
        case 'Baixo':
            return '#3e6b36'; 
        case 'Médio':
            return '#d9a602'; 
        case 'Alto':
            return '#ff8c00'; 
        case 'Crítico':
            return '#ff3333'; 
        default:
            return '#1b4f7f'; 
    }
}

getTextColor(severity: string): string {
    return '#fff'; // Branco por padrão
}

getBorderColor(severity: string): string {
    return this.getHeaderColor(severity);
}
}
