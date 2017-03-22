

export default function(Rewire){

  return function(title){
    return Rewire.__get__(title);
  }
};