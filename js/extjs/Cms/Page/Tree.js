/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('MyDesktop.Cms.Page.Tree',
        {
            extend: "Ext.tree.Panel",
            id: "MyDesktop.Cms.Page.Tree",
            title: 'Files',
            rootVisible: true,
            lines: false,
            //autoScroll: true,
            //title: "",
            //modulName: "",
            store: null,
            urlSave: '/admin/cmspage/save',
            urlDelete: '/admin/cmspage/delete',
            urlOrderSave: '',
            layout: 'fit',
            getSelNode: function() {
                //var o = this;
                //console.log(o.getSelectionModel().getSelection());
                return this.getSelectionModel().getSelection();
            },
            addNode: function(parentNodeId, Obj, treepanel) {
                var o = treepanel ? treepanel : this;
                var treeNode = o.store.getNodeById(parentNodeId);
                if (treeNode.isExpanded() || treeNode.isLoaded()) {
                    treeNode.expand();
                    var newNode = treeNode.appendChild({
                        id: Obj.id,
                        text: Obj.text,
                        leaf: false
                    });
                    o.getSelectionModel().select(newNode);
                } else {
                    treeNode.expand(false, function() {
                        var treeNode = o.store.getNodeById(Obj.id);
                        o.getSelectionModel().select(treeNode);

                    });
                }

            },
            delNode: function(nodeid) {
                //var o = treepanel ? treepanel : this;
                var Node = o.store.getNodeById(nodeid);
                Node.remove();

            },
            openNode: function(Node) {

            },
            openNodeById: function(NodeId) {
                var o = Ext.get(this);
                var node = o.store.getNodeById(NodeId);
                this.getSelectionModel().select(node);
                debug(node);
                //node.itemdblclick();

            },
            refreshNodeById: function(nodeid) {
                console.log('in fun refreshNodeById')
                var o = this;
                var node = o.store.getNodeById(nodeid);
                if (node) {
                    //console.log('update node')
                    o.store.load({node: node});
                }
            },
            createNodeCallbak: function(options, success, response) {
                //console.dir(response);
                var o = this;
                if (o.xtype != 'treepanel') {
                    console.log('redirect:');
                    console.log('obj_id: ' + options.params._ObjCallbakSenderId);
                    console.log('fun: ' + options.params._ObjCallbakSenderFunction);
                    var Sender = Ext.getCmp(options.params._ObjCallbakSenderId);
                    if (Sender) {
                        if (typeof Sender[options.params._ObjCallbakSenderFunction] == 'function') {
                            Sender[options.params._ObjCallbakSenderFunction](options, success, response);
                        } else {
                            console.log('Obj not function: Sender.' + options.params._ObjCallbakSenderFunction);
                        }
                    } else {
                        console.log('Obj not found: ' + options.params._ObjCallbakSenderId);
                    }
                    return;
                }
                //var tree = 


                if (success) {
                    var result = Ext.decode(response.responseText);
                    // получить парента
                    var nodeid = options.params.parent_id;
                    o.addNode(nodeid, {id: result.id, text: options.params.name});

                    //o.refreshNodeById(nodeid);
                    //o.openNodeById(nodeid);
                    // //, обновить 
                    MyDesktop.Message.msg('Выполненно', result.message);
                } else {
                    MyDesktop.Message.msg('Ошибка', 'Ошибка выполнения!');
                }
            },
            deleteNodeCallbak: function(options, success, response) {
                //console.dir(response);
                var o = this;
                if (o.xtype != 'treepanel') {
                    console.log('redirect:');
                    console.log('obj_id: ' + options.params._ObjCallbakSenderId);
                    console.log('fun: ' + options.params._ObjCallbakSenderFunction);
                    var Sender = Ext.getCmp(options.params._ObjCallbakSenderId);
                    if (Sender) {
                        if (typeof Sender[options.params._ObjCallbakSenderFunction] == 'function') {
                            Sender[options.params._ObjCallbakSenderFunction](options, success, response);
                        } else {
                            console.log('Obj not function: Sender.' + options.params._ObjCallbakSenderFunction);
                        }
                    } else {
                        console.log('Obj not found: ' + options.params._ObjCallbakSenderId);
                    }
                    return;
                }
                //var tree = 


                if (success) {
                    var result = Ext.decode(response.responseText);
                    // получить ноду
                    var nodeid = options.params.id;
                    o.delNode(nodeid);

                    //o.refreshNodeById(nodeid);
                    //o.openNodeById(nodeid);
                    // //, обновить 
                    MyDesktop.Message.msg('Выполненно', result.message);
                } else {
                    MyDesktop.Message.msg('Ошибка', 'Ошибка выполнения!');
                }
            },
            createNode: function(parent_node_id) {
                var o = this;
                // ищем предка если не указан
                if (typeof parent_node_id == 'undefined') {
                    node = o.getSelNode();
                    if (node.length)
                        parent_node_id = node[0].getId();
                    else
                        parent_node_id = 0;
                } else if (!parent_node_id) {
                    parent_node_id = 0;
                }

                Ext.MessageBox.prompt('Создать', 'Введите название:', function(btn, text) {
                    if (btn === 'ok' && text.length) {
                        data = {
                            parent_id: parent_node_id,
                            name: text,
                            _ObjCallbakSenderId: o.id,
                            _ObjCallbakSenderFunction: 'createNodeCallbak'
                        };
                        Ext.Ajax.request({
                            url: o.urlSave + '/0',
                            params: data,
                            callback: o.createNodeCallbak
                        });
                    }
                }, null, false, 'Новая страница');

            },
            deleteNode: function() {
                o = this;
                var NodeId = o.getSelNode();
                //debug(NodeId[0]);
                
                //var node = o.store.getNodeById(NodeId[0].getId());
                //debug(NodeId[0].raw);
                //return;
                //console.dir('del node id: ' + node.id);
                //return;

                Ext.MessageBox.confirm('Удаление', 'Удалить ' + NodeId[0].raw.text + ' и все подстраницы? :', function(btn, text) {
                    if (btn === 'yes') {
                        data = {
                            id: NodeId[0].raw.id,
                            _ObjCallbakSenderId: o.id,
                            _ObjCallbakSenderFunction: 'deleteNodeCallbak'
                        };
                        Ext.Ajax.request({
                            url: o.urlDelete + '/' + NodeId[0].raw.id,
                            params: data,
                            callback: o.deleteNodeCallbak
                        });
                    }
                });

            },
            saveOrder: function(parentNode) {
            },
            tbar: [
                {
                    xtype: 'button',
                    tooltip: 'Создать новое меню',
                    iconCls: 'Cms-Pages-Add',
                    handler: function(button, event) {
                        var n = button.up('treepanel'); //Ext.getCmp('MyDesktop.Cms.Page.Tree');
                        n.createNode(0);
                    }
                },
                '-',
                /*{
                 xtype: 'button',
                 iconCls: 'Cms-Pages-Delete',
                 tooltip: 'Удалить меню',
                 handler: function() {
                 alert('delete Menu');
                 }
                 },*/
                {
                    tooltip: 'Создать пункт',
                    iconCls: 'Cms-Pages-Page-Add',
                    handler: function(button, event) {

                        //debug(button);
                        //return;
                        var n = button.up('treepanel'); //Ext.getCmp('MyDesktop.Cms.Page.Tree');
                        n.createNode();
                        //console.log(n.title);
                        //console.log(n.id);
                        return n;
                    }
                },
                {
                    tooltip: 'Удалить страницу',
                    iconCls: 'Cms-Pages-Page-Delete',
                    handler: function(button, event) {
                        var n = button.up('treepanel'); //Ext.getCmp('MyDesktop.Cms.Page.Tree');
                        n.deleteNode();
                    }
                }

            ],
            viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    enableDrag: true,
                    enableDrop: true
                }
            },
            useArrows: true

        });

