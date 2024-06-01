import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneMaskDirective } from './phone-mask.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[ -~]{8,20}$/
      )]],
      name: ['', Validators.required],
      phone: ['', Validators.required] 
    });
  }

  register(): void {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      this.signupForm.markAllAsTouched();
      return;
    }

    const { email, password, name, phone } = this.signupForm.value;

    this.authService.register(email, password, name, phone).subscribe(response => {
      console.log('Registro bem-sucedido:', response);

      Swal.fire({
        title: 'Registro bem-sucedido!',
        text: 'Você foi registrado com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }, error => {
      console.error('Erro de registro:', error);
      this.errorMessage = error.error.message || 'Ocorreu um erro durante o registro.';
      Swal.fire({
        title: 'Erro de registro',
        text: this.errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get name() {
    return this.signupForm.get('name');
  }

  get phone() {
    return this.signupForm.get('phone');
  }
}
