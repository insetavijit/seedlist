


const

gulp = require("gulp"),

vl = require("../../vl.json"),

pump = require("pump"),


sftBlock = vl.sft ,


sftList = Object.keys(sftBlock)

;
var tskList = [] ;


for (let i = 0; i < sftList.length; i++) {
    const item = sftList[i];
    tskList.push("sft:" + item );
    gulp.task("sft:" + item , gulp.parallel((done) =>{
        sft(done , sftBlock ,  item );
    }))
}

gulp.task("sft:all", gulp.parallel(tskList))
/**
 * 
 * @param {Function} done 
 * @param {Array} src 
 * @description copys files form node_modules to dist dir
 *  used for vendor / 3edparty libs moving / shifting / copying
 */
function sft(done, src , item) {
    // console.log(src , item)

    var 
        dirMap = Object.keys(src [ item ]),
        outDir = (dirMap[0] === '0') ? item : 0
    ;

    // console.log(src );

    dirMap.forEach(dirName => {
        var
            newSource = (outDir) ? src [ item ] : src [ item ] [ dirName ] ,
            newDist = (outDir) ? vl.base.libs + outDir : [vl.base.vendor +  dirName];;
        
            pump([
                gulp.src(newSource),
                gulp.dest(newDist)
            ], done())
            // console.log(distDir)
        });
    // console.log(typeof(dirMap))
    // console.log(outDir)
    done();
}