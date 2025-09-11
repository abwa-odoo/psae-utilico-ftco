/** @odoo-module */
import publicWidget from '@web/legacy/js/public/public_widget';


publicWidget.registry.FtcoSnippetWidget = publicWidget.Widget.extend({
    selector: '.custom_ftco_snippet',
    init: function() {
        this._super.apply(this, arguments);
        console.log("Custom FTCO Snippet Widget Initialized");
    }
});
