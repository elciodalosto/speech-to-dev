var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var personalCommands = [ 'terminal', 'testar', 'servir' , 'listar' , 'atualizar', 'avançar', 'retornar', 'voltar', 'sudo', 'gerar', 'remover', 'apagar', 'abrir', 'renomear', 'mover', 'editar', 'acessar'];
// var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(personalCommands, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'pt-BR';
var commandToTerminal = '';
var language = document.getElementById('language');
var option = language.options[language.selectedIndex];
var value = language.options[language.selectedIndex].value;
// recognition.lang = value;
update();

function update() {
  
  recognition.lang = value;

  console.log("Idioma: "+option.label +" "+ option.value); 

}


recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

/* var colorHTML= '';
colors.forEach(function(v, i, a){
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span></br>';
});
hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try: <br> ' + colorHTML + '.';
 */


var botaoAtivar = document.getElementById('ativar');
// document.body.onclick = function() {
botaoAtivar.onclick = function() {
    recognition.start();
    console.log('AGUARDANDO COMANDO POR VOZ...: ');
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var commandReceived = event.results[0][0].transcript;
  commandToTerminal = commandReceived;
  diagnostic.textContent = 'COMANDO RECEBIDO: ' + commandReceived;
  // bg.style.backgroundColor = personalCommands;
  if(commandReceived == 'update') {
    console.log('sudo apt-get update');
  }
  if(commandReceived == 'terminal') {
    // 
    console.log('abrindo terminal...');
  
  }
  if(commandReceived == 'upgrade') {
    console.log('sudo apt-get upgrade');
  }  
  if(commandReceived == 'servir') {
    console.log('sudo apt-get update');
  }  
  if(commandReceived == 'listar') {
    console.log('ls');
  }  
  if(commandReceived == 'remover' || commandReceived == 'apagar') {
    console.log('rm ?');
  }  
  if(commandReceived == 'mover') {
    console.log('mv de ? para ?');
  }  
  if(commandReceived == 'copiar') {
    console.log('cp de ? para ?');
  }  
  if(commandReceived == 'testar') {
    console.log(' testar o que?');
  }
  if(commandReceived == 'gerar') {
    console.log(' gerar o que?');
  }
  if(commandReceived == 'abrir') {
    console.log(' abrir o que?');
  }
  if(commandReceived == 'renomear') {
    console.log(' renomear o que?');
  }
  if(commandReceived == 'editar') {
    console.log(' editar o que?');
  }
  if(commandReceived == 'acessar') {
    console.log(' acessar o que?');
  }

  console.log('Nível de confiança/certeza sobre a palavra ouvida: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
  console.log("Parando reconhecimento...")
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "Comando não reconhecido...";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Ocorreu um erro no sistema de reconhecimento de voz: ' + event.error;
}
