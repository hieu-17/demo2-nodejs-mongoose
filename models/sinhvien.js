var mongoose = require('mongoose');
var sinhvienSchema = new mongoose.Schema({
    ten: 'string',
    masinhvien: 'string',
    lop: 'string',
    diachi: 'string',
    email: 'string',
    ngaysinh: 'string',
    sdt: 'number',
});
module.exports = mongoose.model('sinhvien', sinhvienSchema);