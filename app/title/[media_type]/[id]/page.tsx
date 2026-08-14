import React from 'react';

type Props = { params: { media_type: string; id: string } };

export default async function TitlePage({ params }: Props) {
  const { media_type, id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/tmdb/${media_type}/${id}`);
  const json = await res.json();
  const data = json.data;
  // build page using data (poster, backdrop, credits, runtime, seasons, episodes etc.)
  return (
    <div className="pt-6">
      <div className="relative rounded overflow-hidden mb-6" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}/w780${data.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center', height: 360 }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="p-6 flex gap-6 relative z-10">
          <img src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}/w300${data.poster_path}`} className="w-48 rounded" />
          <div>
            <h2 className="text-3xl font-bold">{data.title || data.name} <span className="text-lg">({(data.release_date||data.first_air_date||'').slice(0,4)})</span></h2>
            <p className="text-sm text-[color:var(--muted)] mt-2">{data.overview}</p>
            <div className="mt-4 space-x-2">
              <button className="bg-[color:var(--accent)] px-4 py-2 rounded">Adicionar à minha biblioteca</button>
              <a href="#reviews" className="text-sm underline">Minhas avaliações</a>
            </div>
          </div>
        </div>
      </div>

      {/* Personal info area (status, favorite, rating, categories, review textarea) */}
      <section id="personal" className="bg-[color:var(--card)] p-4 rounded">
        <h3 className="font-semibold">Suas informações</h3>
        {/* status select, favorite toggle, rating input, categories list */}
      </section>

      {/* For TV: seasons and episodes */}
      {media_type === 'tv' && (
        <section className="mt-6">
          <h3 className="font-semibold">Temporadas</h3>
          {/* seasons mapping */}
        </section>
      )}
    </div>
  );
}
