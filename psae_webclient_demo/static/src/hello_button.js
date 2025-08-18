/** @odoo-module **/

import { Component, xml } from "@odoo/owl";


export class HelloButton extends Component {
    static template = xml`<button class="btn btn-sm" t-on-click="sayHello">👋 Hello</button>`;

    sayHello() {
        alert("Hello from WebClient!");
    }
}
