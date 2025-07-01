import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ClientDataResponse, CreateClientData } from './ClientData';
import { Client } from './Client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly httpClient = inject(HttpClient);
  readonly clients$ = new BehaviorSubject<Client[]>([]);
  readonly selectedClients$ = this.clients$.pipe(
    map((clients) => clients.filter((client) => client.selected)),
  );
  load(page: number, limit: number): Observable<ClientDataResponse> {
    return this.httpClient
      .get<ClientDataResponse>('https://boasorte.teddybackoffice.com.br/users', {
        params: { page, limit },
      })
      .pipe(
        tap((response: ClientDataResponse) => {
          const clients = response.clients.map((item) => {
            const findedClient = this.clients$.getValue().find((c) => c.id === item.id);
            const client = new Client(item.id, item.name, item.salary, item.companyValuation);
            if (findedClient) {
              client.selected = findedClient.selected;
            } else {
              client.selected = false;
            }
            return client;
          });
          this.clients$.next(clients);
        }),
      );
  }
  resetSelection(): void {
    const currentClients = this.clients$.getValue();
    const updatedClients = currentClients.map((c) => ({ ...c, selected: false }));
    this.clients$.next(updatedClients);
  }
  changeClientSelection(client: Client): void {
    const currentClients = this.clients$.getValue();
    const updatedClients = currentClients.map((c) =>
      c.id === client.id ? { ...c, selected: !c.selected } : c,
    );
    this.clients$.next(updatedClients);
  }
  create(client: CreateClientData): Observable<void> {
    return this.httpClient.post<void>('https://boasorte.teddybackoffice.com.br/users', {
      name: client.name,
      salary: client.salary,
      companyValuation: client.companyValuation,
    });
  }

  update(client: Client): Observable<void> {
    return this.httpClient.patch<void>(
      `https://boasorte.teddybackoffice.com.br/users/${client.id}`,
      {
        name: client.name,
        salary: client.salary,
        companyValuation: client.companyValuation,
      },
    );
  }
  delete(clientId: number): Observable<string> {
    return this.httpClient.delete(`https://boasorte.teddybackoffice.com.br/users/${clientId}`, {
      responseType: 'text',
    });
  }
}
