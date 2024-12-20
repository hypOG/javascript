// Array com as cores dos botões
var buttonColours = ["red", "blue", "green", "yellow"];

// Array para armazenar o padrão gerado pelo jogo
var gamePattern = [];

// Array para armazenar o padrão de cliques do usuário
var userClickedPattern = [];

// Variáveis de controle do jogo
var started = false; // Indica se o jogo foi iniciado ou não
var level = 0; // O nível do jogo, que começa em 0

// Quando uma tecla é pressionada, o jogo começa
$(document).keypress(function() {
  // Se o jogo ainda não foi iniciado
  if (!started) {
    // Exibe o nível atual no título da página
    $("#level-title").text("Level " + level);

    // Gera a próxima sequência
    nextSequence();

    // Marca que o jogo foi iniciado
    started = true;
  }
});

// Quando um botão é clicado pelo usuário
$(".btn").click(function() {
  // Obtém a cor do botão clicado
  var userChosenColour = $(this).attr("id");

  // Adiciona a cor ao padrão do usuário
  userClickedPattern.push(userChosenColour);

  // Toca o som correspondente à cor escolhida
  playSound(userChosenColour);

  // Aplica a animação ao botão pressionado
  animatePress(userChosenColour);

  // Verifica se a resposta do usuário está correta
  checkAnswer(userClickedPattern.length - 1);
});

// Função que verifica se a resposta do usuário está correta
function checkAnswer(currentLevel) {
  // Verifica se a cor clicada pelo usuário corresponde à cor no padrão do jogo
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
    // Se o usuário completou toda a sequência corretamente
    if (userClickedPattern.length === gamePattern.length) {
      // Aguarda 1 segundo antes de gerar a próxima sequência
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
    // Se o usuário errou, toca o som de erro
    playSound("wrong");

    // Adiciona a classe "game-over" ao corpo da página para efeito visual
    $("body").addClass("game-over");

    // Exibe a mensagem de "Game Over" no título
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Remove a classe "game-over" após 200ms
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Reinicia o jogo
    startOver();
  }
}

// Função que gera a próxima sequência de cores
function nextSequence() {
  // Limpa o padrão de cliques do usuário, pois ele começará uma nova sequência
  userClickedPattern = [];

  // Aumenta o nível do jogo
  level++;

  // Atualiza o título com o novo nível
  $("#level-title").text("Level " + level);

  // Gera um número aleatório entre 0 e 3 para escolher uma cor
  var randomNumber = Math.floor(Math.random() * 4);

  // Obtém a cor correspondente ao número aleatório
  var randomChosenColour = buttonColours[randomNumber];

  // Adiciona a cor ao padrão do jogo
  gamePattern.push(randomChosenColour);

  // Faz o botão piscar para mostrar a cor gerada
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Toca o som correspondente à cor gerada
  playSound(randomChosenColour);
}

// Função para aplicar a animação ao botão pressionado
function animatePress(currentColor) {
  // Adiciona a classe "pressed" ao botão para animação
  $("#" + currentColor).addClass("pressed");

  // Remove a classe "pressed" após 100ms
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Função para tocar o som correspondente a uma cor
function playSound(name) {
  // Cria um novo objeto de áudio e toca o som
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Função para reiniciar o jogo após o "Game Over"
function startOver() {
  // Zera o nível, o padrão do jogo e o estado de início
  level = 0;
  gamePattern = [];
  started = false;
}
