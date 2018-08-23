var


    expect = require('chai').expect,

    insGen = require("../../tools/SCRIPTS/insGen.js").insGenTest,

    helper = require("./../modules/helper.js")
;



describe('Update:', () => {
    describe('do a proper [start]:', () => {
        it('must include [ update ] filter to the filter list,\n\tto exiccute', () => {
            var insGenResponce = new insGen("--update");
            // console.log( insGenResponce );

            expect(insGenResponce.process.filters).to.include.members(['update'])
        });
    });
    describe('if no tarGets are given ', () => {
        it('must include df tarGets', () => {
            var insGenResponce = new insGen("--update");

            expect(insGenResponce.process.tarGets).to.deep.equals(['vl','package'])
        });
    });
});