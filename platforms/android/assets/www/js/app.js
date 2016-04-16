$('.collection-item').on('click', function (){

	var $badge = $('.badge', this);
	if ($badge.length == 0) {
		$badge = $('<span class="badge brown-text">0</span>')
					.appendTo(this);
	}

	$badge.text(parseInt($badge.text()) + 1);
	
}); //faz a contagem dos pedidos e almenta os valores//



$('#confirmar').on('click', function(){

	var texto = '';

	$('.badge').parent().each(function(){
		var produto = this.firstChild.textContent;
		var quantidade = this.lastChild.textContent;

		texto += produto + ': ' + quantidade + ', ';
	});

	$('#resumo').text(texto);
}); //mostra os produtos selecionados dentro do modal//



$('.modal-trigger').leanModal(); //abre o modal //


$('.collection').on('click', '.badge', function(){
	$(this).remove();
	return false;
}); //para remover itens do pedido clicando em cima //

$('.acao-limpar').on('click', function(){
	$('#numero-mesa').val('');
	$('.badge').remove();
}); // remove todos os pedidos




$('.acao-finalizar').click(function(){
	$.ajax({
		url: 'http://cozinhapp.sergiolopes.org/novo-pedido',
		data: {
			mesa: $('#numero-mesa').val(),
			pedido: $('#resumo').text()
		},

	success: function(resposta){
		Materialize.toast(resposta, 2000);
		$('#numero-mesa').val('');
		$('.badge').remove();
	},
		error: function(erro){
			Materialize.toast(erro.responseText, 3000, 'red-text');
		}
	});
});