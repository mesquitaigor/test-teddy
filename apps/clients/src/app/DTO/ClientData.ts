export interface ClientData {
  id: string;
  name: string;
  salary: number;
  companyValuation: string;
}

export interface ClientDataResponse {
  clients: ClientData[];
  currentPage: number;
  totalPages: number;
}
