/**
 * Created by jiayi on 2017/3/8.
 */
// 常用配置
module.exports = {
  extends: "stylelint-config-standard",
  // 各rules的具体作用见上面链接
  rules: {
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "declaration-colon-space-after": "always",
    "declaration-colon-space-before": "never",
    "function-comma-space-after": "always",
    "function-url-quotes": "double",
    "media-feature-colon-space-after": "always",
    "media-feature-colon-space-before": "never",
    "media-feature-name-no-vendor-prefix": true,
    "max-empty-lines": 5,
    "number-leading-zero": "never",
    "number-no-trailing-zeros": true,
    "property-no-vendor-prefix": true,
    "rule-no-duplicate-properties": true,
    "declaration-block-no-single-line": true,
    "rule-trailing-semicolon": "always",
    "selector-list-comma-space-before": "never",
    "selector-list-comma-newline-after": "always",
    "selector-no-id": true,
    "string-quotes": "double",
    "value-no-vendor-prefix": true,
    // 允许的单位
    "unit-whitelist": ["em", "rem", "%", "px"]
  }
}
