# 👽 Balanço Financeiro - Área 51

Sistema web de controle financeiro desenvolvido para a gestão de caixa da República Área 51. O projeto visa automatizar cálculos de divisões orçamentárias, controle de dívidas e previsão de gastos para eventos (Aniversário).

## Funcionalidades

- Cálculo Automático de Orçamento
  - O sistema calcula o dinheiro "líquido" da república subtraindo o fundo do Aniversário do valor total.
  - Divisão Inteligente: O valor restante é automaticamente dividido em:
    - 40% para Fundo de Emergência.
    - 60% para Reformas Internas.
- Gestão de Fluxo de Caixa:
  - Registro de Entradas (dinheiro novo).
  - Registro de Saídas (pagamentos de contas, reformas ou emergências).
  - Controle de Dívidas (pagamentos recebidos de moradores/ex-moradores).
- Persistência de Dados:
  - Utiliza localStorage para salvar automaticamente todas as transações e valores. Os dados não somem se você fechar o navegador.
- Regras de Negócio Específicas:
  - Lógica para teto de arrecadação do Aniversário (R$ 3.400,00).
  - Botão de "Reset Geral" para zerar o balanço.

Tecnologias Utilizadas:

- HTML5
- CSS3
- JavaScript

## Como usar

1. Valores Iniciais: Ao abrir pela primeira vez, insira o valor total em caixa, o valor já arrecadado para o aniversário e o total de dívidas a receber.
2. **Adicionar Transações:**
   - Use os formulários de "Entrada", "Saída" ou "Dívidas" para registrar movimentações.
   - O sistema atualiza os cards superiores automaticamente.
3. Resetar: Caso precise começar um mês do zero ou corrigir erros graves, use o botão "Resetar Progresso" no final da página.

 Acesso ao Projeto
    https://heitor-knupp.github.io/Financa/
