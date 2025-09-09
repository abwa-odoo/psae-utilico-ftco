from odoo import api, fields, models


class Partner(models.Model):
    _inherit = 'res.partner'

    arabic_name = fields.Char()

    @api.model
    def _load_pos_data_fields(self, config_id):
        fs = super()._load_pos_data_fields(config_id)
        fs += ['arabic_name']
        return fs
