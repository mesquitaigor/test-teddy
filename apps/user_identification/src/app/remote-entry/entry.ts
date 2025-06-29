import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { NxWelcome } from './nx-welcome';


@Component({
  imports: [CommonModule, NxWelcome],
  selector: 'app-user-identification-entry',
  template: `<app-nx-welcome></app-nx-welcome>`,
})
export class RemoteEntry {}
