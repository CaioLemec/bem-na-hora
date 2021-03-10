const map = L.map("mapid").setView([-23.5879824,-46.6616683], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// const fetch = require('node-fetch')

const base_url = 'https://aiko-olhovivo-proxy.aikodigital.io'
const token = '35779ce7c804e10322855a99110a9c1bf818aac328c3d591edb969f7972c4460'

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'https://aiko-olhovivo-proxy.aikodigital.io/',
};

//Criando autenticação
async function auth() {
  const response = await (await fetch(`${base_url}/login/autenticar?token=${token}`, { method: "POST", headers })).json()
  console.log(response)
}

//Buscando uma linha específica
async function getLines() {
  const inputClient = document.querySelector("#lines").value;
  console.log(inputClient)
  const lines = await (await fetch(`${base_url}/Linha/Buscar?termosBusca=${inputClient}`, { method: 'GET', headers })).json()
  
}

//Buscando uma parada específica
async function getStops() {
  const inputClient = document.querySelector("#stops").value;
  console.log(inputClient)
  const stops = await (await fetch(`${base_url}/Parada/Buscar?termosBusca=${inputClient}`, { method: 'GET', headers })).json()
  console.log(stops)
}



// Documentação API: https://www.sptrans.com.br/desenvolvedores/api-do-olho-vivo-guia-de-referencia/documentacao-api/

// Desafio: https://github.com/aikodigital/programa-estagio-2021/blob/main/front-end.md

// Requesitos: 

// Posições dos veículos: Exibir no mapa onde os veículos estavam na sua última atualização.

// Linhas: Exibir informações sobre as linhas de ônibus.

// Paradas: Exibir os pontos de parada da cidade no mapa.

// Previsão de chegada: Dado uma parada informar a previsão de chegada de cada veículo que passe pela parada selecionada.

// Pesquisa e Filtros: Permitir que o usuário pesquise e filtre esses dados, interagindo com a interface.