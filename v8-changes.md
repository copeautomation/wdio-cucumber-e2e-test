# v8 CHANGES

1. Use full file extention when importing project files
    - Optionally enable `"typescript.preferences.importModuleSpecifierEnding": "js",`in VSCode setting.json
2. `browser.config` -> `browser.options`
    - e.g. testid
3. When merging env specific config file, add all the keys to `before` hook to make the key available to `browser.options` object

