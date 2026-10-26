# Conceito e requisitos aprovados

## Objetivo
Organização pessoal de medicamentos para múltiplos pacientes administrados por uma única conta. Não diagnostica, prescreve nem recomenda alteração de tratamento.

## V1 aprovada
- Conta administradora única; pacientes sem login.
- Dados separados por paciente.
- Login e rotas privadas; políticas RLS no banco.
- Pacientes com arquivamento sem apagar histórico e exclusão confirmada.
- Estoque por movimentações rastreáveis, compras e correções.
- Consumo diário fixo apenas para projeções; uso eventual sem previsão confiável.
- Receitas e alertas internos independentes da previsão de estoque.
- Exportação e histórico.

## Fora da primeira entrega técnica
Web Push, Telegram, PWA, lotes/validade de lotes, anexos, logins compartilhados e módulos funcionais de domínio até aprovação da respectiva etapa incremental.

## Aprovações
A especificação da Etapa 2 foi aprovada. Movimentação comum que leve o saldo abaixo de zero deve ser bloqueada; divergência física é registrada como correção rastreável.
