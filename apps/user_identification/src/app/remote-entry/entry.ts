import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { NxWelcome } from './nx-welcome';


@Component({
  imports: [CommonModule, NxWelcome],
  selector: 'app-user-identification-entry',
  template: `
    <div style="padding: 20px; border: 2px solid #007acc; background-color: #f0f8ff;">
      <h1>🎯 Microfrontend User Identification</h1>
      <p>Este é o microfrontend de identificação de usuário funcionando!</p>
      <app-nx-welcome></app-nx-welcome>
    </div>
  `,
})
export class RemoteEntry {}
