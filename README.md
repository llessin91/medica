# Controle Pessoal de Medicamentos

Aplicação privada de organização pessoal. A V1 destina-se a uma única conta administradora; pacientes não têm login. O sistema não fornece recomendações clínicas nem orienta alterações de tratamento.

## Situação desta entrega

Inclui Next.js, TypeScript, login Supabase Auth, área protegida, cadastro/listagem/edição/arquivamento e restauração de pacientes, migração da tabela com RLS e documentação de configuração. A interface não oferece exclusão definitiva. Medicamentos, estoque, compras, receitas, calendário funcional e alertas externos continuam fora desta etapa.

A conexão com GitHub, Vercel e Supabase, os segredos e a execução da migração são geridos pelo proprietário nas respetivas contas. Nenhuma credencial foi incluída.

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

Sem as variáveis e um projeto Supabase configurado, login e dados persistidos não podem ser testados de ponta a ponta.

## Segurança essencial

- RLS da tabela `patients` limita operações a `owner_user_id = auth.uid()`.
- As páginas protegidas validam o usuário no servidor; o middleware atualiza a sessão e protege a navegação.
- As ações de pacientes validam o usuário antes de alterar dados, atribuem a propriedade no servidor, e não oferecem exclusão definitiva.
- A segurança do banco não depende somente do middleware nem dos filtros da interface.
- Restrinja a criação de usuários administradores; não habilite cadastro público para a V1.
- Configure URLs de callback e domínios confiáveis conforme a documentação atual do Supabase e da Vercel.
- Nunca envie credenciais, tokens, dados reais de saúde ou arquivos `.env*` para o GitHub.

## Implantação

O repositório e os projetos do GitHub, Vercel e Supabase não são vinculados automaticamente por esta aplicação. Crie e vincule as contas manualmente; configure as mesmas variáveis apenas no ambiente necessário e aplique migrações após revisão. Confirme limites, backups, retenção e custos diretamente nas condições atuais dos serviços antes de inserir dados reais.

## Verificações

Execute `npm run check` para as verificações estáticas da fundação e do módulo de pacientes; `npm run build` verifica a compilação. As verificações estáticas confirmam estruturas e regras selecionadas, mas não substituem o teste real das políticas RLS com contas Supabase distintas, uma auditoria de segurança ou o teste de implantação.

A correção de compilação tipa `cookiesToSet` explicitamente com `CookieOptions`, exportado por `@supabase/ssr` na versão 0.6.1 usada pelo projeto. Em ambiente anterior, a instalação das dependências foi interrompida por uma limitação do sistema de arquivos (`ENOSYS` ao renomear um pacote), e o build de produção ficou pendente de confirmação. Após baixar esta entrega, execute `npm ci` e `npm run build` ou confira o deploy na Vercel antes de inserir dados reais.

Veja `docs/06-configuracao-do-ambiente.md`, `docs/07-github-vercel-supabase.md`, `docs/08-pacientes-e-permissoes.md` e `docs/14-manual-de-uso.md`.
