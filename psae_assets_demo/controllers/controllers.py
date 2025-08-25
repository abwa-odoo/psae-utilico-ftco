from odoo import http
from odoo.http import request

class BundleDemoController(http.Controller):

    @http.route("/assets-demo", type="http", auth="public", website=True, csrf=False)
    def demo_page(self):
        return request.render("psae_assets_demo.assets_page")
