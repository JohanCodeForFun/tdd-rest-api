export function validateAddress(address: string): boolean {
  const regex = /^.*\s\d+$/;
  return regex.test(address);
}