var timerId = null;

function iniciaJogo(){

    var url = window.location.search;
    
    var nivel_jogo = url.replace("?", "");

    var tempo_segundos = 0;

    var qtde_baloes = 0;

    if(nivel_jogo == 1){
        tempo_segundos = 120;
        qtde_baloes = 60;
    }

    if(nivel_jogo == 2){
        tempo_segundos = 60;
        qtde_baloes = 90;
    }

    if(nivel_jogo == 3){
        tempo_segundos = 30;
        qtde_baloes = 60;
    }

    document.getElementById('cronometro').innerHTML = tempo_segundos;
    
    cria_baloes(qtde_baloes);

    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;

    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempo_segundos +1);

}

function contagem_tempo(segundos){

    segundos = segundos - 1;

    if(segundos == -1){
        clearTimeout(timerId);
        remove_eventos_baloes();
        game_over();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

    timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function game_over(){
    
    alert("Fim de jogo, você não conseguiu estourar todos o balões no tempo limite!");
}

function cria_baloes(qtde_baloes){

    for(var i = 1; i <= qtde_baloes; i++){

        var balao = document.createElement("img");
        balao.src = "imagens/balao_azul_pequeno.png";
        balao.style.margin = "12px";
        balao.id = 'b' + i;
        balao.onclick = function(){ estourar(this); };

        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(e){

    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute("onclick", "");
    document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png";

    pontuacao(-1);
}

function pontuacao(acao){

    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros, baloes_estourados);

}

function situacao_jogo(baloes_inteiros){

    if(baloes_inteiros == 0){
        alert("Você ganhou! Conseguiu estourar todos os balões");
        parar_jogo();
    }
}

function remove_eventos_baloes(){
    var i = 1;
    
    while(document.getElementById('b'+i)) {
        document.getElementById('b'+i).onclick = '';
        i++;
    }
}

function parar_jogo(){

    clearTimeout(timerId);
}