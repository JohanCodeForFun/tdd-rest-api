
describe("validate address tests", () => {

  it("test for valid address", () => {
    const address = { address: "Utvecklargatan 12" };

    const result = validateAddress(address);

    expect(result).toBe(true);
  });

  it("test for invalid address", () => {
    const addressA = { address: "" }
    const addressB = { address: "12" };
    const addressC = { address: "12 Utvecklargatan" }

    const resultA = validateAddress(addressA);
    const resultB = validateAddress(addressB);
    const resultC = validateAddress(addressC);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
    expect(resultC).toBe(false);
  });
  
});
