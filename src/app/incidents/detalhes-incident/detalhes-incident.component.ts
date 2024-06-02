import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgressoService } from 'src/app/progresso.service';
import { NotificacaoService } from 'src/app/notificacao.service';
import { IIncident, IIncidentsProgresso } from 'src/app/incidents'; 
import { IncidentsService } from 'src/app/incidents.service';
import { AuthService } from '../../services/auth.service';
import { updateIncident, loginAndGetToken } from 'src/app/incidents';

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
    private progressoService: ProgressoService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const incidentId = Number(routeParams.get("id"));
    this.incident = this.incidentsService.getOne(incidentId);
  }

  adicionarProgresso() {
    if (!this.incident) {
      return;
    }
  
    // Obtém o usuário logado do AuthService
    this.authService.getUserDetails().subscribe(user => {
      if (user) {
        const incidentProgresso: IIncidentsProgresso = {
          ...this.incident,
          quantidade: this.quantidade,
          IdResolvedor: user.id, // Usa o ID do usuário logado
          NomeResolvedor: user.name // Usa o nome do usuário logado
        };
  
        // Obtém o token de autenticação
        loginAndGetToken().then(token => {
          // Atualiza o incidente na API com os novos dados e o token
          this.updateIncident(token, this.incident.id, incidentProgresso);
        }).catch(error => {
          console.error('Erro ao obter token de autenticação:', error);
        });
      }
    });

    const incidentProgresso: IIncidentsProgresso = {
      ...this.incident, // Corrigido para usar spread operator corretamente
      quantidade: this.quantidade
    };
    
    this.progressoService.adicionarProgresso(incidentProgresso);
  }
  
  // Função para atualizar o incidente na API
  updateIncident(token: string, incidentId: number, incidentProgresso: IIncidentsProgresso) {
    updateIncident(token, incidentId, incidentProgresso).then(updatedIncident => {
      console.log('Incidente atualizado com sucesso:', updatedIncident);
      // Atualiza o incidente localmente
      this.incident = updatedIncident;
    }).catch(error => {
      console.error('Erro ao atualizar incidente:', error);
    });
  }
  


 
}
