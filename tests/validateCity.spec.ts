import { validateCity } from "../src/utils/validateCity";

describe("validate city", () => {

  it("valid city", () => {
    const city = "Stockholm";

    const result = validateCity(city);

    expect(result).toBe(true);
  });

  it("invalid city", () => {
    const cityA = "";
    const cityB = "err53eedfdf%%#%";
    const cityC = "3455 45544 44343"

    const resultA = validateCity(cityA);
    const resultB = validateCity(cityB);
    const resultC = validateCity(cityC);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
    expect(resultC).toBe(false);
  });
  
});
