'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!q) return setResults([]);
      const res = await axios.get(`/api/search?q=${encodeURIComponent(q)}`);
      setResults(res.data.results || []);
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div>
      <div className="mb-6">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="O que você quer adicionar?" className="w-full p-3 rounded bg-[color:var(--card)]" />
      </div>
      <div>
        {results.map(r => (
          <a key={`${r.type}-${r.id}`} href={`/title/${r.type}/${r.id}`} className="flex items-center gap-4 p-3 hover:bg-slate-800 rounded">
            <img src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}/w154${r.poster}`} alt="" className="w-16 rounded" />
            <div>
              <div className="font-semibold">{r.title} <span className="text-sm text-muted">({r.year})</span></div>
              <div className="text-sm text-[color:var(--muted)]">{r.overview?.slice(0,120)}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
