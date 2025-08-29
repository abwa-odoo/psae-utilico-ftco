from odoo import fields, models


class OrderType(models.Model):
    _name = 'order.type'
    _description = 'Order Type'

    name = fields.Char()
