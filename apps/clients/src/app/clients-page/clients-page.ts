import { ClientFormService, TeddyButtonComponent } from '@teddy/components';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientCardComponent } from '../client-card/client-card.component';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-clients-page',
  imports: [CommonModule, ClientCardComponent, TeddyButtonComponent],
  templateUrl: './clients-page.html',
  styleUrl: './clients-page.scss',
})
export class ClientsPage implements OnInit {
  private readonly clientsService = inject(ClientsService);
  private readonly clientFormService = inject(ClientFormService);
  clients$ = this.clientsService.clients$;
  loading = false;
  ngOnInit(): void {
    this.loading = true;
    this.clientsService.load().subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
        this.loading = false;
      },
    });
  }
  handleOpenCreateForm(): void {
    this.clientFormService.open({
      onClose: () => {
        this.clientsService.load().subscribe();
      },
    });
  }
}
