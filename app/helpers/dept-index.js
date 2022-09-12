import Ember from 'ember';

export function deptIndex(params/*, hash*/) {

  if(params%2 == 0)
  {
    return "tr_coloralt";
  }


  return "";
}

export default Ember.Helper.helper(deptIndex);
