from odoo import models, fields


class FtcoWidgetDemo(models.Model):
    _name = "ftco.widget.demo"
    _description = "FTCO Widget Demo Item"

    name = fields.Char()
    score = fields.Integer()
