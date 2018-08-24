module.exports.doSum = ( ints = [] )=>{
    var stock = 0 ;
    if(typeof (ints) === 'object'){
        var keys = Object.keys(ints) ;
        for (let i = 0; i < keys.length; i++) {
            const curr = keys[i];
            if(Number(ints[curr])){
                stock += ints[curr];
            }else{
                return false ;
            }
        }
        return stock;
    }
    return false ;
}
module.exports.readTextWithJquery = ( html = "" )=>{
    if(typeof(html) === 'string' && html !== "" ){
        return $(html).text() ; 
    }
    return false ;
}