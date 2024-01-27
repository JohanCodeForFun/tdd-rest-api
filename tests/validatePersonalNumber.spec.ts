import { validatePersonalNumber } from "../src/utils/validatePersonalNumber";

describe("test validate personal number", () => {

  it("test for valid personal number", () => {
    const personal_number = "550713-1405";

    const result = validatePersonalNumber(personal_number);

    expect(result).toBe(true);
  });

  it("test for invalid personal number", () => {
    const personal_numberA = "";
    const personal_numberB = "553-1405";
    const personal_numberC = "550713-ABCD";

    const resultA = validatePersonalNumber(personal_numberA);
    const resultB = validatePersonalNumber(personal_numberB);
    const resultC = validatePersonalNumber(personal_numberC);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
    expect(resultC).toBe(false);
  });
  
});
