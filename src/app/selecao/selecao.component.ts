import { Resultados } from './../interfaces/resultado';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Convidado } from '../interfaces/convidado';
import { ServicesG5 } from '../services/services-g5.service';

@Component({
  selector: 'app-selecao',
  templateUrl: './selecao.component.html',
  styleUrls: ['./selecao.component.scss'],
})
export class SelecaoComponent {
  @Output() carregarSpinner = new EventEmitter<any>();
  habilitaSpinner: boolean = false;
  convidado: Convidado;
  resultado: Resultados;
  modal: FormGroup;

  constructor(private service: ServicesG5) {
    this.modal = new FormGroup({
      busca: new FormControl(null, Validators.required),
      selecao: new FormControl(null),
    });
  }

  capturaValor() {
    this.carregarSpinner.emit(true);
    let valor = { buscaNome: this.modal.value.busca, credencial: 'N' };
    console.log(valor);
    this.service.consultaConvidados(valor).subscribe((retorno) => {
      this.resultado = retorno.dados;
      console.log(this.resultado);
      this.carregarSpinner.emit(false);
      this.limparCampos();
    });
  }

  limparCampos() {
    this.modal.patchValue({ busca: '', selecao: '' });
  }
}
