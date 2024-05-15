import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgressoService } from 'src/app/progresso.service';
import { NotificacaoService } from 'src/app/notificacao.service';
import { IIncident, IIncidentsProgresso } from 'src/app/incidents'; // Removido incidentsPromise e incidentsPromise.then(incidents => incidents)
import { IncidentsService } from 'src/app/incidents.service';

@Component({
  selector: 'app-detalhes-incident',
  templateUrl: './detalhes-incident.component.html',
  styleUrls: ['./detalhes-incident.component.css']
})
export class DetalhesIncidentComponent implements OnInit {
  incident: IIncident | any;
  quantidade = 1;

  constructor(
    private incidentsService: IncidentsService,
    private route: ActivatedRoute,
    private progressoService: ProgressoService
  ){}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const incidentId = Number(routeParams.get("id"));
    this.incident = this.incidentsService.getOne(incidentId);
  }

  adicionarProgresso(){
    if (!this.incident) {
      // Verifica se incident é undefined antes de prosseguir
      return;
    }

    const incidentProgresso: IIncidentsProgresso = {
      ...this.incident, // Corrigido para usar spread operator corretamente
      quantidade: this.quantidade
    };
    
    this.progressoService.adicionarProgresso(incidentProgresso);
  }
}
