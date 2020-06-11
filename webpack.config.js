/**
 * @author Hendrawan Hadikusuma <hadikusumahendrawan@gmail.com>
 * @desc Extend laravel mix webpack.config.js to custom our webpack config
 */
const defaultConfig = require('laravel-mix/setup/webpack.config.js')

/**
 * Modify laravel-mix webpack config
 */
defaultConfig.module.rules.map(rule => {
    if ('icon.svg'.match(rule.test)) {
        if (rule.exclude) {
            if (rule.exclude instanceof Array)
                rule.exclude.push(/resources\/js\/assets\/icons\/+[^\/]+\/+[^\/]+\.svg$/)
            else
                rule.exclude = [rule.exclude, /resources\/js\/assets\/icons\/+[^\/]+\/+[^\/]+\.svg$/]
        } else
           rule.exclude = /resources\/js\/assets\/icons\/+[^\/]+\/+[^\/]+\.svg$/
    }
  
    return rule
})

/**
 * Customize webpack config rules
 */
const rules = [
    {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    },
]

defaultConfig.module.rules = defaultConfig.module.rules.concat(rules)

module.exports = defaultConfig
