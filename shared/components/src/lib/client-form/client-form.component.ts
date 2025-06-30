import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientsService } from 'apps/clients/src/app/services/clients.service';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { TeddyButtonComponent } from '@teddy/components';
import { ClientFormService } from '@teddy/components';
import { MaskitoDirective } from '@maskito/angular';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-client-form',
  imports: [
    CommonModule,
    FormsModule,
    TeddyButtonComponent,
    MaskitoDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
})
export class ClientFormComponent {
  private readonly clientService = inject(ClientsService);
  private readonly clientFormService = inject(ClientFormService);
  readonly openState$ = this.clientFormService.openState$.asObservable();
  readonly control = new FormGroup({
    salaryInput: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    companyValuationInput: new FormControl('', Validators.required),
  });

  creating = false;
  moneyMask = maskitoNumberOptionsGenerator({
    decimalSeparator: ',',
    thousandSeparator: '.',
    precision: 2,
    prefix: 'R$ ',
  });
  handleClose(): void {
    this.clientFormService.toggleOpen();
    this.control.reset();
    this.creating = false;
  }
  handleSubmit(): void {
    if (this.control.valid && !this.creating) {
      this.creating = true;
      const salary = this.control.get('salaryInput')?.value!;
      const companyValuation = this.control.get('companyValuationInput')
        ?.value!;
      const name = this.control.get('name')?.value!;
      this.clientService
        .create({
          name,
          salary: parseFloat(
            salary.replace('R$ ', '').replace('.', '').replace(',', '.')
          ),
          companyValuation: parseFloat(
            companyValuation
              .replace('R$ ', '')
              .replace('.', '')
              .replace(',', '.')
          ),
        })
        .pipe(
          finalize(() => {
            this.creating = false;
          })
        )
        .subscribe({
          next: () => {
            this.control.reset();
            this.clientService.load();
          },
          error: (error) => {
            console.error('Error creating client:', error);
          },
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
