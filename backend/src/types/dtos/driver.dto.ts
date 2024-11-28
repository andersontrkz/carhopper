import DriverModel from "@/database/models/driver.model";

import { ReviewDTO } from "./review.dto";

interface IDriverBaseDTO {
  id: number;
  name: string;
}

interface IDriverDTO extends IDriverBaseDTO {
  description: string;
  vehicle: string;
  pricePerKm: number;
  minKm: number;
  review: ReviewDTO;
}

export class DriverBaseDTO {
  public id: number;
  public name: string;

  constructor({ id, name }: IDriverBaseDTO) {
    this.id = id
    this.name = name
  }

  static fromModel(driverModel: DriverModel): DriverBaseDTO {
    return new DriverBaseDTO(driverModel);
  }
}

export class DriverDTO extends DriverBaseDTO {
    public description: string;
    public vehicle: string;
    public pricePerKm: number;
    public minKm: number;
    public review: ReviewDTO;

    constructor(driver: IDriverDTO) {
      super(driver)
      this.description = driver.description;
      this.vehicle = driver.vehicle;
      this.pricePerKm = driver.pricePerKm;
      this.minKm = driver.minKm;
      this.review = driver.review;
    }
  
    static fromModel(driverModel: DriverModel): DriverDTO {
      return new DriverDTO(driverModel);
    }
}
