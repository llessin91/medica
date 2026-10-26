# Controle Pessoal de Medicamentos

Base técnica aprovada para uma aplicação pessoal de organização. A V1 destina-se a uma única conta administradora. Pacientes não têm login. O sistema não fornece recomendações clínicas nem orienta alterações de tratamento.

## Situação desta entrega

Inclui o esqueleto da aplicação Next.js, tela de login por Supabase Auth, área protegida, uma migração inicial da tabela de pacientes com RLS e documentação de configuração. Não inclui cadastro/edição de pacientes, medicamentos, estoque, receitas, calendário funcional, alertas externos ou PWA.

A conexão com GitHub, Vercel e Supabase, os segredos e a execução da migração precisam ser configurados pelo proprietário nas respectivas contas. Nenhuma credencial foi incluída.

## Pré-requisitos

- Node.js 22 ou versão compatível com Next.js 15.
- Projeto Supabase criado e acessível.
- Conta administradora criada no Supabase Auth de forma privada; o aplicativo não oferece cadastro público.

## Executar localmente

1. Copie `.env.example` para `.env.local`.
2. Preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` com os valores públicos do seu projeto Supabase. A chave anon/public foi concebida para uso no cliente, mas só é segura em conjunto com RLS correto. Nunca coloque `service_role` ou outro segredo em variável `NEXT_PUBLIC_*`.
3. Instale as dependências com `npm install`.
4. Aplique `supabase/migrations/20261026000100_create_patients.sql` ao projeto Supabase usando o fluxo de migrações escolhido e conferido na documentação oficial.
5. Execute `npm run dev` e abra o endereço local informado pelo Next.js.

Sem as variáveis e um projeto Supabase configurado, login e área protegida não podem ser testados de ponta a ponta.

## Segurança essencial

- RLS da tabela `patients` limita operações a `owner_user_id = auth.uid()`.
- A tela protegida valida o usuário no servidor; o middleware atualiza a sessão e protege a navegação.
- A segurança do banco não depende somente do middleware.
- Restrinja a criação de usuários administradores; não habilite cadastro público para a V1.
- Configure URLs de callback e domínios confiáveis conforme a documentação atual do Supabase e da Vercel.
- Nunca envie credenciais, tokens, dados reais de saúde ou arquivos `.env*` para o GitHub.

## Implantação

O repositório e os projetos do GitHub, Vercel e Supabase não são vinculados automaticamente por este scaffold. Crie e vincule as contas manualmente; configure as mesmas variáveis apenas no ambiente necessário e aplique migrações após revisão. Confirme limites, backups, retenção e custos diretamente nas condições atuais dos serviços antes de inserir dados reais.

## Verificações

`npm run check:foundation` realiza verificações estáticas básicas do esqueleto e da migração. Isso **não substitui** uma execução real de teste RLS com duas contas Supabase distintas, nem auditoria de segurança ou teste de implantação.

Veja `docs/06-configuracao-do-ambiente.md`, `docs/07-github-vercel-supabase.md` e `docs/05-seguranca-e-rls.md`.
