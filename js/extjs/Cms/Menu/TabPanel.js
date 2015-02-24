/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('MyDesktop.Cms.Menu.TabPanel',
        {
            extend: "Ext.tab.Panel",
            id: "MyDesktop.Cms.Menu.TabPanel",
            requires: ['Ext.tab.Panel',
                "Ext.ux.TabCloseMenu"
            ],
            resizeTabs: true,
            enableTabScroll: true,
            //width: 600,
            //height: '200px',
            defaults: {
                autoScroll: true,
                bodyPadding: 2
            },
            items: [],
            plugins: Ext.create('Ext.ux.TabCloseMenu', {
                extraItemsTail: [
                    '-',
                    {
                        text: 'Closable',
                        checked: true,
                        hideOnClick: true,
                        handler: function(item) {
                            currentItem.tab.setClosable(item.checked);
                        }
                    }
                ],
                listeners: {
                    aftermenu: function() {
                        currentItem = null;
                    },
                    beforemenu: function(menu, item) {
                        var menuitem = menu.child('*[text="Closable"]');
                        currentItem = item;
                        menuitem.setChecked(item.closable);
                    }
                }
            })


        });


