import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Client, ClientsService } from '@teddy/domains';
import { CommonModule } from '@angular/common';

import { TeddyButtonComponent } from '../teddy-button/teddy-button.component';
import { ClientModalService } from '../client-form/client-modal.service';

@Component({
  selector: 'lib-client-card',
  imports: [TeddyButtonComponent, CommonModule],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss',
})
export class ClientCardComponent {
  @Input({ required: true }) client!: Client;
  @Input() showActions = true;
  @Output() reloadData = new EventEmitter<void>();
  private readonly clientModalService = inject(ClientModalService);
  private readonly clientsService = inject(ClientsService);
  handleEditClient(): void {
    this.openClientModal('edit');
  }
  handleDeleteClient(): void {
    this.openClientModal('delete');
  }
  openClientModal(action: 'delete' | 'edit') {
    this.clientModalService.open({
      data: this.client,
      action,
      onClose: () => {
        this.reloadData.emit();
      },
    });
  }
  handleTest() {
    this.clientsService.changeClientSelection(this.client);
  }
}
