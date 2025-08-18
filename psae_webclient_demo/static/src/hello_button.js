/** @odoo-module **/

import { Component, xml } from "@odoo/owl";
import { session } from "@web/session";

export class HelloButton extends Component {
    static template = "psae_webclient_demo.hello_button";
    static props = { 
        session_user: {
            type: String,
            optional: true,
        }
    };

    setup() {
        // debugger;
        this.session_name = session.name;
    }

    sayHello() {
        alert(`Hello ${this.session_name} from WebClient!`);
    }
}
