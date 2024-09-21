import bar, { options, key } from "./env.js";

let id = '';
let like = 0;
let meta = 0;

async function Api(id, valor) {

  let meta = 1000;

  if (!id) {
    console.error("ID do vídeo não foi definido.");
    return;
  }

  const dados = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=statistics&key=${key}`, options
  )
    .then((response) => response.json())
    .then(({ items }) => {
      if (items && items.length > 0) {
        like = Number(items[0].statistics.likeCount);
        if (like >= meta) meta += valor;

        bar.animate(Math.abs((meta - like) / valor - 1));
        document.querySelector("#like").innerHTML = like.toLocaleString();
        document.querySelector("#meta").innerHTML = meta.toLocaleString();

        const reiniciarElement = document.querySelector("#reiniciar");
        if (reiniciarElement) reiniciarElement.remove();
      } else {
        console.error("Nenhum item encontrado.");
      }
    });
}

function validarUrlYoutube(url) {
  const regex = /^https?:\/\/(www\.)?youtube\.com\/watch\?v=([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[2] : null;
}

function urlYoutube() {
  try {
    const url = document.querySelector("#caixadetextourl").value;
    const idVideo = validarUrlYoutube(url);

    if (!idVideo) {
      return alert(
        "URL inválida, por favor, insira uma URL válida do YouTube." + options
      );
    }

    const valornumero = Number(document.querySelector("#caixadetexto").value);

    if (valornumero > 0) {
      Api(idVideo, valornumero);
      id = idVideo;
      valor = valornumero;
    } else {
      return alert("Preencha todos os campos corretamente.");
    }
  } catch (err) {
    console.log(err);

    return alert("Erro ao processar a URL.");
  }
}

document.querySelector("#salvar").addEventListener("click", urlYoutube);

window.setInterval(() => {
  if (id) {
    Api(id, valor);
  }
}, 30000); // 30 segundos para evitar excesso de requisições
