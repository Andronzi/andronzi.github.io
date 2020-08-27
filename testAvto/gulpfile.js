const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const sync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')

function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'           
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
}

function image() {
    return src('src/img/**.png')
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest('dist/img'))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                interlaced: true,
                optimizationlevel: 3
            })
        )
        .pipe(dest('dist/img'))
}

function rectangles_images() {
    return src('src/img/rectangles/**.png')
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest('dist/img/rectangles'))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                interlaced: true,
                optimizationlevel: 3
            })
        )
        .pipe(dest('dist/img/rectangles'))
}

function fonts() {
    return src('src/fonts/**.ttf')
    .pipe(dest('dist/fonts'))
}

function css() {
    return src('src/css/**.css')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist'))
}

function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server: 'dist'
    })

    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/parts/**.html', series(html)).on('change', sync.reload)
    watch('src/css/**.css', series(css)).on('change', sync.reload)
}

exports.build = series(clear, html, fonts, css, image, rectangles_images)
exports.serve = series(clear, html, fonts, css, image, rectangles_images, serve)


exports.html = html
exports.fonts = fonts
exports.image = image
exports.rectangles_images = rectangles_images
exports.css = css

exports.clear = clear