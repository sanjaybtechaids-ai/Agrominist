export type AreaUnit = 'acre' | 'cent' | 'hectare';

const ACRE_PER_UNIT: Record<AreaUnit, number> = { acre: 1, cent: 0.01, hectare: 2.47105 };

export function toAcres(value: number, unit: AreaUnit): number {
  if (!Number.isFinite(value) || value <= 0) throw new Error('Area must be greater than zero.');
  return value * ACRE_PER_UNIT[unit];
}

export function fromAcres(acres: number, unit: AreaUnit): number {
  return acres / ACRE_PER_UNIT[unit];
}

export function roundArea(value: number): number {
  return Math.round(value * 10000) / 10000;
}
