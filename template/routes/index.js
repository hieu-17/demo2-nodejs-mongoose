var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller')

/* GET home page. */
router.get('/',controller.index);

/* GET danh sach */


// danh sach diem
 router.get('/diem',controller.diem)

/*  Thêm, sửa, xóa sinh viên*/
router.get('/danhsach',controller.danhsach)
router.get('/them',controller.them)
router.post('/them',controller.postThem)
router.get('/sua:idcansua',controller.sua)
router.post('/sua:idcansua',controller.postSua)
router.get('/xoa/:idcanxoa',controller.xoa)

// Thêm, sửa, xóa điểm
router.get('/dsdiem',controller.dsdiem)
router.get('/themdiem:idmonhoc',controller.themdiem)
router.get('/sinhvien/:masinhvien/:maMH/:soTC',controller.sinhvien)
router.post('/sinhvien/:masinhvien/:maMH/:soTC',controller.postSinhvien)
router.get('/suadiem/:masinhvien/:maMH/:soTC',controller.suadiem)
router.post('/suadiem/:masinhvien/:maMH/:soTC',controller.postSuadiem)

//mon hoc
router.get('/monhoc',controller.monhoc)
// danh sach lop

module.exports = router;
