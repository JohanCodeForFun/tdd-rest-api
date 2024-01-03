
describe("validate country", () => {

  it("valid country", () => {
    const country = "Sweden";

    const result = validateCountry(country);

    expect(result).toBe(true);
  });

  it("invalid country", () => {
    const countryA = "";
    const countryB = "err53eedfdf%%#%";
    const countryC = "3455 45544 44343"

    const resultA = validateCountry(countryA);
    const resultB = validateCountry(countryB);
    const resultC = validateCountry(countryC);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
    expect(resultC).toBe(false);
  });
  
});
