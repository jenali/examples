<?php
/**
 * _search.php
 * @avtor Evgenii Yolkin <e.v.yolkin@gmail.com>
 * @copyright 2013
 */
?>
<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
        'action'=>Yii::app()->createUrl($this->route),
        'method'=>'get',
)); ?>
				<div class="line left-float width-block">
                    <?php echo '<label>Адрес страницы</label>'; ?>
                    <?php echo $form->textField($model,'route',array('class'=>'medium')); ?>
                </div>
        
                <div class="line">
                        <?php echo $form->label($model,'title'); ?>
                        <?php echo $form->textField($model,'title',array('class'=>'medium')); ?>
                </div>

        

                <div class="line button">
                        <button type="submit" class="blue big"><span>Поиск</span></button>
                </div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->
