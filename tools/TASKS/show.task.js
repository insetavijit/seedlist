const
    /* | Gulp Handler Plugins  | */
    gulp = require("gulp"),
    
    /*| project info handlers| */
    vl = require("../../vl.json"),
     /*| system tools |*/
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload
;

/**
 * @description 
 * THIS TASK IS CREATED FOR SERVIING STATIC FILES TO 
 * THE WEB BROWSER .
 * AND AUTO RELOAD IN CASE OF FILE CHANGES INSIDE 
 * DIST DIR . 
 * @see /vl.json" FOR CONFIG 
 * WE ARE SHOWING THE DIR 
 *      "vl.base.dist" which is by default `./dist`
 * 
 * ====================================================
 * @author AVIJIT SAKRAR <https://twitter.com/inset_>
 * @created on : 2018-08-09 19:03:06
 * GMT+0530 (India Standard Time)
 * ====================================================
 */

gulp.task('show', gulp.parallel((done) => {
    browserSync.init({
        server: vl.base.dist
    });
    done();
}));
gulp.task('show:w', gulp.parallel('show', () => {
    gulp.watch(vl.base.dist).on('change', reload)
}));
