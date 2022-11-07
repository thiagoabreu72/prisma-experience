export interface Convidado {
  buscaNome?: string;
  credencial?: string;
  dados?: {
    nome?: string;
    cargo?: string;
    empresa?: string;
    numemp?: number;
    tipcol?: number;
    numcad?: number;
  };
  msgRet?: string;
  erroExecucao?: any;
}
