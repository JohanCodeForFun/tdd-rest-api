import axios from "axios";
import { GeoCodingLocation } from "./types/GeoLocation";

export const getGeoCodingLocation = async (city: string): Promise<GeoCodingLocation[]> => {
  try {
    const { data } = await axios.get<GeoCodingLocation[]>(
      `https://api.api-ninjas.com/v1/geocoding?city=${city}`
    );
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
