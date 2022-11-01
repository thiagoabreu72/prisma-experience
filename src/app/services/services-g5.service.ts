import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesG5 {
  private urlSenior = environment.urlSenior;
  private portasSenior = ['ConsultaConvidado'];
  private contexto: string = 'SXI-API';
  private modulo: string = 'ronda';
  private urlConsulta: string;
  private token = null;
  private tokenColaborador = null;
  private urlAuth: string =
    environment.urlPlatform + '/authentication/actions/login';

  private capturaAcao = new Subject<string>(); // Criação do canal de comunicação.
  acao$ = this.capturaAcao.asObservable(); // instanciando o Observable para mudanças no valor

  //gerouToken: boolean = true;
  /*private capturaToken = new Subject<string>(); // Criação do canal de comunicação.
  gerouToken$ = this.capturaToken.asObservable();
  private capturaAcao = new Subject<string>(); // Criação do canal de comunicação.
  acao$ = this.capturaAcao.asObservable(); // instanciando o Observable para mudanças no valor*/

  constructor(private http: HttpClient) {
    //Inicializa o token da propriedade corrente.
    this.urlConsulta = this.converteUrl(this.urlSenior, this.portasSenior[0]);
    console.log(this.urlConsulta);
    this.gerarToken({
      username: environment.username,
      password: environment.password,
      escopo: 'string',
    }).subscribe((retorno) => {
      let token = retorno.jsonToken.split(',');
      token = token[5].split('\\"');
      token = token[0].split('"');
      token = token[3].replaceAll('"', '');
      this.token = `bearer ${token}`;
      //console.log(this.token);
    });
  }

  // converte a url de Soap/WSDL para REST
  converteUrl(url, porta) {
    let novaUrl = url.split('/');
    let servico = novaUrl[4]
      .replace(`${this.modulo}_Sync`, '')
      .replace(`?wsdl`, '');
    novaUrl = `${novaUrl[0]}//${novaUrl[2]}/${this.contexto}/G5Rest?server=${novaUrl[0]}//${novaUrl[2]}&module=${this.modulo}&service=${servico}&port=${porta}`;
    return novaUrl;
  }

  // Logar no Senior X
  gerarToken(dados: Object): Observable<any> {
    //console.log('dados')
    this.tokenColaborador = dados;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.urlAuth, dados, { headers });
  }

  consultaConvidados(dados: object): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token,
    });
    return this.http.post<any>(this.urlConsulta, dados, { headers });
  }
}
