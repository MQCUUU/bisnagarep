import axios from 'axios';
import { supabaseAdmin } from './supabase.server';

const TMDB_BASE = process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? 'https://api.themoviedb.org/3';
const TMDB_KEY = process.env.TMDB_API_KEY;

if (!TMDB_KEY) throw new Error('TMDB_API_KEY missing');

async function getCached(tmdb_id: number, media_type: 'movie'|'tv') {
  const { data, error } = await supabaseAdmin
    .from('tmdb_cache')
    .select('payload, fetched_at, ttl_seconds')
    .eq('tmdb_id', tmdb_id)
    .eq('media_type', media_type)
    .limit(1)
    .single();
  if (error || !data) return null;
  const fetchedAt = new Date(data.fetched_at);
  const ttl = data.ttl_seconds ?? 86400;
  if ((Date.now() - fetchedAt.getTime()) / 1000 > ttl) {
    return null; // expired
  }
  return data.payload;
}

async function setCached(tmdb_id: number, media_type: 'movie'|'tv', payload: any) {
  const { error } = await supabaseAdmin
    .from('tmdb_cache')
    .upsert({ tmdb_id, media_type, payload, fetched_at: new Date() }, { onConflict: ['tmdb_id','media_type'] });
  if (error) {
    console.error('cache set error', error);
  }
}

export async function fetchTMDBDetails(tmdb_id: number, media_type: 'movie'|'tv') {
  const cached = await getCached(tmdb_id, media_type);
  if (cached) return cached;

  const url = `${TMDB_BASE}/${media_type}/${tmdb_id}`;
  const params = { api_key: TMDB_KEY, append_to_response: 'credits,images,external_ids' };
  const resp = await axios.get(url, { params });
  const payload = resp.data;
  await setCached(tmdb_id, media_type, payload);
  return payload;
}

export async function searchTMDB(query: string) {
  // NOTE: simple search, could call multi search endpoint
  const url = `${TMDB_BASE}/search/multi`;
  const params = { api_key: TMDB_KEY, query, include_adult: false, page: 1 };
  const resp = await axios.get(url, { params });
  return resp.data;
}
