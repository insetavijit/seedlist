/**
 * Created Date : 2018-08-21 21:36:53
 */


class insGen {
    constructor(args = "", dev = false , methodNmae="", param = 0) {
        this.name = "insGen";
        this.args = args;
        //tmp vars :
        this.currenTarGet = "";
        //validation
        this.valid = {
            'tarGets': [
                "vl",
                'package'
            ]
        }

        //lists :
        this.console = [];
        this.errorNumberId = [
            'undefined',
            'invalid',
            'validation error'

        ]
        this.errorLog = []

        this.process = {
            "filters": ['filterParams'],
            "runned": [],
            "actual_run": [],
            "tarGets": ['false_tarGet'],
            "continue": true, // run the next step
        }
        this.tarmination = {
            "sucess": false,
            "tarminated": false,
            "reason": "",
            "invalid": false
        }
        this.index = {
            "runProcesSerial": -1, //df
        }
        this.sudoAct = [
            'log'
        ];
        this.inputs = {
            "tarGets": [],
            "filters": [],
        }
        this.temp = [];
        // run
        this.isDevMode( dev, methodNmae,  param  );
    }
    isDevMode( dev, methodNmae,  param  ){
        if(dev){
            return this[methodNmae](param);
        }else{
            this.doNextStep();
        }
    }
    arrayfilter(array =[]){
        var storage = [];
        for (let i = 0; i < array.length; i++) {
            const currentIndex = array[i];
            var process = false ;

            if(typeof currentIndex !== 'object' ){
                for (let l = 0; l < storage.length; l++) {
                    const storedItem = storage[l];
                    if(currentIndex === storedItem){
                        process = true ;
                        break;
                    }
                }
                if(process === false){
                    storage.push(currentIndex);
                }
            }else{
                this.temp = false ;
                return false ;
            }
        }
        this.temp = storage ;
        return storage ;
    }
    doNextStep(_continue = true) {
        //do not end process dircetly :
        // call error and pass the tarminat signal
        
        var CurrentFilterName = this.process.filters[this.index.runProcesSerial + 1];

        if (_continue === false) {
            // stop signal

            // we are just indexing the error: not going to nextStep
            this.error("doNextStep( _continue = false )", 0, true, true)

            this.tarmination.reason = "stop-signal"
            this.showOutput();
            
            this.process.continue = false;
            this.tarmination.tarminated = true
            this.tarmination.sucess = false

        } else if (typeof (CurrentFilterName) === 'undefined') {
            // we reached the last point of the exicution 
            // so jsut doing a validation to confirm the oparation

            if(this.arrayfilter(this.process.runned).length === this.arrayfilter(this.process.actual_run).length)
                {
                    this.tarmination.sucess = true ;
                }
            this.showOutput();
        }


        this.msg([
            "-=> run : " + CurrentFilterName,
            " --=?> stat : " + (typeof (this[CurrentFilterName]) === "function"),
            "[continue ===" + _continue + " ]"
        ]);


        if (
            typeof (this[CurrentFilterName]) === 'function' && // if the filter is exist
            this.process.continue === true // and also have the signal to process
        ) {
            // in case no target files are added we will run method 
            // and the method will deside , if it needs ( ? tarGet paramiter )
            for (let i = -1; i < this.process.tarGets.length; i++) {
                const tarGets = (this.process.tarGets[i]) ? this.process.tarGets[i] : false;
                this.currenTarGet = tarGets;
                this.process.runned.push(CurrentFilterName)
                // this.console.log(this.process.filters)
                this.msg([
                    "  --=o> " + CurrentFilterName,
                    "exicuting"
                ]);
                this.index.runProcesSerial++;
                // this.msg(tarGets)
                // runn the filter :
                this[CurrentFilterName]();
            }
        } else {

            if (!this.process.continue) {
                this.tarmination.tarminated = true;
            } else if (typeof (this[CurrentFilterName]) !== 'function') {
                this.tarmination.tarminated = true
                this.tarmination.invalid = true
                this.tarmination.reason = "undefined - filter"
                this.error("invalid filter - " + CurrentFilterName, 1, true, true)
            } else {
                this.tarmination.sucess = true
                this.tarmination.reason = "sucess"
            }
        }

    }
    showOutput() {
        // console.log(this);
        return this;
    }
    filterParams() {
        this.indexRun('filterParams');
        // reset the process list.action
        //no need CurrentLy : i will see that leater
        //2018-08-22 23:08:32
        // this.process.filters.push("serialiZefilterS")
        this.process.tarGets = [];
        // adding next 
        var args = this.args;


        if (typeof (args) === 'string') {
            // saparating cmnds
            var argsList = args.split(" ");

            argsList.forEach(paramiter => {
                // if we have a cmnd with "--" means its a filter
                var currentParamiter = paramiter.split("--");
                // this.msg(paramiter.split("--").pop())

                if (currentParamiter.length == 2) {
                    // if a filter is found then put it in process.filters
                    this.process.filters.push(currentParamiter.pop());
                } else if (currentParamiter.length >= 2) {
                    // error
                } else {
                    // add tarGetvalidation to the que
                    // console.log(currentParamiter)

                    this.process.filters.push('tarGetvalidation');
                    // this.record.inputs.tarGets.push(currentParamiter.pop())
                    // console.log(currentParamiter)
                    // console.log(currentParamiter)
                    this.process.tarGets.push(currentParamiter.pop());
                }
            });

        }

        // if(this.process.tarGets.length >=1){
        //     this.process.filters.push('tarGetvalidation');
        // }
        // end
        // console.log(this.process.filters)
        this.doNextStep();
    }
    tarGetvalidation() {

        // //esc MultiRun
        if (this.escMultiRun('tarGetvalidation')) {
            this.doNextStep();
            return false;
        }
        // // indexing that we are running it :
        this.indexRun('tarGetvalidation');

        var tarGets = this.process.tarGets;
        this.inputs.tarGets = tarGets;
        //reset tareGets
        this.process.tarGets = [];

        var storage = [];
        this.msg(tarGets)
        if (tarGets.length > 1) {

            for (let i = 0; i < tarGets.length; i++) {
                var tarGet = false;
                const current_tarGet = tarGets[i];

                this.msg([current_tarGet + ": current tarGet"])


                for (let l = 0; l < this.valid.tarGets.length; l++) {
                    const validTarGet = this.valid.tarGets[l];
                    if (current_tarGet === validTarGet) {

                        tarGet = true;
                        storage.push(current_tarGet);
                        break;
                    }
                }
                // if current tarGet is not  valid tarGet
                // then exit the loop
                if (!tarGet) {
                    // if tarGet is false means a invalid tarGet is given
                    this.error('tarGet : ' + current_tarGet, 1, false)
                    break;
                }
            }

            if (tarGet) {
                this.process.tarGets = storage;
            }
        }
        //end
        this.doNextStep();
    }
    msg(msg = "") {

        var prepareMsg = ["last :" + this.process.runned[this.process.runned.length - 1]];

        msg.forEach(element => {
            prepareMsg.push(element);
        });

        this.console.push(prepareMsg)
    }
    error(hint, errorNumberId, continiueProcess = true, silent = false) {

        // 2018-08-22 23:37:16
        var errorMsg = [hint, errorNumberId, this.errorNumberId[errorNumberId]];

        this.msg([errorMsg + "-=> error:msg"])

        this.errorLog.push(
            [
                hint,
                errorNumberId,
                this.errorNumberId[errorNumberId],

            ]
        )

        if (silent) {
            //JUST DO NOTHING !!
        } else {
            // GO AND DO NEXT STEP ( MAY STOP EXICUTION )
            return this.doNextStep(continiueProcess);
        }
    }
    indexRun(name) {
        this.process.actual_run.push(name)
    }
    escMultiRun(filterName) {
        var runned = this.process.runned;
        return (runned[runned.length - 2] === 'tarGetvalidation') ? true : false;
    }
    update() {
        this.indexRun("update")
        this.doNextStep();
    }
}

module.exports.insGenTest = insGen;
// module.exports = new insGen (process.argv.slice(2).toString());