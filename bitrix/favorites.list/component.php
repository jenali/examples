<? if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

//получаем текушего пользоваеля и его избраное
$rsUser = CUser::GetByID($USER->GetID());
$arUser = $rsUser->Fetch();
$favorites = $arUser["UF_FAVORITES"];
//получаем елементы
$arSelect = Array(
	);
if(count($favorites)>0):
$arFilter = Array(
	"IBLOCK_ID"=>11,
	"ACTIVE_DATE"=>"Y",
	"ACTIVE"=>"Y",
	'=ID'=>$favorites, 
	);
$res = CIBlockElement::GetList(Array(), $arFilter, false, Array("nPageSize"=>$arParams[PAGE_COUNT]), $arSelect);
$asd =0;

while($ob = $res->GetNextElement())
{
	$ar = $ob->GetFields('SHOW_COUNTER');

	$db_props = CIBlockElement::GetProperty(11, $ar['ID'], array("sort" => "asc"), Array());
	
	while ($ob1 = $db_props->Fetch())
    {
        $ar['DISPLAY_PROPERTIES'][$ob1["CODE"]] = $ob1;
    }
	$arResult["ITEMS"][]=$ar;
}
endif;
	$this->IncludeComponentTemplate();

?>