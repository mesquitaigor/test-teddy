import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '@teddy/domains';

import { ClientCardComponent } from '../client-card/client-card.component';

@Component({
  selector: 'lib-clients-list',
  imports: [CommonModule, ClientCardComponent],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss',
})
export class ClientsListComponent {
  @Input() clients: Client[] = [];
  @Input() loading = false;
  @Output() reloadData = new EventEmitter<void>();
  handleReloadData(): void {
    this.reloadData.emit();
  }
}
