import { Injectable } from '@angular/core';
import { IIncidentsProgresso } from './incidents';

@Injectable({
  providedIn: 'root'
})
export class ProgressoService {
  itens: IIncidentsProgresso[] = [];

  constructor() { }

   obtemProgresso(){
     this.itens = JSON.parse(localStorage.getItem("progresso")|| "[]");
     return this.itens;
   }

   adicionarProgresso(incident: IIncidentsProgresso){
     this.itens.push(incident);
     localStorage.setItem("progresso", JSON.stringify(this.itens));
   }

  limpaProgresso(){
    this.itens = [];
    localStorage.clear();
  }

   removerIncidentProgresso(incidentId: number){
     this.itens = this.itens.filter(item => item.id !== incidentId);
     localStorage.setItem("progresso", JSON.stringify(this.itens));
   }
}
