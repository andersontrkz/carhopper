interface IDriverEntity {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  pricePerKm: number;
  minKm: number;
}

export class DriverEntity {
    public id: number;
    public name: string;
    public description: string;
    public vehicle: string;
    public pricePerKm: number;
    public minKm: number;
  
    constructor({ id, name, description, vehicle, pricePerKm, minKm }: IDriverEntity) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.vehicle = vehicle;
      this.pricePerKm = pricePerKm;
      this.minKm = minKm;
    }
  }
  