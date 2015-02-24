/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define("MyDesktop.Cms.Menu.Module", {
    extend: "MyDesktop.desktop.Module",
    requires: [
        //"MyDesktop.Cms.Page.Edit",
        //"MyDesktop.Cms.Page.Index",
        //"MyDesktop.Cms.Page.Navigation",
        "MyDesktop.Cms.Menu.TabPanel",
        "MyDesktop.Cms.Menu.Tree",
        ////'Ext.tab.Panel',
        //"Ext.ux.TabCloseMenu",
        "Ext.tree.Panel",
        'MyDesktop.Message'
    ],
    id: "Cms.Menu.Module",
    modulName: "Меню",
    init: function() {
        this.launcher = {
            text: this.modulName,
            iconCls: "icon-grid",
            handler: this.createWindow,
            scope: this
        };
    },
    createWindow: function() {
        var b = this.app.getDesktop();
        var a = b.getWindow(this.id);
        if (!a) {
            ObjCmsPageTabPanel = Ext.create('MyDesktop.Cms.Menu.TabPanel',
                    {
                        id: 'MyDesktop.Cms.Menu.TabPanel',
                        // добавляем в объект функцию открытия страницы
                        addTab: function(id, name) {
                            // добавляем закладку страницы
                            // ищем закладку по id
                            // возвращает индекс закладки или -1 если не найдена
//                            var tab = this.items.findIndex('id', 'MyDesktop.Cms.Menu.TabPanel.' + id);
//                            //console.dir(tab);
//                            //return;
//
//                            if (tab >= 0) {
//                                // если найдена делаем активной
//                                this.setActiveTab(tab);
//                            } else {
                                // добавляем закладку.
                                var f;
                                this.add(
                                        f = Ext.create('MyDesktop.Cms.Menu.Edit',
                                        {
                                            title: name,
                                            id: this.id + '.' + id,
                                            closable: true,
                                            // функция должна отправить страницу на сервер
                                            savePage: function(form) {
                                                //console.dir('id = '+ form.getForm().findField("id").getValue());
                                                //return;
                                                id = form.getForm().findField("id").getValue();

                                                form.getForm().submit({
                                                    url: '/admin/page/savepage/id/' + id,

                                                    success: function(form, action) {
                                                        //alert('Выполненно');
                                                        console.dir(action.result.id);
                                                        MyDesktop.Message.msg('Выполненно', action.result.message, form);
                                                    },
                                                    failure: function(form, action) {
                                                        alert('failure');
                                                    },
                                                    error: function(form, action) {
                                                        alert('error');
                                                    }

                                                });
                                            },
                                            closePage: function() {
                                                var id = this.id;
                                                var TabPanel = this.up('tabpanel');

                                                var reg = new RegExp('^' + id + '$');
                                                var tab = TabPanel.items.findIndex('id', reg);

                                                TabPanel.remove(tab);
                                            }
                                        })
                                        ).show();
                                // заполнить данными
                                // темплейты

                                // модули
                                f.getForm().load({
                                    url: '/admin/page/getpage/id/' + id,
                                    success: function(form, action) {
                                        var res = Ext.decode(action.response.responseText);
                                        var TemplateCombo = f.getForm().findField("template_id");
                                        var TemplateStore = TemplateCombo.getStore();
                                        //store.items = res.data.templates;
                                        //store.loadData([], false);
                                        var d = [];
                                        for (var v in res.data.templates) {
                                            var i = [res.data.templates[v]['id'], res.data.templates[v]['title']];
                                            d.push(i);
                                        }
                                        TemplateStore.loadData(d, false);
                                        TemplateCombo.setValue(res.data.template_id);

                                        var ModulCombo = f.getForm().findField("modul_id");
                                        var ModulStore = ModulCombo.getStore();
                                        //store.items = res.data.templates;
                                        //store.loadData([], false);
                                        var m = [];
                                        for (var v in res.data.modules) {
                                            var i = [res.data.modules[v]['id'], res.data.modules[v]['title']];
                                            m.push(i);
                                        }
                                        ModulStore.loadData(m, false);
                                        ModulCombo.setValue(res.data.modul_id);

                                        //console.dir(d);



                                        //console.dir(res);
                                        //console.dir(Ext.decode(a.response.responseText));

                                        //return;
                                        //var obj = Ext.decode(response.responseText);
                                        //console.dir(obj);
                                    }
                                });
                           // }
                        }
                    });
            //ObjCmsPageNavigation = Ext.create('MyDesktop.Cms.Page.Navigation');
//*
            ObjCmsPageNavigation = Ext.create('MyDesktop.Cms.Menu.Navigation',
                    {
                        collapsible: false, // make collapsible
                        hideCollapseTool: true,
                        layout: 'fit',
                        items: [
                            Ext.create('MyDesktop.Cms.Menu.Tree',
                                    {
                                        rootVisible: false,
                                        store: Ext.create('Ext.data.TreeStore', {
                                            proxy: {
                                                type: 'ajax',
                                                url: '/admin/page/GetMenu'
                                            },
                                            root: {
                                                text: 'root',
                                                id: 0,
                                                expanded: true
                                            }
                                        }),
                                        title: name,
                                        id: 'MyDesktop.Cms.Page.Tree',
                                        viewConfig: {
                                            plugins: {
                                                ptype: 'treeviewdragdrop',
                                                //enableDrag: true,
                                                //enableDrop: true
                                            },
                                            listeners: {
                                                //beforedrop: function(node, data, overModel, dropPosition, dropHandlers) {
                                                /*
                                                 console.dir(node.id);
                                                 
                                                 return;
                                                 // Defer the handling
                                                 dropHandlers.wait = true;
                                                 Ext.MessageBox.confirm('Drop', 'Are you sure', function(btn) {
                                                 if (btn === 'yes') {
                                                 //return true;
                                                 dropHandlers.processDrop();
                                                 } else {
                                                 //return false;
                                                 dropHandlers.cancelDrop();
                                                 }
                                                 });
                                                 */
                                                //},
                                                drop: function(node, data, overModel, dropPosition, eOpts) {
                                                    // получить панель дерева
                                                    var tree = this.up('treepanel');
                                                    //debug(tree.id);
                                                    // получить id перемещенной записи
                                                    var id = data.records[0].getId();
                                                    // найти запись в store по id
                                                    var n = tree.getStore().getNodeById(id);

                                                    //console.log(n.isRoot());
                                                    // родитель
                                                    if (n.isRoot()) {
                                                        var save_node = tree.getRootNode();
                                                    } else {
                                                        var save_node = n.parentNode;
                                                    }

                                                    // id родителя
                                                    var parent_id = save_node.getId();
                                                    //console.dir('parent_id = ' + parent_id);
                                                    // масив с наследниками
                                                    var save_array = [];
                                                    save_node.eachChild(function(childnode) {
                                                        var i = childnode.getId();
                                                        save_array.push(i);
                                                    });
                                                       console.log(n);
                                                    // отправляем сохранять
                                                    Ext.Ajax.request({
                                                        //type: 'ajax',
                                                        //url: '/admin/page/sorted/pid/' + parent_id,
                                                        url: '/admin/page/sorted',
                                                        type:'POST',
                                                        params: {
                                                            sort : Ext.encode(save_array),
                                                            id: id,
                                                            pid: parent_id
                                                        },
                                                        success: function(response, opts) {
                                                            var obj = Ext.decode(response.responseText);
                                                            //debug(obj);
                                                            MyDesktop.Message.msg('Выполненно', obj.message);
                                                        },
                                                        failure: function(response, opts) {
                                                            alert('Ошибка удаления');
                                                        }
                                                    });

                                                },
                                                //nodedragover: function(targetNode, position, dragData) {
                                                /*
                                                 var rec = dragData.records[0],
                                                 isFirst = targetNode.isFirst(),
                                                 canDropFirst = rec.get('canDropOnFirst'),
                                                 canDropSecond = rec.get('canDropOnSecond');
                                                 
                                                 return isFirst ? canDropFirst : canDropSecond;
                                                 */
                                                //alert('nodedragover');
                                                //return;
                                                //}
                                            }
                                        },
                                        listeners: {
                                            itemdblclick: function(me, record, item, e, eOpts) {
                                                // двойной клик, отсылает на добавление закладки

                                                ObjCmsPageTabPanel.addTab(record.raw.id, record.raw.text);
                                            }
                                        }


                                    })
                        ]
                    });

            a = b.createWindow({
                title: 'Меню сайта',
                width: 800,
                height: 600,
                minWidth: 300,
                minHeight: 200,
                //layout: 'fit',
                plain: true,
                id: 'MyDesktop.Cms.Menu',
                //layout: 'accordion',
                layout: 'border',
                items: [
                    ObjCmsPageNavigation,
                    {
                        //title: 'Center Region',
                        region: 'center', // center region is required, no width/height specified
                        xtype: 'panel',
                        layout: 'fit',
                        items: [
                            ObjCmsPageTabPanel
                        ]
                                //margins: '5 5 0 0'
                    }



                ]

            });

        }
        a.show();
        //this.loadPages();
        return a;
    }
});

