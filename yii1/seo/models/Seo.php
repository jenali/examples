<?php

/**
 * Class Seo
 * @avtor Evgenii Yolkin <e.v.yolkin@gmail.com>
 * @copyright 2013
 */
class Seo extends CActiveRecord
{
    /**
     * @param string $className
     * @return mixed
     */
    public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

    /**
     * @return string
     */
    public function tableName()
	{
		return '{{seo}}';
	}

    /**
     * @return array
     */
    public function rules()
	{
		return array(
			array('title, route', 'required'),
			array('title', 'length', 'max'=>2255),
			array('route', 'length', 'max'=>255),
			array('id, title, keywords, description, route, reserved', 'safe'),
		);
	}

    /**
     * @return array
     */
    public function relations()
	{
		return array(
		);
	}

    /**
     * @return array
     */
    public function behaviors()
	{
		return array(
        	'published'         =>array('class'=>'ext.behaviors.PublishedBehavior'),
            'savefiles'         => array(
                'class'         => 'pictures.components.SaveFileBehavior',
                'savelocation'  => 'seo',
                'entity'        => 'Seo'
            ),
		);
	}

    /**
     * @return array
     */
    public function attributeLabels()
	{
		return array(
			'id'            => Yii::t('app', 'ID'),
			'title'         => Yii::t('app', 'Title'),
			'keywords'      => Yii::t('app', 'Keywords'),
			'description'   => Yii::t('app', 'Description'),
			'route'         => Yii::t('app', 'Адрес страницы '),
			'reserved'      => Yii::t('app', 'Seo-текст'),
		);
	}

    /**
     * @return CActiveDataProvider
     */
    public function search()
	{
		$criteria=new CDbCriteria;
		$criteria->compare('id',$this->id);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('keywords',$this->keywords,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('route',$this->route,true);
		$criteria->compare('reserved',$this->reserved,true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}

    /**
     * @param $route
     * @return $this
     */
    public function getbyRoute($route)
  	{
      if(substr($route,0,1)!='%')
              $route = '%' . $route;
      
      if(substr($route,-1)!='%')
              $route .= '%';
      
      $this->getDbCriteria()->mergeWith(array(
          'condition' => 'route LIKE :route',
          'params' => array( ':route'=>$route )
      ));
      return $this;
	}

    /**
     * @return $this
     */
    public function getDefault()
  	{
    	$this->getDbCriteria()->mergeWith(array(
        	'condition' => 'route = "*"',
      	));
    	return $this;
  	}
}
