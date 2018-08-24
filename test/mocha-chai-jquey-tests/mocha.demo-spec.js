const
  expect = require('chai').expect,
  demoJs = require("../../ASSETS/jScripts/demo.js"),
  //js do stuff

  jsdom = require('jsdom'),
  {
    JSDOM
  } = jsdom,
  doc = new JSDOM(),
  //jquery stuff
  jquery = require('jquery')
;



$ = global.jQuery = require('jquery')(doc.window);



describe('testing extarnal js file function', () => {
  describe('testing the doSum method', () => {
    it('it shoud return the sum value', () => {
      expect(demoJs.doSum([1, 2, 3])).to.be.equal(6)
      expect(demoJs.doSum([1, 2, 3, 1])).to.be.equal(6 + 1)
    });
  });
  describe('testing the doSum method : invalid arugments', () => {
    it('it should return 0 in case of emty values', () => {
      expect(demoJs.doSum([])).to.be.equal(0)
    });
    it('it should return 0 in case of no input ', () => {
      expect(demoJs.doSum()).to.be.equal(0)
    });
    it('it should return false direct int input ( invalid input ) ', () => {
      expect(demoJs.doSum(126358)).to.false
    });
    it('it should return false if json is input ( invalid input ) ', () => {
      expect(demoJs.doSum({
        'one': 10,
        'two': 'sdff'
      })).to.false
    });
  });
});

describe('jQuery : jsdom testing ', () => {
  it('testing if jquery can access a p element', () => {
    expect($("<p>hi</p>").text()).to.equal("hi")
    expect($("<p>hola</p>").text()).to.equal("hola")
  });
  it('testing if a extarnal function can access jquery ', () => {
    expect(demoJs.readTextWithJquery("<p>hi</p>")).to.equal("hi")
  });
  it('the func readTextWithJquery should return false in case of empty input', () => {
    expect(demoJs.readTextWithJquery()).to.false
  });
});