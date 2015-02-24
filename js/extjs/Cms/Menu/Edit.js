/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("MyDesktop.Cms.Menu.Edit",
        {
            extend: "Ext.form.Panel",
           // requires: ['MyDesktop.lib.CkeditorField', 'MyDesktop.lib.TinyMCETextArea.TinyMCETextArea'],
            id: "MyDesktop.Cms.Menu.Edit",
            title: '',
            modulName: "Редактирование страницы",
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 90,
                anchor: '100%'
            },
            defaultType: 'textfield',
            //bodyMargin: '25px',
            layout: 'fit',
            tbar: [
                {
                    text: 'Сохранить',
                    handler: function() {
                        //console.dir(this.up('form'));
                        //debug(this.up('form'));
                        var o = this.up('form');
                        //console.dir('' + o.savePage);
                        if (typeof o.savePage === 'function')
                            o.savePage(o);
                        //savePage(this.up('form'))
                    }
                },
                {
                    text: 'Закрыть',
                    handler: function() {
                        o = this.up('form');
                        if (typeof o.closePage === 'function')
                            o.closePage(o);
                    }

                }
            ],
            items: [
                {// это поле с закладками
                    xtype: 'tabpanel',
                    //margin: '5px 0 5px 0',

                    layout: 'anchor',
                    //border: '1',
                    fieldDefaults: {
                        //margin: '5px 5px 5px 5px',
                        padding: '5px 5px 5px 5px'
                    },
                    items: [
                        {// закладка первая: Основные свойства страницы
                            xtype: 'panel',
                            title: 'Основные свойства',
                            fieldDefaults: {
                                labelAlign: 'right',
                                labelWidth: 90,
                                anchor: '100px'
                            },
                            //layout: 'column',
                            layout: 'anchor',
                            padding: '5px 5px 5px 5px',
                            items: [
                                {
                                    fieldLabel: 'id',
                                    xtype: 'displayfield',
                                    name: 'id',
                                    readOnly: true,
                                },


                                {
                                    fieldLabel: 'Url',
                                    xtype: 'textfield',
                                    name: 'url',
                                    anchor: '100px',
                                }, {
                                    fieldLabel: 'Название',
                                    xtype: 'textfield',
                                    name: 'text',
                                    anchor: '100px',
                                    listeners: {
                                        change: function() {
                                            form = this.up('form');
                                            //debug(form);
                                            value = this.getValue();
                                            id = form.getForm().findField("id").getValue();
                                            //panel = this.up('MyDesktop.Cms.Page.Edit.'+id);
                                            //panel.title = value;

                                            //window.
                                            form.title = value;
                                            form.up('tabpanel').doLayout();
                                            //console.dir('name = ' + value + ' id = ' + id + ' form.id = ' + form.id + ' title = ' + form.title);

                                        }
                                    }
                                },

//                                {
//                                    fieldLabel: 'Заголовок',
//                                    xtype: 'textfield',
//                                    name: 'title',
//                                    anchor: '100%'
//                               },
//                                  {
//                                    fieldLabel: 'Темплейт',
//                                    xtype: 'combo',
//                                    name: 'template_id',
//                                    anchor: '100%',
//                                    editable: false,
//                                    store: [['0', 'name']]
//                                }, {
//                                    fieldLabel: 'Модуль',
//                                    xtype: 'combo',
//                                    name: 'modul_id',
//                                    anchor: '100%',
//                                    editable: false,
//                                    store: [['0', 'name']]
//                                }
                            ]

                        }, // end // закладка первая
                        {
                            title: 'Параметры',
                            fieldDefaults: {
                                labelAlign: 'right',
                                labelWidth: 90,
                                anchor: '100px'
                            },
                            //layout: 'column',
                            layout: 'anchor',
                            padding: '5px 5px 5px 5px',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    checkboxToggle: true,
                                    title: 'страница доступна',
                                    checkboxName: 'shows',
                                    defaultType: 'textfield',
                                    collapsed: true,
                                    layout: 'anchor',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [{
                                            fieldLabel: 'Показать в меню',
                                            xtype: 'checkboxfield',
                                            name: 'inmenu',
                                            anchor: '100%'
                                        }, {
                                            fieldLabel: 'Внешняя сылка',
                                            xtype: 'checkboxfield',
                                            name: 'externally',
                                            anchor: '100%'
                                        },{
                                        fieldLabel: 'Показывать структуру',
                                        xtype: 'checkboxfield',
                                        name: 'stryctyra',
                                        anchor: '100%'
                                    },{
                                        fieldLabel: 'Розрешить коментировать',
                                        xtype: 'checkboxfield',
                                        name: 'coment',
                                        anchor: '100%'
                                    }]
                                }, {
                                    fieldLabel: 'Ключевые слова',
                                    xtype: 'textfield',
                                    name: 'keywords',
                                    anchor: '100%'
                                }, {
                                    fieldLabel: 'Описание',
                                    xtype: 'textareafield',
                                    name: 'descript',
                                    anchor: '100%'
                                }
                            ]
                        }, // end tab параметры
                        {
                            xtype: 'panel',
                            title: 'Текст страницы',
                            padding: '5px 5px 5px 5px',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'htmleditor',
                                    //xtype: 'tinymce_textarea',
                                    tinyMCEConfig: 'tinyCfg1',
                                    //xtype: 'htmleditor',
                                    name: 'content'
                                }
                            ]
                        },
                        {
                            title: 'Предосмотр',
                            padding: '5px 5px 5px 5px',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'htmleditor',
                                    //xtype: 'htmleditor',
                                    //xtype: 'tinymce_textarea',
                                    tinyMCEConfig: 'tinyCfg1',
                                    name: 'prevu'
                                }
                            ]
                        }
                    ]
                }

            ]
        });
