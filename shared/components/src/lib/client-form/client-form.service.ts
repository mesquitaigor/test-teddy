import Client from 'apps/clients/src/app/models/Client';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientFormService {
  readonly openState$ = new BehaviorSubject<{
    stt: boolean;
    data?: Client;
    onClose?: () => void;
  }>({
    stt: false,
  });
  open(data?: { data?: Client; onClose?: () => void }): void {
    this.openState$.next({
      ...data,
      stt: !this.openState$.value.stt,
    });
  }
  close(): void {
    this.openState$.next({ stt: false });
  }
}
