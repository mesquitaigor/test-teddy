import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TeddyButtonComponent } from '@teddy/components';
import { ClientModalService } from '@teddy/components';
import { ClientsService } from '@teddy/domains';
import { CommonModule } from '@angular/common';
import { Client } from '@teddy/domains';

@Component({
  selector: 'app-client-card',
  imports: [TeddyButtonComponent, CommonModule],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss',
})
export class ClientCardComponent {
  @Input({ required: true }) client!: Client;
  @Output() reloadData = new EventEmitter<void>();
  private readonly clientsService = inject(ClientsService);
  private readonly clientFormService = inject(ClientModalService);
  handleEditClient(): void {
    this.openClientModal('edit');
  }
  handleDeleteClient(): void {
    this.openClientModal('delete');
  }
  openClientModal(action: 'delete' | 'edit') {
    this.clientFormService.open({
      data: this.client,
      action,
      onClose: () => {
        this.reloadData.emit();
      },
    });
  }
}
