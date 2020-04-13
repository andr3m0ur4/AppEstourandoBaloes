// carregar eventos na página
window.onload = function() {
	var arquivo = extrairArquivo(location.pathname)

	if (arquivo === 'index.html') {
		document.getElementById('iniciar').onclick = function() {
			dificuldadeJogo()
		}
	}

	if (arquivo === 'jogo.html') {
		iniciarJogo()
	}
}

// Função para extrair o nome do arquivo
function extrairArquivo(caminho){
	caminho	= caminho.replace("/\/g", '/')
	let arquivo = caminho.substring(caminho.lastIndexOf('/') + 1)
	
	return arquivo
}

function dificuldadeJogo() {
	var nivel_jogo = document.getElementById('nivel_jogo').value

	window.location.href = 'jogo.html?' + nivel_jogo
}

function iniciarJogo() {
	var url = window.location.search
	
	var nivel_jogo = url.replace('?', '')

	var tempo_segundos = 0

	if (nivel_jogo == 1) {
		tempo_segundos = 120
	}

	if (nivel_jogo == 2) {
		tempo_segundos = 60
	}

	if (nivel_jogo == 3) {
		tempo_segundos = 30
	}

	// Inserindo os segundos no span
	document.getElementById('tempo_cronometro').innerHTML = tempo_segundos

	// quantidade de balões
	var qtd_baloes = 20

	criarBaloes(qtd_baloes)

	// imprimir quantidade de balôes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtd_baloes
	document.getElementById('baloes_estourados').innerHTML = 0
}

function criarBaloes(qtd_baloes) {
	for (var i = 1; i <= qtd_baloes; i++) {
		var balao = document.createElement('img')
		balao.src = './imagens/balao_azul_pequeno.png'
		balao.style.margin = '10px'

		document.getElementById('cenario').appendChild(balao)
	}
}