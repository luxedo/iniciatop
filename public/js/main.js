let arrayDeJogadores = []
$(document).ready (() => {
    $(".player-input").keyup((e) => {
    if (e.keyCode == 13) adicionarJogador();
  });
  $(".player-input").focus();
});

function adicionarJogador() {
  let nome = $(".player-input").val();
  if (nome != "") {
    let jogadorClasse = `jogador-${arrayDeJogadores.length}`
    arrayDeJogadores.push(jogadorClasse)
    $(".player-input").val("");
    colocarJogadorNoDOM(jogadorClasse, nome)
  }
}

function escolherNumero(jogador) {
  let classeDoElemento = $(jogador)[0].classList[0];
  if ($($(".editor."+classeDoElemento)).length == 0) {
    $($("."+classeDoElemento)[0]).append(`
      <div class="${classeDoElemento} editor">
        <div class="col-xs-10">
          <input type="number" class="${classeDoElemento} form-control" placeholder="Iniciativa">
        </div>
        <div class="col-xs-2" style="vertical-align: bottom;">
          <a class="btn player-edit ${classeDoElemento}" style="padding-bottom: 0;"><i class="fa fa-check fa-3x" onclick="aceitarNumero('${classeDoElemento}');"></i></a>
        </div>
      </div>
    `);
    $(`.form-control.${classeDoElemento}`).focus()
    $(`.form-control.${classeDoElemento}`).keyup((e) => {
      if (e.keyCode == 13) aceitarNumero(classeDoElemento);
    });
  } else {
    $(`.${classeDoElemento}.editor`).remove();
  }
}

function aceitarNumero(classeEditada) {
  let novoNumero = $(`.${classeEditada}.form-control`).val();
  if (novoNumero != "") {
    $(`.numero-jogador.${classeEditada}`).text(novoNumero);
  }
  $(`.${classeEditada}.editor`).remove();
  ordenarJogadores();
}

function editarJogador(jogador) {
  let classeDoElemento = $(jogador)[0].classList[0];
  if ($($(".editor."+classeDoElemento)).length == 0) {
    $($("."+classeDoElemento)[0]).append(`
      <div class="${classeDoElemento} editor">
        <div class="col-xs-10">
          <input type="text" class="${classeDoElemento} form-control" placeholder="Novo Nome do Jogador">
        </div>
        <div class="col-xs-2" style="vertical-align: bottom;">
          <a class="btn player-edit ${classeDoElemento}" style="padding-bottom: 0;"><i class="fa fa-check fa-3x" onclick="aceitarEdição('${classeDoElemento}');"></i></a>
        </div>
      </div>
    `);
    $(`.form-control.${classeDoElemento}`).focus()
    $(`.form-control.${classeDoElemento}`).keyup((e) => {
      if (e.keyCode == 13) aceitarEdição(classeDoElemento);
    });
  } else {
    $(`.${classeDoElemento}.editor`).remove();
  }

}

function aceitarEdição(classeEditada) {
  let novoNome = $(`.${classeEditada}.form-control`).val();
  if (novoNome != "") {
    $(`.nome-jogador.${classeEditada}`).text(novoNome);
  }
  $(`.${classeEditada}.editor`).remove();
}

function deletarJogador(jogador) {
  let classeDoElemento = $(jogador)[0].classList[0];
  $("."+classeDoElemento).remove();
  arrayDeJogadores.splice(classeDoElemento, 1);
}

function ordenarJogadores() {
  let ordem = []
  $($(".lista-dos-jogadores")[0].children).each((index, element) => {
    let classeDoElemento = $(element)[0].classList[0]
    let iniciativaDoElemento = parseInt($(`.${classeDoElemento}.numero-jogador`).text());
    let nomeDoElemento = $(`.${classeDoElemento}.nome-jogador`).text();
    ordem.push([classeDoElemento, nomeDoElemento, iniciativaDoElemento]);
  });
  ordem = ordem.sort((prev, value) => prev[2]<value[2]);
  $(".lista-dos-jogadores").empty();
  ordem.forEach(value => colocarJogadorNoDOM(...value));
}

function colocarJogadorNoDOM(jogadorClasse, nome, numero) {
  console.log(jogadorClasse, nome, numero);
  numero = (numero === undefined? 0: numero)
  $(".lista-dos-jogadores").append(`
    <div class="${jogadorClasse} row  jogador-na-lista animated fade-in">
      <div class="col-xs-4">
        <h3 class="${jogadorClasse} nome-jogador">${nome}</h3>
      </div>
      <div class="col-xs-2">
        <h3 class="${jogadorClasse} numero-jogador">${numero}</h3>
      </div>
      <div class="col-xs-2">
        <a href="#" onclick="escolherNumero(this);" class="${jogadorClasse}"><i class="fa fa-random fa-3x"></i></a>
      </div>
      <div class="col-xs-2">
        <a href="#" onclick="editarJogador(this);" class="${jogadorClasse}"> <i class="fa fa-pencil fa-3x"></i></a>
      </div>
      <div class="col-xs-2">
        <a href="#" onclick="deletarJogador(this);" class="${jogadorClasse}"><i class="fa fa-times fa-3x"></i></a>
      </div>
    </div>
  `)
}
