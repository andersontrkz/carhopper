interface IReview {
    rating: number;
    comment: string;
};

export interface IDriver {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: IReview;
    pricePerKm: number;
    minKm: number;
};

export interface IDriverOption {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: IReview;
    value: number;
};