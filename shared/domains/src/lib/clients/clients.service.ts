import { BehaviorSubject, Observable, tap } from 'rxjs';
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
  load(page: number, limit: number): Observable<ClientDataResponse> {
    return this.httpClient
      .get<ClientDataResponse>(
        'https://boasorte.teddybackoffice.com.br/users',
        {
          params: { page, limit },
        }
      )
      .pipe(
        tap((response: ClientDataResponse) => {
          const clients = response.clients.map(
            (item) =>
              new Client(item.id, item.name, item.salary, item.companyValuation)
          );
          this.clients$.next(clients);
        })
      );
  }
  create(client: CreateClientData): Observable<void> {
    return this.httpClient.post<void>(
      'https://boasorte.teddybackoffice.com.br/users',
      {
        name: client.name,
        salary: client.salary,
        companyValuation: client.companyValuation,
      }
    );
  }

  update(client: Client): Observable<void> {
    return this.httpClient.patch<void>(
      `https://boasorte.teddybackoffice.com.br/users/${client.id}`,
      {
        name: client.name,
        salary: client.salary,
        companyValuation: client.companyValuation,
      }
    );
  }
  delete(clientId: number): Observable<string> {
    return this.httpClient.delete(
      `https://boasorte.teddybackoffice.com.br/users/${clientId}`,
      { responseType: 'text' }
    );
  }
}
