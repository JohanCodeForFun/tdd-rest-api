describe("test validate personal number", () => {
  it("test for valid personal number", () => {
    const personalnumberA = "550713-1405";

    const result = validatePersonalNumber(personalNumber);

    expect(result).toBe(true);
  });
  it("test for invalid personal number", () => {
    const personalnumberA = "";
    const personalnumberB = "553-1405";
    const personalnumberC = "550713-ABCD";

    const resultA = validatePersonalNumber(personalNumber);
    const resultB = validatePersonalNumber(personalNumber);
    const resultC = validatePersonalNumber(personalNumber);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
    expect(resultC).toBe(false);
  });
});
