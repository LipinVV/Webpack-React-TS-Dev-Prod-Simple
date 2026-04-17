const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// без разделения, шпаргалка

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true, // Очищать папку dist перед каждой сборкой
    },

    mode: 'development', // development, production, или none,

    module: {
        rules: [
            {
                test: /\.css$/i, // какие файлы обрабатывать: ищет расширение .css, конец строки, регистронезависимый поиск
                use: [
                    MiniCssExtractPlugin.loader, // Вместо style-loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true // Показывает в DevTools исходные файлы, а не скомпилированный/обработанный результат
                        }
                    }

                    // 'style-loader', // 2. Вставляет стили в DOM через <style> теги
                    // 'css-loader',   // 1. Преобразует CSS в CommonJS модуль
                    // Порядок ВАЖЕН: loaders применяются СПРАВА НАЛЕВО
                ],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // путь к вашему HTML файлу
            filename: 'index.html', // имя выходного файла
            title: 'Мое приложение', // будет доступно как <%= htmlWebpackPlugin.options.title %>
            inject: 'body', // куда вставлять скрипты: 'head' | 'body' | false
            // Можно добавить favicon
            // favicon: './src/favicon.ico',
            minify: false, // для development можно отключить минификацию
            // Дополнительные мета-теги
            meta: {
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                'description': 'Описание приложения'
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        })
    ],

    // расширения, которые webpack будет искать при импортах
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    devtool: 'source-map', // source maps для отладки TypeScript (как оглавление, которое показывает, где в архиве находится каждая страница оригинального документа),

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3000,
        hot: true,
        open: true,
        compress: true,
        client: {
            overlay: {
                errors: true,
                warnings: true,
            },
            progress: true,
        },
        watchFiles: ['src/**/*'],
    },
};
