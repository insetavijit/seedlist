var


    expect = require('chai').expect,

    insGen = require("../../insGen.js").insGenTest,

    helper = require("./../modules/helper.js")
;




describe(' tarGetvalidation: shoud start ', () => {
    it('Must Run if tarGets are added', () => {
        //no matter how many taget files are their it shoud run 
        // jsut once | 2018-08-22 23:51:21
        var insGenResponce = new insGen("vl package no matter how mauy");
        //   console.log(insGenResponce);
        expect(insGenResponce.process.runned).to.include.members(['tarGetvalidation']);
    });
});

describe(' tarGetvalidation: shoud Called Just Once ', () => {
    it('Must run Single Time ( no matter how many tarGets are their ) ', () => {
        var insGenResponce = new insGen("vl package no matter how many targes");
        
        // console.log(insGenResponce.process.actual_run)

        var duplicate = helper.haveDuplicates(insGenResponce.process.actual_run , 'tarGetvalidation');
        
        expect(duplicate).to.false
    });
    
});
describe('tarGetvalidation: validating tarGet files ', () => {
    it('Must Return validated tarGets ', () => {
        var insGenResponce = new insGen("vl package");
        expect(insGenResponce.process.tarGets).to.include.members (['vl' , 'package'])
    });
    it('Must Return error if any invalid tarGets - given', () => {
        var insGenResponce = new insGen("vl package vls");
        // console.log(insGenResponce.errorLog)
        //error : 1 : means invalid input
        expect(insGenResponce.errorLog.error[0][1]).to.be.equal(1);
        //Process Must End
        expect(insGenResponce.tarmination.sucess).to.false;
        expect(insGenResponce.tarmination.reason).to.be.equal('stop-signal');

        // expect(insGenResponce.).to.false;
    });
});