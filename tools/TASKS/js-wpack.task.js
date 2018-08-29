/**
    THIS IS THE MAIN PROJECT TASK MANEGER
    WE ARE USING VL.JS FOR LISTING
    DIR PATHS ("./vl.js")
    ====================================================
    @author AVIJIT SARKAR <https://twitter.com/inset_>
    @Updated on : 2018-08-14 22:37:40
        > 2018-08-17 17:44:05
    GMT+0530 (India Standard Time)
    ====================================================
*/

const
    /* | Gulp Handler Plugins  | */
    gulp = require("gulp"),
    $ = require("gulp-load-plugins")(),
    pump = require("pump"),
    /*| project info handlers| */
    vl = require("../../vl.json"), // FOLDER STUCTURE LIST
    pkg = require("../../package.json"), //PROJECT INFO
    // glob = require("glob"),
    projectName = (pkg.name) ? pkg.name : 'oSeed' , //NAME OF THE PROJECT ( DRIVEN FORM "./package.json")
    /*| system tools |*/
    webpack = require("webpack-stream"),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin")
;

/**
 * WE ARE USING js() FUNCTION FOR COMPILING ALL OUR
 * JS FILES VIA WEBPACK AND BABLE
 * SO WE CAN USE ES2015 
 * 
 * @version 1.0.1
 * @author AVIJIT SARKAR <https://twitter.com/inset_>
 * Created on : 2018-08-14 18:56:59
 * GMT+0530 (India Standard Time)
 */

// converts "sass" files to "CSS" files . in --minified mode . with source maps
gulp.task("js:min", gulp.parallel((done)=>{
    js(done , true , true , true);
}));
// TODO: genarate all js file in spacific folder . and genarate a main -bundil file .js.min version as well as full version
gulp.task("debug:js",gulp.parallel((done)=>{
    js(done , false , true);
}));
//
gulp.task("js:dev",gulp.parallel((done)=>{
    js(done , true, false , true );
}));
gulp.task("js:prod",gulp.parallel((done)=>{
    js(done , false  , false , false );//full
    js(done , false , false , true);//compile all 

}));
// RUN IN WATCH MODE
gulp.task("js:w", gulp.parallel('debug:js', (done) => {
    gulp.watch(vl.js.src, gulp.parallel((done)=>{
        // only create the main js file
        js(done , false );
    }))
    done();
}))

/**
 * js(done, minified = true , sourceMaps = false ,production = false )
 * @version 1.0.0.1
 * @description : 
 * WE ARE USING gulp-babel TO GENARATE ALL JS FILES SEPARETLY FOR
 * REFFERENCE PERPOSE .
 * WE ARE USING WEBPACK FOR BUNDING ALL FILES AT ONECE.
 * THE NAME OF THE GANARETED FILE WILL BE THE SAME NAME AS THE PROJECT NAME
 */
function js(done, minified = true , sourceMaps = false ,production = false ) {

    // df configaration for webpack
    var conf = 
    {
        mode: (!production) ? "development" : "production",
        devtool: (sourceMaps) ? "source-map" : "evel",
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                },
            }]
        },
        optimization:{
            "minimize":(minified) ? true : false ,
            "minimizer":[
                new UglifyJsPlugin({
                    include: /\.js$/,
                    sourceMap:sourceMaps
                })
            ]
        },
        output :{
            "filename" : (minified) ?  projectName + '--min.js' : projectName + '.js',
            "sourceMapFilename" : (minified) ?  projectName + '--min.map' : projectName + '.map'
        }
    };

    // console.log(vl.js.parts.dist , vl.base.libs)
    // filter if its a  production build
    // var entryfile = (production) ? vl.js.parts.src : vl.js.entryfile ;
    // console.log(entryfile);
    pump([
        // gulp.src(vl.js.entryfile),
        gulp.src(
            (production === true && minified === false ) 
                ? vl.js.parts.src : vl.js.entryfile ),
        $.plumber(),
        // we have already genarated a config file ( based on the call )
        $.if(minified === true || sourceMaps === true ,webpack( conf ) ),
        // ( done , false , false , false ) =->
        $.if(minified === false && production === false ,webpack( conf ) ),
        // in prod version : we need to compile all js-parts 
        $.if(production === true && minified === false && sourceMaps === false, $.babel({
            presets:['env']
        }) ),
        // every thig is done . now passing the to dest
        // gulp.dest("dist")
        gulp.dest((production === true && minified === false && sourceMaps === false ) 
        ? vl.js.parts.dist : vl.base.libs)
    ], done());
    // console.log(conf)
    // done();
}