# -*- coding: utf-8 -*-
{
    'name': "Utilico - PoS Receipt Demo",
    'summary': "Custom module for PoS Receipt Customization.",
    'version': '17.0.0.1.0',
    'depends': ['point_of_sale'],
    'license': "OEEL-1",
    'assets': {
        'point_of_sale._assets_pos': [
            'psae_pos_receipt_demo/static/src/**/*',
        ]
    },
    'data': [
        'views/res_partner_views.xml'
    ],
}
