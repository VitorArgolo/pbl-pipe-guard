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
    this.setupMenuToggle();
  }
  

  setupMenuToggle(): void {
    const menuToggle = document.getElementById("menu-toggle");
    const navbarNav = document.getElementById("navbarNav");

    if (menuToggle) {
      menuToggle.addEventListener("click", function() {
        if (navbarNav) {
          if (navbarNav.classList.contains("show")) {
            navbarNav.classList.remove("show");
          } else {
            navbarNav.classList.add("show");
          }
        }
      });
    }
  }
}
