import { ServicesG5 } from './../services/services-g5.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
})
export class CadastrarComponent {
  modal: FormGroup;

  constructor(private service: ServicesG5) {
    this.modal = new FormGroup({
      empresa: new FormControl(null, Validators.required),
      nome: new FormControl(null, Validators.required),
      cargo: new FormControl(null, Validators.required),
    });
  }

  obtemDados() {
    let dados = {
      empresa: this.modal.value.empresa,
      nome: this.modal.value.nome,
      cargo: this.modal.value.cargo,
    };

    console.log(dados);
  }
}
