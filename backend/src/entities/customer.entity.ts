interface ICustomerEntity {
  id: string;
  name: string;
}

export class CustomerEntity {
    public id: string;
    public name: string;
  
    constructor({ id, name }: ICustomerEntity) {
      this.id = id;
      this.name = name;
    }
  }
  