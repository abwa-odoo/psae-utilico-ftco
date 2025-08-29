from odoo import api, models


class PosSession(models.Model):
    _inherit = 'pos.session'

    @api.model
    def _pos_ui_models_to_load(self):
        res = super()._pos_ui_models_to_load()
        res += ['order.type']
        return res

    @api.model
    def _loader_params_order_type(self):
        return {
            'search_params': {
                'domain': [],
                'fields': [],
            }
        }

    def _get_pos_ui_order_type(self, params):
        return self.env['order.type'].search_read(**params['search_params'])
