import { Component, Input } from '@angular/core';

import { TeddyButtonComponent } from '../teddy-button/teddy-button.component';
import Client from '../models/Client';


@Component({
  selector: 'app-client-card',
  imports: [TeddyButtonComponent],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss',
})
export class ClientCardComponent {
  @Input({ required: true }) client?: Client;
}
