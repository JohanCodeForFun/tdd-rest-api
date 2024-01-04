import Validator from "validatorjs";

export let rules = {
  email: "required|email",
};

export function validateEmail(input: { email: string }): boolean {
  let emailValidation = new Validator(input, rules);

  if (!emailValidation.passes()) {
    throw new Error('Invalid email');
  }

  return true;
}
