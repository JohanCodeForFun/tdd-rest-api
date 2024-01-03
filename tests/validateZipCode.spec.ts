import { validateZipCode } from "../src/utils/validateZipCode";

describe("validate zip code tests", () => {

  it("test for valid zip code", () => {
    const zipCode = "111 22";

    const result = validateZipCode(zipCode);

    expect(result).toBe(true);
  });

  it("test for invalid zip code", () => {
    const zipCodeA = "111";
    const zipCodeB = "111 333";
    const zipCodeC = "ABC DE";

    const resultA = validateZipCode(zipCodeA);
    const resultB = validateZipCode(zipCodeB);
    const resultC = validateZipCode(zipCodeC);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
    expect(resultC).toBe(false);
  });
  
});
