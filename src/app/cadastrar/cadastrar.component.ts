import { ServicesG5 } from './../services/services-g5.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
})
export class CadastrarComponent {
  @Output() carregarSpinner = new EventEmitter<any>();
  modal: FormGroup;

  constructor(private service: ServicesG5) {
    this.modal = new FormGroup({
      empresa: new FormControl(null, Validators.required),
      nome: new FormControl(null, Validators.required),
      cargo: new FormControl(null, Validators.required),
    });
  }

  obtemDados() {
    this.carregarSpinner.emit(true);
    let dados = {
      nomEmp: this.modal.value.empresa,
      nomPar: this.modal.value.nome,
      carPar: this.modal.value.cargo,
    };

    this.service.inserirConvidado(dados).subscribe((retorno) => {
      console.log(retorno);
      this.carregarSpinner.emit(false);
    });

    //console.log(dados);
  }
}
