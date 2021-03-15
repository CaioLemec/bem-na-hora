//Habilitando mapa. Tutorial em https://leafletjs.com/
const mymap = L.map("mapid").setView([-23.5879824, -46.6616683], 14);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {minZoom:15}).addTo(mymap);

//Criando constantes para facilitar código.
const base_url = "https://aiko-olhovivo-proxy.aikodigital.io";
const token = "35779ce7c804e10322855a99110a9c1bf818aac328c3d591edb969f7972c4460";

// Criando parametros
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "https://aiko-olhovivo-proxy.aikodigital.io/",
};

//Função de autenticação - Seguindo orientação da API OlhoVivo.
async function auth() {
  const response = await (
    await fetch(`${base_url}/login/autenticar?token=${token}`, {
      method: "POST",
      headers,
    })
  ).json();
  console.log(response);
}

//Autenticando onload.
window.onload = auth();


//Buscando uma linha a partir de um input
async function getLines() {
  const inputClient = document.querySelector("#lines").value;
  const lines = await (
    await fetch(`${base_url}/Linha/Buscar?termosBusca=${inputClient}`, {
      method: "GET",
      headers,
    })
  ).json();
  lines.forEach((lines) => {
    if (lines.sl === 1) {
      console.log(`Código da linha = ${lines.cl}, Sentido ${lines.tp}`);
    } else {
      console.log(`Código da linha = ${lines.cl}, Sentido ${lines.ts}`);
    }
  });
}

//Buscando uma parada a partir de um input
async function getStops() {
  const inputClient = document.querySelector("#stops").value;
  const stops = await (
    await fetch(`${base_url}/Parada/Buscar?termosBusca=${inputClient}`, {
      method: "GET",
      headers,
    })
  ).json();
  stops.forEach((stops) => {
    var marker = L.marker([stops.py, stops.px]).addTo(mymap);
    marker
      .bindPopup(
        `
          <strong>CÓDIGO: </strong>${stops.cp} <br>
          <strong>NOME: </strong>${stops.np} <br>
          <strong>ENDEREÇO: </strong>${stops.ed}
        `
      )
      .openPopup();
  });
}

// Posições dos veículos: Exibir no mapa onde os veículos estavam na sua última atualização.
async function getVehicles() {
  const response = await (
    await fetch(`${base_url}/Posicao`, { method: "GET", headers })
  ).json();
  const vehicles = response.l;
  vehicles.forEach(({ vs, cl, lt0 }) => {
    const [coordinates] = vs;
    var myIcon = L.icon({
      iconUrl: '../images/bus.png',
      iconSize: [45, 45]
  });
    var marker = L.marker([coordinates.py, coordinates.px], {icon: myIcon}).addTo(mymap);
    marker
      .bindPopup(
        `<strong>Código Linha:</strong> ${cl}<br><strong>Destino:</strong> ${lt0}`
      )
      .openPopup();
  });
}

// Previsão de chegada: Dado uma parada informar a previsão de chegada de cada veículo que passe pela parada selecionada.

async function arrivalForecast() {
  const arrivalsStop = document.querySelector("#arrivals-stop").value;
  const arrivalsLine = document.querySelector("#arrivals-line").value;
  const response = await (
    await fetch(`${base_url}/Previsao?codigoParada=${arrivalsStop}&codigoLinha=${arrivalsLine}`, {
      method: "GET",
      headers,
    })
  ).json();
  const getLineInfo = response.l;
  const getStopInfo = response.p;
  console.log(getLineInfo, getStopInfo, response)
}





// Documentação API: https://www.sptrans.com.br/desenvolvedores/api-do-olho-vivo-guia-de-referencia/documentacao-api/

// Desafio: https://github.com/aikodigital/programa-estagio-2021/blob/main/front-end.md


// 1337 CL
// 440015007 CP