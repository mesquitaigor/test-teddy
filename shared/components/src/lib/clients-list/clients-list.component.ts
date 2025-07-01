import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '@teddy/domains';

import { ClientCardComponent } from '../client-card/client-card.component';

@Component({
  selector: 'lib-clients-list',
  imports: [ClientCardComponent, CommonModule],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss',
})
export class ClientsListComponent {
  @Input({ required: true }) clients: Client[] = [];
  @Input() loading = false;
  @Output() reloadData = new EventEmitter<void>();
}
