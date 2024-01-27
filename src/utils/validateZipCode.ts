export function validateZipCode(zipcode: string): boolean {
  if (!zipcode || zipcode === "") return false;

  const regex = /^\d{3} \d{2}$/;
  return regex.test(zipcode);
}