import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Client from '../models/Client';
import { ClientDataResponse } from '../DTO/ClientData';

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
            (item) => new Client(item.id, item.name, item.salary, item.company),
          );
          this.clients$.next(clients);
        },
      });
  }
}
