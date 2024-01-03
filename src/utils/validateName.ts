export function validateName(name: string): boolean {
  const regex = /^[A-Za-z]+$/;
  return regex.test(name);
}