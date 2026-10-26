# Pacientes e permissões

A V1 prevê uma conta administradora e pacientes sem login. A interface permite cadastrar, listar, editar e arquivar/restaurar pacientes. A lista separa os registros ativos dos arquivados; o arquivamento preserva a linha e sua data de alteração. A exclusão definitiva não é oferecida na interface.

O cadastro contém nome (obrigatório; até 100 caracteres), data de nascimento (opcional), cor identificadora (verde por padrão, personalizável) e observações curtas (opcionais; até 500 caracteres). Minimize informações pessoais e de saúde; não use as observações para guardar conteúdo desnecessário.

As ações validam a sessão no servidor e usam somente a chave pública do Supabase. O banco limita leitura e escrita ao `owner_user_id = auth.uid()` via RLS. A aplicação não confia apenas em filtros da interface; a RLS continua sendo a barreira de isolamento.

Antes de usar com pessoas reais, aplique a migração e valide as políticas de leitura/escrita no projeto Supabase correto. Esta entrega não comprova, por si só, isolamento ponta a ponta no ambiente publicado; use apenas dados fictícios até concluir os testes com contas de teste distintas.
