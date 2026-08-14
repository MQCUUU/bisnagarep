import { NextResponse } from 'next/server';
import { searchTMDB } from '@/lib/tmdb.server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  if (!q || q.length < 1) return NextResponse.json({ results: [] });

  try {
    const data = await searchTMDB(q);
    // map to light weight suggestion objects
    const results = (data.results || []).map((r: any) => ({
      id: r.id,
      type: r.media_type,
      title: r.title || r.name,
      original_title: r.original_title || r.original_name,
      year: (r.release_date || r.first_air_date || '').slice(0,4),
      poster: r.poster_path,
      backdrop: r.backdrop_path,
      overview: r.overview
    }));
    return NextResponse.json({ results });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
