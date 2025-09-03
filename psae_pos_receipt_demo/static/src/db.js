/** @odoo-module */

import {PosDB} from "@point_of_sale/app/store/db";
import {patch} from "@web/core/utils/patch";

patch(PosDB.prototype, {
    _partner_search_string(partner) {
        let str = super._partner_search_string(...arguments);
        if (partner.arabic_name) {
            str += "|" + partner.arabic_name;
            str = str.replace("\n", "") + "\n";
        }
        return str;
    }
});
