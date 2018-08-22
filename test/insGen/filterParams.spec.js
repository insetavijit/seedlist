var


  expect = require('chai').expect,

  insGen = require("../../insGen.js").insGenTest;

describe(' filterParams: ripitation ', () => {
  describe('no matter how many tarGets are their : ', () => {
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
});