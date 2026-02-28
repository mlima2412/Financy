/** Strip explicit null values from an object so Prisma ignores unset fields. */
export function stripNulls<T extends object>(
  obj: T
): { [K in keyof T]: Exclude<T[K], null> } {
  const result = {} as Record<string, unknown>;
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null) {
      result[key] = value;
    }
  }
  return result as { [K in keyof T]: Exclude<T[K], null> };
}
