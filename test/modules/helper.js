module.exports.haveDuplicates = (searchInArray , lookfor) => {

    var k = 0 ;
   for (let i = 0; i < searchInArray.length; i++) {
       const curentInstance = searchInArray[i];
       if(curentInstance === lookfor){
           k++;
       }
       if(k >= 2 ){
           return true ;
       }
   }
   return false ;
}