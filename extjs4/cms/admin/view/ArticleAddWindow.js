/*
 * File: admin/view/ArticleAddWindow.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CMS.view.ArticleAddWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.articleAddWindow',

    height: 100,
    width: 300,
    layout: {
        type: 'fit'
    },
    closeAction: 'hide',
    title: '新增文章',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    submit_: function() {
                        var form = this.getForm();
                        var win = this.up('window');
                        if (form.isValid()) {
                            form.submit({
                                url: 'article/add',
                                method: 'POST',
                                params: {
                                    channelId: win.__gridPanel.channelId
                                },
                                success: function (fm, action) {
                                    win.__gridPanel.getStore().add(action.result.data);
                                    win.__gridPanel.getStore().sort('date', 'DESC');
                                    win.__gridPanel.getView().refresh();
                                    Ext.MessageBox.alert('提示', '操作成功!');
                                    form.reset();
                                    win.hide();
                                },
                                failure: function (fm, action) {
                                    Ext.MessageBox.alert('提示', getErrorMsg(action));
                                }
                            });
                        }
                    },
                    border: 0,
                    frame: true,
                    itemId: 'articleAddForm',
                    width: 150,
                    bodyPadding: 5,
                    frameHeader: false,
                    header: false,
                    title: 'My Form',
                    fieldDefaults: {
                        labelAlign: 'left',
                        labelWidth: 65,
                        labelStyle: 'font-weight:bold'
                    },
                    listeners: {
                        afterrender: {
                            fn: me.onArticleAddFormAfterRender,
                            scope: me
                        }
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '文章标题',
                            name: 'title',
                            allowBlank: false,
                            maxLength: 100
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                var formPanel = this.up('form');
                                formPanel.submit_();
                            },
                            text: '确定'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                this.up('form').getForm().reset();
                                this.up('window').hide();
                            },
                            text: '取消'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onArticleAddFormAfterRender: function(component, eOpts) {
        this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {                    
            enter: function(){
                component.submit_();
            },
            scope: this
        });
    }

});