var


    expect = require('chai').expect,

    insGen = require("../../insGen.js").insGenTest,

    helper = require("./../modules/helper.js")
;



describe('Update:', () => {
    describe('do a proper [start]:', () => {
        it('must include [ update ] filter to the filter list,\n\tto exiccute', () => {
            var insGenResponce = new insGen("--update");
            // console.log( insGenResponce);
            expect(insGenResponce.process.filters).to.include.members(['update'])
        });
        it('must include [ update ] to runned list', () => {
            var insGenResponce = new insGen("--update");

            console.log( insGenResponce);
            // console.log( insGenResponce.process.actual_run);

            expect(insGenResponce.process.runned).to.include.members(['update'])
            // expect(insGenResponce.process.actual_run).to.include.members(['update'])
        });
    });
});