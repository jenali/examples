<?php
/**
 * Class SeoModule
 * @avtor Evgenii Yolkin <e.v.yolkin@gmail.com>
 * @copyright 2013
 */
class SeoModule extends CWebModule
{
	
	public $version='1.0.0';
	public $nameModule='SEO';
	public $showFrontEnd = false;
	public $showBackEnd = false;
	
	static public function getImports()
	{
	  return array(
	    'seo.models.*',
		'seo.components.*',
	  );
	}

	static public function importAll()
	{
	  foreach(self::getImports() as $import)
	  {
	      yii::import($import);
	  }
	}

	public function init()
	{
		if(($theme=Yii::app()->getTheme())!==null)
        $this->viewPath=$theme->viewPath.'/modules/'.$this->id;

  	SeoModule::importAll();
	}
	
	public function beforeControllerAction($controller, $action)
	{
		if(parent::beforeControllerAction($controller, $action))
		{
			
     
			// this method is called before any module controller action is performed
			// you may place customized code here
			return true;
		}
		else
			return false;
	}
}
