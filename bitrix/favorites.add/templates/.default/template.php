<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
$APPLICATION->SetAdditionalCSS($templateFolder."/styles.css", true);
//$APPLICATION->AddHeadScript($templateFolder."/script.js", true);
?>
<script type="text/javascript" src="<?=$templateFolder.'/script.js'?>"></script>
<div class="favorites">
<?php if ($arResult['favorites']):?>
		
	<i data-id='<?=$arParams['ID']?>' data-action="delete" class="fa fa-star"></i><dr>&nbsp;Удалить с избранного</dr>
		
<?php else:?>
	
		<i data-id='<?=$arParams['ID']?>' data-action="add" class="fa fa-star-o"></i><dr>&nbsp;В избранное</dr> 

<?php endif ?>
</div>