
export default function(Rewire){
  return function(method, spy){
    let revert;

    beforeEach(function(){
      let r = spy();
      revert = Rewire.__set__(method, r);
    });

    afterEach(function(){
      revert();
    });
  };
}
