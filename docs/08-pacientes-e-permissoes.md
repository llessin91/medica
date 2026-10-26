# Pacientes e permissões

A V1 prevê uma conta administradora e pacientes sem login. Nesta fundação, foi criada apenas a estrutura do registro e a política por proprietário; a interface de gestão ainda não foi implementada.

Arquivamento será representado por `archived_at`, preservando a linha. Exclusão definitiva existe apenas como capacidade de banco nesta etapa e deve permanecer indisponível na interface até que confirmação reforçada, remoção relacionada e exportação sejam implementadas.

Não criar pacientes reais até aplicar e testar RLS. A conta proprietária deve ser criada privadamente; não habilitar cadastro público.
