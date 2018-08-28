const
    /* | Gulp Handler Plugins  | */
    gulp = require("gulp"),
    // utils :
    $ = require("gulp-load-plugins")(),
    pump = require("pump"),
    /*| project info handlers| */
    vl = require("../../vl.json"), // FOLDER STUCTURE LIST
    pkg = require("../../package.json"), //PROJECT INFO
    fs = require('fs'), //NODE : FILE SYSTEM
    args = require("./MODULES/getCmnds.js")(process.argv.slice(2)),
    /*| system tools |*/
    del = require("del") //DELETING FILES

;
try { //PROJECT DATABASE
    var db = require("../../db.json")
} catch (error) {
    var db = vl.df.db;
}

/**
 * @package oseed ( branch : pug )
 * @update : git pull oseed pug
 * @version 1.0.0.1
 * @TODO: create documentration
 * 
 * @author AVIJIT SAKRAR <https://twitter.com/inset_>
 * @created on : 2018-08-16 16:54:47
 * GMT+0530 (India Standard Time)
 */
//compressed version
gulp.task("pug:dev",
    gulp.parallel(pug));
// converts "PUG" files to "HTML" files . in human readable format
gulp.task("debug:pug", gulp.parallel((done) => {
    pug(done, false);
}));
//we need to genarate all "HTML" files with respective name of theme and in folder ( for templateing purpose )
gulp.task("pug:prod", gulp.parallel( 'debug:pug' ,(done) => {
    pug(done, false , true);
    pug(done, false, true, true);
}));
// run the compiler in watch mode
gulp.task("pug:w", gulp.parallel('debug:pug', (done) => {
    gulp.watch(vl.pug.src, gulp.parallel('debug:pug'))
    done();
}))

/**
 * @package oseed ( branch : pug )
 * @update : git pull oseed pug
 * @version 1.0.0.1
 * @TODO: create documentration
 * 
 * @author AVIJIT SAKRAR <https://twitter.com/inset_>
 * @created on : 2018-08-16 16:54:47
 * GMT+0530 (India Standard Time)
 * 
 * PUG @SUPPORT FOR ARCHIVE AND ACTIVE MODE 
 */
gulp.task("archive", gulp.parallel((done) => {
    archiveProject(done);
}));
gulp.task("active", gulp.parallel((done) => {
    return activeSet(done, args)
}));



/**
 * 
 * @param { Function } done 
 * @param { Boolean } isMinified 
 * @param { Boolean } isProduction
 * @description
 * pug(done, isMinified = true , isProduction = false)
 * @version 1.0.0.1
 */
function pug(done, isMinified = true, isProduction = false, isArcived = false) {
    var pugSettings = (isMinified) ? {
        pretty: false
    } : {
        pretty: true
    };
    // if its in prod mode Genarate everything :
    var tarGetFile = (isProduction) ? vl.pug.parts.src : vl.pug.entryfile;
    // main Process :
    if (isArcived) {
        /**
         * @description 
         * when we are in isArcived mode we need to compile all the pug files
         * includeing ( ARCHIVE ) dir
         * but the problem is the dest for this will be the sub dir inside "dist/" dir
         * what i want is , to have everying inside the child dir and also the index file
         * in root lavel ( in "./dist/") dir . not inside a sub dir
         * 
         * now to solve this . i have decided to compile the index file when archiving it
         * and then put it in  "/src/pug/ARCHIVE/.bin" dir so we can just copy that file 
         * to out dist root ("./dist/**.html")
         * in this way we will have a complete compiled html sub folder inside dist dir
         * also have a index file with the name of the project in your dist root dir ("./dist/**.html")
         * now this thing is a quick fix . i will work on it leater to make this pug function 
         * a bit more efficient
         * ( quick fix ) : v1.0.1 
         * ======================
         * if you are willing to upgrade this funcion please do 
         */
        // console.log(vl.pug.archiveProject.contents);
        pump([
            gulp.src(vl.pug.archiveProject.contents),
            // gulp.src("src/pug/ARCHIVE/.bin/*"),
            $.plumber(),
            $.pug(pugSettings),
            // adding the index file that we have already compiled
            gulp.src(vl.pug.archiveProject.root + '.bin/*'),
            $.size(),
            gulp.dest(vl.base.dist)
        ], done());
    } else {
        pump([
            gulp.src(tarGetFile),
            $.plumber(),
            $.pug(pugSettings),
            $.size(),
            gulp.dest(vl.base.dist)
        ], done());
    }
}


/**
 * 
 * @param {Function} done 
 * @param {boolean} param 
 * @param {boolean} called 
 * 
 * @version 1.0.0.1
 * @author AVIJIT SAKRAR <https://twitter.com/inset_>
 * 
 * THIS FUNCTION WILL MAKE A PROJECT ACTIVE 
 * SIMPLY BY ADDING THE CURRENT PROJECT NAME 
 * TO TO "./db.json" FILE
 * IN CASE NO ACTIVE PROJECT SELECTED IT WILL RETURN 
 * THE DEFULT PROJECT AS ACTIVE PROJECT ( HOME )
 * 
 * PLEASE @see documentration FOR MORE ABOUT 
 * THIS PROJECT .
 */
function activeSet(done, param = [], called = 0) {

    if (param.length === 1) {

        // db.project ['active'] = param[0];
        db.project['active'] = param[0];
        fs.writeFileSync('db.json', JSON.stringify(db));
        // console.log(db);
    } else if (param.length === 0) {
        console.log(db.project.active);
    } else {
        console.log("PLEASE PROVIDE THE PROJECT NAME TO ACTIVE IT ")
    }

    return done();
}

/**
 * @param {Function} done 
 * 
 * @description
 * 
 * function archiveProject(done) {
 * @version 1.0.0.1
 * @author AVIJIT SAKRAR <https://twitter.com/inset_>
 * 
 * THIS FUNCTION WILL ARCHIVE THE CURRENT ACTIVE PROJECT
 * BY , JUST SIMPLY COPYING THE CURRENT ACTIVE PROJECT
 * TO THE ARCHIVE DIR,
 * @see /vl.json
 * @see documentration FOR MORE INFO
 */
function archiveProject(done) {
    var activeProject = db.project.active;

    // 1 . move all contens from active project dir
    pump([
        // moving all contents
        gulp.src(vl.pug.activeProject.contents),
        $.size(),
        gulp.dest(vl.pug.archiveProject.root + activeProject + '/')
    ]);

    // 2. move the index file form active project dir
    pump([
        // moving the index file
        gulp.src(vl.pug.activeProject.index),
        $.plumber(),
        $.pug({
            pretty: true
        }),
        $.rename({
            basename: activeProject
        }),
        $.size(),
        gulp.dest(vl.pug.archiveProject.bin),
    ], done());
}