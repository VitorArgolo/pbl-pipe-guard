
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

  async addIncidentById(incidentId: number): Promise<void> {
    try {
      const incident = await this.fetchIncidentById(incidentId);
      this.incidents.push(incident);
    } catch (error) {
      console.error('Erro ao adicionar incidente:', error);
      throw error; // Rejeite a Promise para que o erro seja tratado pela função chamadora
    }
  }

  private async fetchIncidentById(incidentId: number): Promise<IIncident> {
    // Simule uma chamada assíncrona à API para buscar os detalhes do incidente pelo ID
    return new Promise<IIncident>((resolve, reject) => {
      setTimeout(() => {
        const incident = this.incidents.find(incident => incident.id === incidentId);
        if (incident) {
          resolve(incident);
        } else {
          reject(new Error('Incidente não encontrado'));
        }
      }, 1000); // Simula um atraso de 1 segundo na chamada à API
    });
  }
}