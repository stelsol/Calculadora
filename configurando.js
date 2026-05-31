let botoes = document.querySelectorAll("button"); // Pegando botões do html
let display = document.getElementById("display"); // selecionando o display do html
const numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]; // criando um array para pegar apenas os valores que devem ser exibidos na tela
const operadores = ["+", "-", "*", "/", "="];
let Primeiron = "";
let Segundon = "";
let operador = "";

botoes.forEach((botao) => {
  // console.log(botao);
  botao.addEventListener("click", () => {
    // toda vez que ele escutar o evento click ele ira armazenar o valor clicado
    const valor = botao.value;
    if (numeros.includes(valor)) {
      montarDisplay(valor);
    }

    if (valor.toLowerCase() === "c") {
      // o lower case não pode esquecer que ele é uma function do js
      limparDisplay();
    }
    if (valor.toLowerCase() === "backspace") {
      // o lower case não pode esquecer que ele é uma function do js
      backspace();
    }
    if (operadores.includes(valor)) {
      if (valor === "=") {
        Segundon = Number(display.innerText);
        display.innerText = calcular(Primeiron, Segundon, operador);
        console.log(Primeiron, Segundon, operador);
        Primeiron = "";
        Segundon = "";
        operador = valor;
        return;
      }
      if (Primeiron === "") {
        Primeiron = Number(display.innerText);
        operador = valor;
      } else {
        Segundon = Number(display.innerText);
        Primeiron = calcular(Primeiron, Segundon, operador);
      }
      if (typeof Primeiron === "string") {
        display.innerText = Primeiron;
        Primeiron = "";
        Segundon = "";
        operador = "=";
      }
      limparDisplay();
      operador = valor;
      console.log(Primeiron, Segundon, operador);
    }
  });
});

function calcular(Primeiron, Segundon, operador) {
  switch (operador) {
    case "+":
      return Primeiron + Segundon;
    case "-":
      return Primeiron - Segundon;

    case "*":
      return Primeiron * Segundon;

    case "/":
      if (Segundon === 0) {
        return "Divisão por zero !";
      }
      return Primeiron / Segundon;

    case "%":
      return Primeiron % Segundon;
  }
}
// Função para limpar o display, toda vez que limpar
function limparDisplay() {
  display.innerText = "0";
}
function backspace() {
  let novoDisplay = display.innerText;
  display.innerText = novoDisplay.slice(0, -1);
  if (display.innerText.length === 0) {
    display.innerText = 0;
  }
}

function montarDisplay(numEscolhido) {
  let textDisplay = display.innerText; // ira exibir o valor que foi armazenado após o click

  // console.log(numEscolhido, textDisplay.inclaudes("."));

  if (numEscolhido === "." && textDisplay.includes(".")) {
    return;
  }
  if (operador === "=") {
    display.innerText = numEscolhido;
    operador = "";
    return;
  }

  if (textDisplay.length === 1 && textDisplay === "0" && numEscolhido !== ".") {
    display.innerText = numEscolhido;
  } else {
    display.innerText += numEscolhido;
  }
}
