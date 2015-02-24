/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("MyDesktop.Cms.Page.Navigation",
        {
            extend: "Ext.panel.Panel",
            requires: ['Ext.panel.Panel'],
            id: "MyDesktop.Cms.Page.Navigation",
            title: 'Навигационное меню',
            region: 'west',
            margins: '0 0 0 2',
            width: 200,
            collapsible: true, // make collapsible
            hideCollapseTool: false,
            //layout: 'fit',
            split: true,
            items: []
        });
