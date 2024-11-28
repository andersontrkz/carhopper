import CONFIG from "@/config";
import { IAddresses } from "@/types/interfaces/ride.interface";
import { Client, type DirectionsResponseData } from "@googlemaps/google-maps-services-js";

const client = new Client({});

/**
 * @param origin Origin point with latitude and longitude
 * @param destination Destination point with latitude and longitude
 * @returns Data of the route between the origin and destination points
 */
export async function getRouteData({ origin, destination }: IAddresses): Promise<DirectionsResponseData> {
  try {
    const response = await client.directions({
      params: {
        origin,
        destination,
        key: CONFIG.GOOGLE_API_KEY,
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
