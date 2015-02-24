/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define(
        'MyDesktop.Cms.Template.Edit',
        {
            extend: 'Ext.form.Panel',
            requires: [
                'Ext.form.*',
                'Ext.layout.container.Column',
                'Ext.tab.Panel',
                'MyDesktop.Message',
                'MyDesktop.lib.ImageFileField'
            ],
            border: false,
            //frame: true,
            adminId: 0,
            /*
             fieldDefaults: {
             labelAlign: 'left',
             labelWidth: 90,
             anchor: '100%'
             },*/
            defaultType: 'textfield',
            //fileUpload: true,
            bodyPadding: 0,
            layout: 'fit',
            items: [
                {
                    xtype: 'tabpanel',
                    border: false,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'panel',
                            title: 'Основное',
                            border: false,
                            layout: 'form',
                            fieldDefaults: {
                                labelAlign: 'left',
                                labelWidth: 90,
                                anchor: '100%'
                            },
                            bodyPadding: 5,
                            //layout: 'fit',
                            items: [
                                {
                                    fieldLabel: 'Id',
                                    xtype: 'displayfield',
                                    name: 'id',
                                    readOnly: true,
                                    anchor: '100%'
                                }, {
                                    fieldLabel: 'Название',
                                    xtype: 'textfield',
                                    name: 'template',
                                    anchor: '100%',
                                    allowBlank: false
                                }, {
                                    fieldLabel: 'Шаблон',
                                    xtype: 'textfield',
                                    name: 'layout',
                                    anchor: '100%',
                                    allowBlank: false
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'Меню',
                            border: false,
                            layout: 'form',
                            fieldDefaults: {
                                labelAlign: 'left',
                                labelWidth: 90,
                                anchor: '100%'
                            },
                            bodyPadding: 5,
                            //layout: 'fit',
                            items: [
                                {
                                    fieldLabel: 'Меню #0',
                                    xtype: 'combo',
                                    name: 'config[menu][0]',
                                    anchor: '100%',
                                    editable: false,
                                    store: [['0', 'name']]
                                }, 
                                {
                                    fieldLabel: 'Меню #1',
                                    xtype: 'combo',
                                    name: 'config[menu][1]',
                                    anchor: '100%',
                                    editable: false,
                                    store: [['0', 'name']]
                                },
                                {
                                    fieldLabel: 'Меню #2',
                                    xtype: 'combo',
                                    name: 'config[menu][2]',
                                    anchor: '100%',
                                    editable: false,
                                    store: [['0', 'name']]
                                },
                                {
                                    fieldLabel: 'Меню #3',
                                    xtype: 'combo',
                                    name: 'config[menu][3]',
                                    anchor: '100%',
                                    editable: false,
                                    store: [['0', 'name']]
                                },
                                {
                                    fieldLabel: 'Меню #4',
                                    xtype: 'combo',
                                    name: 'config[menu][4]',
                                    anchor: '100%',
                                    editable: false,
                                    store: [['0', 'name']]
                                },
                                {
                                    fieldLabel: 'Меню #5',
                                    xtype: 'combo',
                                    name: 'config[menu][5]',
                                    anchor: '100%',
                                    editable: false,
                                    store: [['0', 'name']]
                                }
                                
                            ]
                        }

                    ]
                }
            ],
            buttons: [{
                    text: 'Сохранить',
                    handler: function() {
                        // действие отмены
                        form = this.up('form');
                        form.getForm().submit({
                            url: '/admin/AdminCmsTemplate/save/' + form.adminId,
                            method: 'POST',
                            //headers: {'Content-Type': 'multipart/form-data'},
                            success: function(form, action) {
                                MyDesktop.Message.msg('Выполненно', action.result.message, form);
                                //alert(action.result.message);
                            },
                            failure: function(form, action) {
                                alert('failure');
                            },
                            error: function(form, action) {
                                alert('error');
                            }

                        });
                    }
                }, {
                    text: 'Отмена',
                    handler: function(t) {
                        // действие отправки
                        t.up('window').doClose();
                    }
                }]
        });
