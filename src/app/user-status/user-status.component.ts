import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(
      user => {
        this.user = user;
        console.log('Detalhes do usuário:', this.user);
      },
      error => {
        console.error('Erro ao obter detalhes do usuário:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
    window.location.reload();
  }
}
