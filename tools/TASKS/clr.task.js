const
    
gulp = require ("gulp"),

del = require("del"),

vl = require("../../vl.json"),

args = require("./MODULES/getCmnds.js")(process.argv.slice(2))

;


// clears ( remove content of ) all listed dirs with paramiters :
gulp.task("clear",
    gulp.parallel(clr));
// clears ( remove content of ) .bin dir
gulp.task("clr:bin", gulp.parallel((done) => {
    clr(done, [vl.base.bin])
}));
// clears ( remove content of ) dist dir
gulp.task("clr:dist", gulp.parallel((done) => {
    clr(done, [vl.base.dist])
}));
// clears ( remove content of ) all listed dirs ( see inside code )
gulp.task("clr:all", gulp.parallel((done) => {
    clr(done, [vl.base.dist, vl.base.bin])
}));

/**
 * @param {*} done 
 * @param {Array} param 
 * @version 1.0
 * created on : 2018-07-24 01:33:54 AM GMT+0530 (India Standard Time)
 */
function clr(done, dirListToClr = []) {
    //if args is not empty then clear dirs mentiond in args
    if (dirListToClr.length === 0) {
        //NO PARAM IS FOUND : we will set -df global params as clr:param
        dirListToClr = args;
    }

    // clearing the directorys
    dirListToClr.forEach(clrDirs => {
        del(clrDirs + "/*");
    });
    // pass the complete signal
    return done();
}