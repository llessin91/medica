# Manual de uso inicial

Entre com a conta administradora criada no Supabase. No painel privado, abra **Pacientes** para ver os registros ativos e arquivados.

## Cadastrar e editar

1. Em **Pacientes**, escolha **Novo paciente** ou **Cadastrar primeiro paciente**.
2. Informe o nome; data de nascimento e observações são opcionais. A cor de identificação começa em verde e pode ser personalizada. Evite guardar informações sensíveis que não sejam necessárias.
3. Salve o cadastro. Na lista de ativos, use **Editar** para atualizar um registro.

## Arquivar e restaurar

Use **Arquivar** na lista de pacientes ativos para retirar um registro da lista principal, preservando-o no banco. Abra a aba **Arquivados** para consultar esses registros e use **Restaurar** para devolvê-los à lista ativa. Esta interface não oferece exclusão definitiva.

Os registros são restritos pela política RLS ao proprietário autenticado. A interface não substitui a verificação dessas regras; confirme o isolamento com dados fictícios antes de inserir dados reais de saúde. Consulte os guias de configuração e segurança se o banco ainda não foi preparado.

A ferramenta é organizacional e não substitui um profissional de saúde.
