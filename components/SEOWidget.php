<?

/**
 * Class SEOWidget
 * @avtor Evgenii Yolkin <e.v.yolkin@gmail.com>
 * @copyright 2013
 */
class SEOWidget extends CWidget
{
    const MODE_HEADER = 0;
    const MODE_SEOTEXT = 1;

    public $mode = self::MODE_HEADER;
    public $detalis = '';

    /**
     * init()
     * иницаализацыя виджета
     * @return void
     */
    public function init()
    {
        $this->detalis = Yii::app()->controller->pageTitle;
    }

    /**
     * run
     * Выполнения виджета
     * @return void
     */
    public function run()
    {
        //получаем текуший роотинг
        $route = yii::app()->request->getPathInfo();
        
		if($route == '')
            $route = 'site/index';
        // розбиваем по шаблону
        $view = explode('/',$route);



        if(substr($route,-1)=='/')
                $route = substr($route,0,-1);
                
        if(substr($route,-1)=='/')
                $route = substr($route,0,-1);
                
        //поиск по роотингу
        $seo = Seo::model()->getbyRoute($route)->find();
        if(!$seo) {
            $seo = Seo::model()->getDefault()->find();
            
            if (isset($seo)) {
            	$seo->title =$seo->title;
            }
        }    
        // усли нету записи
        if(!$seo)
        {
            print '<!-- Путь не найден -->';
            return;
        }

        //вывод значений
        switch($this->mode)
        {
            case(self::MODE_SEOTEXT):
                print $seo->reserved;
                break;
            default:
            case(self::MODE_HEADER):
                print '<meta name="keywords" content="'.$seo->keywords.'">' . "\n";
                print '<meta name="description" content="'.$seo->description.'">' . "\n";
                print '<title>'.$seo->title.'</title>' . "\n";
                break;
        }
    }
}

?>