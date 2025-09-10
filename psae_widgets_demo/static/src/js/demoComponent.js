/**@odoo-module */

import {Component} from "@odoo/owl"
import { registry } from "@web/core/registry";

export class demoComponent extends Component{
    static template = 'psae_widgets_demo.demoComponent'
    static props = ['name']
    setup() {
        debugger;
        console.log('Test');
    }
}

registry.category("public_components").add('demoComponent', demoComponent)
