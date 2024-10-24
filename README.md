# Projeto de Extração de Tickets da API TomTicket

Este projeto tem como objetivo extrair dados de tickets da API do TomTicket e salvá-los em um arquivo JSON. Ele verifica se já existe um arquivo com tickets salvos e o atualiza com os novos tickets, evitando duplicações.

## Requisitos

- Node.js
- Um arquivo `tickets.json` (caso ainda não exista, será criado automaticamente)

## Instalação

1. Clone o repositório para sua máquina local:
   ```bash
   git clone https://github.com/toyomori-dev/ExtracaoTomticket
Navegue até a pasta do projeto:


cd <nome-do-projeto>
Instale as dependências necessárias:

npm install node-fetch
Uso
Substitua o valor API-KEY-TOMTICKET no código pela sua chave de API do TomTicket.

Execute o script para iniciar a extração:
node script.js
Os dados serão salvos em um arquivo tickets.json na mesma pasta do script.

Funcionamento
O script faz requisições à API do TomTicket para obter tickets, página por página.
Verifica se os tickets já estão presentes no arquivo tickets.json. Se sim, atualiza; se não, adiciona novos.
O script espera 1 segundo entre cada requisição para evitar ser bloqueado por limite de taxa.
O progresso é salvo após cada página de tickets baixada.
Contribuição
Sinta-se à vontade para contribuir com melhorias para este projeto. Basta fazer um fork e submeter um pull request com suas alterações.
