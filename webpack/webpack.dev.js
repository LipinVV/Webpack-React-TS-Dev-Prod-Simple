const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',

    devtool: 'eval-source-map',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
        ],
    },

    devServer: {
        static: './dist',
        port: 5555,
        hot: true,
        open: true,
        historyApiFallback: true,
    },
});
