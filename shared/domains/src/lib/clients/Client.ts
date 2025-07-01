export class Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  selected = false;

  constructor(id: number, name: string, salary: number, company: number) {
    this.id = id;
    this.name = name;
    this.salary = salary;
    this.companyValuation = company;
  }
}
