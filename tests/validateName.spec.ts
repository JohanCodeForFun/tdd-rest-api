describe('validate name', () => { 

  it("valid first name", () => {
    const firstName = "Anna";
    const lastName = "Andersson";

    const resultA = validateName(firstName);
    const resultB = validateName(lastName);

    expect(resultA).toBe(true);
    expect(resultB).toBe(true);
  });

  it("invalid first name", () => {
    const firstNameA = "";
    const firstNameB = "Ann44";
    const lastNameA = "";
    const lastNameB = "%&/&##%";

    const resultA = validateName(firstNameA);
    const resultB = validateName(firstNameB);
    const resultC = validateName(lastNameA);
    const resultD = validateName(lastNameB);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
    expect(resultC).toBe(false);
  });
  
});