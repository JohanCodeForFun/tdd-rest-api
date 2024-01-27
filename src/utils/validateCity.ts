export function validateCity(city: string): boolean {
  if (!city || city === "") return false;

  const regex = /^[A-Za-zåäöÅÄÖ]+$/;
  return regex.test(city);
}