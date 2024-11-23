import { Client, type LatLng, type DirectionsResponseData } from "@googlemaps/google-maps-services-js";

import { type IAddresses } from "src/interfaces/ride.interface";

const client = new Client({});

const GOOGLE_API_KEY = String(process.env.GOOGLE_API_KEY);

/**
 * @param origin Origin point with latitude and longitude
 * @param destination Destination point with latitude and longitude
 * @returns Data of the route between the origin and destination points
 */
export async function getDirectionsData({ origin, destination }: IAddresses): Promise<DirectionsResponseData> {
  try {
    const response = await client.directions({
      params: {
        origin,
        destination,
        key: GOOGLE_API_KEY,
      },
    });

    return response.data;
  } catch (error: unknown ) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
}

/**
 * @param address Address of a location
 * @returns Coordinates of the provided address
 */
export async function getCoordinates(address: string): Promise<LatLng> {
  try {
    const response = await client.geocode({
      params: {
        address: address,
        key: GOOGLE_API_KEY,
      },
    });

    const [{ geometry: { location } }] = response.data.results;

    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
}
