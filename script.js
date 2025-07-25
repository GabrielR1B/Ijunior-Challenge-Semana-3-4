// Nome do cartão
const cartaoNome = document.getElementById("card-name");
const displayNome = document.getElementById("display-name");
const mensagemErroNome = document.getElementById("card-name-error");


cartaoNome.addEventListener("input", () => {
  displayNome.textContent = cartaoNome.value || "Jane Appleseed";

  cartaoNome.classList.remove("input-erro", "input-correto");
  if (cartaoNome.value.trim() == "") {
    mensagemErroNome.textContent = "Can't be blank.";
    cartaoNome.classList.add("input-erro");
  }
  else {
    mensagemErroNome.textContent = ""; 
    cartaoNome.classList.add("input-correto");
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
  cartaoNumero.classList.remove("input-erro", "input-correto");

  const isOnlyDigits = /^\d+$/.test(digitsOnly);
    if (cartaoNumero.value == 0) {
    mensagemErroNumero.textContent = "Can't be blank.";
    cartaoNumero.classList.add("input-erro");
  }
    else if (!/^\d+$/.test(digitsOnly)) {
    mensagemErroNumero.textContent = "Wrong format, numbers only.";
    cartaoNumero.classList.add("input-erro");
  } else if (digitsOnly.length < 16) {
    mensagemErroNumero.textContent = "Wrong format, card number must have 16 digits.";
    cartaoNumero.classList.add("input-erro");
  } else {
    mensagemErroNumero.textContent = "";
    cartaoNumero.classList.add("input-correto");
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

  cartaoMes.classList.remove("input-erro", "input-correto");
  cartaoAno.classList.remove("input-erro", "input-correto");

  // Validações:
  if (mesStr.length == 0 || anoStr.length == 0) {
    mensagemErroData.textContent = "Can't be blank.";
    cartaoMes.classList.add("input-erro");
    cartaoAno.classList.add("input-erro");
    }
  else if (isNaN(mes) || mes < 1 || mes > 12) {
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
  cartaoMes.addEventListener("input", validarData)
  cartaoAno.addEventListener("input", validarData)


// CVC
const cartaoCVC = document.getElementById("card-cvc");
const displayCVC = document.getElementById("display-cvc");
const mensagemErroCVC = document.getElementById("cvc-error");
cartaoCVC.addEventListener("input", () => {

  const value = cartaoCVC.value;
  let digitsOnly = value.replace(/\s/g, "");
  if (digitsOnly.length > 3) {
    digitsOnly = digitsOnly.slice(0, 3);
  }

  cartaoCVC.classList.remove("input-erro", "input-correto");
  if (cartaoCVC.value == 0) {
    mensagemErroCVC.textContent = "Can't be blank.";
    cartaoCVC.classList.add("input-erro");
  }
  else if (digitsOnly.length < 3) {
    mensagemErroCVC.textContent = "Wrong format, CVC must have 3 digits.";
    cartaoCVC.classList.add("input-erro");
  }
  else if (!/^\d+$/.test(digitsOnly)) {
    mensagemErroCVC.textContent = "Wrong format, numbers only.";
    cartaoCVC.classList.add("input-erro");
  } else {
    mensagemErroCVC.textContent = "";
    cartaoCVC.classList.add("input-correto");
  }

  cartaoCVC.value = digitsOnly;
  displayCVC.textContent = digitsOnly || "000";

});