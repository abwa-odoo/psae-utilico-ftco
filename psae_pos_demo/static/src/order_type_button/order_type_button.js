/** @odoo-module */

import { Component } from "@odoo/owl";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { OrderTypePopup } from "@psae_pos_demo/order_type_popup/order_type_popup"
import { useService } from '@web/core/utils/hooks';

export class OrderTypeButton extends Component {
    static template = 'psae_pos_demo.OrderTypeButton'

    setup(){
        this.pos = usePos()
        this.popup = useService('popup')
        this.order_types = this.pos.order_types
    }

    get displayText() {
        const order = this.pos.get_order()
        if (order && order.orderTypeId) {
            return order.get_ordertype_name()
        }
        return "Order Type"
    }

    async click(){
        const {confirmed, payload} = await this.popup.add(OrderTypePopup,
            {
                orderTypes: this.order_types,
            }
        );

        if (confirmed) {
            const { selectedTypeId } = payload
            const order = this.pos.get_order()
            order.orderTypeId = selectedTypeId | 0
        }
    }
}

ProductScreen.addControlButton({
    component: OrderTypeButton,
    condition: function() {
        return this.pos.order_types.length
    },
})
