import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.css']
})
export class RequisicaoComponent {
  formRequisicao = this.fb.group({
    nome: ["", [
      Validators.minLength(4),
      Validators.required
    ]],
    assunto: ["", [
      Validators.minLength(10),
      Validators.required
    ]],
    telefone: ["",[
      Validators.minLength(11),
      Validators.required
    ]],
    email:["",[
      Validators.email,
      Validators.required
    ]],
    mensagem: ["", [
      Validators.minLength(20),
      Validators.required
    ]]
  });

  constructor(
  private fb: FormBuilder
){}
    enviarFormulario(){
      alert("Mensagem foi enviada com sucesso!");
      this.formRequisicao.reset();
    }
}
