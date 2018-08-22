var 


expect = require('chai').expect,

insGen = require("../../insGen.js").insGenTest
;

describe('structure : insGen ', function() {
  describe(' insGen testing Global Variables ', function() {
    it('it should return the name of the function', function() {
        var insGenResponce = new insGen( "--dev" ) ;
        expect(insGenResponce.name).to.equal( 'insGen' );
    });
  });

  describe('insGen: can we get the process list correct ?', function() {
    it('insGenResponce.process.filters | <-= (action list)', function() {
        var insGenResponce = new insGen( "vl --update" ) ;
        expect(insGenResponce.process.filters).to.eql( [ 'update'] );
    });
    it('insGenResponce.process.tarGets | <-= (tarGet list)', function() {
        var insGenResponce = new insGen( "vl --update" ) ;
        expect(insGenResponce.process.tarGets).to.eql( [ 'vl'] );
    });
  });
});