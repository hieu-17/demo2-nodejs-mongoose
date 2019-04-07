var mongoose = require('mongoose');
var lopSchema = new mongoose.Schema({ 
    name: 'string', 
    CN: 'string' 
});
module.exports = mongoose.model('lop', lopSchema);