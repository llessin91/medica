# Regras de negócio aprovadas

- O saldo real é formado por movimentações; não é sobrescrito.
- Consumo configurado serve para projeção e não desconta saldo por conta própria.
- Movimento comum que tornaria o saldo negativo é bloqueado. Divergência de conferência física é registrada como correção rastreável, com motivo e data.
- Erros em movimentos são corrigidos por reversão relacionada, não por apagamento silencioso.
- Compra produz movimento de entrada correspondente.
- As configurações prevalecem nesta ordem: medicamento → paciente → usuário global.
- Arquivar paciente oculta operações de rotina e interrompe alertas ativos, sem remover histórico.
- Receitas são independentes do estoque. A solicitação encerrará alerta de solicitação; acompanhamento necessita data própria.
- A V1 apresenta alertas dentro da aplicação, sem garantir execução ou envio em segundo plano.

## Previsão de autonomia
Dias completos = parte inteira de saldo disponível dividido pelo consumo diário, quando consumo é positivo. O saldo está disponível no começo da data de referência; essa data conta como primeiro dia. A previsão mostra o último dia com quantidade para uma dose completa. Se dias completos = 0, mostrar condição de insuficiência, não uma data normal. Consumo zero/desconhecido não produz data; uso eventual não tem previsão confiável.

Datas pessoais não devem deslocar-se por conversões de horário. Fuso padrão aprovado: `America/Sao_Paulo`, configurável.
