import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ClientDataResponse, CreateClientData } from '../DTO/ClientData';
import Client from '../models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly httpClient = inject(HttpClient);
  readonly clients$ = new BehaviorSubject<Client[]>([]);
  load(): Observable<Client[]> {
    return this.httpClient
      .get<ClientDataResponse>('https://boasorte.teddybackoffice.com.br/users')
      .pipe(
        map((response: ClientDataResponse) => {
          return response.clients.map(
            (item) =>
              new Client(item.id, item.name, item.salary, item.companyValuation)
          );
        }),
        tap((clients: Client[]) => {
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
}
