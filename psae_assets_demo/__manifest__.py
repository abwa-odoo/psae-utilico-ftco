{
    "name": "Utilico - Assets Demo",
    "version": "1.0",
    "category": "Web",
    "depends": ["web"],
    "license": "OEEL-1",
    "data": [
        "views/templates.xml"
    ],
    "assets": {
        "psae_assets_demo.utilico_assets": [
            # include base files from framework
            ('include', 'web._assets_core'),

            # remove some files that we do not use to create a minimal bundle
            ('remove', 'web/static/src/core/**/*'),
            ('remove', 'web/static/lib/luxon/luxon.js'),
            'web/static/src/core/utils/concurrency.js',
            'web/static/src/core/utils/strings.js',
            'web/static/src/core/l10n/translation.js',
            'web/static/src/core/utils/functions.js',
            'web/static/src/core/browser/browser.js',
            'web/static/src/core/registry.js',
            'web/static/src/core/assets.js',

            'psae_assets_demo/static/src/index.js',
            'psae_assets_demo/static/src/demo.scss',
        ]
    }
}
