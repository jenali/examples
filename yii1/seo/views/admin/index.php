<?php
/**
 * index.php
 * @avtor Evgenii Yolkin <e.v.yolkin@gmail.com>
 * @copyright 2013
 */
$this->breadcrumbs=array(
	
	Yii::t('app', 'Seo'),
);

$this->menu=array(
		array('label'=>Yii::t('app',
				'List Seo'), 'url'=>array('index')),
		array('label'=>Yii::t('app', 'Create Seo'),
				'url'=>array('create')),
			);

		Yii::app()->clientScript->registerScript('search', "
			$('.search-button').click(function(){
				$('.search-form').toggle();
				if ($('.search-button a').html()=='Показать') { 
					$('.search-button a').html('Скрыть'); 
				} else {
					$('.search-button a').html('Показать');
				}
				return false;
				});
			$('.search-form form').submit(function(){
				$.fn.yiiGridView.update('seo-grid', {
data: $(this).serialize()
});
				return false;
				});
			");
		?>
		
<div class="section">
	<div class="box">
			<div class="title">
				<h2>Поиск</h2>
				<span class="search-button" ><a href="#">Показать</a></span>
			</div>
			<div class="content search-form" >
				<?php $this->renderPartial('_search',array(
						'model'=>$model,
					)); ?>
			</div>
	
	</div>
</div>

<div class="section">
	<div class="box">
<div class="title">
<h2> Управление&nbsp;Seo</h2>
</div>



<div class="content">
	<a href="<?= $this->createAbsoluteUrl(Yii::app()->homeUrl); ?>/sitemap" target="_blank" class="button green medium" style="opacity: 0.7; "><?= Yii::t('app', 'Обновить sitemap.xml') ?></a><br />(пользователь/пароль: admin/tPRJD2PyVZ)<br /><br />
	<a href="<?= $this->createUrl('create'); ?>" class="button green medium" style="opacity: 0.7; "><?= Yii::t('app', 'Добавить запись') ?></a>
	<?php $this->widget('zii.widgets.grid.CGridView', array(
		'id'=>'seo-grid',
		'dataProvider'=>$model->search(),
		'selectableRows'=>$model->count(),
		'ajaxUpdate'=>false,
		'itemsCssClass'=>'table',
		'columns'=>array(
			array(
       'class'=>'CCheckBoxColumn',
       'header'=>'',
      ),
		'id',
		array (
		 'name'=>'route',
		 'header'=>'Адрес страницы'
		),
		'title',

		
			array(
				'class'=>'CButtonColumn',
				'template'=>'{update} {delete}',  
				'updateButtonUrl'=>'Yii::app()->controller->createUrl("update", array("id"=>$data->primaryKey))', 
				'updateButtonImageUrl'=>$this->path.'gfx/icon-edit.png',
				'deleteButtonImageUrl'=>$this->path.'gfx/icon-delete.png',
			),
		),
	)); ?>
</div>

	</div>
</div>