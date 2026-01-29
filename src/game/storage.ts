import type { Checkpoint, LeaderboardEntry, PlayerProgress, PlayerProfile } from '../types/game';
import { fetchLeaderboardFromSupabase, addLeaderboardEntryToSupabase } from '../services/supabaseLeaderboard';

const KEYS = {
  progress: 'pbvn_progress_v1',
  checkpoints: 'pbvn_checkpoints_v1',
  leaderboard: 'pbvn_leaderboard_v1',
  leaderboardSubmitted: 'pbvn_leaderboard_submitted_v1',
  playerProfile: 'pbvn_player_profile_v1',
} as const;

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function safeParseJson<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadProgress(): PlayerProgress | null {
  if (!isBrowser()) return null;
  const parsed = safeParseJson<Partial<PlayerProgress>>(window.localStorage.getItem(KEYS.progress));
  if (!parsed) return null;
  if (typeof parsed.currentCheckpoint !== 'string') return null;
  if (!Array.isArray(parsed.completedCheckpoints)) return null;
  if (typeof parsed.score !== 'number') return null;
  if (typeof parsed.level !== 'number') return null;
  if (!Array.isArray(parsed.achievements)) return null;

  return {
    currentCheckpoint: parsed.currentCheckpoint,
    completedCheckpoints: parsed.completedCheckpoints as string[],
    score: parsed.score,
    level: parsed.level,
    achievements: parsed.achievements as string[],
    noPointCheckpoints: Array.isArray(parsed.noPointCheckpoints) ? (parsed.noPointCheckpoints as string[]) : [],
  };
}

export function saveProgress(progress: PlayerProgress) {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEYS.progress, JSON.stringify(progress));
}

export function loadCheckpoints(): Checkpoint[] | null {
  if (!isBrowser()) return null;
  const parsed = safeParseJson<Checkpoint[]>(window.localStorage.getItem(KEYS.checkpoints));
  if (!parsed || !Array.isArray(parsed)) return null;
  return parsed;
}

export function saveCheckpoints(checkpoints: Checkpoint[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEYS.checkpoints, JSON.stringify(checkpoints));
}

// Helper function để load sync từ localStorage (fallback)
function loadLeaderboardSync(): LeaderboardEntry[] {
  if (!isBrowser()) return [];
  const parsed = safeParseJson<LeaderboardEntry[]>(window.localStorage.getItem(KEYS.leaderboard));
  if (!parsed || !Array.isArray(parsed)) return [];
  return parsed
    .filter((e) => e && typeof e.name === 'string' && typeof e.score === 'number' && typeof e.level === 'number')
    .map((e) => ({
      name: e.name,
      score: e.score,
      level: e.level,
      timestamp: typeof e.timestamp === 'number' ? e.timestamp : Date.now(),
    }));
}

export async function loadLeaderboard(): Promise<LeaderboardEntry[]> {
  if (!isBrowser()) return [];
  
  // Thử load từ Supabase trước
  try {
    const supabaseEntries = await fetchLeaderboardFromSupabase();
    console.log(
      `[Storage] Loaded ${supabaseEntries.length} leaderboard entries from Supabase, syncing to localStorage`
    );
    // Đồng bộ localStorage theo Supabase (kể cả rỗng) để tránh trộn dữ liệu cũ gây duplicate
    saveLeaderboard(supabaseEntries);
    return supabaseEntries;
  } catch (error) {
    console.error('[Storage] Failed to load from Supabase, falling back to localStorage:', error);
  }
  
  // Fallback về localStorage nếu Supabase fail hoặc không có data
  const localEntries = loadLeaderboardSync();
  console.log(`[Storage] Loaded ${localEntries.length} entries from localStorage`);
  return localEntries;
}

export function saveLeaderboard(entries: LeaderboardEntry[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEYS.leaderboard, JSON.stringify(entries));
}

export async function addLeaderboardEntry(entry: LeaderboardEntry, maxEntries = 20): Promise<LeaderboardEntry[]> {
  console.log('[Storage] Adding leaderboard entry:', entry);
  
  // Load current leaderboard trước để merge nếu cần
  const current = loadLeaderboardSync();
  
  // Gửi lên Supabase
  const supabaseSuccess = await addLeaderboardEntryToSupabase(entry);
  
  // Reload từ Supabase để lấy bảng xếp hạng mới nhất
  if (supabaseSuccess) {
    try {
      // Đợi một chút để đảm bảo Supabase đã lưu xong (có thể có delay)
      await new Promise(resolve => setTimeout(resolve, 500));
      const updated = await fetchLeaderboardFromSupabase();
      if (updated.length > 0) {
        console.log('[Storage] Reloaded leaderboard from Supabase after adding entry');
        // Lưu vào localStorage để backup
        saveLeaderboard(updated.slice(0, maxEntries));
        return updated.slice(0, maxEntries);
      } else {
        console.log('[Storage] Supabase returned empty after add, merging with current entries');
        // Nếu Supabase trả về empty (có thể do RLS hoặc delay), merge với current và entry mới
        const merged = [...current, entry]
          .sort((a, b) => (b.score !== a.score ? b.score - a.score : a.timestamp - b.timestamp))
          .slice(0, maxEntries);
        saveLeaderboard(merged);
        return merged;
      }
    } catch (error) {
      console.error('[Storage] Failed to reload from Supabase after adding entry:', error);
      // Fallback: merge với current và entry mới
      const merged = [...current, entry]
        .sort((a, b) => (b.score !== a.score ? b.score - a.score : a.timestamp - b.timestamp))
        .slice(0, maxEntries);
      saveLeaderboard(merged);
      return merged;
    }
  }
  
  // Fallback về logic cũ nếu Supabase không hoạt động
  console.log('[Storage] Using localStorage fallback for leaderboard');
  const next = [...current, entry]
    .sort((a, b) => (b.score !== a.score ? b.score - a.score : a.timestamp - b.timestamp))
    .slice(0, maxEntries);
  saveLeaderboard(next);
  return next;
}

export function loadLeaderboardSubmitted(): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(KEYS.leaderboardSubmitted) === '1';
}

export function saveLeaderboardSubmitted(value: boolean) {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEYS.leaderboardSubmitted, value ? '1' : '0');
}

export function loadPlayerProfile(): PlayerProfile | null {
  if (!isBrowser()) return null;
  const parsed = safeParseJson<Partial<PlayerProfile>>(window.localStorage.getItem(KEYS.playerProfile));
  if (!parsed) return null;
  if (typeof parsed.name !== 'string') return null;
  if (typeof parsed.createdAt !== 'number') return null;

  return {
    name: parsed.name,
    createdAt: parsed.createdAt,
  };
}

export function savePlayerProfile(profile: PlayerProfile) {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEYS.playerProfile, JSON.stringify(profile));
}

