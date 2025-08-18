/** @odoo-module **/

import { Component, xml } from "@odoo/owl";
import { session } from "@web/session";

export class HelloButton extends Component {
    static template = xml`<button class="btn btn-sm" t-on-click="sayHello">👋 Hello</button>`;

    sayHello() {
        debugger;
        alert(`Hello ${session.name} from WebClient!`);
    }
}
