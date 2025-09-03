/** @odoo-module */

import { PartnerDetailsEdit } from "@point_of_sale/app/screens/partner_list/partner_editor/partner_editor";
import { patch } from "@web/core/utils/patch";
import { _t } from "@web/core/l10n/translation";

patch(PartnerDetailsEdit.prototype, {
    setup() {
        super.setup(...arguments);
        this.changes.arabic_name = this.props.partner.arabic_name || false;
        this.partnerDetailsFields = {
            ...this.partnerDetailsFields,
            ArabicName: _t('Arabic Name'),
        }
    },
});
