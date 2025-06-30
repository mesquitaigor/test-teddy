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
import Client from 'apps/clients/src/app/models/Client';
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
  readonly modalData$ = this.clientFormService.openState$;
  readonly control = new FormGroup({
    salaryInput: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    companyValuationInput: new FormControl('', Validators.required),
  });

  creating = false;
  moneyMask = maskitoNumberOptionsGenerator({
    decimalSeparator: ',',
    thousandSeparator: '.',
    maximumFractionDigits: 2,
    precision: 2,
    prefix: 'R$ ',
  });
  ngOnInit(): void {
    this.modalData$.subscribe((state) => {
      if (state.stt && state.data) {
        this.creating = false;
        this.control.get('name')?.setValue(state.data.name);
        this.control.get('salaryInput')?.setValue(
          `R$ ${state.data.salary
            .toFixed(2)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
        );
        this.control.get('companyValuationInput')?.setValue(
          `R$ ${state.data.companyValuation
            .toFixed(2)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
        );
      }
    });
  }
  handleClose(): void {
    this.control.reset();
    this.creating = false;
    this.closeModal();
  }
  handleSubmit(): void {
    if (this.control.valid && !this.creating) {
      this.creating = true;
      if (this.modalData$.getValue().data?.id) {
        this.updateClient();
      } else {
        this.createClient();
      }
    } else {
      console.error('Form is invalid');
    }
  }
  private createClient(): void {
    this.clientService
      .create({
        name: this.control.get('name')?.value!,
        salary: this.getClientSalaryInputValue(),
        companyValuation: this.getClientCompanyValuationInputValue(),
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
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating client:', error);
        },
      });
  }
  private closeModal(): void {
    const modalData = this.modalData$.getValue();
    if (modalData.onClose) {
      modalData.onClose();
    }
    this.clientFormService.close();
  }
  private updateClient(): void {
    const client = new Client(
      this.modalData$.getValue().data?.id!,
      this.control.get('name')?.value!,
      this.getClientSalaryInputValue(),
      this.getClientCompanyValuationInputValue()
    );
    this.clientService
      .update(client)
      .pipe(
        finalize(() => {
          this.creating = false;
        })
      )
      .subscribe({
        next: () => {
          this.control.reset();
          this.clientService.load();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating client:', error);
        },
      });
  }
  private getClientCompanyValuationInputValue(): number {
    const companyValuation = this.control.get('companyValuationInput')?.value!;
    return parseFloat(
      companyValuation.replace('R$ ', '').replace('.', '').replace(',', '.')
    );
  }
  private getClientSalaryInputValue(): number {
    const salary = this.control.get('salaryInput')?.value!;
    return parseFloat(
      salary.replace('R$ ', '').replace('.', '').replace(',', '.')
    );
  }
}
