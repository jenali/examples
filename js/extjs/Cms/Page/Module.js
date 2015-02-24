/* 
 * To change this template, choose Tools | Template
 * and open the template in the editor.
 */


// Модель данных
Ext.define(
        'CmsTemplateDataModel',
        {
            extend: 'Ext.data.Model',
            fields: ['id', 'template', 'layout']
        }
);


var CmsTemplateStore = Ext.create(
        'Ext.data.Store',
        {
            model: 'CmsTemplateDataModel',
            pageSize: 50,
            proxy: {
                type: 'ajax',
                url: '/admin/AdminCmsTemplate/index',
                reader: {
                    type: 'json',
                    root: 'grid'
                }
            }//,
            //autoLoad: true
        });


Ext.define("MyDesktop.Cms.Template.Module", {
    extend: "Ext.ux.desktop.Module",
    requires: [
        "Ext.data.ArrayStore",
        "Ext.util.Format",
        "Ext.grid.Panel",
        "Ext.grid.RowNumberer",
        "Ext.form.Panel",
        "MyDesktop.Cms.Template.Edit",
        'Ext.grid.column.Action'
    ],
    id: "Cms.Template.Module",
    modulName: "Настройка темплейтов",
    init: function() {
        this.launcher = {
            text: this.modulName,
            iconCls: "icon-grid",
            handler: this.createWindow,
            scope: this
        };
    },
    actionEdit: function(id) {
        id = id ? id : 0;
        windowId = this.id + '.' + id;
        var b = myDesktopApp.desktop;
        var a = b.getWindow(windowId);
        if (!a) {
            var form = Ext.create('MyDesktop.Cms.Template.Edit');
            form.id = windowId + '.Form';
            form.adminId = id;

            if (id)
                form.getForm().load({
                    url: '/admin/AdminCmsTemplate/edit/' + id,
                    success: function(f, action) {
                        var res = Ext.decode(action.response.responseText);

                        var m = [];
                        m.push(['0', 'нет']);

                        for (var v in res.data.ComboMenu) {
                            m.push([res.data.ComboMenu[v]['id'], res.data.ComboMenu[v]['name']]);
                        }

                        var i = 0;
                        var TemplateCombo;
                        while (TemplateCombo = form.getForm().findField("config[menu][" + i + "]")) {
                            var TemplateStore = TemplateCombo.getStore();
                            TemplateStore.loadData(m, false);
                            if (typeof res.data['config'] != 'undefined'
                                    && typeof res.data['config']['menu'] != 'undefined'
                                    && typeof res.data['config']['menu'][i] != 'undefined'
                                    && res.data['config']['menu'][i])
                            {
                                TemplateCombo.setValue(res.data['config']['menu'][i]);
                            } else {
                                TemplateCombo.setValue('0');
                            }
                            i++;
                        }
                        ;




                        //console.dir(m);
                        return;
                        //Ext.getCmp(form)
                        var combos = form.down('combo');
                        //var v = form.down('tabpanel').items.items[1];


                        console.dir(combos);
                    }
                });
            a = b.createWindow({
                id: windowId,
                title: 'Редактировать темплейт',
                width: 500,
                //height:300,
                minWidth: 300,
                minHeight: 200,
                layout: 'fit',
                items: [
                    form
                ]
            });
        }
        //debug(Ext.getCmp(windowId + '.Form'));
        a.show();

    },
    actionSave: function() {

    },
    actionDeleteSelect: function() {
        //var ModulId = this.id; 
        var b = Ext.getCmp('Cms.Template.Module');
        var grid = b.child('grid'); //Ext.getCmp('User.Module.Grid');
        var selection = grid.getView().getSelectionModel().getSelection();
        if (selection.length) {
            var str = '';
            for (var s in selection) {
                str = str + (str ? ', ' : '') + selection[s].data.name;
            }
            if (confirm('Удалить: ' + str + '?')) {
                for (s in selection) {
                    b.actionDelete(selection[s].data.id);
                }

            }
        }
    },
    actionDelete: function(id) {
        Ext.Ajax.request({
            url: '/admin/AdminCmsTemplate/delete/' + id,
            success: function(response, opts) {

                var obj = Ext.decode(response.responseText);
                //console.dir(obj);

                //grid = Ext.getCmp('User.Module.Grid');
                var b = Ext.getCmp('Cms.Template.Module');
                var grid = b.child('grid'); //Ext.getCmp('User.Module.Grid');

                store = grid.getStore();

                dex = store.find('id', obj.id);

                row = store.removeAt(dex);
                grid.getView().refresh();

            },
            failure: function(response, opts) {
                alert('Ошибка удаления');
                //debug(response);
                //console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    createWindow: function() {
        var b = this.app.getDesktop();
        var a = b.getWindow(this.id);
        if (!a) {
            CmsTemplateStore.load();
            a = b.createWindow({
                id: this.id,
                title: this.modulName,
                width: 740,
                height: 480,
                iconCls: "icon-grid",
                animCollapse: false,
                constrainHeader: true,
                layout: "fit",
                actionEdit: this.actionEdit,
                actionDeleteSelect: this.actionDeleteSelect,
                actionDelete: this.actionDelete,
                items: [
                    {
                        border: false,
                        xtype: "grid",
                        multiSelect: true,
                        id: this.id + '.Grid',
                        store: CmsTemplateStore,
                        columns: [
                            {
                                text: 'Id',
                                dataIndex: 'id',
                                width: 25
                            },
                            {
                                text: 'Имя',
                                dataIndex: 'template',
                                width: 350
                            },
                            {
                                text: 'шаблон',
                                dataIndex: 'layout',
                                width: 200
                            }, {
                                menuDisabled: true,
                                sortable: false,
                                xtype: 'actioncolumn',
                                width: 80,
                                items: [{
                                        iconCls: 'ico-user-edit',
                                        tooltip: 'Изменить',
                                        handler: function(grid, rowIndex, colIndex) {
                                            var w = grid.up('window');
                                            var rec = grid.getStore().getAt(rowIndex);
                                            w.actionEdit(rec.get('id'))
                                        }
                                    }/*, {
                                     iconCls: 'ico-user-delete',
                                     tooltip: 'Удалить',
                                     handler: function(grid, rowIndex, colIndex) {
                                     var w = grid.up('window');
                                     var rec = grid.getStore().getAt(rowIndex);
                                     if (confirm('Удалить: ' + rec.get('name') + '?')) {
                                     w.actionDelete(rec.get('id'))
                                     }
                                     }
                                     }*/]
                            }
                        ],
                        viewConfig: {
                            listeners: {
                                itemdblclick: function(dv, record, item, index, e) {
                                    var w = dv.up('window');
                                    w.actionEdit(record.data['id']);
                                }
                            }
                        }
                    }
                ],
                tbar: [{
                        text: "Создать",
                        tooltip: "Создать",
                        iconCls: "add",
                        handler: function(t) {
                            b = t.up('window');
                            b.actionEdit();
                        }
                    }, "-", {
                        text: "Редактировать",
                        tooltip: "Редактировать выбранное",
                        iconCls: "options",
                        handler: function(t) {
                            var b = t.up('window');
                            var grid = b.child('grid');

                            var selection = grid.getView().getSelectionModel().getSelection();
                            if (selection.length) {
                                for (s in selection) {
                                    b.actionEdit(selection[s].data.id);
                                }
                            }
                        }
                    }, "-",
                    {
                        text: "Удалить",
                        tooltip: "Удалить",
                        iconCls: "remove",
                        handler: function() {
                            var b = t.up('window');
                            //var grid = b.child('grid');
                            //b = Ext.getCmp('User.Module');
                            b.actionDeleteSelect();
                        }

                    }]
            });

        }
        a.show();
        return a;
    }
});
