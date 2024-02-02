import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObservableService {
  public miObservable$ = new Subject<Object>();

  emitirValor(valor: object) {
    this.miObservable$.next(valor);
  }
}