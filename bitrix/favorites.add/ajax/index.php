<?php
 require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
 $answer['statys'] = "NO";
  if($_REQUEST['ajax']==true){
  	//Добавления
  	$user = new CUser;
  	$rsUser = CUser::GetByID($USER->GetID());
	$arUser = $rsUser->Fetch();
	

  	if($_REQUEST['action']=="add"){
  		//добавления
  		if(!in_array($_REQUEST['id'], $arUser["UF_FAVORITES"])){
  			$arUser["UF_FAVORITES"][] = $_REQUEST['id'];
  			$fields = Array(
  					'UF_FAVORITES'=>$arUser["UF_FAVORITES"],
  				);
  			if($user->Update($USER->GetID(), $fields)){
  				$answer['statys'] = "ok";
  				$answer['action'] = "add";
  			}
  		}


  		
  	}
  	//удаления
  	if($_REQUEST['action']=="delete"){
		if(in_array($_REQUEST['id'], $arUser["UF_FAVORITES"])){
			$key = array_search($_REQUEST['id'], $arUser["UF_FAVORITES"]);
  			unset($arUser["UF_FAVORITES"][$key]);

  			$fields = Array(
  					'UF_FAVORITES'=>$arUser["UF_FAVORITES"],
  				);
  			if($user->Update($USER->GetID(), $fields)){
  				$answer['statys'] = "ok";
  				$answer['action'] = "delete";
  			}
  		}  		

  	}
  	echo json_encode($answer);
  }else{
  	echo json_encode($answer);
  }

?>