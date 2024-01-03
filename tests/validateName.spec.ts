import { validateName } from "../src/utils/validateName";

describe('validate name', () => { 

  it("valid firstname", () => {
    const firstName = "Anna";

    const result = validateName(firstName);

    expect(result).toBe(true);
  });

  it("valid lastname", () => {
    const lastName = "Andersson";

    const result = validateName(lastName);

    expect(result).toBe(true);
  });

  it("invalid firstname", () => {
    const firstNameA = "";
    const firstNameB = "Ann44";

    const resultA = validateName(firstNameA);
    const resultB = validateName(firstNameB);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
  });
  
  it("invalid lastname", () => {
    const lastNameA = "";
    const lastNameB = "%&/&##%";

    const resultA = validateName(lastNameA);
    const resultB = validateName(lastNameB);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
  });
  
});