/** @odoo-module **/

import { Order } from "@point_of_sale/app/store/models";
import { patch } from "@web/core/utils/patch";

patch(Order.prototype, {
    init_from_JSON(json) {
        super.init_from_JSON(...arguments)
        this.orderTypeId = json.order_type_id || false
    },
    get_ordertype_name() {
        const ordertype = this.pos.order_types.find((ot) => ot.id === this.orderTypeId);
        debugger;
        return ordertype ? ordertype.name : "None";
    },
    export_as_JSON(){
        const result = super.export_as_JSON(...arguments)
        return {
            ...result,
            order_type_id: this.orderTypeId || false
        }
    }
})
