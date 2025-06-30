import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeddyButtonComponent } from '@teddy/components';

@Component({
  selector: 'app-client-form',
  imports: [CommonModule, FormsModule, TeddyButtonComponent],
  templateUrl: './client-form.html',
  styleUrl: './client-form.scss',
})
export class ClientForm {}
