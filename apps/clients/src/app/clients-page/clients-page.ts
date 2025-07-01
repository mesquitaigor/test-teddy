import { ClientModalService, TeddyButtonComponent } from '@teddy/components';
import { Component, inject, OnInit } from '@angular/core';
import { ClientCardComponent } from '@teddy/components';
import { ClientsService } from '@teddy/domains';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-clients-page',
  imports: [
    CommonModule,
    FormsModule,
    ClientCardComponent,
    TeddyButtonComponent,
  ],
  templateUrl: './clients-page.html',
  styleUrl: './clients-page.scss',
})
export class ClientsPage {
  private readonly clientsService = inject(ClientsService);
  private readonly clientModalService = inject(ClientModalService);
  clients$ = this.clientsService.clients$;
  loading = false;

  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 16;

  ngOnInit(): void {
    this.loading = true;
    this.handleLoadClient(true);
  }

  handleOpenCreateForm(): void {
    this.clientModalService.open({
      onClose: () => {
        this.handleLoadClient();
      },
    });
  }

  handleLoadClient(displayLoad = false): void {
    if (displayLoad) {
      this.loading = true;
    }
    this.clientsService
      .load(this.currentPage, this.itemsPerPage)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result) => {
          this.totalPages = result.totalPages;
        },
      });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.handleLoadClient();
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
