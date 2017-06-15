import _ from 'lodash';
import process_nav from '../../src/utils/process_nav';

describe('process_nav', function(){
  let nav_data;
  let data = [
    {title: 'foo'}
    , {title: 'bar'}
  ];

  beforeEach(function(){
    nav_data = process_nav(data);
  });

  it('should add name to each item', function(){
    _.forEach(nav_data, (d)=>{
      expect(_.has(d, 'name')).toBeTruthy();
      expect(_.includes(['foo', 'bar'], d.name)).toBeTruthy();
    });
  });

  it('should update title to each item', function(){
    _.forEach(nav_data, (d)=>{
      expect(d.title).toContain('Sessions for');
      expect(_.includes(['foo', 'bar'], d.title)).toBeFalsy();
    });
  });

  it('should add name to each item', function(){
    _.forEach(nav_data, (d, i)=>{
      expect(_.has(d, 'active')).toBeTruthy();
      if (i === 0){
        expect(d.active).toBeTruthy();
      } else {
        expect(d.active).toBeFalsy();
      }
    });
  });
});
