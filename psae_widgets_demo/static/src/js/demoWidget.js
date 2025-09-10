/** @odoo-module */

import publicWidget from "@web/legacy/js/public/public_widget";


publicWidget.registry.demoWidget = publicWidget.Widget.extend({
    selector: '#demo_widget',
    events: {
        'click .remove-btn': '_onRemovePartner',
        'click .btn-add-partner': '_onAddPartner',
        'click .btn-remove-result-msg': '_onRemoveResultMessage'
    },
    init: function () {
        this._super.apply(this, arguments)
        this.orm = this.bindService('orm')
        this.partner_list = $('.partner_list')
        this.resultMsgSpan = $('#result-message')
        this.crossIcon = $('.btn-remove-result-msg')
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
                    <button class="btn btn-danger btn-sm remove-btn" data-id="${partner.id}">x</button>
                </div>
            `)
            this.partner_list.append(partnerItem)
        })
    },
    _onRemovePartner: function (e) {
        let partnerId = Number(e.target.getAttribute('data-id'))
        $(`#partner-${partnerId}`).remove()
        this.partners = this.partners.filter(partner => partner.id !== partnerId)
    },
    _onAddPartner: async function (e) {
        e.preventDefault()
        this.resultMsgSpan.addClass('d-none')
        this.crossIcon.addClass('d-none')
        let partnerId = Number($('.partner-input').val())
        let isFound = this.partners.find(partner => partner.id === partnerId)
        if (isFound) {
            this.showResultMsg(`The partner is already on the list, ${isFound.name}`)
            return
        }
        let partner = await this.orm.searchRead("res.partner", [['id', '=', partnerId]], ['name'])
        if (!partner.length) {
            this.showResultMsg('The partner does not exist')
            return
        }
        debugger;
        partner = partner[0]
        this.partner_list.append($(`
            <div id="partner-${partner.id}" class="partner-item">
                ${partner.name} 
                <button class="btn btn-danger btn-sm remove-btn" data-id="${partner.id}">x</button>
            </div>
        `))
        this.partners.push(partner)
    },
    showResultMsg(msg) {
        this.resultMsgSpan.text(msg)
        this.resultMsgSpan.removeClass('d-none')
        this.crossIcon.removeClass('d-none')
    },
    _onRemoveResultMessage: function () {
        this.resultMsgSpan.addClass('d-none')
        this.crossIcon.addClass('d-none')
    }
});
