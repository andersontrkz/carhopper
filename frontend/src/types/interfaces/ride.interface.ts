export interface IAddresses {
    origin: string;
    destination: string;
};
export interface IRideEstimate extends IAddresses {
    customer_id: string;
};

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

interface IDriver {
    id: number;
    name: string;
}
export interface IRideHistory {
    id: number;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    date: string;
    driver: IDriver
}

export interface ILocationData {
    distance: number;
    duration: string
}

export interface LatitudeLongitude {
    lat: number;
    lng: number;
}

export interface IRide {
    distance: number;
    duration: string;
}
