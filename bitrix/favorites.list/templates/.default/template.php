<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<DIV class="main">
    <SECTION class="listing-layout">
    <H3 class="title-heading ajax_load_name">
        Избранное

    </H3>

        <DIV class="view-type clearfix">
            <A data-id = "buildListView" class="list" href="#"></A>
            <A data-id = "buildGridView" class="grid" href="#"></A>
            <A data-id = "buildTableView" class="table" href="#"></A>
        </DIV>
        <?php if(count($arResult["ITEMS"])>0):?>
        <DIV class="list-container clearfix">
            <DIV class="sort-controls">
               <!--  <STRONG>Сортировать:</STRONG> &nbsp;
                <SELECT name="sort_properties" id="sort-properties">
                    <OPTION value="default">По умолчанию</OPTION>
                    <OPTION value="price-asc">От дешевых к дорогим</OPTION>
                    <OPTION value="price-desc">От дорогих к дешевым</OPTION>
                    <OPTION value="date-asc">По дате от старых к новым</OPTION>
                    <OPTION value="date-desc">По дате от новых к старым</OPTION>
                </SELECT> -->

            </DIV>
        <?php else:?>
            <h1>Вы пока ничего не добавили в избранное!!!</h1>
        <?php endif;?>

<DIV class=" ">
    <div class="property-wrap">
        
    </div> 
<?php 
$asd = array();

// echo "<pre>";var_dump($arResult["ITEMS"]);echo('</pre>');
?>

<?foreach($arResult["ITEMS"] as $arItem){

     $rsUser = CUser::GetByID($arItem["CREATED_BY"]);
     $arUser = $rsUser->Fetch();
	$asd[] = array(
		'address'=> $arItem['NAME'],
            'img'=> $arItem["PREVIEW_PICTURE"]['SRC'],
            'price'=> $arItem['DISPLAY_PROPERTIES']['PRICE']['VALUE'],
            'type'=> "Вилла",
            'description'=> $arItem['PREVIEW_TEXT'],
            'agent'=> $arUser['NAME'].' '.$arUser["LAST_NAME"],
            'phone'=> $arUser["WORK_PHONE"]!=""?$arUser["WORK_PHONE"]:'не указан',
            'sq'=> $arItem['DISPLAY_PROPERTIES']['AREA']['VALUE'],
            'bedroom'=> $arItem['DISPLAY_PROPERTIES']['BEDROOMS']['VALUE'],
            'bathroom'=> $arItem['DISPLAY_PROPERTIES']['BECHROOMS']['VALUE'],
            'garage'=> $arItem['DISPLAY_PROPERTIES']['GARAGE']['VALUE'],
            'detal_url'=>$arItem["DETAIL_PAGE_URL"],
            'user_id'=>$arUser['ID'],
	);
		
};
?>
<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
	<div class="pagination">
		<?=$arResult["NAV_STRING"]?>
	</div>
<?endif;?>
<script >

    var data_objects = {objects: <?= json_encode($asd)?>};

    
</script>
</DIV>

	
   <script id="listing_table_template" type="text/x-handlebars-template">
        <table class="table-hover">
		    <thead>
		        <tr class="bold">
		            <th>Предложение</th>
		            <th>Площадь</th>  
		            <th>Цена</th>
		            <th>Риэлтор</th>
		            <th>Телефон</th>                    
		            
		        </tr>
		    </thead>
		    <tbody style="height: 200px; overflow: scroll;">
		        {{#each objects}}
		        <tr>
                <td class="float_left"><a href="{{detal_url}}">{{address}}</a></td>
		            <td>{{sq}}</td>                    
		            <td>{{price}} (руб.)</td>
		            <td><a href="/rieltoy/info.php/?user={{user_id}}">{{agent}}</a></td>
		            <td>{{phone}}</td>                    
		            
		        </tr>
		        {{/each}}
		    </tbody>
		</table>
    </script>
    <script id="listing_list_template" type="text/x-handlebars-template">
         {{#each objects}}
            <ARTICLE class="property-item clearfix ">
                <H4>
                    <A title="{{address}}" href="{{detal_url}}">{{address}}</A>
                </H4>
                <FIGURE>
                    <A title="address" href="{{detal_url}}">
                        <IMG width="244" height="163" title="address" class="attachment-property-thumb-image wp-post-image" alt="address" src="{{img}}">
                    </A>
                    <FIGCAPTION data-lat="43.588846" data-lng="39.720275"><a href="#map-modal" data-toggle="modal">На карте</a></FIGCAPTION>
                </FIGURE>
                <DIV class="detail  object_detal">
                    <H5 class="price">  {{price}} (руб.)
                        <SMALL>  </SMALL>
                    </H5>
                    <P>{{description}}</P>
                        <!--<p>Риэлтор: <a href="#">{{agent}}</a></p>
                        <p>Телефон: {{phone}}</p>-->
                    <A class="more-details" href="{{detal_url}}">
                        Детали <I class="fa fa-caret-right"></I>
                    </A>
                </DIV>
                <DIV class="property-meta">
                <SPAN><I class="icon-area"></I>{{sq}}&nbsp;Кв.м</SPAN>
                <SPAN><I class=""></I>Риэлтор: <a href="/rieltoy/info.php/?user={{user_id}}">{{agent}}</a>&nbsp;</SPAN>
                <SPAN><I class=""></I>Телефон: {{phone}}&nbsp;</SPAN>
                </DIV>
            </ARTICLE>
         {{/each}}
    </script>
    <script id="listing_grid_template" type="text/x-handlebars-template">
         {{#each objects}}
            <ARTICLE class="property-item clearfix article_object">
                <H4>
                    <A title="{{address}}" href="{{detal_url}}">{{address}}</A>
                </H4>
                <FIGURE>
                    <A title="address" href="{{detal_url}}">
                        <IMG width="244" height="163" title="address" class="attachment-property-thumb-image wp-post-image" alt="address" src="{{img}}">
                    </A>
                    <FIGCAPTION data-lat="43.588846" data-lng="39.720275"><a href="#map-modal" data-toggle="modal">На карте</a></FIGCAPTION>
                </FIGURE>
                <DIV class="detail">
                    <H5 class="price "> {{price}} (руб.)
                        <SMALL> </SMALL>
                    </H5>
                    <P>{{description}}</P>
                        <p>Риэлтор: <a href="/rieltoy/info.php/?user={{user_id}}">{{agent}}</a></p>
                        <p>Телефон: {{phone}}</p>
                    <A class="more-details" href="{{detal_url}}">
                        Детали <I class="fa fa-caret-right"></I>
                    </A>
                </DIV>                
            </ARTICLE>
         {{/each}}
    </script>
