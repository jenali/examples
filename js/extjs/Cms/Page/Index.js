/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define(
        'MyDesktop.Cms.Page.Index',
        {
            extend: 'Ext.form.Panel',
            requires: ['*', 'MyDesktop.Cms.Page.Edit'],
            border: false,
            frame: true,
            adminId: 0,
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 90,
                anchor: '100%'
            },
            defaultType: 'textfield',
            bodyPadding: 5,
            items: [
                
            ],
            buttons: []
        });

