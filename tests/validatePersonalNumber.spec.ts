import { validatePersonalNumber } from "../src/utils/validatePersonalNumber";

describe("test validate personal number", () => {

  it("test for valid personal number", () => {
    const personalNumber = "550713-1405";

    const result = validatePersonalNumber(personalNumber);

    expect(result).toBe(true);
  });

  it("test for invalid personal number", () => {
    const personalNumberA = "";
    const personalNumberB = "553-1405";
    const personalNumberC = "550713-ABCD";

    const resultA = validatePersonalNumber(personalNumberA);
    const resultB = validatePersonalNumber(personalNumberB);
    const resultC = validatePersonalNumber(personalNumberC);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
    expect(resultC).toBe(false);
  });
  
});
