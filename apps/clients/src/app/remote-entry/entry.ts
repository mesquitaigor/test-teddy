import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ClientsPage } from '../clients-page/clients-page';

@Component({
  imports: [CommonModule, ClientsPage],
  selector: 'app-clients-entry',
  template: `<app-clients-page></app-clients-page>`,
})
export class RemoteEntry {}
