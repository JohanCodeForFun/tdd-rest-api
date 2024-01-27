export function validatePersonalNumber(personalNumber: string): boolean {
  if (!personalNumber || personalNumber === "") return false;

  const regex = /^\d{6}-\d{4}$/;
  return regex.test(personalNumber);
}