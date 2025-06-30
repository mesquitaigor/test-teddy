import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientFormService {
  readonly openState$ = new BehaviorSubject<boolean>(false);
  toggleOpen(): void {
    this.openState$.next(!this.openState$.value);
  }
}
