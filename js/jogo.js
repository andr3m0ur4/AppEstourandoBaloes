// carregar eventos na página
window.onload = function() {
	var path = location.pathname.split('/')
	path = path.slice(path.length - 1).toString()

	if (path === '' || path === 'index.html') {
		document.getElementById('iniciar').onclick = function() {
			dificuldadeJogo()
		}
	}

	if (path === 'jogo.html') {
		iniciarJogo()
	}
}

function dificuldadeJogo() {
	var nivel_jogo = document.getElementById('nivel_jogo').value

	window.location.href = './jogo.html?' + nivel_jogo
}

var timerId = null	// varável que armazeana a chamada da função timeout

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
	var qtd_baloes = 80

	criarBaloes(qtd_baloes)

	// imprimir quantidade de balôes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtd_baloes
	document.getElementById('baloes_estourados').innerHTML = 0

	contagemTempo(++tempo_segundos)
}

function contagemTempo(segundos) {
	segundos--

	if (segundos < 0) {
		clearTimeout(timerId)	// para a execução da função do setTimeout
		fimJogo()
		return false
	}

	document.getElementById('tempo_cronometro').innerHTML = segundos

	timerId = setTimeout(function() {
		contagemTempo(segundos)
	}, 1000)
}

function fimJogo() {
	alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo')

	var cenario = document.getElementById('cenario')
	var baloes = cenario.querySelectorAll('img')
	
	baloes.forEach(function(balao) {
		balao.setAttribute('onclick', '')
	})
}

function criarBaloes(qtd_baloes) {
	for (var i = 1; i <= qtd_baloes; i++) {
		var balao = document.createElement('img')
		balao.src = './imagens/balao_azul_pequeno.png'
		balao.style.margin = '10px'
		balao.id = 'b' + i
		balao.onclick = function() {
			estourar(this)
		}

		document.getElementById('cenario').appendChild(balao)
	}
}

function estourar(elemento) {
	var id_balao = elemento.id

	document.getElementById(id_balao).setAttribute('onclick', '')

	document.getElementById(id_balao).src = './imagens/balao_azul_pequeno_estourado.png'

	pontuacao(-1)
}

function pontuacao(acao) {
	var baloes_inteiros = parseInt(document.getElementById('baloes_inteiros').innerHTML)
	var baloes_estourados = parseInt(document.getElementById('baloes_estourados').innerHTML)

	baloes_inteiros += acao
	baloes_estourados -=  acao

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados

	situacaoJogo(baloes_inteiros)
}

function situacaoJogo(baloes_inteiros) {
	if (baloes_inteiros == 0) {
		alert('Parabéns, você conseguiu estourar todos os balões a tempo')
		pararJogo()
	}
}

function pararJogo() {
	clearTimeout(timerId)
}
