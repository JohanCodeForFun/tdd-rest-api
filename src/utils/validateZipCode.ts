export function validateZipCode(zipCode: string): boolean {
  const regex = /^\d{3} \d{2}$/;
  return regex.test(zipCode);
}