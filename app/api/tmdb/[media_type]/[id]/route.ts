import { NextResponse } from 'next/server';
import { fetchTMDBDetails } from '@/lib/tmdb.server';

export async function GET(req: Request, { params }: { params: { media_type: string; id: string } }) {
  const { media_type, id } = params;
  if (!['movie', 'tv'].includes(media_type)) return NextResponse.json({ error: 'invalid type' }, { status: 400 });
  const tmdbId = Number(id);
  try {
    const data = await fetchTMDBDetails(tmdbId, media_type as 'movie'|'tv');
    return NextResponse.json({ data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
