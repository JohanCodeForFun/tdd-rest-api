export function validateCity(city: string): boolean {
  if (!city || city === "") return false;

  const regex = /^[A-Za-z]+$/;
  return regex.test(city);
}