<? if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
//получаем текушего пользователя
$rsUser = CUser::GetByID($USER->GetID());
$arUser = $rsUser->Fetch();

if(in_array($arParams['ID'], $arUser["UF_FAVORITES"]))
{
	$arResult['favorites'] = true;
}else{
	$arResult['favorites'] = false;
}
	$this->IncludeComponentTemplate();

?>