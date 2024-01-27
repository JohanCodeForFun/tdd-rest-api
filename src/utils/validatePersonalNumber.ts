export function validatePersonalNumber(personal_number: string): boolean {
  if (!personal_number || personal_number === "") return false;

  const regex = /^\d{6}-\d{4}$/;
  return regex.test(personal_number);
}