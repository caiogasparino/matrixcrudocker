export function parseProfession(profession: any) {
  return String(profession)
    .split(',')
    .map((specialty) => specialty.trim());
}
