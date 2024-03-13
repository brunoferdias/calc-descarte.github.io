const button = document.querySelector('.button-add-task');
const inputQuebra = document.querySelector('.input-papel');
const inputEficiencia = document.querySelector('.input-efi');
const resultadoElement = document.querySelector('.resultado');
const btnEnviar = document.querySelector('.btn-enviar');

// Variáveis para os multiplicadores
const multiplicadorQuebra = 450;
const multiplicadorEficiencia = 235.52;

function calcularDescarte() {
  const quebra = parseFloat(inputQuebra.value);
  const eficiencia = parseFloat(inputEficiencia.value);

  if (isNaN(quebra) || isNaN(eficiencia)) {
    alert("Por favor, insira valores válidos para a Quebra e a Eficiência.");
    return;
  }

  // Calcula o valor total multiplicando a quebra pelo multiplicador da quebra
  let valorTotalQuebra = quebra * multiplicadorQuebra;

  // Calcula o valor total da eficiência multiplicando pelo multiplicador da eficiência
  let valorTotalEficiencia = Math.round(eficiencia * multiplicadorEficiencia * 9);

  // Captura a hora atual do dia
  const horaAtual = new Date().getHours();

  // Determina a saudação com base na hora atual
  let saudacao = '';
  if (horaAtual >= 5 && horaAtual < 12) {
    saudacao = 'Bom dia';
  } else if (horaAtual >= 12 && horaAtual < 18) {
    saudacao = 'Boa tarde';
  } else {
    saudacao = 'Boa noite';
  }

  // Calcula a porcentagem
  const porcentagem = (valorTotalQuebra / valorTotalEficiencia) * 100;

  // Texto do resultado com HTML
  const textoResultado = `${saudacao}!<br><br>Descartamos ${valorTotalQuebra.toLocaleString()} garrafas hoje.<br>Que equivale a aproximadamente ${porcentagem.toFixed(2).replace('.', ',')}% da nossa produção.<br><br>Isso é tudo,<br>Bom descanso a todos!`;

  resultadoElement.innerHTML = textoResultado;

  // Mostra o botão "Enviar" após o cálculo
  btnEnviar.style.display = 'inline-block';
}

button.addEventListener('click', calcularDescarte);

// Evento de clique no botão "Enviar"
btnEnviar.addEventListener('click', function () {
  // Texto a ser enviado para o WhatsApp
  const textoWhatsapp = resultadoElement.innerText.replace(/<br>/g, '\n');

  // Abre o link do WhatsApp com o texto formatado
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(textoWhatsapp)}`, '_blank');
});
