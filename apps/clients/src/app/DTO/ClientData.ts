export interface ClientData {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
}

export interface CreateClientData {
  name: string;
  salary: number;
  companyValuation: number;
}

export interface ClientDataResponse {
  clients: ClientData[];
  currentPage: number;
  totalPages: number;
}
