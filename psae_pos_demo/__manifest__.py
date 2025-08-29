# -*- coding: utf-8 -*-
{
    'name': "Utilico - PoS Demo",
    'summary': "Custom module for PoS customization.",
    'version': '17.0.0.1.0',
    'depends': ['point_of_sale'],
    'license': "OEEL-1",
    'assets': {
        'point_of_sale._assets_pos': [
            'psae_pos_demo/static/src/**/*',
        ]
    },
    'data': [
        'security/ir.model.access.csv',
        'views/order_type_views.xml'
    ],
}
