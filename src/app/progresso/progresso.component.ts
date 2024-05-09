import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressoService } from '../progresso.service';
import { incidentsPromise, IIncidentsProgresso } from '../incidents';
incidentsPromise.then(incidents => {
  console.info("Incidentes preenchidos:", incidents);
});

@Component({
  selector: 'app-progresso',
  templateUrl: './progresso.component.html',
  styleUrls: ['./progresso.component.css']
})
export class ProgressoComponent implements OnInit{

  itensProgresso: IIncidentsProgresso[] = [];
  total = 0;

  constructor( 
    public progressoService: ProgressoService,
    private router: Router
  ){}

    calculaTotal(){
    this.total = this.itensProgresso.reduce((prev,curr) => prev + (curr.quantidade), 0);    
    }

  ngOnInit(): void{
    this.itensProgresso = this.progressoService.obtemProgresso();
    this.calculaTotal();
  }
  removerIncidentProgresso(incidentId: number){
    this.itensProgresso = this.itensProgresso.filter(item => item.id !== incidentId);
    this.progressoService.removerIncidentProgresso(incidentId);
  }
  resolver(){
    alert("Incident Resolvido com sucesso.");
    this.progressoService.limpaProgresso();
    this.router.navigate(["incidents"]);
  }
}
