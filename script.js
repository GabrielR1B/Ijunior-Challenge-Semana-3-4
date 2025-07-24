// Nome do cartão
const cartaoNome = document.getElementById("card-name");
const displayNome = document.getElementById("display-name");
const mensagemErroNome = document.getElementById("card-name-error");

cartaoNome.addEventListener("input", () => {
  displayNome.textContent = cartaoNome.value || "Jane Appleseed";
  if (cartaoNome.value == 0) {
    mensagemErroNome.textContent = "Can't be blank.";
  }
});

//Numero do cartão
const cartaoNumero = document.getElementById("card-number");
const displayNumero = document.getElementById("display-number");
const mensagemErroNumero = document.getElementById("card-number-error");
cartaoNumero.addEventListener("input", () => {

  const value = cartaoNumero.value;
  let digitsOnly = value.replace(/\s/g, "");

  if (digitsOnly.length > 16) {
    digitsOnly = digitsOnly.slice(0, 16);
  }

  const formatted = digitsOnly.replace(/(.{4})/g, "$1 ").trim();
  cartaoNumero.value = formatted;
  displayNumero.textContent = formatted || "0000 0000 0000 0000";

  const isOnlyDigits = /^\d+$/.test(digitsOnly);
    if (cartaoNumero.value == 0) {
    mensagemErroNumero.textContent = "Can't be blank.";
  }
    else if (!/^\d+$/.test(digitsOnly)) {
    mensagemErroNumero.textContent = "Wrong format, numbers only.";
  } else if (digitsOnly.length < 16) {
    mensagemErroNumero.textContent = "Wrong format, card number must have 16 digits.";
  } else {
    mensagemErroNumero.textContent = ""; // Tudo certo
  }
}
);

// Data de expiração
const cartaoMes = document.getElementById("exp-month");
const cartaoAno = document.getElementById("exp-year");
const displayMes = document.getElementById("display-month");
const displayAno = document.getElementById("display-year");
const mensagemErroData = document.getElementById("expiry-error");
function validarData() {
  displayMes.textContent = cartaoMes.value || "00";
  displayAno.textContent = cartaoAno.value || "00";

  const mesStr = cartaoMes.value; // string
  const anoStr = cartaoAno.value; // string

  const mes = parseInt(mesStr);
  const ano = parseInt("20" + anoStr);

  const hoje = new Date();
  const mesAtual = hoje.getMonth() + 1; 
  const anoAtual = hoje.getFullYear();

  // Validações:
  if (mesStr.length == 0 || anoStr.length == 0) {
    mensagemErroData.textContent = "Can't be blank.";
    }
  else if (isNaN(mes) || mes < 1 || mes > 12) {
    mensagemErroData.textContent = "Invalid month.";
  } else if (isNaN(ano)) {
    mensagemErroData.textContent = "Invalid year.";
  } else if (ano < anoAtual || (ano === anoAtual && mes < mesAtual)) {
    mensagemErroData.textContent = "Expiration date cannot be in the past.";
  } else {
    mensagemErroData.textContent = "";
  }
}
  cartaoMes.addEventListener("input", validarData)
  cartaoAno.addEventListener("input", validarData)


// CVC
const cartaoCVC = document.getElementById("card-cvc");
const displayCVC = document.getElementById("display-cvc");
cartaoCVC.addEventListener("input", () => {
  displayCVC.textContent = cartaoCVC.value || "000";
});