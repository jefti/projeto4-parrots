//alert("Código conectado");

let banco = []; //Banco de dados responsavel pela distribuição das cartas
let quant_cartas; //Variavel responsavel pela quantidade de cartas no tabuleiro

let carta1 = ''; //variavel que armazena as classes da primeira carta selecionada
let carta2 = ''; // variavel que armazena as classa da segunda carta selecionada

let controle = true; //variavel booleana com objetivo de controlar o acionamento das cartas

let jogadas = 0; //variavel que armazena o número de jogadas
let pares_restantes = 0; //variavel que armazena o número de pares restantes para acabar o jogo
let tempo_reg = 0; //variavel que armazena o tempo em segundos que a partida dura


iniciar_jogo();

//função responsavel pela inicialização do jogo
function iniciar_jogo(){
    let quant_cartas = registrar_valor(); 
    pares_restantes = quant_cartas/2 ;
    criar_banco(quant_cartas); //criar o banco de dados
    preencher (quant_cartas); //preencher o tabuleiro de acordo com o BD
    cronometro()

}

//função responsavel por registrar um valor válido no jogo
function registrar_valor(){
    let valor = prompt('com quantas cartas você quer começar o jogo ?');
    while(!par(valor)){
        alert('Número inválido, digite um número PAR entre 4 e 14');
        valor = prompt('com quantas cartas você quer começar o jogo ?');
    }
    return valor;
}
//função responsável por ver se um valor é realmente par e se está nos limites desejados
function par(numero){
    let teste_par = numero%2;
    //alert(teste_par);

    if(teste_par == 0 && numero >= 4 && numero <= 14){
        return true;
    }else{
        return false;
    }
}

//função que cria um banco de dados com 'numero' de itens(valor par) e com valores iguais sucedendo de duas em duas casas
function criar_banco(numero){
    cont= 0;
    while (cont< numero){
        const valor = Math.floor(cont/2);
        banco[cont] = valor;
        cont++;
    }
    banco.sort(comparador);
    console.log(banco);
}

//função para randomizar a ordem de uma array
function comparador() { 
	return Math.random() - 0.5; 
}

//função para preencher o tabuleiro de jogo de acordo com os valores aleatorio encontrados no banco de dados
function preencher(numero){
    let cont = 1;
    const board = document.querySelector('.tabuleiro');
    //console.log(board);


    while (cont <= numero){
        id_figura = banco[cont-1];
        const carta = criaCarta(id_figura);
        board.innerHTML += carta;
        cont++;
    }
}

//função para criar uma carta de acordo com o id escoliho, retornando o texto HTML
function criaCarta(id){
    let imagem = "";
    switch (id){
        case 0:
            imagem = "./imagens/bobrossparrot.gif";
            break;
        case 1:
            imagem = "./imagens/explodyparrot.gif";
            break;
        case 2:
            imagem = "./imagens/fiestaparrot.gif";
            break;
        case 3:
            imagem = "./imagens/metalparrot.gif";
            break;
        case 4:
            imagem = "./imagens/revertitparrot.gif";
            break;
        case 5:
            imagem = "./imagens/tripletsparrot.gif";
            break;
        case 6:
            imagem = "./imagens/unicornparrot.gif";
            break;

    }
    let texto = `<div onclick='clicar(this)' class='card ${id}' data-test="card"><div class='front-face face'><img data-test="face-down-image" src='./imagens/back.png'></div><div class='back-face face'><img src='${imagem}' data-test="face-up-image" ></div></div>`;
    return texto;
}

function clicar(elemento){
    if(controle){
        if(elemento.classList.contains('virado')){
            console.log('Elemento selecionado já está virado');
        }else{
            controle = false;
            setTimeout(desbloquear,600)
            console.log('tela bloqueada');
            if(registrar_carta(elemento)){
                virar(elemento);
                checar_jogada();
                setTimeout(fim_de_jogo,700);
            }
        }
    }
    /*
    1. 0 -Bloqueamos a tela.
    2. Registramos a carta.
    3. 0 Se tudo estiver correto a carta vira (demora 500 ms).
    */ 
}

function virar(carta){
    let frente = carta.querySelector('.front-face');
    let tras = carta.querySelector('.back-face');
    
    carta.classList.add('virado');
    frente.classList.add('flip-frente');
    tras.classList.add('flip-tras');
    console.log('carta virada');
}



function desbloquear(){
    controle = true;
    console.log('tela desbloqueada');
}

function registrar_carta(elemento){
    if(carta1 == ''){
        carta1 = elemento;
        console.log(elemento + "registrado como a carta 1");
        return true;
    }else if(carta2 == ''){
        carta2 = elemento;
        console.log(elemento + "registrado como a carta 2");
        return true;
    }
    return false;;
}

function checar_jogada(){
    if(carta1 != '' && carta2 == ''){
        console.log('esperando selecionar a carta 2');
        registrar_jogada();
    } else if(carta1 !='' && carta2 !=''){
        console.log('segunda carta selecionada');
        registrar_jogada();
        console.log('fim da rodada : '+jogadas);

        if(carta1.classList[1] == carta2.classList[1]){
            console.log('as duas são iguais');
            pontuar();
            console.log('agora restam '+ pares_restantes + " pares iguais!");
            reset();
        }else{
            console.log('as duas são diferentes');
            setTimeout(errou,600)
            
        }
    }
}

function registrar_jogada(){
    jogadas++;
    return jogadas;
}
function pontuar(){
    pares_restantes--;
    return pares_restantes;
}
function reset(){
    carta1 = "";
    carta2 = "";
}

function errou(){
    console.log('vamos desvirar as cartas')
    setTimeout(desbloquear,1600)
    console.log('tela bloqueada');
    setTimeout(desvirar,1000,carta1);
    setTimeout(desvirar,1000,carta2);
    setTimeout(reset,1500);
}

function desvirar(carta){
    let frente = carta.querySelector('.front-face');
    let tras = carta.querySelector('.back-face');
    
    carta.classList.remove('virado');
    frente.classList.remove('flip-frente');
    tras.classList.remove('flip-tras');
    console.log('carta desvirada!');
}

function fim_de_jogo(){
    if(pares_restantes == 0){
        let tempo = parar();
        alert(`Você ganhou em ${jogadas} jogadas! A duração do jogo foi de ${tempo} segundos!`);
        resposta = prompt('Gostaria de reiniciar ?');
        if(resposta == 'sim'){
            reiniciar();
        }else{

        }
        
    }else{
        return 0;
    }
}

function cronometro(){
    let item = document.querySelector('.bonus');
    item.innerHTML = 0;
    tempo_reg = setInterval(contar,1000);
}

function contar(){
    let item = document.querySelector('.bonus');
    item.innerHTML ++;
}

function parar(){
    clearInterval(tempo_reg);
    let item = document.querySelector('.bonus');
    let valor = item.innerHTML
    console.log(item.innerHTML);
    item.innerHTML = 00;
    return  valor;
}


function reiniciar(){
    const board = document.querySelector('.tabuleiro');
    board.innerHTML = '';

    let banco = []; 
    let quant_cartas= 0;
    
    let carta1 = ''; 
    let carta2 = ''; 
    
    let controle = true; 
    
    let jogadas = 0; 
    let pares_restantes = 0; 
    let tempo_reg = 0;

    iniciar_jogo();


}