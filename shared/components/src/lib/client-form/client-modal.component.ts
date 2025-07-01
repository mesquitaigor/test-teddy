import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientsService, CreateClientData } from '@teddy/domains';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { Component, inject, OnInit } from '@angular/core';
import { MaskitoDirective } from '@maskito/angular';
import { CommonModule } from '@angular/common';
import { Client } from '@teddy/domains';
import { finalize } from 'rxjs';

import { TeddyButtonComponent } from '../teddy-button/teddy-button.component';
import { ClientModalService } from './client-modal.service';

@Component({
  selector: 'lib-client-form',
  imports: [CommonModule, FormsModule, TeddyButtonComponent, MaskitoDirective, ReactiveFormsModule],
  templateUrl: './client-modal.component.html',
  styleUrl: './client-modal.component.scss',
})
export class ClientModalComponent implements OnInit {
  private readonly clientService = inject(ClientsService);
  private readonly clientModalService = inject(ClientModalService);
  readonly control = new FormGroup({
    salaryInput: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    companyValuationInput: new FormControl('', Validators.required),
  });
  title = 'Criar Cliente';
  executing = false;
  moneyMask = maskitoNumberOptionsGenerator({
    decimalSeparator: ',',
    thousandSeparator: '.',
    maximumFractionDigits: 2,
    precision: 2,
    prefix: 'R$ ',
  });
  modalData = this.clientModalService.openState$.getValue();
  ngOnInit(): void {
    this.clientModalService.openState$.subscribe((state) => {
      this.modalData = state;
      if (state.stt) {
        if (state.data) {
          this.executing = false;
          this.control.get('name')?.setValue(state.data.name);
          this.control.get('salaryInput')?.setValue(
            `R$ ${state.data.salary
              .toFixed(2)
              .replace('.', ',')
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`,
          );
          this.control.get('companyValuationInput')?.setValue(
            `R$ ${state.data.companyValuation
              .toFixed(2)
              .replace('.', ',')
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`,
          );
        }
        switch (state.action) {
          case 'edit':
            this.title = 'Editar Cliente';
            break;
          case 'delete':
            this.title = 'Deletar Cliente';
            break;
          default:
            this.title = 'Criar Cliente';
            break;
        }
      }
    });
  }
  handleClose(): void {
    this.control.reset();
    this.executing = false;
    this.closeModal();
  }
  handleSubmit(): void {
    if (this.control.valid && !this.executing) {
      this.executing = true;
      if (this.modalData.data?.id) {
        this.updateClient();
      } else {
        this.createClient();
      }
    } else {
      console.error('Form is invalid');
    }
  }
  private createClient(): void {
    const payload = {
      name: this.control.get('name')?.value,
      salary: this.getClientSalaryInputValue(),
      companyValuation: this.getClientCompanyValuationInputValue(),
    };
    if (payload.name && payload.salary && payload.companyValuation) {
      this.clientService
        .create(payload as CreateClientData)
        .pipe(
          finalize(() => {
            this.executing = false;
          }),
        )
        .subscribe({
          next: () => {
            this.control.reset();
            this.closeModal();
          },
          error: (error) => {
            console.error('Error creating client:', error);
          },
        });
    }
  }
  private closeModal(): void {
    if (this.modalData.onClose) {
      this.modalData.onClose();
    }
    this.clientModalService.close();
  }
  private updateClient(): void {
    const name = this.control.get('name')?.value;
    const salary = this.getClientSalaryInputValue();
    const companyValuation = this.getClientCompanyValuationInputValue();
    if (name && this.modalData.data?.id && salary && companyValuation) {
      const client = new Client(this.modalData.data?.id, name, salary, companyValuation);
      this.clientService
        .update(client)
        .pipe(
          finalize(() => {
            this.executing = false;
          }),
        )
        .subscribe({
          next: () => {
            this.control.reset();
            this.closeModal();
          },
          error: (error) => {
            console.error('Error creating client:', error);
          },
        });
    }
  }
  private getClientCompanyValuationInputValue(): number | void {
    const companyValuation = this.control.get('companyValuationInput')?.value;
    if (companyValuation) {
      return parseFloat(companyValuation.replace('R$ ', '').replace('.', '').replace(',', '.'));
    }
  }
  private getClientSalaryInputValue(): number | void {
    const salary = this.control.get('salaryInput')?.value;
    if (salary) {
      return parseFloat(salary.replace('R$ ', '').replace('.', '').replace(',', '.'));
    }
  }
  handleDeleteClient(): void {
    const clientId = this.modalData.data?.id;
    this.executing = true;
    if (clientId) {
      this.clientService
        .delete(clientId)
        .pipe(
          finalize(() => {
            this.executing = false;
          }),
        )
        .subscribe({
          next: () => {
            this.control.reset();
            this.closeModal();
          },
          error: (error) => {
            console.error('Error deleting client:', error);
          },
        });
    }
  }
}
