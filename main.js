const bar = new ProgressBar.Line(container, {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  trailColor: 'rgba(54,55,70, 0.65)',
  trailWidth: 20,
  svgStyle: { width: '100%', height: '100%' },
  from: { color: '#4ba7f8' },
  to: { color: '#4ba7f8' },
  step: (state, bar) => {
    bar.path.setAttribute('stroke', state.color);
  }
});
const options = { method: 'GET' };
const key = "AIzaSyAuh99h6naCct66rk5IPau98JcgbvbUCXc";

var valor = 1000;
var id = '';
let like = 0;
let meta = 0;

async function Api(id, valor) {
  if (!id) {
    console.error("ID do vídeo não foi definido.");
    return;
  }

  console.log(id, key);
  const dados = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=statistics&key=${key}`, options
  )
    .then((response) => response.json())
    .then(({ items }) => {
      if (items && items.length > 0) {
        like = Number(items[0].statistics.likeCount);
        if (like >= meta) {
          meta += valor;
        }

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
        "URL inválida, por favor, insira uma URL válida do YouTube."
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
