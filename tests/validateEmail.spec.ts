describe('validate email tests', () => { 
  it("test for valid email", () => {
    const email = "anna.andersson@gmail.com";

    const result = validateEmail(email);

    expect(result).toBe(true);
  });

  it("test for invalid email", () => {
    const emailA = "";
    const emailB = "anna.andersson";
    const emailC = "anna.andersson@gmail";
    const emailD = "@gmail.com";

    const resultA = validateEmail(emailA);
    const resultB = validateEmail(emailB);
    const resultC = validateEmail(emailC);
    const resultD = validateEmail(emailD);

    expect(resultA).toBe(false);
    expect(resultB).toBe(false);
    expect(resultC).toBe(false);
    expect(resultC).toBe(false);
  });
  
 })