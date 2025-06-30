import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ClientDataResponse, CreateClientData } from '../DTO/ClientData';
import Client from '../models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly httpClient = inject(HttpClient);
  readonly clients$ = new BehaviorSubject<Client[]>([]);
  load(): void {
    this.httpClient
      .get<ClientDataResponse>('https://boasorte.teddybackoffice.com.br/users')
      .subscribe({
        next: (response: ClientDataResponse) => {
          const clients = response.clients.map(
            (item) =>
              new Client(item.id, item.name, item.salary, item.companyValuation)
          );
          this.clients$.next(clients);
        },
      });
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
}
