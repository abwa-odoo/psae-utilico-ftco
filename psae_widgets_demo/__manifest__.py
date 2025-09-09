{
    "name": "Utilico - Widgets Demo",
    "version": "1.0",
    "category": "Web",
    "depends": ["web"],
    "license": "OEEL-1",
    "assets": {
        "web.assets_backend": [
            ("replace", "web/static/lib/jquery/jquery.js", "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"),
            "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js",
            "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css",
            "psae_widgets_demo/static/**/*",
        ]
    },
    "data": [
        "security/ir.model.access.csv",
        "views/views.xml"
    ],
    "application": False,
    "installable": True,
}
