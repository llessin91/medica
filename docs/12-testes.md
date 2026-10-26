# Testes

Disponível nesta fundação: `npm run check:foundation`, verificações estáticas de existência de políticas RLS, uso de usuário autenticado, rota protegida e ausência de segredo no exemplo de ambiente.

Ainda pendente: instalar dependências e executar build/TypeScript; testar login com Supabase de verdade; teste RLS com duas contas; revisar callbacks, sessões e deployment. O teste estático não prova que as políticas se comportam corretamente no projeto Supabase.

Plano obrigatório futuro: isolamento entre contas e vínculos de pacientes; CRUD com RLS; movimentações e reversões; projeções/datas/fuso; receitas/eventos; duplicidade/falha de envio; arquivamento/exclusão/exportação.
