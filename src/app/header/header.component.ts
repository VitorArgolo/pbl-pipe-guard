import { Component } from '@angular/core';
import { ProgressoService } from '../progresso.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    public progressoService: ProgressoService
  ){}
  ngOnInit(): void{
  }
}
