
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {
  createIncident,
  deleteIncident,
  fillIncidents,
  IIncident,
  listIncidents,
  updateIncident,
  loginAndGetToken
} from '../incidents';
 
@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.css']
})
export class SensoresComponent implements OnInit {
  incidents: IIncident[] = [];
  error: string | null = null;
  newIncidentData: Partial<IIncident> = {};
  updatedIncidentData: Partial<IIncident> = {};
  editingIncident: IIncident | null = null;
  constructor() { }

  async ngOnInit() {
    try {
      this.incidents = await fillIncidents();
    } catch (error) {
      this.error = 'Erro ao carregar os incidentes.';
    }
  }

  async createNewIncident(incidentData: Partial<IIncident>) {
    try {
      const token = await loginAndGetToken();
      const newIncident = await createIncident(token, incidentData);
      this.incidents.push(newIncident);
    } catch (error) {
      this.error = 'Erro ao criar incidente.';
    }
  }

  async updateExistingIncident(incidentId: number, incidentData: Partial<IIncident>) {
    try {
      const token = await loginAndGetToken();
      const updatedIncident = await updateIncident(token, incidentId, incidentData);
      const index = this.incidents.findIndex(incident => incident.id === incidentId);
      if (index !== -1) {
        this.incidents[index] = updatedIncident;
        this.editingIncident = null; // Definir editingIncident como null para ocultar o formulário de edição
      }
    } catch (error) {
      this.error = 'Erro ao atualizar incidente.';
    }
  }

  async deleteExistingIncident(incidentId: number) {
    try {
      const token = await loginAndGetToken();
      await deleteIncident(token, incidentId);
      this.incidents = this.incidents.filter(incident => incident.id !== incidentId);
    } catch (error) {
      this.error = 'Erro ao deletar incidente.';
    }
  }

  toggleEdit(incident: IIncident) {
    this.editingIncident = this.editingIncident === incident ? null : incident;
    this.updatedIncidentData = this.editingIncident ? { ...incident } : {};
  }
}
