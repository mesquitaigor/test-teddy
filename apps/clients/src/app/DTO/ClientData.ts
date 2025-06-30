export interface ClientData {
  id: string;
  name: string;
  salary: number;
  companyValuation: string;
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
