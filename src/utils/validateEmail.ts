import * as Validator from 'validatorjs';

let rules = {
  email: 'required|email',
};

export function validateEmail(input: { email: string} ): boolean {

  let emailValidation = new Validator(input, rules);

  return emailValidation.passes();
}