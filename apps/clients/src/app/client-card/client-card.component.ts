import { TeddyButtonComponent } from '@teddy/components';
import { Component, inject, Input } from '@angular/core';
import { ClientFormService } from '@teddy/components';
import { CommonModule } from '@angular/common';

import { TeddyButtonComponent } from '../teddy-button/teddy-button.component';
import { ClientsService } from '../services/clients.service';
import Client from '../models/Client';

@Component({
  selector: 'app-client-card',
  imports: [TeddyButtonComponent, CommonModule],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss',
})
export class ClientCardComponent {
  @Input({ required: true }) client!: Client;
  private readonly clientsService = inject(ClientsService);
  private readonly clientFormService = inject(ClientFormService);
  handleEditClient(): void {
    this.clientFormService.open({
      data: this.client,
      onClose: () => {
        this.clientsService.load().subscribe();
      },
    });
  }
}
