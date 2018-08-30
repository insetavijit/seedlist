/**
 * @name 'clr/clear' 
 * @version 2.0
 * Created on : 2018-08-25 23:12:34
 * GMT+0530 (India Standard Time)
 * @author : AVIJIT SARKAR <https://twitter.com/inset_>
 * @description clear dir ( remove contnets form a dir || clr-=> dir/*)
 */

const
    // required stuff
    gulp = require("gulp"),
    del = require("del"),
    //display:
    chalk = require("chalk").default,
    table = require("table").table,
    //fileStructure and configs
    clrBlock = require("../../vl.json").clr,
    tblStyleConf = require("../../vl.json").conf_console_table_style,
    // get the options paramiters
    args = require("./MODULES/getCmnds.js")(process.argv.slice(2));


//genaraing AutoCln tasks
let clrTaskList = Object.keys(clrBlock);
let clrPaths = [];
let tasksName = [];
let tasKtable = [
    [
        "command",
        "clear dir path ",
    ]
];

/**
 * @name 'autoGen - task Genaratior' 
 * @version {1.0.0.0}
 * Created on: 2018-08-25 23:20:36
 * GMT+0530 (India Standard Time)
 * @author : AVIJIT SARKAR <https://twitter.com/inset_>
 * @description genarating clr tasks according to vl.json->clr:
 */
clrTaskList.forEach(clrItem => {
    // addind paths to run clr:all
    clrPaths.push(clrBlock[clrItem]);
    tasksName.push("clr:" + clrItem);
    // prepare the table :
    tasKtable.push([
        chalk.yellow(chalk.bold("clr:" + clrItem)),
        chalk.magenta("Project Root /" + clrBlock[clrItem] + '/*')
    ])
    // Creating tasks:
    gulp.task("clr:" + clrItem, gulp.parallel((done) => {
        clr(done, clrBlock[clrItem]);
    }))
});

//-=> custom tasks:
// clears ( remove content of ) all listed dirs with paramiters :
gulp.task("clear",
    gulp.parallel(clr));
// clears ( remove content of ) all listed dirs ( see inside code )
gulp.task("clr:all", gulp.parallel((done) => {
    // clr(done, [vl.base.dist, vl.base.bin])
    clr(done, clrPaths)
}));


// wellcome msg : info : avout this task
gulp.task("clr::", gulp.parallel((done) => {


    // installing custom task to the task table :
    tasKtable.push([
        chalk.default.yellow.bold("clr:all"),
        chalk.default.magenta(tasksName)
    ]);
    // add custome task msg to the view
    tasKtable.push([
        chalk.default.yellow.bold("clear"),
        chalk.default.magenta(
            chalk.red(" gulp clear --dist ") +
            " is same as " +
            chalk.red(" clr:dist ")
        )
    ]);

    // render the view : wellcome msg
    console.log(
        chalk.yellow(
            table([
                [chalk.cyan("TASK : clr || version 2.0")],
                ["`clr` task is created to remove contents form a specific dir"],
                ["by df we have clr:bin and clr:dist but you can add more by"],
                ["adding new dir paths to  `./tools/DBSET/clr.vl.json`"],
                ["to clear any dir you can use " + chalk.red("`gulp clear --dirName`")]
            ], tblStyleConf)
        )
    )
    // render the task list:
    console.log(chalk.bold("Currently abilable tasks :"))
    console.log(table(tasKtable, tblStyleConf));
    done();
}))

/**
 * @param {Function} done 
 * @param {Array} param 
 * @version 1.0
 * created on : 2018-07-24 01:33:54 AM GMT+0530 (India Standard Time)
 */
function clr(done, dirListToClr = []) {
    //if args is not empty then clear dirs mentiond in args
    if (dirListToClr.length === 0) {
        //NO PARAM IS FOUND : we will set -df global params as clr:param
        dirListToClr = args;
    } else if (typeof (dirListToClr) === 'string') {
        dirListToClr = [dirListToClr]
    }
    // clearing the directorys
    dirListToClr.forEach(clrDirs => {
        console.log(chalk.red(table([
            [
                ["running -=> clr:bin"],
                ["empty : " + clrDirs.split("/").pop()]
            ]
        ], tblStyleConf)))
        del(clrDirs + "/*");
    });
    // pass the complete signal
    return done();
}