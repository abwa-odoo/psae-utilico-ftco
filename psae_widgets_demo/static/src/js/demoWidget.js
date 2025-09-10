/** @odoo-module */

import publicWidget from "@web/legacy/js/public/public_widget";


publicWidget.registry.demoWidget = publicWidget.Widget.extend({
    selector: '#demo_widget',
    init: function () {
        this._super.apply(this, arguments)
        this.orm = this.bindService('orm')
        this.partner_list = $('.partner_list')
    },
    willStart: async function () {
        this._super.apply(this, arguments)
        this.partners = await this.orm.searchRead("res.partner", [], ['name'], {limit: 5})
    },
    start: function () {
        this.partners.forEach(partner => {
            let partnerItem = $(`
                <div id="partner-${partner.id}" class="partner-item">
                    ${partner.name} 
                </div>
            `)
            this.partner_list.append(partnerItem)
        })
    },
});
