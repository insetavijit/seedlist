/**
 * Created Date : 2018-08-21 21:36:53
 */

var

    fs = require('fs'),
    glob = require("glob"),
    path = require("path");

fs
class insGen {

    constructor(runInDevMode = false) {
        this.args = process.argv;
        this.devMode = runInDevMode;
        this.runIndex = -1;

        this.validTarGets = [
            'vl', // vl.json file
            'package', //package file
        ];
        this.errorIdList = [
            "validation error ",//0,
        ]
        // this.args = [] ;
        this.param = this.args.slice(2);
        // mainProgress tracker
        this.progress = true;
        this.runned = [];
        this.exicuted = []
        this.actions = [
            'filterParams',
            // 'testCmndString', //it  will be called in doNextStep() for eatch function
            // 'exicute'
            // user defined actions will be added here :
        ];

        this.tarGets = ['false_tarGet'];
        this.currenTarGet = "";

        this.funParaMiter = {};
        this.currentParamiter = "";

        this.tst = [];
        //runner for Setup

        this.errorLog = {
            "undefined_act": [],
            "error": []
        };

        //starting the process
        this.doNextStep();
    }
    filterParams() {

        for (let i = 0; i < this.param.length; i++) {

            var isAction = this.param[i].split("--")[1];

            if (typeof (isAction) !== "undefined") {
                // this guys are need to be actions we will test that before exicution
                this.actions.push(isAction);
            } else {
                //this guyes needs to be tarGet files ( to manipulate || create )
                this.tarGets.push(this.param[i]);
            }
        }
        return this.doNextStep(); // just proccess move on signal
    }
    isAction(actionName) {
        if (typeof (this[actionName]) === "function") {
            return true;
        } else {
            this.errorLog['undefined_act'].push(actionName)
            return false;
        }
    }
    showOutput() {
        // console.log(this);
    }
    doNextStep(_continue = true) {

        var CurrentActName = this.actions[this.runIndex + 1];

        // console.log(CurrentActName , this.runIndex >= this.actions.length)

        if (_continue === false || this.runIndex >= this.actions.length || typeof (CurrentActName) === 'undefined') {

            // console.log("tarMinating - program ( END )")

            this.showOutput();

            // console.log( this.runIndex >= this.actions.length

            this.runIndex = 1000;

            this.progress = false;

            return this;
        }

        if (typeof (this[CurrentActName]) === 'function' && this.progress === true) {
            this.tarGets.forEach(tarGets => {
                this.currenTarGet = tarGets;
                // console.log(this.tarGets)

                this.runned.push(CurrentActName)
                this.runIndex++;
                // runn the fun :
                this[CurrentActName]();

            });
        } else {
            return (!this.progress) ?
                this.errorLog['error'].push([CurrentActName, 'undefined action']) :
                this.errorLog['error'].push([CurrentActName, 'Stop Exicution . found error ']);
        }

    }
    isRunnedAlready( functionName ){
        return (this.runned [ this.runned.length - 1] === "functionName" ) 
            ? true : false ;
    }
    log(){
        if(this.isRunnedAlready("log") === true ){
            this.doNextStep();
        }

        this.exicuted.push(this.runned [ this.runned.length - 1]);
        console.log( "log" );
        fs.writeFileSync(path.join(__dirname , ".bin/insGen.LOG.json") , JSON.stringify(this));
    }
    validateTarget() {
        
        if(this.runned [ this.runned.length - 1 ] === 'validateTarget'){
            //avoid repitation
            this.doNextStep();
        }
        this.exicuted.push("validateTarget");


        var tarGets = (this.tarGets.length === 1) ? false : true;
        var storage = [];
        if (tarGets) {
            //validate if its a proper entry
            for (let i = 1; i < this.tarGets.length; i++) {
                tarGets = false;
                const current_tarGet = this.tarGets[i];
                console.log("enter")
                // testing if the file name is aleary validated 
                // if the file tarGet name is valid then this loop
                // will return a tarGets = true ;
                for (let l = 0; l < this.validTarGets.length; l++) {
                    const valid_tarGet = this.validTarGets[l];

                    if (current_tarGet === valid_tarGet) {
                        console.log("valid tarGet - " + current_tarGet);
                        tarGets = true;
                        break;
                    }
                }
                // in case the tarGet file is false means
                // an invalid tarGet is mentiond so we will jut put a error msg
                console.log(this.validateTarget)

                if (tarGets === false) {
                    // invalid tarGet found exit and stop exicution
                    console.log("invalid entry : " , current_tarGet)
                    this.error(
                        "invalid tarGet file -" + current_tarGet,
                        0, // validation error
                        true // stop exicution
                    )
                    break;
                }
                storage.push(current_tarGet);
            }
            // Grate EveryThing is Going Good
            console.log(storage);

            this.tarGets = storage ;
        }
        // console.log(this)
        this.doNextStep();
    }
    error(msg = "", errorNumberId = -1, stopProcess = true) {

        this.exicuted.push("error");

        if(typeof (this.errorIdList [ errorNumberId]) !== "undefined"){
            console.log("msg :" , msg)
            console.log("error on :" , this.errorIdList [ errorNumberId ] )
        }else{
            console.log( "undefined error : " , this.actions.pop());
        }
        if(stopProcess){
            console.log( "stop exicution [error : "+ errorNumberId +"]" );
            console.log( "Last run || "+ this.actions.pop() +"]" );
            this.doNextStep(false);
        }
        // console.log(this)
        // this.doNextStep();
    }
    update() {
        // this.actions.push("update_vl_json");
        this.exicuted.push("update");

        // tarGets = this.validateTarget();
        this.actions.push('validateTarget')

        // console.log(this)

        // this.doNextStep(false);
        // return false ;
        // this.tarGets = [
        //     'vl',
        //     'package', //this is not a duplicate entry
        // ];

        this.actions.push("updateJSON");

        this.funParaMiter['package'] = ['devDependencies', 'Dependencies']

        return this.doNextStep();
    }

