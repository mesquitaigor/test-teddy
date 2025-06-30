import { ClientModalService, TeddyButtonComponent } from '@teddy/components';
import { Component, inject, OnInit } from '@angular/core';
import { ClientsService } from '@teddy/domains';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import { ClientCardComponent } from '../client-card/client-card.component';

@Component({
  selector: 'app-clients-page',
  imports: [CommonModule, ClientCardComponent, TeddyButtonComponent],
  templateUrl: './clients-page.html',
  styleUrl: './clients-page.scss',
})
export class ClientsPage implements OnInit {
  private readonly clientsService = inject(ClientsService);
  private readonly clientFormService = inject(ClientModalService);
  clients$ = this.clientsService.clients$;
  loading = false;

  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;

  ngOnInit(): void {
    this.loading = true;
    this.clientsService
      .load()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result) => {
          this.totalPages = result.totalPages;
        },
      });
  }

  handleOpenCreateForm(): void {
    this.clientFormService.open({
      onClose: () => {
        this.clientsService.load().subscribe();
      },
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  getVisiblePages(): number[] {
    const pages: number[] = [];
    const current = this.currentPage;
    const total = this.totalPages;

    if (current >= 4 && total > 1) {
      pages.push(1);

      if (current > 4) {
        pages.push(0);
      }
    }

    const start = Math.max(1, current - 1);
    const end = Math.min(total, current + 1);

    for (let i = start; i <= end; i++) {
      if (!(i === 1 && pages.includes(1))) {
        pages.push(i);
      }
    }

    if (current < total - 2 && total > 1) {
      if (current < total - 3) {
        pages.push(0);
      }
      pages.push(total);
    }

    return pages;
  }
}
