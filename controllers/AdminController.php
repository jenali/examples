<?php

/**
 * Class AdminController
 * @avtor Evgenii Yolkin <e.v.yolkin@gmail.com>
 * @copyright 2013
 */
class AdminController extends BackEndController
{
	public $layout='//layouts/column1';
	private $_model;

    /**
     * @return array
     */
    public function filters()
	{
		return array(
			'accessControl', 
		);
	}

    /**
     * просмотр
     * render
     */
    public function actionView()
	{
		$this->render('view',array(
			'model'=>$this->loadModel(),
		));
	}

    /**
     * создания
     * render
     * post -> redirect
     */
    public function actionCreate()
	{
		$model=new Seo;

		$this->performAjaxValidation($model);

		if(isset($_POST['Seo']))
		{
			$model->attributes=$_POST['Seo'];
		

			if($model->save())
				$this->redirect(array('/backend/seo/admin/admin'));
		}

		$this->render('create',array(
			'model'=>$model,
		));
	}

    /**
     * обновления
     * render
     * post -> redirect
     */
    public function actionUpdate()
	{
		$model=$this->loadModel();

		$this->performAjaxValidation($model);

		if(isset($_POST['Seo']))
		{
			$model->attributes=$_POST['Seo'];
		
			if($model->save())
				$this->redirect(array('/backend/seo/admin/admin'));
		}

		$this->render('update',array(
			'model'=>$model,
		));
	}

    /**
     * удаления
     * delete -> redirect
     * @throws CHttpException
     */
    public function actionDelete()
	{
		if(Yii::app()->request->isPostRequest)
		{
			$this->loadModel()->delete();

			if(!isset($_GET['ajax']))
				$this->redirect(array('/backend/seo/admin/admin'));
		}
		else
			throw new CHttpException(400,
					Yii::t('app', 'Invalid request. Please do not repeat this request again.'));
	}

    /**
     * индексная стр
     * render
     */
    public function actionIndex()
	{
		$dataProvider=new CActiveDataProvider('Seo');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}

    /**
     * админка
     * render
     */
    public function actionAdmin()
	{
		$model=new Seo('search');
		if(isset($_GET['Seo']))
			$model->attributes=$_GET['Seo'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

    /**
     * @return null
     * @throws CHttpException
     */
    public function loadModel()
	{
		if($this->_model===null)
		{
			if(isset($_GET['id']))
				$this->_model=Seo::model()->findbyPk($_GET['id']);
			if($this->_model===null)
				throw new CHttpException(404, Yii::t('app', 'The requested page does not exist.'));
		}
		return $this->_model;
	}

    /**
     * @param $model
     */
    protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='seo-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
}
