<?php
/**
 * _form.php
 * @avtor Evgenii Yolkin <e.v.yolkin@gmail.com>
 * @copyright 2013
 */
/** @var BootActiveForm $form */
$form = $this->beginWidget('bootstrap.widgets.TbActiveForm', array(
    'id'=>'seo-form',
	'enableAjaxValidation'=>false,
    'htmlOptions'=>array('class'=>'well product'),
)); ?>

<div class="block layer" style="width: auto; min-height: auto;">
	<div class="line">
        <?php echo $form->textFieldRow($model,'route',array('class'=>"medium")); ?>
        <br />(пример:/user/profile, * - значение по умолчанию)
	</div>
    <br />
    <br />
	
	<div class="line">
        <?php echo $form->textFieldRow($model,'title',array('class'=>"medium")); ?>
	</div>
    <br />
    <br />
	
	<div class="line">
        <?php echo $form->textAreaRow($model,'keywords',array('class'=>"medium")); ?>
	</div>
    <br />
    <br />
	
	<div class="line">
        <?php echo $form->textAreaRow($model,'description',array('class'=>"medium")); ?>
	</div>
    <br />
    <br />
	
	<div class="line">
        <?php echo $form->textAreaRow($model,'reserved',array('class'=>"medium")); ?>
	</div>
    <br />
    <br />
	
<p class="note">Поля помеченные <span class="required">*</span> обязательны для заполнения.</p>

</div>

<div class="line button">
	<?php $this->widget('bootstrap.widgets.TbButton', array('buttonType'=>'submit', 'type'=>'primary', 'label'=>$model->isNewRecord ? Yii::t('app', 'Добавить') : Yii::t('app', 'Сохранить'), 'htmlOptions'=>array('class'=>"green big"))); ?>
    
    <?php $this->widget('bootstrap.widgets.TbButton', array('buttonType'=>'reset', 'label'=>Yii::t('app', 'Отмена'), 'htmlOptions' => array('onclick'=>"window.location.href='".$this->createUrl('admin')."'"))); ?>

</div>

<?php $this->endWidget(); ?>
