/**
 * Created Date : 2018-08-21 21:36:53
 */


class insGen {
    constructor( args ="" ){
        this.name = "insGen";
        this.args = args ;
        //tmp vars :
        this.currenTarGet = "";
        this.process = {
            "filters":['filterParams'],
            "runned":[],
            "error":[],
            "tarGets":['false_tarGet'],
            "continue":true, // run the next step
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
            return (!this.process.continue) ?
                this.errorLog['error'].push([CurrentFilterName, 'undefined action']) :
                this.errorLog['error'].push([CurrentFilterName, 'error found : stoping the exicution']);
        }

    }
    showOutput(){
        console.log(this);
    }
    filterParams(){
        // reset the process list.action
        this.process.filters = [];
        this.process.tarGets = [];

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
}

module.exports.insGenTest = insGen;
// module.exports = new insGen (process.argv.slice(2).toString());