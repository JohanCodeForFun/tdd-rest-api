require("dotenv").config();
import axios from "axios";
import { GeoCodingLocation } from "./types/GeoLocation";
const apiKey = process.env.API_KEY;

export const getGeoCodingLocation = async (city: string): Promise<GeoCodingLocation[]> => {
  try {
    const { data } = await axios.get<GeoCodingLocation[]>(
      `https://api.api-ninjas.com/v1/geocoding?city=${city}`,
      {
        headers: {
          'X-Api-Key': `${apiKey}`
        }
      }
    );

    return data;
  } catch (err) {
    return [];
  }
};
