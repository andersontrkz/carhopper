import { type LatLng } from "@googlemaps/google-maps-services-js";

export interface IAddresses {
    origin: string;
    destination: string;
};

export interface ICoordinates {
    origin: LatLng;
    destination: LatLng;
};

export interface ILocationData {
    distance: number;
    duration: string;
}
