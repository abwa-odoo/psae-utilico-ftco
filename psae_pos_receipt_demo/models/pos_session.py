from odoo import api, models


class PosSession(models.Model):
    _inherit = 'pos.session'

    @api.model
    def _loader_params_res_partner(self):
        vals = super()._loader_params_res_partner()
        vals['search_params']['fields'] += ['arabic_name']
        return vals
