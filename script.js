// Campos 
const cartaoNome = document.getElementById("card-name");
const displayNome = document.getElementById("display-name");
const mensagemErroNome = document.getElementById("card-name-error");

const cartaoNumero = document.getElementById("card-number");
const displayNumero = document.getElementById("display-number");
const mensagemErroNumero = document.getElementById("card-number-error");

const cartaoMes = document.getElementById("exp-month");
const cartaoAno = document.getElementById("exp-year");
const displayMes = document.getElementById("display-month");
const displayAno = document.getElementById("display-year");
const mensagemErroData = document.getElementById("expiry-error");

const cartaoCVC = document.getElementById("card-cvc");
const displayCVC = document.getElementById("display-cvc");
const mensagemErroCVC = document.getElementById("cvc-error");


//Funções de Validação 

// Nome
function validarNome() {
  const nome = cartaoNome.value.trim();
  displayNome.textContent = nome || "Jane Appleseed";

  cartaoNome.classList.remove("input-erro", "input-correto");

  if (nome === "") {
    mensagemErroNome.textContent = "Can't be blank.";
    cartaoNome.classList.add("input-erro");
  } else {
    mensagemErroNome.textContent = "";
    cartaoNome.classList.add("input-correto");
  }
}

// Número
function validarNumero() {
  let digitsOnly = cartaoNumero.value.replace(/\s/g, "").slice(0, 16);
  const formatted = digitsOnly.replace(/(.{4})/g, "$1 ").trim();

  cartaoNumero.value = formatted;
  displayNumero.textContent = formatted || "0000 0000 0000 0000";

  cartaoNumero.classList.remove("input-erro", "input-correto");

  if (digitsOnly.length === 0) {
    mensagemErroNumero.textContent = "Can't be blank.";
    cartaoNumero.classList.add("input-erro");
  } else if (!/^\d+$/.test(digitsOnly)) {
    mensagemErroNumero.textContent = "Wrong format, numbers only.";
    cartaoNumero.classList.add("input-erro");
  } else if (digitsOnly.length < 16) {
    mensagemErroNumero.textContent = "Card number must have 16 digits.";
    cartaoNumero.classList.add("input-erro");
  } else {
    mensagemErroNumero.textContent = "";
    cartaoNumero.classList.add("input-correto");
  }
}

// Data
function validarData() {
  displayMes.textContent = cartaoMes.value || "00";
  displayAno.textContent = cartaoAno.value || "00";

  const mesStr = cartaoMes.value;
  const anoStr = cartaoAno.value;

  const mes = parseInt(mesStr);
  const ano = parseInt("20" + anoStr);

  const hoje = new Date();
  const mesAtual = hoje.getMonth() + 1;
  const anoAtual = hoje.getFullYear();

  cartaoMes.classList.remove("input-erro", "input-correto");
  cartaoAno.classList.remove("input-erro", "input-correto");

  if (mesStr === "" || anoStr === "") {
    mensagemErroData.textContent = "Can't be blank.";
    cartaoMes.classList.add("input-erro");
    cartaoAno.classList.add("input-erro");
  } else if (isNaN(mes) || mes < 1 || mes > 12) {
    mensagemErroData.textContent = "Invalid month.";
    cartaoMes.classList.add("input-erro");
  } else if (isNaN(ano)) {
    mensagemErroData.textContent = "Invalid year.";
    cartaoAno.classList.add("input-erro");
  } else if (ano < anoAtual || (ano === anoAtual && mes < mesAtual)) {
    mensagemErroData.textContent = "Expiration date cannot be in the past.";
    cartaoMes.classList.add("input-erro");
    cartaoAno.classList.add("input-erro");
  } else {
    mensagemErroData.textContent = "";
    cartaoMes.classList.add("input-correto");
    cartaoAno.classList.add("input-correto");
  }
}

// CVC
function validarCVC() {
  let digitsOnly = cartaoCVC.value.replace(/\s/g, "").slice(0, 3);
  cartaoCVC.value = digitsOnly;
  displayCVC.textContent = digitsOnly || "000";

  cartaoCVC.classList.remove("input-erro", "input-correto");

  if (digitsOnly.length === 0) {
    mensagemErroCVC.textContent = "Can't be blank.";
    cartaoCVC.classList.add("input-erro");
  } else if (!/^\d+$/.test(digitsOnly)) {
    mensagemErroCVC.textContent = "Numbers only.";
    cartaoCVC.classList.add("input-erro");
  } else if (digitsOnly.length < 3) {
    mensagemErroCVC.textContent = "CVC must have 3 digits.";
    cartaoCVC.classList.add("input-erro");
  } else {
    mensagemErroCVC.textContent = "";
    cartaoCVC.classList.add("input-correto");
  }
}


cartaoNome.addEventListener("input", validarNome);
cartaoNumero.addEventListener("input", validarNumero);
cartaoMes.addEventListener("input", validarData);
cartaoAno.addEventListener("input", validarData);
cartaoCVC.addEventListener("input", validarCVC);


// Submissão do formulário
const form = document.getElementById("card-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Executa validações
  validarNome();
  validarNumero();
  validarData();
  validarCVC();

  // Verifica erros visuais
  const inputs = [cartaoNome, cartaoNumero, cartaoMes, cartaoAno, cartaoCVC];
  const isValid = !inputs.some(input => input.classList.contains("input-erro"));

  if (isValid) {
    form.style.display = "none";
    document.getElementById("thank-you-container").style.display = "block";
  }
});

// Botão de continuar na tela de agradecimento
const continueButton = document.getElementById("continue-button");
continueButton.addEventListener("click", () => {
  form.reset();
  document.getElementById("thank-you-container").style.display = "none";
  form.style.display = "grid";

  // Limpa os campos de exibição
  displayNome.textContent = "Jane Appleseed";
  displayNumero.textContent = "0000 0000 0000 0000";
  displayMes.textContent = "00";
  displayAno.textContent = "00";
  displayCVC.textContent = "000";

  // Remove classes de erro e sucesso
  const inputs = [cartaoNome, cartaoNumero, cartaoMes, cartaoAno, cartaoCVC];
  inputs.forEach(input => {
    input.classList.remove("input-erro", "input-correto");
  });
});

