# Registro de decisões

## Aprovadas pelo usuário
- Conta administradora única na V1; pacientes não têm login.
- Separação dos dados por paciente e requisitos de RLS.
- Fuso padrão `America/Sao_Paulo`, configurável; datas pessoais sem deslocamento por conversão.
- Saldo real somente por movimentações; consumo configurado alimenta projeções, não baixa estoque automaticamente.
- Bloquear movimentação comum que levaria a saldo negativo; divergência física exige correção rastreável.
- Reversão rastreável para corrigir lançamento incorreto.
- Previsão indica último dia com quantidade para dose completa; data de referência é o primeiro dia disponível.
- Alertas externos, PWA e controle de lotes não entram na fundação.

## Implementação da fundação
- Next.js/TypeScript, Supabase Auth/PostgreSQL, Vercel e GitHub recomendados.
- Nenhuma conta ou integração externa foi criada pelo assistente.
- Tabela `patients` é o único esquema inicial persistido; demais módulos aguardam suas etapas.
