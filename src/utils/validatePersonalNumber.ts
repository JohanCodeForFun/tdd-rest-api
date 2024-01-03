export function validatePersonalNumber(personalNumber: string) {
  const regex = /^\d{6}-\d{4}$/;
  return regex.test(personalNumber);
}