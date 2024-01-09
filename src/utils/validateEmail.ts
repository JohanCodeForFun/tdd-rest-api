// import Validator from "validatorjs";

// export let rules = {
//   email: "required|email",
// };

export function validateEmail(email: string): boolean {
  // let emailValidation = new Validator(input, rules);

  // if (!emailValidation.passes()) {
  //   throw new Error('Invalid email');
  // }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  return isValidEmail;
}
