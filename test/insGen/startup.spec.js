var


  expect = require('chai').expect,

  insGen = require("../../insGen.js").insGenTest;
//2018-08-22 23:51:31
describe('structure : insGen ', ()=> {
  describe(' insGen testing Global Variables ', ()=> {
    it('it should return the name of the function', ()=> {
      var insGenResponce = new insGen("");
      expect(insGenResponce.name).to.equal('insGen');
    });
  });
//2018-08-22 23:51:31

  describe('insGen: can we get the process list correct ?', ()=> {
    it('insGenResponce.process.filters | <-= (action list)', ()=> {

      var insGenResponce = new insGen("--update");

      expect(insGenResponce.process.filters).to.eql(['filterParams', 'update']);
      //test runned functions
      expect(insGenResponce.process.runned).to.eql(['filterParams']);
    });
    it('insGenResponce.process.tarGets | <-= (tarGet list)', ()=> {
      var insGenResponce = new insGen("vl --update");
      expect(insGenResponce.process.tarGets).to.eql(['vl']);
    });
  });
  
  //2018-08-22 23:51:31
  //error testing
  describe('insGen: Error testing', () => {

    it('invalid filter Must Be Tarminated:', () => {
      var insGenResponce = new insGen("vl --invalidFilter");

      expect(insGenResponce.tarmination.sucess).to.false;
      expect(insGenResponce.tarmination.tarminated).to.true;
      expect(insGenResponce.tarmination.invalid).to.true;
      // test the invalidFilterName :
    });
    it('invalid filter Must Return Error Msg', () => {
      var insGenResponce = new insGen("vl --invalidFilter");
      // console.log(insGenResponce.errorLog.error)
      expect(insGenResponce.errorLog.error[0][0]).to.be.equal('invalidFilter');
      expect(insGenResponce.errorLog.error[0][1]).to.be.equal(0);
      expect(insGenResponce.errorLog.error[0][2]).to.be.equal('undefined');
      // test the invalidFilterName :
    });
  });
});