// Imagens
let fundo;
let perdeu;
let raquetada;
let trilha;
let xBolinha = 250;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;

// Variáveis da raquete
let xRaquete = 10;
let yRaquete = 200;
let Rcomprimento = 10;
let Raltura = 80;

// Variáveis do oponente
let xRoponente = 590;
let yRoponente = 150;
let velocidadeOponente;

let VxBolinha = 3;
let VyBolinha = 2.5;

// Pontos
let meusPontos = 0;
let pontosOponente = 0;

function preload() {
  fundo = loadImage("ass.jpg");
  raquetada = loadSound("raquetada.mp3");
  perdeu = loadSound("perdeu.mp3");
  trilha  = loadSound("05. Freedom Fighter.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(fundo);
  bolinha();
  movimentoBolinha();
  colisaoBolinha();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRoponente, yRoponente);
  movimentaRaquete();
  movimentoRoponente();
  bateuBolinhaRaquete(xRaquete, yRaquete);
  bateuBolinhaRaquete(xRoponente, yRoponente);
  incluirPontos();
}

function bolinha() {
  let b = color (128,128,128);
  fill(b);
  circle(xBolinha, yBolinha, diametro);
}



function movimentoBolinha() {
  xBolinha += VxBolinha;
  yBolinha += VyBolinha;
}

function colisaoBolinha() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    if (xBolinha + raio > width) {
      meusPontos += 1; // Adiciona ponto ao jogador quando a bolinha sai pela direita
    } else {
      pontosOponente += 1; // Adiciona ponto ao oponente quando a bolinha sai pela esquerda
    }
    xBolinha = width / 4; // Reinicia a bolinha no centro
    yBolinha = height / 4;
    VxBolinha *= -1; // Inverte a direção horizontal
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    VyBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  let r = color(255, 255, 255);
  fill(r);
  rect(x, y, Rcomprimento, Raltura);
}


function movimentaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 6;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 6;
  }
}

function movimentoRoponente() {
  velocidadeOponente = yBolinha - yRoponente - Rcomprimento / 2 - 120;
  yRoponente += velocidadeOponente;
}

function bateuBolinhaRaquete(x, y) {
  let colidiu = collideRectCircle(x, y, Rcomprimento, Raltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    VxBolinha *= -1;
  }
}

function incluirPontos() {
  fill(0,0,0);
  textSize(18);
  textAlign(CENTER);
  text('Meus Pontos: ' + meusPontos, width / 4, 20);
  text('Pontos Oponente: ' + pontosOponente, 3 * width / 4, 20);
}

function marcaPonto (){
if (xBolinha > 590){
meusPontos += 1;
  
}
  if (xBolinha < 590){
  pontosOponente += 1;
    perdeu.play();
  }
}
