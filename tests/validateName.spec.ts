import { validateName } from "../src/utils/validateName";

describe('validate name', () => { 

  it("valid first_name", () => {
    const first_name = "Anna";

    const result = validateName(first_name);

    expect(result).toBe(true);
  });

  it("valid last_name", () => {
    const last_name = "Andersson";

    const result = validateName(last_name);

    expect(result).toBe(true);
  });

  it("invalid first_name", () => {
    const first_nameA = "";
    const first_nameB = "Ann44";

    const resultA = validateName(first_nameA);
    const resultB = validateName(first_nameB);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
  });
  
  it("invalid last_name", () => {
    const last_nameA = "";
    const last_nameB = "%&/&##%";

    const resultA = validateName(last_nameA);
    const resultB = validateName(last_nameB);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
  });
  
});