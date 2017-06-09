 module.exports={
isAscii:function (str) {
    return /^[\x00-\x7F]*$/.test(str);
},

checkSpecialSymbols:function (str) {
    return /^[a-z0-9\-_\.]+$/i.test(str);
},

checkMinLength:function (str, min) {
    return ((str || '').length >= (isFinite(parseInt(min)) ? min : 4));
},

checkMaxLength:function (str, max) {
    return ((str || '').length <= max);
},
checkEmail:function(str){
      return /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i.test(str);

},
checkName:function (str) {
  return /^[a-zA-Z' -]+$/.test(str);
},
generateError:function (msg) {
    return {
        status: 'error',
        message: msg
    }
}
};
