
/**
 * @demo template Just remove it an write your own
 * @Created on : 2018-08-24 19:40:31
 */


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