import { validateEmail } from "../src/utils/validateEmail";

describe('validate email tests', () => { 
  it("test for valid email", () => {
    const email = { email: "anna.andersson@gmail.com" };

    const result = validateEmail(email);

    expect(result).toBe(true);
  });

  it("test for invalid email", () => {
    const emailA = { email: "anna.andersson@gmail" };
    const emailB = { email: "anna.andersson@gmail" };
    const emailC = { email: "@gmail.com" };

    const resultA = validateEmail(emailA);
    const resultB = validateEmail(emailB);
    const resultC = validateEmail(emailC);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
    expect(resultC).toBe(false);
  });
  
 })