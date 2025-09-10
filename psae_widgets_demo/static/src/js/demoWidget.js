/** @odoo-module */

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.demoWidget = publicWidget.Widget.extend({
    selector: '#demo_widget',
    events: {
        'click .o_partner_actions .btn-danger': '_onRemovePartner',
        'click .btn-add-partner': '_onAddPartner',
        'click .btn-remove-result-msg': '_onRemoveResultMessage',
        'submit #partner-form': '_onAddPartner'
    },
    init: function () {
        this._super.apply(this, arguments)
        this.orm = this.bindService('orm')
        this.partner_list = $('.o_partner_list')
        this.resultMessage = $('#result-message')
        this.partnerInput = $('#partner_id')
        this.partners = []
    },
    willStart: async function () {
        this._super.apply(this, arguments)
        // Load initial partners (optional - you can remove this if you want to start with empty list)
        try {
            this.partners = await this.orm.searchRead("res.partner", [], ['name'], {limit: 5})
        } catch (error) {
            console.warn('Could not load initial partners:', error)
            this.partners = []
        }
    },
    start: function () {
        this._super.apply(this, arguments)
        this._renderPartnerList()
    },
    _renderPartnerList: function () {
        this.partner_list.empty()
        
        if (this.partners.length === 0) {
            this.partner_list.append(`
                <div class="o_empty_state">
                    <i class="fa fa-users"></i>
                    <p>No partners added yet. Add a partner ID above to get started.</p>
                </div>
            `)
        } else {
            this.partners.forEach(partner => {
                this._addPartnerToDOM(partner)
            })
        }
    },
    _addPartnerToDOM: function (partner) {
        // Remove empty state if it exists
        this.partner_list.find('.o_empty_state').remove()
        
        let partnerItem = $(`
            <div id="partner-${partner.id}" class="o_partner_item">
                <div class="o_partner_info">
                    <h5 class="o_partner_name">${partner.name}</h5>
                    <p class="o_partner_id">ID: ${partner.id}</p>
                </div>
                <div class="o_partner_actions">
                    <button class="btn btn-danger" data-id="${partner.id}" title="Remove partner">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        `)
        this.partner_list.append(partnerItem)
    },
    _onRemovePartner: function (e) {
        e.preventDefault()
        let partnerId = Number($(e.currentTarget).data('id'))
        $(`#partner-${partnerId}`).fadeOut(300, () => {
            $(`#partner-${partnerId}`).remove()
            this.partners = this.partners.filter(partner => partner.id !== partnerId)
            this._renderPartnerList()
        })
    },
    _onAddPartner: async function (e) {
        e.preventDefault()
        this._hideResultMessage()
        
        let partnerId = Number(this.partnerInput.val())
        
        // Validation
        if (!partnerId || partnerId <= 0) {
            this._showResultMessage('Please enter a valid partner ID', 'error')
            return
        }
        
        // Check if partner already exists
        let existingPartner = this.partners.find(partner => partner.id === partnerId)
        if (existingPartner) {
            this._showResultMessage(`Partner "${existingPartner.name}" is already in the list`, 'error')
            return
        }
        
        // Show loading state
        this._showResultMessage('Loading partner...', 'info')
        
        try {
            let partners = await this.orm.searchRead("res.partner", [['id', '=', partnerId]], ['name'])
            
            if (!partners.length) {
                this._showResultMessage(`Partner with ID ${partnerId} does not exist`, 'error')
                return
            }
            
            let partner = partners[0]
            this.partners.push(partner)
            this._addPartnerToDOM(partner)
            this._showResultMessage(`Partner "${partner.name}" added successfully!`, 'success')
            this.partnerInput.val('')
            
        } catch (error) {
            console.error('Error loading partner:', error)
            this._showResultMessage('Error loading partner. Please try again.', 'error')
        }
    },
    _showResultMessage: function (message, type = 'info') {
        this.resultMessage.find('.o_message_text').text(message)
        this.resultMessage.removeClass('o_success o_error').addClass(type === 'error' ? 'o_error' : 'o_success')
        this.resultMessage.show()
    },
    _hideResultMessage: function () {
        this.resultMessage.hide()
    },
    _onRemoveResultMessage: function (e) {
        e.preventDefault()
        this._hideResultMessage()
    }
});
