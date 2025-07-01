import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SelectedClientsComponent } from '../selected-clients.component/selected-clients.component';

@Component({
  imports: [CommonModule, SelectedClientsComponent],
  selector: 'app-selected-clients-entry',
  template: `<app-selected-clients></app-selected-clients>`,
})
export class RemoteEntry {}
