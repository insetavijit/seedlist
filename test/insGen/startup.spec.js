var


  expect = require('chai').expect,

  insGen = require("../../tools/SCRIPTS/insGen.js").insGenTest;
//2018-08-22 23:51:31
describe('startup:', () => {



  describe(' insGen testing Global Variables ', () => {
    it('it should return the name of the function', () => {
      var insGenResponce = new insGen("");
      expect(insGenResponce.name).to.equal('insGen');
    });
  });
});