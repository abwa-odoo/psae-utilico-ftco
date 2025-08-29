from odoo import api, fields, models


class PosOrder(models.Model):
    _inherit = 'pos.order'

    order_type_id = fields.Many2one('order.type')

    @api.model
    def _order_fields(self, ui_order):
        res = super()._order_fields(ui_order)
        res.update({'order_type_id': ui_order.get('order_type_id') or False})
        return res

    def _export_for_ui(self, order):
        res = super()._export_for_ui(order)
        res.update({'order_type_id': order.order_type_id.id})
        return res
