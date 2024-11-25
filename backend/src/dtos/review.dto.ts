import ReviewModel from "../models/review.model";

export class ReviewDTO {
    constructor(
      public rating: number,
      public comment: string,
    ) {}
  
    static fromModel(reviewModel: ReviewModel): ReviewDTO {
      return new ReviewDTO(
        reviewModel.rating,
        reviewModel.comment,
      );
    }
}