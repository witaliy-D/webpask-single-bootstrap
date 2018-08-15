const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');


const fs = require('fs');
const Assets = fs.readdirSync(path.resolve(__dirname, 'src'));
const Pages = Assets.filter(path => path.endsWith('.html'));
const generateHtmlPlugins = Pages.map(function(page) {
    return new HtmlWebPackPlugin({
        filename: page,
        template: page
    })
});



module.exports = {
    //devtool: 'source-map',
    context: path.resolve(__dirname, "src"),

    entry: {
        app: [
            "./js/app.js"
        ]
    },

    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "dist")
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        //presets: ['env', 'stage-0', 'react', 'react-hmre']
                        presets: ['env', 'stage-0', 'react']
                    }
                }
            },

            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    }
                ]
            },

            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },

            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },

            {
                test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
                exclude: [/svg-inline/, /symbols/],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[path][name].[ext]"
                        }
                    }
                ]
            },

            {
                test: /svg-inline/,
                use: [
                    'svg-sprite-loader',
                    'svgo-loader'
                ]
            },

            {
                test: /symbols/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: './img/symbols.svg'
                        }
                    },
                    'svgo-loader'
                ]
            },

            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[path][name].[ext]",
                            limit: 10000
                        }
                    },
                    "img-loader"
                ]
            }
        ]
    },

    plugins: [

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            Popper: ["popper.js", "default"],
            svg4everybody: 'svg4everybody'
        }),

        new SpriteLoaderPlugin ({
            plainSprite: true
        }),

        new CleanWebpackPlugin(["dist"]),

        new MiniCssExtractPlugin({
            filename: "style.min.css",
            chunkFilename: "[id].min.css"
        }),

        new OptimizeCSSAssetsPlugin(),

        new ImageminPlugin(),

    ].concat(generateHtmlPlugins)
};



