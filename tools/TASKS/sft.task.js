const
    //required items:
    gulp = require("gulp"),
    pump = require("pump"),
    // config : info : fileLocations
    vl = require("../../vl.json"),
    sftBlock = vl.sft,
    tblConfig = vl.conf_console_table_style,
    //dispay
    chalk = require("chalk").default,
    table = require("table").table,
    //vars
    sftList = Object.keys(sftBlock);

let tskList = [];
let tskTable = [];
let tskName = [];
// genarating tasks for selective sft :
// autoSft genarator
for (let i = 0; i < sftList.length; i++) {
    const item = sftList[i];
    tskList.push("sft:" + item);
    tskName.push(item);
    // genataing tasks
    gulp.task("sft:" + item, gulp.parallel((done) => {
        sft(done, sftBlock, item);
    }))
}
gulp.task("sft::", gulp.parallel((done) => {
    console.log(chalk.yellow(table([
        [chalk.cyan("TASK NAME : sft || version 2.0")],
        ["COPYING FILES FORM ONE DIR TO ANOTHER"],
        ["config file is : ( ./tools/DBSET/sft.vl.json )"],
        ["YOU CAN EASYLY ADD DIRS VIA GULP TO COPY"],
        ["JUST ADD THE TASK NAME : COPY INFO"],
        ["EXAMPLE : sft:{package:{src:[./pacakge.json] , dist:[dist]}}"],
        ["@see the documentration for more info"],
    ], Object.assign(tblConfig , {'columnDefault' : {'width': 55}}) )))

    

    console.log(chalk.bold("Currently abilable tasks :"))

    //render the taks list
    tskName.forEach(blockName => {
        var tskN = "sft:" + blockName;
        var block = sftBlock[blockName];
        var childs = Object.keys(block);
        childs.forEach(child => {
            tskTable.push([
                chalk.yellow(tskN),
                chalk.yellowBright("-=> " + child),
                chalk.cyan(block[child])
            ]);
            tskN = " ";
        });
    });

    // reset the tblConfig : to df = none ;
    tblConfig.columnDefault = {} ;
    tblConfig['columns']= {};
    tblConfig['columns'][2] =  {"width": 35};
    
    console.log(table(tskTable, tblConfig))

    done();
}))
gulp.task("sft:all", gulp.parallel(tskList))

/**
 * 
 * @param {Function} done 
 * @param {object} sftSet 
 * @param {string} sftItemName 
 * @version 2.0
 * Created on :2018-08-25 20:18:17 ( GMT + 5:30 )
 * @author avijit sakrar <https://twitter.com/inset_>
 */
function sft(done, sftSet, sftItemName) {
    
    var
        tarGet = sftSet[sftItemName], // selecting the exact json block
        /**
         * THIS IS THE TRICK    :
         * if we do not have a src attribute in out sftBlock ( exmple : {sft:{libs:{js[]}}})
         * then we will assume every child inside the target block is a src attribute
         * if we have a src attribute : exmple : {sft:{libs:{src[]}}}
         * then we just need to sft links inside the src attribute
         * so ,
         * it may looks lite different stuff but the thing is that
         * every thing inside no_src block is multiple src's
         * and yes_src block have only one src [] it may contain multiple links 
         * but thats is not a issue here
         * 
         * now if we assume that x is the src block 
         * then ,  case -1 {sft:{libs:{x[]}}}
         * then ,  case -2 {sft:{libs:{x[]}}}
         * both are same but in actual value one got src attribute another got 
         * something eles
         * But , the thing is same
         * So , for no_src block we may have multiple blocks with different src and we
         * can get those src name as the key 
         * but in yes_src case its just one src block
         */
        //thats why we are importing only[src:1] | and all src's if no_Src block
        tarGetSrc = (tarGet['src']) ? ['src'] : Object.keys(tarGet);; // staring the actual loop
    tarGetSrc.forEach(sftEmelementRoot => {
        var
            newSrc = tarGet[sftEmelementRoot]; //explain: sft:libs[src] , sft:lolo[src]
        // if no dist is spacified then set df dist == vendor dir
        //else use the dir specified
        newDist =
            (tarGet['dist']) ?
            (typeof tarGet['dist'] === 'string') ? [tarGet['dist']] :
            tarGet['dist'] :
            [vl.base.vendor + sftEmelementRoot];
        
        for (let i = 0; i < newDist.length; i++) {
            const dist = newDist[i];

            console.log(chalk.green(table([
                [newSrc.length + "entry : -=> " + dist]
            ], tblConfig)));

            pump([
                gulp.src(newSrc), //sft:x:{ x === src }
                gulp.dest(dist) //df : vl.base.vendor
            ], done())
        }
    });

    

}