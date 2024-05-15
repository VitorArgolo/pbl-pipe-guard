import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressoService } from '../progresso.service';
import { updateIncident, loginAndGetToken, IIncidentsProgresso } from '../incidents'; // Importando a função updateIncident

@Component({
  selector: 'app-progresso',
  templateUrl: './progresso.component.html',
  styleUrls: ['./progresso.component.css']
})
export class ProgressoComponent implements OnInit {

  itensProgresso: IIncidentsProgresso[] = [];
  total = 0;
  error: string | null = null;

  constructor(
    public progressoService: ProgressoService,
    private router: Router
  ) { }

  calculaTotal() {
    this.total = this.itensProgresso.reduce((prev, curr) => prev + (curr.quantidade), 0);
  }

  async ngOnInit() {
    this.itensProgresso = await this.progressoService.obtemProgresso();
    this.calculaTotal();
  }

  async resolverVazamento(incidentId: number) {
    try {
      const token = await loginAndGetToken();
      const incidentToUpdate = this.itensProgresso.find(incident => incident.id === incidentId);
      if (!incidentToUpdate) {
        throw new Error('Incidente não encontrado.');
      }
      await updateIncident(token, incidentId, { title: incidentToUpdate.title , description: "Incidente Resolvido", leak: false, severity: "Sem Ocorrência" });
      alert("Vazamento resolvido com sucesso.");
      this.itensProgresso = await this.progressoService.obtemProgresso();
      this.calculaTotal();


     this.router.navigate(["incidents"]);

    } catch (error: any) {
      this.error = 'Erro ao resolver vazamento: ' + error.message;
    }
}
  resolver() {
    alert("Incidente Resolvido com sucesso.");
    this.progressoService.limpaProgresso();
    this.router.navigate(["incidents"]);
  }
  removerIncidentProgresso(incidentId: number) {
    this.itensProgresso = this.itensProgresso.filter(item => item.id !== incidentId);
    this.progressoService.removerIncidentProgresso(incidentId);
  }
}
