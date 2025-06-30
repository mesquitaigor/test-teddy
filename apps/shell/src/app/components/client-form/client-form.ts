import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { TeddyButtonComponent } from '@teddy/components';
import { MaskitoDirective } from '@maskito/angular';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-client-form',
  imports: [
    CommonModule,
    FormsModule,
    TeddyButtonComponent,
    MaskitoDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './client-form.html',
  styleUrl: './client-form.scss',
})
export class ClientForm {
  readonly control = new FormGroup({
    salaryInput: new FormControl(''),
    companyValuationInput: new FormControl(''),
  });
  moneyMask = maskitoNumberOptionsGenerator({
    decimalSeparator: ',', // separador decimal brasileiro
    thousandSeparator: '.', // separador de milhar brasileiro
    precision: 2, // duas casas decimais
    prefix: 'R$ ', // prefixo monetário
  });
}
