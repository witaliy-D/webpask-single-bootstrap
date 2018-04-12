  const path = require("path");
  const webpack = require("webpack");

  const HtmlWebPackPlugin = require("html-webpack-plugin");
  const CleanWebpackPlugin = require("clean-webpack-plugin");
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
  const CopyWebpackPlugin = require("copy-webpack-plugin");
	const ImageminPlugin = require("imagemin-webpack-plugin").default;


  module.exports = {

      context: path.resolve(__dirname, "src"),

      entry: {
        app: [
            "./js/app.js"
        ],
      },

      output: {
        filename: "script.js",
        path: path.resolve(__dirname, "dist"),
      },

      module: {
        rules: [
          {
            test: /\.html$/,
            use: [{ loader: "html-loader", options: { minimize: true } }]
          },

          {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
                "sass-loader",
            ]
          },

          {
            test: /\.css$/,
            use: [{
              loader: "css-loader",
              options: {  minimize: true }
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
                    loader: "img-loader",
                  }
            ]
          },

            {
              test: /\.svg$/,
              loader: "svg-url-loader",
            },

            {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              use: [
                      {
                        loader: "file-loader",
                          options: {
                          name: "[path][name].[ext]",
                        },
                      }
              ],
            },

        ]
      },

      plugins: [

	      new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            Popper: ["popper.js", "default"],
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
                    { glob: "svg/*" },
                ]
            }
        ),

        new MiniCssExtractPlugin({
            filename: "style.min.css",
            chunkFilename: "[id].min.css",
        }),

        new OptimizeCSSAssetsPlugin(),

		    new ImageminPlugin({
			      test: /\.(jpe?g|png|gif|svg)$/i,
		    }),

      ]
  };