    updateJSON() {
        var
            updates,
            param = (this.funParaMiter[this.currenTarGet]) ? this.funParaMiter[this.currenTarGet] : false,
            // currParma = "Dependencies",
            tarGetFileToWrite = this.currenTarGet,
            storage = {}, // empty storage object : used to store all json file data in a single var
            i = 0 // determiner for loop end
        ;

        try {
            storage = require("./" + tarGetFileToWrite + ".json")
        } catch (error) {
            storage = {}
        }
        // we are looking for every file with the extention of ( "**.vl.json") inside tools/DBSET/ dir
        glob("tools/DBSET/**." + tarGetFileToWrite + ".json", (err, match) => {
            console.log(tarGetFileToWrite)
            // inCase of error ( just distroy the process )
            if (err) {
                this.doNextStep(false);
            } //signal to stop entire Process
            ;
            match.forEach(filePath => {
                // if any math found just read it
                fs.readFile(path.join(__dirname, filePath), (err, content) => {

                    // inCase of error ( just distroy the process )
                    if (err) {
                        this.doNextStep(false);
                    } //signal to stop entire Process

                    //if Sucess then start working
                    var d = JSON.parse(content);
                    // now add new json file content to our[ storage]
                    // storage = Object.assign(storage, d.devDependencies)

                    //--//uodate the storage ( ? || part) -------
                    if (!param) {
                        storage = Object.assign(storage, d)
                    } else {
                        param.forEach(currParma => {
                            if (!storage[currParma]) {
                                storage[currParma] = {};
                            }
                            Object.assign(
                                storage[currParma],

                                (typeof (d[currParma]) === 'undefined') ?
                                {} : d[currParma]
                                // d ['devDependencies']
                            );
                        });
                    }

                    //-------

                    // also incrise our loop end indentifier ( so we can move to the conclution )
                    i++;
                    // wright the Genarated Json FIle to vl.json
                    // wright to the file only happens if no error found during the entire oparation
                    if (i >= match.length) {
                        // pass data to wright to vl.json ( filePathIdentification - file )
                        fs.writeFileSync(path.join(__dirname, "./" + tarGetFileToWrite + ".json"), JSON.stringify(storage));
                        // console.log(updates);
                        // console.log("fileCreate : url : " , path.join(__dirname  ,tarGetFileToWrite+".json"))
                        // console.log(storage);
                        // ;

                        // now distroy the storage var
                        storage = 0;
                        // Pass Sucess Signal to Go for next Step
                        this.doNextStep();
                    }
                });
            });
        });
    }
    removeDuplicates(jsonTypeobject = {}) {
        var newObject = {};
        var keys = Object.keys(jsonTypeobject);

        keys.forEach(key => {
            newObject[key] = "";
        });
        return newObject;
    }
}

module.exports = new insGen(true);