export function validateAddress(address: string): boolean {
  if (!address || address === "") return false;

  const regex = /^.*\s\d+$/;
  return regex.test(address);
}