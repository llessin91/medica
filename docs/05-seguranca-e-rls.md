# Segurança e RLS

## Implementado
- Middleware e página protegida confirmam usuário com `auth.getUser()`.
- Login sem cadastro público pela interface.
- Tabela de pacientes com RLS habilitada e forçada.
- Políticas separadas de leitura, inserção e atualização, limitadas por `owner_user_id = auth.uid()`; a política UPDATE verifica tanto a linha antiga quanto o novo valor.
- Privilégios para `anon` revogados; leitura, inserção e atualização concedidas apenas a `authenticated` segundo as políticas. Exclusão definitiva não está concedida nem tem política nesta etapa, até existir confirmação reforçada e fluxo seguro.
- Campos de nome, observações e cor têm restrições básicas no banco.
- Segredos excluídos do controle de versão.

## Antes de usar dados reais
1. Desabilite cadastro público e crie a conta administradora de forma privada.
2. Aplique a migração e revise políticas no ambiente de destino.
3. Crie duas contas de teste e prove que a segunda não consegue ler nem modificar pacientes da primeira, inclusive via requisições diretas ao banco/API.
4. Configure callbacks e domínios permitidos conforme documentação oficial atual.
5. Verifique proteção contra abuso/login, recuperação de acesso e política de sessão.

Os testes automatizados desta fundação são estáticos; não executam RLS contra uma instância real. A política por proprietário é compatível com a conta única da V1 e prepara isolamento entre contas, mas cada paciente é administrado pela mesma conta; o isolamento de pacientes entre contas não se aplica como permissão separada neste desenho.
