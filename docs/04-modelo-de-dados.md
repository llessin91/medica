# Modelo de dados — fundação

A única entidade criada nesta etapa é `patients`:
- Identificador UUID.
- Proprietário (`owner_user_id`) relacionado à conta autenticada.
- Nome/apelido obrigatório.
- Data de nascimento, cor e observações opcionais.
- Estado arquivado por timestamp; datas de criação/atualização.

RLS restringe SELECT/INSERT/UPDATE/DELETE ao proprietário autenticado. FK com `auth.users` usa remoção em cascata da conta. A tabela é forçada sob RLS.

A especificação conceitual também prevê medicamentos, versões de consumo, movimentações, compras, receitas, preferências, eventos e auditoria. Nenhuma dessas entidades foi criada nesta fundação. As relações completas e constraints deverão ser especificadas antes de cada implementação funcional.
