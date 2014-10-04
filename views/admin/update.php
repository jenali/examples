<?php
/**
 * update.php
 * @avtor Evgenii Yolkin <e.v.yolkin@gmail.com>
 * @copyright 2013
 */
$this->breadcrumbs=array(
	'Seos'=>array('index'),
	Yii::t('app', 'Изменить'),
);

$this->menu=array(
	array('label'=>'List Seo', 'url'=>array('index')),
	array('label'=>'Create Seo', 'url'=>array('create')),
	array('label'=>'View Seo', 'url'=>array('view', 'id'=>$model->id)),
	array('label'=>'Manage Seo', 'url'=>array('admin')),
);

?>
<div class="page-header">
    <h3><?php echo Yii::t('config', 'Редактирование записи :id', array(':id' => '#' . $model->id)); ?></h3>
</div>

<div class="page-content">
    <?php echo $this->renderPartial('_form', array('model' => $model)); ?>
</div>