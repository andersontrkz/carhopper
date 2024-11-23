import { type LatLng, type DirectionsResponseData } from "@googlemaps/google-maps-services-js";

export interface IAddresses {
    origin: string;
    destination: string;
};

export interface IRide {
    origin: LatLng;
    destination: LatLng;
};
