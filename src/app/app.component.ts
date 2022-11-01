import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  enviaValor: string;
  habilitaSpinner: boolean;

  // constructor(private service: ServicesG5) {}

  capturaValor(valor: string) {
    this.enviaValor = valor;

    console.log(`valor 2 :${valor}`);
  }

  capturaBooleano(valor: boolean) {
    this.habilitaSpinner = valor;
  }
}
