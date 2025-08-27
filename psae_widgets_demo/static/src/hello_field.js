/** @odoo-module **/
import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

class HelloBadgeField extends Component {
    static template = "psae_widgets_demo.HelloBadgeField";

    // props come from the field registry: { value, record, name, readonly, etc. }
    get value() {
        return this.props.value;
    }

    onInput(ev) {
        const newVal = ev.target.value;
        if (this.props.record && this.props.name) {
            this.props.record.update({[this.props.name]: newVal});
        }
    }
}

registry.category("fields").add("hello_badge", {
    component: HelloBadgeField,
    supportedTypes: ["integer", "char"],
});
