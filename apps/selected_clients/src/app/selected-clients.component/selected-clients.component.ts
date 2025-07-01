import { ClientsListComponent, TeddyButtonComponent } from '@teddy/components';
import { Component, inject } from '@angular/core';
import { ClientsService } from '@teddy/domains';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-selected-clients',
  imports: [ClientsListComponent, CommonModule, TeddyButtonComponent],
  templateUrl: './selected-clients.component.html',
  styleUrl: './selected-clients.component.scss',
})
export class SelectedClientsComponent {
  private readonly clientsService = inject(ClientsService);
  private readonly router = inject(Router);
  readonly selectedClients$ = this.clientsService.selectedClients$;
  handleCleanClients(){
    this.clientsService.resetSelection();
    this.router.navigate(['/clients']);

  }
}
