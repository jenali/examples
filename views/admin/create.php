<?php
/**
 * crate.php
 * @avtor Evgenii Yolkin <e.v.yolkin@gmail.com>
 * @copyright 2013
 */
$this->breadcrumbs=array(
	'Seo'=>array(Yii::t('app', '/seo')),
	Yii::t('app', 'Добавить'),
);

$this->menu=array(
	array('label'=>'List Seo', 'url'=>array('index')),
	array('label'=>'Manage Seo', 'url'=>array('admin')),
);
?>

<div class="page-header">
    <h3><?php echo Yii::t('config', 'Создание записи'); ?></h3>
</div>

<div class="page-content">
    <?php echo $this->renderPartial('_form', array('model' => $model)); ?>
</div>