export function validateZipCode(zipCode: string): boolean {
  if (!zipCode || zipCode === "") return false;

  const regex = /^\d{3} \d{2}$/;
  return regex.test(zipCode);
}