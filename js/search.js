//--------------------------------------------------------//
//сортировка и поиск ajax

(function($){
    var url = '/search';
    if(location.pathname=='/sekret/index.php')
    {
        url='/sekret/index.php';
    }
    $(document).ready(function(){
        // alert('asdcsc');
        $('.advance-search-form select').change(function(){

            ajax_icon_start();
            get_ajax();
        });
        $('.advance-search-form input[type="text"]').keyup(function(){
            ajax_icon_start();
            get_ajax();
        });
        $(".tree-checkbox").on("click",function(){
            if ($(this).prop("checked")) {
                $(this).parent().siblings(".tree-dropdown").find(".tree-checkbox").prop("checked", true);

            } else {
                $(this).parent().siblings(".tree-dropdown").find(".tree-checkbox").prop("checked", false);
            };
            ajax_icon_start();
            get_ajax();
        });

        go_pag_ajax();
        sort_my();



    });
    //запуск иконки
    function ajax_icon_start(){
        $('.ajax_icon').css('display','block');
    }
    //стоп иконки
    function ajax_icon_stop(){
        $('.ajax_icon').css('display','none');
    }
    //сортировка подготовка
    function sort_my(){
        $('#sort-properties').change(function(){
            var vall = $(this).val();
            var str
            if(vall=='price-asc')str='&sort=property_PRICE&method=asc';
            if(vall=='price-desc')str='&sort=property_PRICE&method=desc';
            if(vall=='date-asc')str='&sort=id&method=asc';
            if(vall=='date-desc')str='&sort=id&method=desc';
            get_ajax_sort(str);

        });
    }
    //сортировка
    function get_ajax_sort(str)
    {
        ajax_icon_start();
        var asd = $('.advance-search-form').serialize();
        $.ajax({
            type: "GET",
            url: url+'?'+asd+str+"&set_filter=Показать",
            dataType: "html",
            success: function(data){
                $('.main').html($('.listing-layout',data));
                //buildListView();
                bild();
                ajax_icon_stop();
                go_pag_ajax();
                sort_my();
                set_name();
                set_tab_old();
            }
        });
    }

    //ajax  по пагинатору с сохранениям свойст
    function get_ajax_pag(pag)
    {
        ajax_icon_start();
        var asd= $('.advance-search-form').serialize();
        $.ajax({
            type: "GET",
            url: url+'?'+asd+'&PAGEN_1='+pag+"&set_filter=Показать",
            dataType: "html",
            success: function(data){

                $('.main').html($('.listing-layout',data));
                //buildListView();
                bild();
                ajax_icon_stop();
                go_pag_ajax();
                sort_my();
                set_name();
                set_tab_old();
            }
        });

    }
    //востановления знечения таб
    function set_tab_old(){
        if(bild_tab == "buildListView"){
            buildListView();
        };
        if(bild_tab == "buildTableView"){
            buildTableView();
        };
        if(bild_tab == "buildGridView"){
            buildGridView();
        };
    }
    //собитие на пагинатор
    function go_pag_ajax(){

        $('.pagination').children('a').click(function() {
            get_ajax_pag($(this).html());
            return false;
        })
    }

    //отправляем запрос ajax
    function get_ajax()
    {
        var asd= $('.advance-search-form').serialize();
        $.ajax({
            type: "GET",
            url: url+'?'+asd+"&set_filter=Показать&clear_cache=Y",
            dataType: "html",
            success: function(data){

                $('.main').html($('.listing-layout',data));
                //buildListView();
                bild();
                ajax_icon_stop();
                go_pag_ajax();
                sort_my();
                set_name();
                set_tab_old();
            }
        });

    }
    // востановления имени
    function set_name(){
        var val=$('#select-property-type').val();
        if(val==3){
            $('.ajax_load_name').text("Найденные дома");
        }
        if(val==4){
            $('.ajax_load_name').text("Найденные участки");
        }
        if(val==1038 || val==1039){
            $('.ajax_load_name').text("Найденные квартиры");
        }
        if(val==5){
            $('.ajax_load_name').text("Найденная коммерция");
        }
    }

    //строим табы
    function bild()
    {
        $('.listing-layout .view-type .list').on('click', function(e) {
            if (!$('.listing-layout .view-type .list').hasClass('active')) {
                buildListView();

            }
            e.preventDefault();
        });
        $('.listing-layout .view-type .table').on('click', function(e) {
            if (!$('.listing-layout .view-type .table').hasClass('active')) {
                buildTableView();

            }
            e.preventDefault();
        });
        $('.listing-layout .view-type .grid').on('click', function(e) {
            if (!$('.listing-layout .view-type .grid').hasClass('active')) {
                buildGridView();

            }
            e.preventDefault();
        });
    }
    function buildTableView() {
        var template = Handlebars.compile( $('#listing_table_template').html() );
        $('.listing-layout .property-wrap').html( template(data_objects) );
        $('.property-wrap table').tableScroll({height:350, width: 804});
        $('.property-wrap').removeClass('property-grid').addClass('property-table');
        $('.listing-layout .view-type a').removeClass('active');
        $('.listing-layout .view-type .table').addClass('active');
        bild_tab = 'buildTableView' ;
    }

    function buildListView() {
        var template = Handlebars.compile( $('#listing_list_template').html() );
        $('.listing-layout .property-wrap').html( template(data_objects) );
        $('.property-wrap').removeClass('property-grid property-table');
        $('.listing-layout .view-type a').removeClass('active');
        $('.listing-layout .view-type .list').addClass('active');
        bild_tab = 'buildListView' ;
    }
    function buildGridView() {
        var template = Handlebars.compile( $('#listing_grid_template').html() );
        $('.listing-layout .property-wrap').html( template(data_objects) );
        $('.property-wrap').removeClass('property-table').addClass("property-grid");
        $('.listing-layout .view-type a').removeClass('active');
        $('.listing-layout .view-type .grid').addClass('active');
        bild_tab = 'buildGridView' ;
    }

})(jQuery);