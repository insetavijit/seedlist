var


  expect = require('chai').expect,
  insGen = require("../../tools/SCRIPTS/insGen.js").insGenTest
;

describe('filterParams: ripitation ', () => {
  describe('Start up: ', () => {
    it('should not repit', () => {
      //no matter how many taget files are their it shoud run 
      // jsut once | 2018-08-22 23:51:21
      var insGenResponce = new insGen("vl package no matter how mauy");
      var runned = insGenResponce.process.runned;
      var k = 0;
      for (let i = 0; i < runned.length; i++) {
        const runner = runned[i];
        if (runner === 'filterParams') {
          k++;
        }
        if (k >= 2) {
          break
        }
      }
      expect(k).to.be.eql(1);
    });
  });
  describe('Error: ', () => {
    it('inCase of invalid filter , \n\tthe process should tarminated',() => {
      //no matter how many taget files are their it shoud run 
      // jsut once | 2018-08-22 23:51:21
      var insGenResponce = new insGen("--invalidFilter");
      // console.log( insGenResponce)
      expect(insGenResponce.tarmination.reason).to.equal("undefined - filter")
      expect(insGenResponce.tarmination.sucess).to.false
    });
    it('inCase of invalid filter , \n\tlog the error msg',() => {
      //no matter how many taget files are their it shoud run 
      // jsut once | 2018-08-22 23:51:21
      var insGenResponce = new insGen("--invalidFilter");
      // console.log( insGenResponce)
      expect(insGenResponce.errorLog[0][1]).to.be.equal(1)
    });
  })
});