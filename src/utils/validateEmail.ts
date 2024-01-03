import Validator from "validatorjs";

let rules = {
  email: "required|email",
};

export function validateEmail(input: { email: string }): boolean {
  let emailValidation = new Validator(input, rules);

  try {
    if (emailValidation.passes()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Validation error:", error);
    return false;
  }
}
