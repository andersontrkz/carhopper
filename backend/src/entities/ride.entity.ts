interface IRideEntity {
  id: number,
  origin: string,
  destination: string,
  distance: number,
  duration: string,
  value: number,
}

export class RideEntity {
    public id: number;
    public origin: string;
    public destination: string;
    public distance: number;
    public duration: string;
    public value: number;
  
    constructor({ id, origin, destination, distance, duration, value }: IRideEntity) {
      this.id = id
      this.origin = origin
      this.destination = destination
      this.distance = distance
      this.duration = duration
      this.value = value
    }
}
  