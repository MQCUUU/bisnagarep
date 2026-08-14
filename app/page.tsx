import React from 'react';

export default async function DashboardPage() {
  // server component: podemos buscar dados do usuário via supabaseAdmin se houver cookie/session
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4">Olá!</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-[color:var(--card)] rounded">Assistidos<br/><strong>161</strong></div>
        <div className="p-4 bg-[color:var(--card)] rounded">Assistindo<br/><strong>3</strong></div>
        <div className="p-4 bg-[color:var(--card)] rounded">Quero assistir<br/><strong>47</strong></div>
        <div className="p-4 bg-[color:var(--card)] rounded">Favoritos<br/><strong>28</strong></div>
      </div>

      <section className="mb-8">
        <h3 className="text-xl font-medium mb-2">Continuar assistindo</h3>
        <div className="flex gap-4 overflow-x-auto">
          {/* cards */}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-medium mb-2">Últimos adicionados</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* cards */}
        </div>
      </section>
    </section>
  );
}
