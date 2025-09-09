import { ResPartner } from "@point_of_sale/app/models/res_partner";
import { patch } from "@web/core/utils/patch";

patch(ResPartner.prototype, {
    get searchString() {
        const fields = [
            "name",
            "barcode",
            "phone",
            "mobile",
            "email",
            "vat",
            "parent_name",
            "contact_address",
            "arabic_name", // add arabic_name
        ];
        return fields
            .map((field) => {
                if ((field === "phone" || field === "mobile") && this[field]) {
                    return this[field].replace(/[+\s()-]/g, "");
                }
                return this[field] || "";
            })
            .filter(Boolean)
            .join(" ");
    }
});
