interface IReviewEntity {
  id: number;
  driverId: number;
  rating: number;
  comment: string;
}

export class ReviewEntity {
    public id: number;
    public driverId: number;
    public rating: number;
    public comment: string;
  
    constructor({ id, driverId, rating, comment }: IReviewEntity) {
      this.id = id;
      this.driverId = driverId;
      this.rating = rating;
      this.comment = comment;
    }
}
  