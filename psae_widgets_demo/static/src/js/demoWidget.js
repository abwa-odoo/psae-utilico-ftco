/** @odoo-module */

import publicWidget from "@web/legacy/js/public/public_widget";


const demoWidget = publicWidget.Widget.extend({
    selector: '#demo_widget',
    init: function () {
        this._super.apply(this, arguments)
        console.log("Demo Widget Loaded");
    }
});

publicWidget.registry.demoWidget = demoWidget;
// publicWidget.registry.demoWidget = publicWidget.Widget.extend({});
