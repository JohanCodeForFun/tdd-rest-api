export function validateCountry(country: string): boolean {
  if (!country || country === "") return false;

  const regex = /^[A-Za-zåäöÅÄÖ]+$/;
  return regex.test(country);
}