import { Convidado } from './../interfaces/convidado';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { ServicesG5 } from '../services/services-g5.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnChanges {
  @Input() valorRecebido: string = '';
  @Output() valorBooleano = new EventEmitter<boolean>();
  habilitaSpinner = false;
  dadosReq: object = {};
  dadosConvidados: Convidado;

  constructor(private service: ServicesG5) {}

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes);
    if (
      changes.valorRecebido.currentValue != '' &&
      changes.valorRecebido.currentValue != undefined
    ) {
      //console.log('entrou aqui');
      //this.habilitaSpinner = true;
      this.buscaConvidado();
    }
  }

  async buscaConvidado() {
    this.dadosReq = { buscaNome: 'hia' };
    //this.habilitaSpinner = true;
    //this.valorBooleano.emit(true);
    console.log('chegou aqui');

    await this.service
      .consultaConvidados(this.dadosReq)
      .subscribe((retorno) => {
        this.dadosConvidados = retorno.dados;
        console.log(this.dadosConvidados);
      });
  }
}
