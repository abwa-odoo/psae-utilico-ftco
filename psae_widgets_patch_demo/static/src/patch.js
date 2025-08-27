/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { HelloWidget } from "@psae_widgets_demo/hello_widget";

// Non-invasive patch: decorate increment to also log to console
patch(HelloWidget.prototype, {
    increment() {
        // call original
        const res = super.increment(...arguments);
        // side effect for demo: log
        console.log("[FTCO] increment called; counter is now", this.state.counter);
        return res;
    },
});
