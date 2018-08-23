module.exports = ( param = [])=>{
    var cmnds = [];
    param.forEach(arg => {
        (arg.split("--").length > 1) ? cmnds.push(arg.split("--").pop()): false;
    });
    return cmnds
}