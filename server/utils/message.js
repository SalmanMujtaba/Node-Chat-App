var moment = require('moment');
var generateMessage = (from,text) =>{
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};


var generateLocationMessage = (from,latitude,longitude) =>{
  return {
    from,
    createdAt: moment().valueOf(),
    url: 'https://google.com/maps?q='+latitude+','+longitude
  };
};



module.exports = {generateMessage, generateLocationMessage};
