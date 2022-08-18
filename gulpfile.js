/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const autoprefixer = require('gulp-autoprefixer');
const { src, dest, parallel, series, watch } = require('gulp');
const changed = require('gulp-changed');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const postcss = require('gulp-postcss');

//CSS function
function css() {
    const source = 'frontend/scss/*.scss';

    return src(source)
        .pipe(changed(source))
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                cascade: false,
                overrideBrowserslist: ['last 2 version']
            })
        )
        .pipe(cssnano({ zIndex: false }))
        .pipe(dest('public/dist/css'))
}

//Watch files
function watchFile() {
    watch('frontend/scss/*.scss', css);
}

// Tasks to define the execution of the functions simultaneously or in series
exports.watch = parallel(watchFile);
exports.default = series(parallel(css));