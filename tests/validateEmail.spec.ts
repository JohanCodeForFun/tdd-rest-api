import { validateEmail, rules } from "../src/utils/validateEmail";

describe('validate email tests', () => { 
  it("test for valid email", () => {
    const email = { email: "anna.andersson@gmail.com" };

    const result = validateEmail(email);

    expect(result).toBe(true);
  });

  it("test for invalid email", () => {
    const emailA = { email: "anna.andersson@gmail" };
    const emailB = { email: "@gmail.com" };
    const emailC = { email: "@gmail" };

    expect(() => validateEmail(emailA)).toThrow('Invalid email');
    expect(() => validateEmail(emailB)).toThrow('Invalid email');
    expect(() => validateEmail(emailC)).toThrow('Invalid email');
  });

  it("test for empty email", () => {
    const email = { email: "" };
 
    expect(() => validateEmail(email)).toThrow('Invalid email');
  });

  it("email roules should exist", () => {
    expect(rules).toHaveProperty('email', 'required|email');
  });
  
 })