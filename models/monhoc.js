var mongoose = require('mongoose');
var monhocSchema = new mongoose.Schema({ 
    ten: 'string', 
    soTC: 'string', 
    maMH: 'string', 
});
module.exports = mongoose.model('monhoc', monhocSchema);