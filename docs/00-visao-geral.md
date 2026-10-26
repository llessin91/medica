# Visão geral

## Propósito
Aplicação privada para uma pessoa administradora organizar informações de medicamentos de várias pessoas. É uma ferramenta de registro e organização, não de recomendação clínica.

## Estado atual
Etapa 4 — módulo inicial de pacientes: cadastro, listagem de registros ativos e arquivados, edição de cadastros ativos, arquivamento e restauração. A exclusão definitiva não está disponível na interface. Medicamentos e estoque ainda não fazem parte desta etapa.

## Componentes
- Next.js: aplicação web e renderização no servidor.
- Supabase Auth: autenticação.
- PostgreSQL/Supabase: persistência e autorização no banco por RLS.
- GitHub e Vercel: integração e implantação geridas pelo proprietário.

## Dados e responsabilidade
Informações relacionadas à saúde são sensíveis. Use dados fictícios durante testes e só utilize dados reais depois de revisar as configurações e testar o isolamento.
