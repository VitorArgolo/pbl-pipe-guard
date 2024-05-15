
import { Injectable } from '@angular/core';
import { IIncident, fillIncidents } from './incidents';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Cache-Control': 'no-cache'
  })
};
@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  incidents: IIncident[] = []; // Inicializando como uma array vazia

  constructor() {
    fillIncidents().then(incidents => { // Esperando pela resolução da Promise
      this.incidents = incidents; // Atribuindo os incidentes preenchidos
    }).catch(error => {
      console.error('Erro ao preencher incidentes:', error);
    });
  }

  getAll(){
    return this.incidents;
  }

  getOne(incidentId: number){
    return this.incidents.find(incident => incident.id === incidentId)
  }  

  
}
