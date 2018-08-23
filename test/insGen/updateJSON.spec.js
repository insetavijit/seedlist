var


    expect = require('chai').expect,

    insGen = require("../../tools/SCRIPTS/insGen.js").insGenTest,

    helper = require("./../modules/helper.js");



describe('updateJSON:', () => {
    describe('default run:', () => {
        it('must run 2 times ( vl + package )', () => {
            var insGenResponce = new insGen("--update");
            

            // console.log( insGenResponce );

            expect(insGenResponce.updateJSON_db.runned.length).to.equal(2)
        });
    });
});