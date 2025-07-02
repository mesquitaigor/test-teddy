import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ClientsService } from './clients.service';
import { CreateClientData } from './ClientData';
import { Client } from './Client';


describe('ClientsService', () => {
  let service: ClientsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideHttpClient(), provideHttpClientTesting(), ClientsService],
    });
    service = TestBed.inject(ClientsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load clients', () => {
    const mockResponse = {
      clients: [
        { id: 1, name: 'Client 1', salary: 1000, companyValuation: 5000 },
        { id: 2, name: 'Client 2', salary: 2000, companyValuation: 10000 },
      ],
      currentPage: 1,
      totalPages: 1,
    };

    service.load(1, 10).subscribe((response) => {
      expect(response.clients.length).toBe(2);
      expect(response.clients[0].name).toBe('Client 1');
    });

    const req = httpMock.expectOne('https://boasorte.teddybackoffice.com.br/users?page=1&limit=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a client', () => {
    const newClient: CreateClientData = {
      name: 'New Client',
      salary: 3000,
      companyValuation: 15000,
    };

    service.create(newClient).subscribe(() => {
      expect(true).toBeTruthy();
    });

    const req = httpMock.expectOne('https://boasorte.teddybackoffice.com.br/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newClient);
    req.flush(null);
  });

  it('should update a client', () => {
    const updatedClient = new Client(1, 'Updated Client', 4000, 20000);

    service.update(updatedClient).subscribe(() => {
      expect(true).toBeTruthy();
    });

    const req = httpMock.expectOne('https://boasorte.teddybackoffice.com.br/users/1');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({
      name: updatedClient.name,
      salary: updatedClient.salary,
      companyValuation: updatedClient.companyValuation,
    });
    req.flush(null);
  });

  it('should delete a client', () => {
    service.delete(1).subscribe((response) => {
      expect(response).toBe('Deleted');
    });

    const req = httpMock.expectOne('https://boasorte.teddybackoffice.com.br/users/1');
    expect(req.request.method).toBe('DELETE');
    req.flush('Deleted');
  });

  it('should reset client selection', () => {
    const mockClients = [
      new Client(1, 'Client 1', 1000, 5000),
      new Client(2, 'Client 2', 2000, 10000),
    ];
    service['clients$'].next(mockClients);

    service.resetSelection();

    const updatedClients = service['clients$'].getValue();
    expect(updatedClients.every((client) => !client.selected)).toBeTruthy();
  });

  it('should change client selection', () => {
    const mockClient = new Client(1, 'Client 1', 1000, 5000);
    service['clients$'].next([mockClient]);

    service.changeClientSelection(mockClient);

    const updatedClients = service['clients$'].getValue();
    expect(updatedClients[0].selected).toBeTruthy();
  });
});
