export function validateName(name: string): boolean {
  if (!name || name === "") return false;

  const regex = /^[A-Za-zåäöÅÄÖ]+$/;
  return regex.test(name);
}