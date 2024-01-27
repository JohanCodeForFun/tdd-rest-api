import { validateZipCode } from "../src/utils/validateZipCode";

describe("validate zip code tests", () => {

  it("test for valid zip code", () => {
    const zipcode = "111 22";

    const result = validateZipCode(zipcode);

    expect(result).toBe(true);
  });

  it("test for invalid zip code", () => {
    const zipcodeA = "111";
    const zipcodeB = "111 333";
    const zipcodeC = "ABC DE";

    const resultA = validateZipCode(zipcodeA);
    const resultB = validateZipCode(zipcodeB);
    const resultC = validateZipCode(zipcodeC);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
    expect(resultC).toBe(false);
  });
  
});
