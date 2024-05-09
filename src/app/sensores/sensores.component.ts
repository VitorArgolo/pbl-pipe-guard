import { Component } from '@angular/core';

interface Sensor {
  id: number;
  localizacao: string;
  deteccao: string;
}

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.css']
})
export class SensoresComponent {
  sensores: Sensor[] = [
    { id: 1, localizacao: 'Bloco A, Piso 1', deteccao: 'ligado' },
    { id: 2, localizacao: 'Bloco A, Piso 2', deteccao: 'desligado' }
  ];

  novoSensor: Partial<Sensor> = {};

  formularioVisivel = false;
  edicao = false;
  sensorSelecionado: Sensor | null = null;

  mostrarFormulario(edicao = false, sensor: Sensor | null = null) {
    this.edicao = edicao;
    this.sensorSelecionado = sensor;
    this.formularioVisivel = true;
    if (sensor) {
      this.novoSensor = { ...sensor };
    } else {
      this.novoSensor = {
        localizacao: '',
        deteccao: ''
      };
    }
  }

  cancelar() {
    this.formularioVisivel = false;
    this.novoSensor = {
      localizacao: '',
      deteccao: ''
    };
  }

  salvarSensor() {
    if (this.edicao && this.sensorSelecionado) {
      const index = this.sensores.findIndex(s => s.id === this.sensorSelecionado!.id);
      if (index !== -1) {
        this.sensores[index] = { ...this.novoSensor } as Sensor;
      }
    } else {
      this.sensores.push({
        id: this.sensores.length + 1,
        localizacao: this.novoSensor.localizacao!,
        deteccao: this.novoSensor.deteccao!
      } as Sensor);
    }
    this.cancelar();
  }

  excluirSensor(sensor: Sensor) {
    const index = this.sensores.findIndex(s => s.id === sensor.id);
    if (index !== -1) {
      this.sensores.splice(index, 1);
    }
  }
}
