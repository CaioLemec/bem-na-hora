const mymap = L.map("mapid").setView([-23.5879824,-46.6616683], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mymap);

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

//Buscando uma linhas a partir de um input
async function getLines() {
  const inputClient = document.querySelector("#lines").value;
  const lines = await (await fetch(`${base_url}/Linha/Buscar?termosBusca=${inputClient}`, { method: 'GET', headers })).json()
  lines.forEach(linhas => {
    if (linhas.sl == 1) {
        console.log(`Código da linha = ${linhas.cl}, Sentido ${linhas.tp}`)
    } else {
        console.log(`Código da linha = ${linhas.cl}, Sentido ${linhas.ts}`)
    }
  });
}

//Buscando uma parada a partir de um input
async function getStops() {
  const inputClient = document.querySelector("#stops").value;
  const stops = await (await fetch(`${base_url}/Parada/Buscar?termosBusca=${inputClient}`, { method: 'GET', headers })).json()
  stops.forEach(stops => {

  var marker = L.marker([stops.py, stops.px]).addTo(mymap);
  marker.bindPopup(`<strong>PARADA:</strong> ${stops.np}<br><strong>ENDEREÇO:</strong> ${stops.ed}`).openPopup();
  });
}

// Posições dos veículos: Exibir no mapa onde os veículos estavam na sua última atualização.
async function getVehicles() {
  const vehicles = await (await fetch(`${base_url}/Posicao`, { method: 'GET', headers })).json()
  Object.keys(vehicles).forEach((key) => {
    console.log(vehicles[key]); 
    // percorrer o array e coletar cada px,py para imprimir no mapa.
  });
}



// Documentação API: https://www.sptrans.com.br/desenvolvedores/api-do-olho-vivo-guia-de-referencia/documentacao-api/

// Desafio: https://github.com/aikodigital/programa-estagio-2021/blob/main/front-end.md

// Requesitos: (FALTA)

// Previsão de chegada: Dado uma parada informar a previsão de chegada de cada veículo que passe pela parada selecionada.

// Pesquisa e Filtros: Permitir que o usuário pesquise e filtre esses dados, interagindo com a interface.