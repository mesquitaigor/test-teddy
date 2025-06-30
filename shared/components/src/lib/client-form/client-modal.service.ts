import { Injectable } from '@angular/core';
import { Client } from '@teddy/domains';
import { BehaviorSubject } from 'rxjs';

type modalAction = 'create' | 'edit' | 'delete';

@Injectable({ providedIn: 'root' })
export class ClientModalService {
  readonly openState$ = new BehaviorSubject<{
    stt: boolean;
    action?: modalAction;
    data?: Client;
    onClose?: () => void;
  }>({
    stt: false,
  });
  open(data?: {
    data?: Client;
    onClose?: () => void;
    action?: modalAction;
  }): void {
    if (data && !data.action) {
      data.action = 'create';
    }
    this.openState$.next({
      ...data,
      stt: !this.openState$.value.stt,
    });
  }
  close(): void {
    this.openState$.next({ stt: false });
  }
}
