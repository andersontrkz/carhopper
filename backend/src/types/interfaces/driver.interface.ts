export interface IReview {
    rating: number;
    comment: string;
};

export interface IDriverOption {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: IReview;
    value: number;
};