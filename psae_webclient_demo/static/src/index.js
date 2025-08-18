/** @odoo-module **/

import { session } from "@web/session";
import { registry } from "@web/core/registry";
import { HelloButton } from "./hello_button";

const helloService = {
    start() {
        registry.category("systray").add("HelloButton", {
            Component: HelloButton,
            props: {
                session_user: session.username
            }
        });
    },
};

registry.category("services").add("hello_demo", helloService);
