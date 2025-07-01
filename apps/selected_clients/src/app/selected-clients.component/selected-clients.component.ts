import { ClientsListComponent } from '@teddy/components';
import { Component, inject } from '@angular/core';
import { ClientsService } from '@teddy/domains';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selected-clients',
  imports: [ClientsListComponent, CommonModule],
  templateUrl: './selected-clients.component.html',
  styleUrl: './selected-clients.component.scss',
})
export class SelectedClientsComponent {
  private readonly clientsService = inject(ClientsService);
  readonly selectedClients$ = this.clientsService.selectedClients$;
  handleLoadClient() {
    alert('oi');
  }
}
