/** @odoo-module */

import { Component } from "@odoo/owl";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { usePos } from "@point_of_sale/app/store/pos_hook";

export class OrderTypeButton extends Component {
    static template = 'psae_pos_demo.OrderTypeButton'

    setup(){
        this.pos = usePos()
        this.order_types = this.pos.order_types
    }

    async click(){
        console.log("OrderTypeButton clicked")
    }
}

ProductScreen.addControlButton({
    component: OrderTypeButton,
    condition: function() {
        return this.pos.order_types.length
    },
})
