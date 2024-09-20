    // Nova função para validar a URL do YouTube
    function validarUrlYoutube(url) {
      const regex = /^https?:\/\/(www\.)?youtube\.com\/watch\?v=([\w-]{11})/;
      const match = url.match(regex);
      return match ? match[2] : null;
    }

    const options = {
      method: 'GET',
    };

    var valor = 1000;
    var id = '';
    let like = 0;
    let meta = 0;
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

    // Função assíncrona para fazer a requisição ao backend e buscar dados da API do YouTube
    async function Api(idd, valorr) {
      try {
        const response = await fetch('backend_api.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: idd, valor: valorr }),
        });

        const data = await response.json();

        if (data.likeCount) {
          like = Number(data.likeCount);
          if (like >= meta) {
            meta += valorr;
          }
          bar.animate(Math.abs((meta - like) / valorr - 1));
          document.querySelector('#like').innerHTML = like.toLocaleString();
          document.querySelector('#meta').innerHTML = meta.toLocaleString();
          document.querySelector("#reiniciar").remove();
        } else if (data.error) {
          console.error("Erro da API: " + data.error);
        }
      } catch (err) {
        console.error("Erro ao buscar dados: " + err);
      }
    }

    // Função para processar a URL e iniciar a chamada à API
    function urlYoutube() {
      try {
        const url = document.querySelector("#caixadetextourl").value;
        const idVideo = validarUrlYoutube(url);
        if (!idVideo) {
          return alert("URL inválida, por favor, insira uma URL válida do YouTube.");
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

    setInterval(() => {
      if (id) {
        Api(id, valor);
      }
    }, 30000); // Aumentado para 30 segundos