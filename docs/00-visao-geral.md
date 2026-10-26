# Visão geral

## Propósito
Aplicação privada para uma pessoa administradora organizar informações de medicamentos de várias pessoas. É uma ferramenta de registro e organização, não de recomendação clínica.

## Estado atual
Etapa 3 — fundação técnica: esqueleto Next.js, fluxo básico de autenticação Supabase, rota privada e migração da entidade paciente com RLS. Ainda não há gestão funcional de pacientes nem de medicamentos/estoque.

## Componentes
- Next.js: aplicação web e renderização no servidor.
- Supabase Auth: autenticação.
- PostgreSQL/Supabase: persistência e autorização no banco por RLS.
- GitHub e Vercel: integração e implantação a configurar pelo proprietário.

## Dados e responsabilidade
Informações relacionadas à saúde são sensíveis. Use dados fictícios durante testes e só utilize dados reais depois de revisar as configurações e testar o isolamento.
