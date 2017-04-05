import _ from 'lodash';
import Ajax from '../../src/utils/ajax_manager';

describe('Ajax manager', function() {
  describe('setApi', function() {
    let setApi;
    beforeEach(()=>{
      setApi = Ajax.__get__("setApi")
    });

    it('should return api is no date string passed ', function() {
      expect(setApi("api_path")).toEqual("api_path");
    });

    it('should return api + query if date string passed ', function() {
      expect(setApi("api_path.json", new Date(2015, 0, 18, 16, 44))).toEqual("api_path/2015/01/18.json");
    });
  });

  describe('api', function() {
    let ajax, ajaxManager, spy, resolve, reject, promise;
    beforeEach(function() {
      ajaxManager   = Ajax.__get__("ajaxManager");
      promise = new Promise((res, rej)=>{
        resolve = res;
        reject  = rej;
      });

      spyOn(ajaxManager, "addUrl")
      spyOn(ajaxManager, "fetch").and.returnValue(promise);
      ajax = Ajax("http://astainforth.com");
    });


    it('should throw an error if no url is passed', function() {
      expect(()=>{
        Ajax()
      }).toThrowError("api url required");
    });

    describe('addQuery', function() {
      it('should set date', function() {
        let date = ajax.addQuery(new Date(2015, 0, 18, 16, 44));

        expect(date).toEqual(new Date(2015, 0, 18, 16, 44));
      });

      it('should not set date', function() {
        let date = ajax.addQuery();
        expect(date).toBeNull();
      });

    });


    describe('addProgress', function() {
      it('should set progress function', function() {
        let p = jasmine.createSpy("prog")
        let prog = ajax.addProgress(p);

        expect(prog).toEqual(p);
      });

      it('should not set progress function', function() {
        let prog = ajax.addProgress();
        expect(prog).toBeNull();
      });

    });

    describe('fetch', function() {
      let setApi;
      beforeEach(function() {
        spy = jasmine.createSpy("setApi").and.returnValue("http://astainforth.com")
        setApi = Ajax.__set__("setApi", spy)
      });

      afterEach(()=>{
        setApi();
      });

      it("should fetch data", function(done) {
          ajax.fetch().then((data)=>{
            expect(data).toEqual("success");
          });

          resolve("success");

          setTimeout(function() {
              done();
            }, 100);

        });

        it("should throw error data", function(done) {

          ajax.fetch().then(()=>{console.log("shouldn't run")}).catch((err)=>{
            expect(err).toEqual(new Error("failure"));
          })
          reject("failure");
          setTimeout(function() {
              done();
            }, 100);

        });
    });
  });
});



