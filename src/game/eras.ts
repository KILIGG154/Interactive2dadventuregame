export const EraNames = ['Lý - Trần', 'Tây Sơn', 'Cận đại', 'Hiện đại'] as const;

export type EraName = (typeof EraNames)[number];

export function isEraName(value: string): value is EraName {
  return (EraNames as readonly string[]).includes(value);
}

