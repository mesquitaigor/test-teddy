import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserIdentificationComponent } from './user-identification.component';

@Component({
  imports: [CommonModule, UserIdentificationComponent],
  selector: 'app-user-identification-entry',
  styles: [':host { background-color: red; display: block; height: 100vh; }'],
  template: `<app-user-identification></app-user-identification>`,
})
export class RemoteEntry {}
