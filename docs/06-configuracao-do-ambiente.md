# Configuração do ambiente

## Pré-requisitos
Node.js compatível com Next.js 15, npm e um projeto Supabase configurado.

## Variáveis
Copie `.env.example` para `.env.local` e preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` com os valores públicos do projeto. A chave anon não contorna RLS: todas as tabelas devem ter políticas corretas. Nunca usar chave `service_role` no cliente ou com prefixo `NEXT_PUBLIC_`.

Arquivos `.env*` são ignorados pelo Git, exceto o exemplo sem valores reais.

## Execução local
Instale dependências com `npm install`, aplique a migração da pasta `supabase/migrations` por um procedimento conferido na documentação atual, e execute `npm run dev`. Sem Supabase e variáveis válidas não há teste de autenticação ponta a ponta.

## Cuidado com dados
Use pacientes e credenciais fictícios nos ambientes de teste. Evite dados reais de saúde em logs, issues, screenshots ou commits. Proteja cópias exportadas como dados sensíveis.
