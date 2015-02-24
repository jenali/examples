(function($){
	$(document).ready(function(){
		$('.favorites').click(function(){
			ajax_favorites($(this));
			return false;
		});
	});
	function ajax_favorites(el)
	{
		var action = el.children('i').data('action');
		var id = el.children('i').data('id');
		$.ajax({
			type: "GET",
			url: '/bitrix/components/jenali/favorites.add/ajax/index.php?id='+id+'&action='+action+'&ajax=true',
			dataType: "json",
			success: function(data){
				console.log(data);
				if(data.statys =='ok'){
					if(data.action == 'add'){
						el.children('i').attr('class','fa fa-star');
						el.children('i').data('action','delete');

						el.children('dr').text('Удалить с избранного');
					};
					if(data.action == 'delete'){
						el.children('i').attr('class','fa fa-star-o');
						el.children('i').data('action','add');
						el.children('dr').text('В избранное');
					};
				}
			}
		});
	}
})(jQuery);