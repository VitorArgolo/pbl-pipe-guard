import {ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-pesquisa',
  templateUrl: './barra-pesquisa.component.html',
  styleUrls: ['./barra-pesquisa.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarraPesquisaComponent {
  title="";
  constructor(private router: Router){

  }
  pesquisar(){
    if(this.title){
      this.router.navigate(["incidents"], {queryParams: {title: this.title}});
      return;
    }
    this.router.navigate(["incidents"]);
  }
}
