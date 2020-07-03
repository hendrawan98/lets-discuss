const mix = require('laravel-mix');
const nodePath = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .react('resources/js/pages/homepage/index.js', 'public/dist/homepage.js')
    .react('resources/js/pages/login/index.js', 'public/dist/login.js')
    .react('resources/js/pages/register/index.js', 'public/dist/register.js')
    .react('resources/js/pages/forum/create-forum/index.js', 'public/dist/create-forum.js')
    .react('resources/js/pages/forum/view-forum/index.js', 'public/dist/view-forum.js')
    .react('resources/js/pages/forum/list-forum/index.js', 'public/dist/list-forum.js')
    .react('resources/js/pages/conference/room-conference/index.js', 'public/dist/room-conference.js')
    .react('resources/js/pages/conference/create-conference/index.js', 'public/dist/create-conference.js')
    .react('resources/js/pages/conference/list-conference/index.js', 'public/dist/list-conference.js')
;

mix.webpackConfig({
    resolve: {
        alias: {
            '@components': nodePath.resolve(__dirname, 'resources/js/components'),
            '@pages': nodePath.resolve(__dirname, 'resources/js/pages'),
            '@icons': nodePath.resolve(__dirname, 'resources/js/assets/icons')
        },
    },
});
