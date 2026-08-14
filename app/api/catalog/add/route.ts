import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase.server';

export async function POST(req: Request) {
  const body = await req.json();
  const { user_id, tmdb_id, media_type } = body;
  if (!user_id || !tmdb_id || !media_type) return NextResponse.json({ error: 'missing' }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from('user_catalog')
    .insert({ user_id, tmdb_id, media_type })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ catalog: data });
}
