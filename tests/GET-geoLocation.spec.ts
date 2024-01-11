import nock from 'nock';
import { getGeoCodingLocation } from '../src/geoLocation';

describe('getGeoCodingLocation', () => {
  it('returns geolocation data for a city', async () => {
    const city = 'Stockholm';
    const mockData = [
      {
        name: "Stockholm",
        latitude: 59.3251172,
        longitude: 18.0710935,
        country: "SE",
      }
    ];

    nock("https://api.api-ninjas.com")
      .get(`/v1/geocoding?city=${city}`)
      .reply(200, mockData);

    const data = await getGeoCodingLocation(city);

    expect(data).toEqual(mockData);
  });

  it('returns an empty array when the request fails', async () => {
    const city = 'Stockholm';

    nock("https://api.api-ninjas.com")
      .get(`/v1/geocoding?city=${city}`)
      .replyWithError('Something went wrong');

    const data = await getGeoCodingLocation(city);

    expect(data).toEqual([]);
  });
});