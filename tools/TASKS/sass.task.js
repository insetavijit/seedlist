/**
    THIS IS THE MAIN PROJECT TASK MANEGER
    WE ARE USING VL.JS FOR LISTING
    DIR PATHS ("./vl.js")
    ====================================================
    @author AVIJIT SAKRAR <https://twitter.com/inset_>
    @Updated on : 2018-08-09 19:03:06 > 2018-08-16 20:27:00
    GMT+0530 (India Standard Time)
    ====================================================
*/

const
    /* | Gulp Handler Plugins  | */
    gulp = require("gulp"),
    // utils :
    $ = require("gulp-load-plugins")(),
    pump = require("pump"),
    /*| project info handlers| */
    vl = require("../../vl.json"), // FOLDER STUCTURE LIST
    pkg = require("../../package.json"), //PROJECT INFO
    // glob = require("glob"),
    projectName = (pkg.name) ? pkg.name : 'oSeed' //NAME OF THE PROJECT ( DRIVEN FORM "./package.json")
;
/**
 * THIS PART IS FOR SASS FUNCTION HANDLER
 * WE HAVE A FUNCTION CALL sass( )
 * AND WE ARE USING THAT FUNCTION HERE
 * MODE ( dev || debug || prod )
 * @see documentration for more
 * 
 * @version 1.0.1
 * @author AVIJIT SAKRAR <https://twitter.com/inset_>
 * CREATED ON : 2018-08-14 18:48:27
 * GMT+0530 (India Standard Time)
 */
// converts "sass" files to "CSS" files . in --minified mode.
gulp.task("sass:dev", gulp.parallel((done) => {
    sass(done , false);
}));
// converts "sass" files to "CSS" files . in --minified mode . with source maps
gulp.task("debug:sass", gulp.parallel((done) => {
    sass(done,false, true);
}));
/*
    file List to Genarate :
    1. style{renamed}.css
    2. style{renamed}.min.css
    3. /css/style.css ( all stylesheets : prod )
    # remember we don't need to genarate all css parts in min format because
      those files are for refference only . we want the production version 
      wordpress compitible thats why we are genarating those files
      but the wordpress devloper will grab them and minifythen then genarate a .min version of his customised css
      then he will include the min version to the project.
    # we dont need to genarate any source map files for production version . 
      because that .map file will be invalid without the readl scss files ( source code )
      so, the wordpress devloper will genarate the new source files if he feels it's needed
*/
gulp.task("sass:prod", gulp.parallel((done) => {
    //2. genarate the .min.css ( --minified ) + source map
    // sass(done, true, true);
    // //2. genarate the none minified version  + source map
    // sass(done, false, true);
    //3. genarate all css parts
    sass(done, false, false, true);
}));
gulp.task("sass:w", gulp.parallel('debug:sass', (done) => {
    gulp.watch(vl.sass.src, gulp.parallel((done)=>{
        sass(done , false );
    }))
    done();
}))


/**
 * @param {Function} done 
 * @param {string} type 
 * @param {string} env
 * @version 2.0.0
 * 
 * @description
 * THIS FUNCTION IS RESPONCIBLE FOR ALL SASS RELATED 
 * OPARATIONS .
 * 
 * @author AVIJIT SAKRAR <https://twitter.com/inset_>
 * CREATED ON : 2018-08-14 18:48:27
 * GMT+0530 (India Standard Time)
 */
function sass(done, isMinified = true, sourceMaps = false, isProduction = false) {
    var sassConfig = {
            includePaths: "./src/sass"
        },
        distLoc = (isProduction) ? vl.base.libs + vl.sass.prod_dist : vl.base.libs,
        tarGetFile = (isProduction) ? vl.sass.prod : vl.sass.entryfile;
    //Actual task : the gulp magic
    pump([
        gulp.src(tarGetFile),
        $.plumber(),
        // if its a min action and asking for source then only init the source map
        $.if(sourceMaps === true, $.sourcemaps.init()),
        // compiling the sass
        $.sass(sassConfig),
        // post compileing tasks
        $.postcss([$.autoprefixer]),
        $.if(isMinified, $.cleanCss()),
        // if its a min action and asking for source then only write the source map
        $.if(sourceMaps === true, $.sourcemaps.write("./")),
        $.size(),
        //rename the file :
        $.if(isMinified, $.rename({
            basename: projectName,
            suffix: ".min",
        })),
        $.if(!isMinified, $.rename({
            basename: projectName
        })),
        gulp.dest(distLoc)
    ], done())
}