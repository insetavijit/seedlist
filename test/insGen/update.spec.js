var


    expect = require('chai').expect,

    insGen = require("../../insGen.js").insGenTest,

    helper = require("./../modules/helper.js")
;



describe('Update:', () => {
    it('must run updates', () => {
        var insGenResponce = new insGen("--update");
        // console.log( insGenResponce.errorLog);
        // expect(insGenResponce.process.runned).to.include.members(['update'])
    });
});