export default class Client {
  id: string;
  name: string;
  salary: number;
  company: string;

  constructor(id: string, name: string, salary: number, company: string) {
    this.id = id;
    this.name = name;
    this.salary = salary;
    this.company = company;
  }
}
