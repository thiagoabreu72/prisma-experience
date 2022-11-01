import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-selecao',
  templateUrl: './selecao.component.html',
  styleUrls: ['./selecao.component.scss'],
})
export class SelecaoComponent {
  @Output() valorInput = new EventEmitter<string>();
  @Input() habilitaSpinner: boolean = false;
  private valorAnterior = '';

  capturaValor(valor: string) {
    //console.log(valor);

    this.valorInput.emit(valor);
    /*if (valor >= 1 && valor !== this.valorAnterior) this.habilitaSpinner = true;
    else if (valor === this.valorAnterior)
      alert('Não houve alteração de número de cadastro.');
    else alert('Campo Número de Cadastro sem registro.');*/
    this.valorAnterior = valor;
    console.log(valor);
  }
}
