const path = require("path"),
      webpack = require("webpack"),
      HtmlWebPackPlugin = require("html-webpack-plugin"),
      CleanWebpackPlugin = require("clean-webpack-plugin"),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
      CopyWebpackPlugin = require("copy-webpack-plugin"),
      ImageminPlugin = require("imagemin-webpack-plugin").default;


module.exports = {
    devtool: 'source-map',
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
                        presets: ['env', 'stage-0', 'react', 'react-hmre']
                    }
                }
            },

            {
                test: /\.html$/,
                use: [{loader: "html-loader", options: {minimize: true}}]
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
                use: [{
                    loader: "css-loader",
                    options: {minimize: true}
                }]
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
                    {
                        loader: "img-loader"
                    }
                ]
            },

            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
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
                test: /\.(woff|woff2|svg|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[path][name].[ext]",
                            limit: 10000
                        }
                    }
                ]
            }

        ]
    },

    plugins: [

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            Popper: ["popper.js", "default"]
        }),

        new HtmlWebPackPlugin({
            template: "index.html",
            filename: "./index.html"
        }),

        new CleanWebpackPlugin(["dist"]),

        new CopyWebpackPlugin(
            [
                {from: "./img", to: "img"}
            ],
            {
                ignore: [
                    {glob: "svg/*"}
                ]
            }
        ),

        new MiniCssExtractPlugin({
            filename: "style.min.css",
            chunkFilename: "[id].min.css"
        }),

        new OptimizeCSSAssetsPlugin(),

        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i
        })

    ]
};



