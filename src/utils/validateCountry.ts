export function validateCountry(country: string): boolean {
  const regex = /^[A-Za-z]+$/;
  return regex.test(country);
}