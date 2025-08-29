/** @odoo-module */

import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { useState } from "@odoo/owl"


export class OrderTypePopup extends AbstractAwaitablePopup {
    static template = 'psae_pos_demo.OrderTypePopup';
    static defaultProps = { confirmKey: false };

    setup(){
        this.pos = usePos()
        this.state = useState({
            selectedTypeId: 0
        })
    }

    async getPayload(){
        return {selectedTypeId: this.state.selectedTypeId}
    }
}
