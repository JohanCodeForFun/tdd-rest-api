import { validateEmail } from "../src/utils/validateEmail";

describe('validate email tests', () => { 
  it("test for valid email", () => {
    const email = "anna.andersson@gmail.com";

    const result = validateEmail(email);

    expect(result).toBe(true);
  });

  it("test for invalid email", () => {
    const emailA = "anna.andersson@gmail";
    const emailB = "@gmail.com";
    const emailC = "@gmail";

    const resultA = validateEmail(emailA);
    const resultB = validateEmail(emailB);
    const resultC = validateEmail(emailC);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
    expect(resultC).toBe(false);

    // expect(() => validateEmail(emailA)).toThrow('Invalid email');
    // expect(() => validateEmail(emailB)).toThrow('Invalid email');
    // expect(() => validateEmail(emailC)).toThrow('Invalid email');
  });

  it("test for empty email", () => {
    const email = "";

    const result = validateEmail(email);

    expect(result).toBe(false);
 
    // expect(() => validateEmail(email)).toThrow('Invalid email');
  });

  // it("email roules should exist", () => {
  //   expect(rules).toHaveProperty('email', 'required|email');
  // });
  
 })