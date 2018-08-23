var
  expect = require('chai').expect,
  insGen = require("../../tools/SCRIPTS/insGen.js").insGenTest;
//2018-08-22 23:51:31
describe('startup:', () => {

  describe('arrayFilter : ', () => {
    it('Must Return Empty array if passed nested array', () => {
      var insGenResponce = new insGen("", true , 'arrayfilter', [[1,2,],3,[4,4,4,1]] );
    //   expect(insGenResponce).to.equal([]);
        // console.log(insGenResponce)
        expect(insGenResponce.temp).to.false;
    });

    it('Must remove duplicates', () => {
        var insGenResponce = new insGen("", true , 'arrayfilter', [1,1,1,2,2,2,1,1,1,3,3,3,1,4,1,5] );
      //   expect(insGenResponce).to.equal([]);
          // console.log(insGenResponce)
          expect(insGenResponce.temp).to.deep.equal([1,2,3,4,5]);
      });
    it('Must remove duplicate stings', () => {
        var insGenResponce = new insGen("", true , 'arrayfilter', ['a','b','ab','ac','abc','a','b','ab','ac','abc','a','b','ab','ac','abc'] );
      //   expect(insGenResponce).to.equal([]);
          // console.log(insGenResponce)
          expect(insGenResponce.temp).to.deep.equal(['a','b','ab','ac','abc']);
      });
  });
});