import type { LeaderboardEntry } from '../types/game';

export type NameValidationErrorCode = 'too_short' | 'too_long' | 'duplicate' | 'profanity';

export interface NameValidationResult {
  valid: boolean;
  normalizedName?: string;
  errorCode?: NameValidationErrorCode;
}

function normalizeWhitespace(raw: string): string {
  return raw.replace(/\s+/g, ' ').trim();
}

function stripDiacritics(input: string): string {
  return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const PROFANITY_KEYWORDS = [
  'fuck',
  'shit',
  'bitch',
  'sex',
  'xxx',
  'dm',
  'ditme',
  'dit me',
  'dmm',
  'dcm',
  'du ma',
  'duma',
  'clmm',
  'lol',
  'cc',
  'lon',
  'buoi',
];

export function validatePlayerName(
  rawName: string,
  existingEntries: LeaderboardEntry[],
): NameValidationResult {
  const normalized = normalizeWhitespace(rawName);

  if (normalized.length < 2) {
    return { valid: false, errorCode: 'too_short' };
  }

  if (normalized.length > 20) {
    return { valid: false, errorCode: 'too_long' };
  }

  const lowered = normalized.toLowerCase();
  const loweredNoDiacritics = stripDiacritics(lowered);

  const hasDuplicate = existingEntries.some((entry) => {
    const entryName = normalizeWhitespace(entry.name);
    return entryName.toLowerCase() === lowered;
  });

  if (hasDuplicate) {
    return { valid: false, errorCode: 'duplicate' };
  }

  const hasProfanity = PROFANITY_KEYWORDS.some((keyword) =>
    loweredNoDiacritics.includes(stripDiacritics(keyword.toLowerCase())),
  );

  if (hasProfanity) {
    return { valid: false, errorCode: 'profanity' };
  }

  return {
    valid: true,
    normalizedName: normalized,
  };
}

