# Estoque e cálculos

Nenhuma tabela ou interface de estoque foi criada nesta etapa. A regra aprovada para as etapas futuras é manter saldo por movimentações rastreáveis e bloquear um movimento comum que resulte em saldo negativo. Divergência de conferência física será uma correção com motivo; erro de lançamento, uma reversão relacionada.

Consumo configurado não altera o saldo real. A projeção usará precisão decimal e uma regra central única. Dias completos são `floor(saldo / consumo diário)` para consumo positivo. A data de referência conta como primeiro dia com estoque disponível no começo do dia; a previsão é o último dia com dose completa. Uso eventual ou consumo desconhecido não gera data confiável.

Testes futuros devem cobrir saldo insuficiente, frações permitidas, entradas, consumo, correções, reversões, mudanças de consumo com vigência, reconstrução histórica, fim de mês, ano bissexto, virada do ano e fuso horário.
