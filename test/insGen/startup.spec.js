var


  expect = require('chai').expect,

  insGen = require("../../insGen.js").insGenTest;

describe('structure : insGen ', ()=> {
  describe(' insGen testing Global Variables ', ()=> {
    it('it should return the name of the function', ()=> {
      var insGenResponce = new insGen("--dev");
      expect(insGenResponce.name).to.equal('insGen');
    });
  });

  describe('insGen: can we get the process list correct ?', ()=> {
    it('insGenResponce.process.filters | <-= (action list)', ()=> {

      var insGenResponce = new insGen("vl --update");

      expect(insGenResponce.process.filters).to.eql(['filterParams', 'update']);
      //test runned functions
      expect(insGenResponce.process.runned).to.eql(['filterParams']);
    });
    it('insGenResponce.process.tarGets | <-= (tarGet list)', ()=> {
      var insGenResponce = new insGen("vl --update");
      expect(insGenResponce.process.tarGets).to.eql(['vl']);
    });
  });

  //error testing
  describe('insGen: Error testing', () => {

    it('invalid filter Must return an error:', () => {
      var insGenResponce = new insGen("vl --invalidFilter");

      // console.log(insGenResponce)

      expect(insGenResponce.process.error).to.true;
      // test the invalidFilterName :
      expect(insGenResponce.errorLog.error[0][0]).to.equal("invalidFilter");
    });
  });

});