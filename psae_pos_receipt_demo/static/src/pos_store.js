/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";

patch(PosStore.prototype, {
    getPhoneSearchFields() {
        return super.getPhoneSearchFields(...arguments).concat(['arabic_name']); //'phone', 'mobile'
    },
});
