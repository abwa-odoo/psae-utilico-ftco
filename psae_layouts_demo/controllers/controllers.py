from odoo import http
from odoo.http import request


class LayoutDemoController(http.Controller):
    @http.route("/web-layout", type="http", auth="public", website=True, csrf=False)
    def web_layout_page(self):
        return request.render("web.layout")

    @http.route("/web-frontend-layout", type="http", auth="public", website=True, csrf=False)
    def web_frontend_layout_page(self):
        return request.render("web.frontend_layout")

    @http.route("/portal-frontend-layout", type="http", auth="public", website=True, csrf=False)
    def portal_frontend_layout_page(self):
        return request.render("portal.frontend_layout")

    @http.route("/website-layout", type="http", auth="public", website=True, csrf=False)
    def website_layout_page(self):
        return request.render("website.layout")
