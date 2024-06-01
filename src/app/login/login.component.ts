import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''; // Defina a propriedade 'email' e inicialize-a com uma string vazia
  password: string = ''; // Defina a propriedade 'password' e inicialize-a com uma string vazia
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe(response => {
      console.log('Login bem-sucedido:', response);
      // Redirecionar para a página principal após o login bem-sucedido
      this.router.navigate(['/incidents']); // ou para outra rota se necessário
      this.authService.showWelcomeAlert();
    }, error => {
      console.error('Erro de login:', error);
      this.errorMessage = error.error.message || 'Ocorreu um erro durante o login.';
      window.location.reload();
    });
  }
}
