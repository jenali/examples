/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define("MyDesktop.Cms.Page.Module", {
    extend: "Ext.ux.desktop.Module",
    requires: ["MyDesktop.Cms.Page.Edit", "MyDesktop.Cms.Page.Index"],
    id: "Cms.Page.Module",
    modulName: "Страницы сайта",
    init: function() {
        this.launcher = {
            text: this.modulName,
            iconCls: "icon-grid",
            handler: this.createWindow,
            scope: this
        };
    },
    pages: [],
    loadPages: function() {
        Ext.Ajax.request({
            url: '/admin/cmspage/pages',
            success: function(response, opts) {

                var obj = Ext.decode(response.responseText);
                //console.dir(obj);
                
                b = Ext.getCmp('Cms.Page.Module');
                b.pages = obj.data.pages;
                b.setPages();

            },
            failure: function(response, opts) {
                alert('Ошибка получения данных');
                //debug(response);
                //console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    setPages: function(){
      //debug(this.pages);
      Obj = [];
      for(i in this.pages[0]){
          Obj.push(this.createTree(i, this.pages[0][i]['id']));
      }
      debug(Obj[0]);
      
      this.items = Obj;
    },
    getTreeObject: function(parent_id){
        result = [];
        index = 0;
        for (i in this.pages[parent_id]){
            result[index] = {};
            result[index].text = this.pages[parent_id][i]['name'];
            if (this.pages[this.pages[parent_id][i]['id']]){
                result[index].expanded = true;
                result[index].children = this.getTreeObject(this.pages[parent_id][i]['id']);
            }
        }
        
        return result;
    },
    createTree: function(index, id) {
        var tree = Ext.create('Ext.tree.Panel', {
            id: 'Cms.Page.Menu.' + index,
            title: this.pages[0][index]['name'],
            rootVisible: true,
            lines: false,
            autoScroll: true,
            tools: [{
                    type: 'refresh',
                    handler: function(c, t) {
                        tree.setLoading(true, tree.body);
                        var root = tree.getRootNode();
                        root.collapseChildren(true, false);
                        Ext.Function.defer(function() { // mimic a server call
                            tree.setLoading(false);
                            root.expand(true, true);
                        }, 1000);
                    }
                }],
            tbar: {
                xtype: 'toolbar',
                ui: 'plain',
                items: [/*{
                 tooltip: {title: 'Rich Tooltips', text: 'Let your users know what they can do!'},
                 //iconCls: 'connect'
                 text: 
                 },
                 '-',*/
                    {
                        tooltip: 'Создать пункт',
                        //iconCls: 'user-add'
                        text: 'Создать страницу'
                    }, ' ',
                    {
                        tooltip: 'Создать пункт',
                        //iconCls: 'user-add'
                        text: 'Создать подстраницу'
                    },
                    ' ',
                    {
                        tooltip: 'Удалить выбранное пункт',
                        //iconCls: 'user-delete',
                        text: 'Удалить'
                    }]
            },
            store: Ext.create('Ext.data.TreeStore', {
                root: {
                    text: 'Online',
                    expanded: true,
                    children: this.getTreeObject(this.pages[0][index]['id'])
                }
            })
        });

        return tree;
    },
    createTree123: function() {
        var tree = Ext.create('Ext.tree.Panel', {
            id: 'im-tree',
            title: 'Online Users',
            rootVisible: false,
            lines: false,
            autoScroll: true,
            tools: [{
                    type: 'refresh',
                    handler: function(c, t) {
                        tree.setLoading(true, tree.body);
                        var root = tree.getRootNode();
                        root.collapseChildren(true, false);
                        Ext.Function.defer(function() { // mimic a server call
                            tree.setLoading(false);
                            root.expand(true, true);
                        }, 1000);
                    }
                }],
            tbar: {
                xtype: 'toolbar',
                ui: 'plain',
                items: [/*{
                 tooltip: {title: 'Rich Tooltips', text: 'Let your users know what they can do!'},
                 //iconCls: 'connect'
                 text: 
                 },
                 '-',*/
                    {
                        tooltip: 'Создать пункт',
                        //iconCls: 'user-add'
                        text: 'Создать страницу'
                    }, ' ',
                    {
                        tooltip: 'Создать пункт',
                        //iconCls: 'user-add'
                        text: 'Создать подстраницу'
                    },
                    ' ',
                    {
                        tooltip: 'Удалить выбранное пункт',
                        //iconCls: 'user-delete',
                        text: 'Удалить'
                    }]
            },
            store: Ext.create('Ext.data.TreeStore', {
                root: {
                    text: 'Online',
                    expanded: true,
                    children: [{
                            text: 'Friends',
                            expanded: true,
                            children: [
                                {text: 'Brian', iconCls: 'user', leaf: true},
                                {text: 'Kevin', iconCls: 'user', leaf: true},
                                {text: 'Mark', iconCls: 'user', leaf: true},
                                {text: 'Matt', iconCls: 'user', leaf: true},
                                {text: 'Michael', iconCls: 'user', leaf: true},
                                {text: 'Mike Jr', iconCls: 'user', leaf: true},
                                {text: 'Mike Sr', iconCls: 'user', leaf: true},
                                {text: 'JR', iconCls: 'user', leaf: true},
                                {text: 'Rich', iconCls: 'user', leaf: true},
                                {text: 'Nige', iconCls: 'user', leaf: true},
                                {text: 'Zac', iconCls: 'user', leaf: true}
                            ]
                        }, {
                            text: 'Family',
                            expanded: true,
                            children: [
                                {text: 'Kiana', iconCls: 'user-girl', leaf: true},
                                {text: 'Aubrey', iconCls: 'user-girl', leaf: true},
                                {text: 'Cale', iconCls: 'user-kid', leaf: true}
                            ]
                        }]
                }
            })
        });

        return tree;
    },
    createWindow: function() {
        var b = this.app.getDesktop();
        var a = b.getWindow(this.id);
        if (!a) {
            //CmsAdminsStore.load();
            a = b.createWindow({
                id: this.id,
                title: this.modulName,
                width: 740,
                height: 480,
                iconCls: 'accordion',
                animCollapse: false,
                constrainHeader: true,
                bodyBorder: true,
                layout: 'accordion',
                border: false,
                setPages: this.setPages,
                getTreeObject: this.getTreeObject,
                createTree: this.createTree,
                
                
                items: [
                ],
                tbar: {
                    xtype: 'toolbar',
                    ui: 'plain',
                    items: [/*{
                     tooltip: {title: 'Rich Tooltips', text: 'Let your users know what they can do!'},
                     //iconCls: 'connect'
                     text: 
                     },
                     '-',*/
                        {
                            tooltip: 'Создать меню',
                            //iconCls: 'user-add'
                            text: 'Создать'
                        },
                        ' ',
                        {
                            tooltip: 'Удалить выбранное меню',
                            //iconCls: 'user-delete',
                            text: 'Удалить'
                        }]
                }
            });

        }
        a.show();
        this.loadPages();
        return a;
    }
});

