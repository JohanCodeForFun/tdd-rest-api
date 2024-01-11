import nock from "nock";
import { getGeoCodingLocation } from "../src/geoLocation";

beforeAll(() => {
  const mockData = {
    name: "Stockholm",
    latitude: 59.3251172,
    longitude: 18.0710935,
    country: "SE",
  };

  nock("https://api.api-ninjas.com")
    .get("/v1/geocoding?city=Stockholm")
    .times(2)
    .reply(200, mockData);
});

describe("getGeoCodingLocation", () => {
  it("returns geolocation data for a city", async () => {
    const city = "Stockholm";
    const mockData = {
      name: "Stockholm",
      latitude: 59.3251172,
      longitude: 18.0710935,
      country: "SE",
    };

    const data = await getGeoCodingLocation(city);

    expect(data).toEqual(mockData);
  });

  it("returns an empty array when the request fails", async () => {
    const city = "99999";

    const data = await getGeoCodingLocation(city);

    expect(data).toEqual([]);
  });
});
