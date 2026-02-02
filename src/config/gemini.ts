/**
 * Google AI (Gemini) API key for philosophy Q&A.
 * Set VITE_GOOGLE_AI_API_KEY in .env (see .env.example).
 */
const env = typeof import.meta !== 'undefined' ? (import.meta as { env?: { VITE_GOOGLE_AI_API_KEY?: string } }).env : undefined;
export const GEMINI_API_KEY = env?.VITE_GOOGLE_AI_API_KEY ?? '';

export const hasGeminiKey = (): boolean => !!GEMINI_API_KEY?.trim();
