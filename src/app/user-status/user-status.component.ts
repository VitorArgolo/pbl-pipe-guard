import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {
  user: any;
 
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      user => {
        // Verifica se há um espaço no nome
        const spaceIndex = user.name.indexOf(' ');
        // Se houver um espaço, obtém apenas o primeiro nome
        if (spaceIndex !== -1) {
          user.firstName = user.name.substring(0, spaceIndex);
        } else {
          // Se não houver espaço, usa o nome completo
          user.firstName = user.name;
        }
        this.user = user;
        console.log('Detalhes do usuário:', this.user);
      },
      error => {
        console.error('Erro ao obter detalhes do usuário:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
