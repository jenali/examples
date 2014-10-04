<?php
/**
 * admin.php
 * @avtor Evgenii Yolkin <e.v.yolkin@gmail.com>
 * @copyright 2013
 */
$this->breadcrumbs = array(
    Yii::t('app', 'Seo')
);
?>
<div class="page-header admin-header">
    <h3><?php echo Yii::t('app', 'Seo')?></h3>
    <?php $this->widget('bootstrap.widgets.TbButton', array(
        'label' => Yii::t('translate', 'Добавить запись'),
        'size' => 'small',
        'url' => array('create'),
    ));
    ?>
</div>


<div class="page-content">
    <?php $this->widget('bootstrap.widgets.TbExtendedGridView', array(
    'id'=>'seo-grid',
    'type'=>'striped bordered',
    'dataProvider'=>$model->search(),
    //'filter' => $model,
    //'sortableRows' => true,
    //'sortableAjaxSave'=>true,
    //'sortableAttribute'=>'sort',
    //'sortableAction'=> 'config/admin/sortable',
    'columns' => array(
        /*array(
            'class'=>'CCheckBoxColumn',
            'header'=>'',
        ),
        'id',*/
        array (
            'name'=>'title',
            'type'=>'raw',
            'value' => 'CHtml::link($data->title, array("/seo/admin/update", "id" => $data->id))',
        ),
        array (
            'name'=>'route',
            'header'=>'Адрес страницы',
        ),
        array(
            'class' => 'bootstrap.widgets.TbButtonColumn',
            'template'=>'{delete}',
        ),
    ),
)); ?>
</div>