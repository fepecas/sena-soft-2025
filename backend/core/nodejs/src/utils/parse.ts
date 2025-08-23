export function parseCSVParam(value: unknown, max: number, paramName: string): string[] {
  if (typeof value !== 'string' || !value.trim()) return [];
  const parts = value.split(',').map(s => s.trim()).filter(Boolean);
  if (parts.length > max) {
    const err = new Error(`${paramName} admite máximo ${max} valores`);
    // @ts-ignore
    err.status = 400;
    throw err;
  }
  return parts;
}

export function parseLevels(value: unknown): string[] {
  if (!value) return ['B1','B2'];
  return parseCSVParam(value, 4, 'levels');
}