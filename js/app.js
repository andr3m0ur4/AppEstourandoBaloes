// carregar eventos na página
window.onload = function() {
	var arquivo = extrairArquivo(location.pathname)

	if (arquivo === 'index.html') {
		document.getElementById('iniciar').onclick = function() {
			iniciarJogo()
		}
	}
}

// Função para extrair o nome do arquivo
function extrairArquivo(caminho){
	caminho	= caminho.replace("/\/g", '/')
	let arquivo = caminho.substring(caminho.lastIndexOf('/') + 1)
	
	return arquivo
}


function iniciarJogo() {
	var nivel_jogo = document.getElementById('nivel_jogo').value

	window.location.href = 'jogo.html?' + nivel_jogo
}