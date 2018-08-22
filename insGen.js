/**
 * Created Date : 2018-08-21 21:36:53
 */


class insGen {
    constructor( args ="" , log=false){
        this.name = "insGen";
        this.args = args ;
        //tmp vars :
        this.currenTarGet = "";

        //lists :
        this.errorNumberId =[
            'undefined',
            'invalid',
            'validation error'
            
        ]
        this.errorLog ={
            "error" : []
        }
        this.process = {
            "filters":['filterParams'],
            "runned":[],
            "tarGets":['false_tarGet'],
            "continue":true, // run the next step
        }
        this.tarmination = {
            "sucess":false,
            "tarminated":false,
            "reason":"",
            "invalid":false
        }
        this.index = {
            "runProcesSerial": -1 , //df
        } 
        this.sudoAct = [
            'log'
        ];

        
        // run
        this.doNextStep();
    }
    doNextStep(_continue = true) {
        var CurrentFilterName = this.process.filters [this.index.runProcesSerial + 1];
        if
            (
                _continue === false || 
                this.index.runProcesSerial >= this.process.filters.length || 
                typeof (CurrentFilterName) === 'undefined'

            ){
            // log the error:
            this.process.error = true ;
            //show output
            this.showOutput();
            //making sure that we quit process
            this.index.runProcesSerial = 10000;
            this.process.continue = false;

            return this;
        }

        if 
            ( 
                typeof (this[CurrentFilterName]) === 'function' &&  // if the filter is exist
                this.process.continue === true // and also have the signal to process
            ){
                this.process.tarGets.forEach(tarGets => {
                    /**
                     * for eatch tarGet files we are going to run the filters 
                     * measn if we have to tarGets (vl.json , package.json)
                     * then all the filter will be runned for tarGets
                     * measn we will run all filters twice
                     * 
                     * now, its the filter who will decide it needs to run or not
                     * if not then the filter will pass a signal to process and esc all
                     * its funtionalitys
                     * ==================
                     * 2018-08-22 22:29:36
                     */

                    this.currenTarGet = tarGets;
                    this.process.runned.push(CurrentFilterName)
                    this.index.runProcesSerial++;

                    // runn the filter :
                    this[CurrentFilterName]();

                });
        } else {
            // console.log(CurrentFilterName)
            // console.log(typeof (this[CurrentFilterName]) === 'function')
            if(!this.process.continue){
                this.tarmination.tarminated = true ;
            }else if(typeof (this[CurrentFilterName]) !== 'function'){
                this.tarmination.tarminated = true
                this.tarmination.invalid = true
                this.tarmination.reason = "undefined - filter"
                this.error(CurrentFilterName , 0 , true , true )
            }else{
                this.tarmination.sucess = true 
                this.tarmination.reason = "sucess"
            }
        }

    }
    showOutput(){
        console.log(this);
    }
    filterParams(){
        // reset the process list.action
        //no need CurrentLy : i will see that leater
        //2018-08-22 23:08:32
        // this.process.filters.push("serialiZefilterS")
        this.process.tarGets = [];

        // adding next 
        var args = this.args ;

        if(typeof ( args) === 'string'){
            // saparating cmnds
            var argsList = args.split(" ");

            argsList.forEach(paramiter => {
                // if we have a cmnd with "--" means its a filter
                var currentParamiter = paramiter.split("--");

                if(currentParamiter.length == 2){
                    // if a filter is found then put it in process.filters
                    this.process.filters.push(currentParamiter.pop());
                }else if(currentParamiter.length >= 2){
                    // error
                }else {
                    this.process.tarGets.push(currentParamiter.pop());
                }
            });

        }
        this.doNextStep();
    }
    error(hint , errorNumberId , StopExicution = false , silent=false ){

        // 2018-08-22 23:37:16
        var errorMsg = [hint , errorNumberId , this.errorNumberId[errorNumberId]];

        console.log(errorMsg)

        this.errorLog.error.push([hint , errorNumberId , this.errorNumberId[errorNumberId]])    

        if(silent){
            //JUST DO NOTHING !!
        }else{
            // GO AND DO NEXT STEP ( MAY STOP EXICUTION )
            return this.doNextStep(StopExicution);
        }
    }
}

module.exports.insGenTest = insGen;
// module.exports = new insGen (process.argv.slice(2).toString());