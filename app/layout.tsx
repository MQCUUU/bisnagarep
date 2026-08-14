import './globals.css';
import { ReactNode } from 'react';

export const metadata = { title: 'MyFlixCatalog' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-[color:var(--bg)] min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <header className="py-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">MyFlixCatalog</h1>
            <nav>
              <a href="/search" className="mr-4">Pesquisar</a>
              <a href="/stats" className="mr-4">Estatísticas</a>
              <a href="/profile">Perfil</a>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
