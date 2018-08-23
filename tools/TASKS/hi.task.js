

const

    gulp = require("gulp")
;

gulp.task("hi" , gulp.parallel((done)=>{
    console.log("hi");
    done();
}));