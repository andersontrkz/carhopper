import RideModel from "@/database/models/ride.model";

interface IRideDTO {
  id: number;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
  date: Date;
}

export class RideDTO {
  public id: number;
  public origin: string;
  public destination: string;
  public distance: number;
  public duration: string;
  public value: number;
  public date: Date;

  constructor({ id, origin, destination, distance, duration, value, date }: IRideDTO) {
    this.id = id;
    this.origin = origin;
    this.destination = destination;
    this.distance = distance;
    this.duration = duration;
    this.value = value;
    this.date = date;
  }

  static fromModel(rideModel: RideModel): RideDTO {
    return new RideDTO(rideModel);
  }
}
