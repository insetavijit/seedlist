var


    expect = require('chai').expect,

    insGen = require("../../tools/SCRIPTS/insGen.js").insGenTest,

    helper = require("./../modules/helper.js")
;




describe('tarGetvalidation: ', () => {

    describe('Start Properly : ', () => {
        // jsut once | 2018-08-22 23:51:21
        it('Must Start the method', () => {
            var insGenResponce = new insGen("vl package no matter how mauy");            
            expect(insGenResponce.process.runned).to.include.members(['tarGetvalidation']);
        });
        it('run Single time | even multiple tarGets are given', () => {
            var insGenResponce = new insGen("vl package no matter how many targes");
            var duplicate = helper.haveDuplicates(insGenResponce.process.actual_run , 'tarGetvalidation');
            expect(duplicate).to.false
        });
    });


    describe('filter : if given tarGets are valid ', () => {
        // jsut once | 2018-08-22 23:51:21
        it(
            'new insGen("vl package") -=> \n\tprocess.tarGets = [vl , package]', 
        () => {
            var insGenResponce = new insGen("vl package");
            expect(insGenResponce.process.tarGets).to.include.members (['vl' , 'package'])
        });
    });


    describe('Error Handling : ', () => {

        it('Must Return error if any invalid tarGets are given', () => {
            var insGenResponce = new insGen("vl package vls");
            expect(insGenResponce.errorLog[0][1]).to.be.equal(1);
            //Process Must End
            expect(insGenResponce.tarmination.sucess).to.false;
            expect(insGenResponce.tarmination.reason).to.be.equal('stop-signal');
    
            // expect(insGenResponce.).to.false;
        });
    });
});
