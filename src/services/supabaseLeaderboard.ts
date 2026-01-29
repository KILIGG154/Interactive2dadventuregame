import type { LeaderboardEntry } from '../types/game';
import { SUPABASE_CONFIG, SUPABASE_TABLE_NAME } from '../config/supabase';

export async function fetchLeaderboardFromSupabase(): Promise<LeaderboardEntry[]> {
  if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
    console.warn('[Supabase] Config missing, returning empty leaderboard');
    return [];
  }

  try {
    const url = `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_TABLE_NAME}?select=*&order=score.desc,timestamp.asc&limit=20`;
    console.log('[Supabase] Fetching leaderboard from:', url);
    
    const response = await fetch(url, {
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Supabase] Failed to fetch leaderboard: ${response.status}`, errorText);
      throw new Error(`Failed to fetch leaderboard: ${response.status}`);
    }

    const data = await response.json();
    const entries = (data || []).map((entry: any) => ({
      name: entry.name,
      score: entry.score,
      level: entry.level,
      timestamp: entry.timestamp || Date.now(),
    }));
    
    console.log(`[Supabase] Loaded ${entries.length} leaderboard entries`);
    return entries;
  } catch (error) {
    console.error('[Supabase] Error fetching leaderboard:', error);
    return [];
  }
}

export async function addLeaderboardEntryToSupabase(entry: LeaderboardEntry): Promise<boolean> {
  if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
    console.warn('[Supabase] Config missing, skipping save');
    return false;
  }

  try {
    const url = `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_TABLE_NAME}`;
    console.log('[Supabase] Adding leaderboard entry:', entry);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Supabase] Failed to add entry: ${response.status}`, errorText);
      return false;
    }

    console.log('[Supabase] Successfully added leaderboard entry');
    return true;
  } catch (error) {
    console.error('[Supabase] Error adding leaderboard entry:', error);
    return false;
  }
}
