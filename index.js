// Importa o módulo 'node-fetch' para fazer chamadas à API e 'fs' para manipular arquivos
const fetch = require('node-fetch');
const fs = require('fs');

// URL da API do TomTicket com a chave de API específica
const API_URL = 'API-KEY-TOMTICKET';

// Inicializa um array para armazenar todos os tickets
let allTickets = [];

// Verifica se o arquivo 'tickets.json' já existe e carrega os dados existentes
if (fs.existsSync('tickets.json')) {
  const fileContents = fs.readFileSync('tickets.json');
  allTickets = JSON.parse(fileContents);  // Converte os dados para um array de tickets
}

// Função assíncrona para obter tickets da API
async function getTickets() {
  let page = 1;  // Começa da primeira página
  let totalPages = 1;  // Inicialmente, assume-se que há apenas uma página

  // Laço para percorrer as páginas até a última
  while (page <= totalPages) {
    console.log(`Buscando página ${page}`);
    
    // Faz a requisição para a API com a página atual
    const response = await fetch(`${API_URL}/${page}`);
    const data = await response.json();  // Converte a resposta para JSON

    // Verifica se os dados existem e se são um array
    if (data && data.data && Array.isArray(data.data)) {
      // Percorre cada ticket retornado pela API
      for (const ticket of data.data) {
        // Verifica se o ticket já existe no array
        const ticketIndex = allTickets.findIndex(ticketItem => ticketItem.idchamado === ticket.idchamado);

        // Se o ticket já existir, atualiza os dados; senão, adiciona ao array
        if (ticketIndex !== -1) {
          console.log(`Atualizando ticket: ${ticket.idchamado}`);
          allTickets[ticketIndex] = ticket;
        } else {
          console.log(`Adicionando novo ticket: ${ticket.idchamado}`);
          allTickets.push(ticket);
        }
      }
    } else {
      console.log('Nenhum ticket encontrado');
      break;  // Sai do laço se não houver mais dados
    }

    // Calcula o número total de páginas baseado no total de itens retornado pela API
    if (data && data.total_itens) {
      totalPages = Math.ceil(data.total_itens / 50);  // Considera 50 itens por página
    }

    // Salva os tickets no arquivo JSON após cada página
    fs.writeFileSync('tickets.json', JSON.stringify(allTickets, null, 2));
    console.log(`Tickets salvos em tickets.json após a página ${page}`);

    page++;  // Avança para a próxima página

    // Aguarda 1 segundo antes de fazer a próxima requisição para evitar limite de taxa
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log('Busca concluída');
}

// Chama a função para buscar os tickets
getTickets();
