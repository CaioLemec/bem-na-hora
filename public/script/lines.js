//Buscando uma linha a partir de um input
async function getLines() {
    const inputClient = document.querySelector("#lines").value;
    const lines = await (
      await fetch(`${base_url}/Linha/Buscar?termosBusca=${inputClient}`, {
        method: "GET",
        headers,
      })
    ).json();
      if (lines.length <= 0) {
        alert(`
        Não encontramos nada pesquisando ${inputClient}.
        A pesquisa aceita denominação ou número da linha.
        Ex: Ramos, Lapa ou 8000.
        `)
      } else {
        module.exports = [
            {
                sl: lines.sl,
                cl: lines.cl,
                tp: lines.tp,
                ts: lines.ts
            }
        ]
      }
  }





// lines.forEach((lines) => {
//     if (lines.sl === 1) {
//       console.log(`Código da linha = ${lines.cl}, Sentido ${lines.tp}`);
//     } else if (lines.sl === 2) {
//       console.log(`Código da linha = ${lines.cl}, Sentido ${lines.ts}`);
//     } else {
//       console.log("Aqui")
//     }
//   });