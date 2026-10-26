import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Controle Pessoal de Medicamentos',
  description: 'Ferramenta privada de organização pessoal de medicamentos.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
