/** @odoo-module **/
import { Component, useState, onWillStart, onMounted, onWillUnmount } from "@odoo/owl";
import { registry } from "@web/core/registry";


export class HelloWidget extends Component {
    static template = "psae_widgets_demo.HelloWidget";

    setup() {
        this.state = useState({counter: 0, ticks: 0});
        onWillStart(() => {
            this.state.counter = 1;
        });
        onMounted(() => {
            this._interval = setInterval(() => {
                this.state.ticks++;
            }, 1000);
        });
        onWillUnmount(() => {
            if (this._interval) clearInterval(this._interval);
        });
    }

    increment() {
        this.state.counter++;
    }

    decrement() {
        this.state.counter--;
    }
}

registry.category("actions").add("ftco_widgets_demo.hello_widget_action", HelloWidget);
