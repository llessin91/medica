# Arquitetura

## Recomendação aprovada
- Next.js com TypeScript para a aplicação web.
- Supabase Auth para login e PostgreSQL para persistência.
- RLS (Row Level Security, políticas de acesso aplicadas pelo banco) para limitar linhas ao usuário autenticado.
- GitHub para histórico do código e Vercel para hospedagem, a vincular externamente.

## Fundação implementada
Aplicação App Router, helper Supabase server-side, middleware que valida sessão com `auth.getUser()`, login por senha e painel privado mínimo. A migração inicial cria pacientes com proprietário explícito e políticas RLS por usuário.

## Segredos
Somente URL do Supabase e chave anon/public são lidas no navegador, com RLS habilitada. Chave service_role, senhas administrativas e tokens nunca podem usar prefixo `NEXT_PUBLIC_` nem ser commitados.

## Limites
Nenhuma integração externa foi vinculada. Nenhum agendamento, backup, recurso de plano ou execução de notificação é prometido. Confirmar a documentação e os limites atuais antes de implantar.
