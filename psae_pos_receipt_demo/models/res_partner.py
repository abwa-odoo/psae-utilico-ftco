from odoo import fields, models


class Partner(models.Model):
    _inherit = 'res.partner'

    arabic_name = fields.Char()
