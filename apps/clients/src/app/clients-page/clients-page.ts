import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeddyButtonComponent } from '../teddy-button/teddy-button.component';
import { ClientCardComponent } from '../client-card/client-card.component';
import { ClientsService } from '../services/clients.service';


@Component({
  selector: 'app-clients-page',
  imports: [CommonModule, ClientCardComponent, TeddyButtonComponent],
  templateUrl: './clients-page.html',
  styleUrl: './clients-page.scss'
})
export class ClientsPage implements OnInit {
  private readonly clientsService = inject(ClientsService);
  clients$ = this.clientsService.clients$;
  ngOnInit(): void {
    this.clientsService.load();
  }
}
