var mongoose = require('mongoose');
var diemSchema = new mongoose.Schema({ 
    maSV: 'string', 
    maMH: 'string', 
    soTC: 'string', 
    chuyencan: 'number', 
    giuaki: 'number', 
    cuoiki: 'number', 
    tb: 'number', 
});
module.exports = mongoose.model('diem', diemSchema);