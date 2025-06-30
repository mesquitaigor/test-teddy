export interface ClientData {
  id: string;
  name: string;
  salary: number;
  company: string;
}

export interface ClientDataResponse {
  clients: ClientData[];
  currentPage: number;
  totalPages: number;
}
