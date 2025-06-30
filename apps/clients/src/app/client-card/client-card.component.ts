import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeddyButtonComponent } from '../teddy-button/teddy-button.component';
import Client from '../models/Client';


@Component({ 
  selector: 'app-client-card',
  imports: [TeddyButtonComponent, CommonModule],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss',
})
export class ClientCardComponent {
  @Input({ required: true }) client?: Client;
}
