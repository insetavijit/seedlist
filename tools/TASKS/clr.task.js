const
    
gulp = require ("gulp"),

del = require("del"),
chalk = require("chalk"),

table = require("table"),

clrBlock = require("../../vl.json").clr,

args = require("./MODULES/getCmnds.js")(process.argv.slice(2))
;


//genaraing AutoCln tasks
let clrTaskList = Object.keys(clrBlock) ;
let clrPaths = [];

// showTable : info
let tasKtable = [];







clrTaskList.forEach(clrItem => {
    // addind paths to run clr:all
    clrPaths.push(clrBlock [clrItem ]);
    tasKtable.push([
        chalk.default.yellow.bold( "clr:" + clrItem ),
        chalk.default.cyan.italic(clrBlock[clrItem]),
        chalk.default.magenta("remove all contents from" + clrItem )
    ])
    gulp.task("clr:" + clrItem, gulp.parallel((done)=>{
        clr(done , clrBlock [clrItem ]);
    }))
});


// clears ( remove content of ) all listed dirs with paramiters :
gulp.task("clear",
    gulp.parallel(clr));
// info for the Task:
gulp.task("clr::", gulp.parallel((done)=>{
    console.log( tasKtable);

    done();
}))
// clears ( remove content of ) all listed dirs ( see inside code )
gulp.task("clr:all", gulp.parallel((done) => {
    // clr(done, [vl.base.dist, vl.base.bin])
    clr(done , clrPaths)
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
    }else if (typeof (dirListToClr) === 'string' ){
        dirListToClr = [dirListToClr]
    }

    // clearing the directorys
    dirListToClr.forEach(clrDirs => {
        del(clrDirs + "/*");
    });
    // pass the complete signal
    return done();
}