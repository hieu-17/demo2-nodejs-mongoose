var express = require('express');
var router = express.Router();
var sinhvienModel = require('../models/sinhvien')
var lopModel = require('../models/lop')
var monhocModel = require('../models/monhoc')
var diemModel = require('../models/diem')

/* GET home page. */
router.get('/',function (req, res, next) {
  res.render('index', { title: 'Welcome' });
});

router.get('/danhsach', function (req, res, next) {
  sinhvienModel.find({}, (err, dulieu) => {
    res.render('danhsach', {
      title: 'Express',
      data: dulieu
    });
  })

});
router.get('/them', function (req, res, next) {
  lopModel.find({}, (err, dulieu) => {
    res.render('them', {
      title: 'Express',
      data: dulieu
    });
  })

});
router.post('/them', function (req, res, next) {
  var phantu = {
    ten: req.body.ten,
    masinhvien: req.body.masinhvien,
    lop: req.body.lop,
    diachi: req.body.diachi,
    email: req.body.email,
    ngaysinh: req.body.ngaysinh,
    sdt: req.body.sdt,
  }
  var dulieu = new sinhvienModel(phantu);
  dulieu.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });
  res.redirect('/danhsach')
});
router.get('/sua:idcansua', function (req, res, next) {
  var id2 = req.params.idcansua;
  sinhvienModel.find({ _id: id2 }, function (err, dulieu) {
    res.render('sua', {
      data: dulieu,
    })
  });
});
router.post('/sua:idcansua', function (req, res, next) {
  var id2 = req.params.idcansua;
  var dulieu01 = {
    ten: req.body.ten,
    masinhvien: req.body.masinhvien,
    lop: req.body.lop,
    diachi: req.body.diachi,
    email: req.body.email,
    ngaysinh: req.body.ngaysinh,
    sdt: req.body.sdt,
  }
  sinhvienModel.findByIdAndUpdate(id2, { $set: dulieu01 }, function (err, dulieu) {
    dulieu.save();
    res.redirect('danhsach')
  })
});
router.get('/xoa:idcansua', function (req, res, next) {
  var id2 = req.params.idcansua;
  sinhvienModel.findByIdAndRemove(id2, function (err, dulieu) {
    dulieu.save();
    res.redirect('danhsach')
  })
});
router.get('/diem', function (req, res, next) {
  sinhvienModel.find({}, (err, sinhvien) => {
    monhocModel.find({}, (err, monhoc) => {
      diemModel.find({}, (err, diem) => {
        res.render('diem', {
          title: 'Them diem',
          sinhvien: sinhvien,
          monhoc: monhoc,
          diem: diem,
        });
      })
    })
  })
})
router.get('/monhoc', function (req, res, next) {
  monhocModel.find({}, (err, dulieu) => {
    res.render('monhoc', {
      data: dulieu
    })
  })
})
router.get('/dsdiem', function (req, res, next) {
  monhocModel.find({}, (err, dulieu) => {
    res.render('dsdiem', {
      monhoc: dulieu
    })
  })
})
router.get('/themdiem:idmonhoc', function (req, res, next) {
  var idmonhoc = req.params.idmonhoc
  monhocModel.find({maMH:idmonhoc}, (err, monhoc) => {
    sinhvienModel.find({}, (err, sinhvien) => {
      diemModel.find({}, (err, diem) => {
        res.render('themdiem', {
          monhoc: monhoc,
          sinhvien: sinhvien,
          diem: diem,
          idmonhoc: idmonhoc,
        })
      })
    })
    console.log(monhoc)
  })
  
})
router.get('/sinhvien/:masinhvien/:maMH/:soTC', function (req, res, next) {
  var masinhvien = req.params.masinhvien
  res.render('sinhvien', {
    masinhvien: masinhvien
  })

})
router.post('/sinhvien/:masinhvien/:maMH/:soTC', function (req, res, next) {
  var masinhvien = req.params.masinhvien;
  var maMH = req.params.maMH;
  var soTC = req.params.soTC;
  var tb = (parseInt(req.body.chuyencan) * 0.1 + parseInt(req.body.giuaki) * 0.2 + parseInt(req.body.cuoiki) * 0.7)
  var diemtb = Math.round(tb * 1000) / 1000
  var dulieu01 = {
    "maSV": masinhvien,
    "maMH": maMH,
    "soTC": soTC,
    "chuyencan": req.body.chuyencan,
    "giuaki": req.body.giuaki,
    "cuoiki": req.body.cuoiki,
    "tb": diemtb
  }
  var data = new diemModel(dulieu01);
  data.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });
  res.redirect(`/themdiem${maMH}`)
})
router.get('/suadiem/:masinhvien/:maMH/:soTC', function (req, res, next) {
  var masinhvien = req.params.masinhvien
  var maMH = req.params.maMH
  diemModel.find({ maSV: masinhvien, maMH: maMH }, (err, diem) => {
    res.render('suadiem', {
      diem: diem,
    })
  })
})
router.post('/suadiem/:masinhvien/:maMH/:soTC', function (req, res, next) {
  var masinhvien = req.params.masinhvien
  var maMH = req.params.maMH
  var tb = (parseInt(req.body.chuyencan) * 0.1 + parseInt(req.body.giuaki) * 0.2 + parseInt(req.body.cuoiki) * 0.7)
  var diemtb = Math.round(tb * 1000) / 1000
  var dulieu01 = {
    "chuyencan": req.body.chuyencan,
    "giuaki": req.body.giuaki,
    "cuoiki": req.body.cuoiki,
    "tb": diemtb
  }
  diemModel.findOneAndUpdate({ maSV: masinhvien, maMH: maMH }, dulieu01, (err, diem) => {
    if (err) {
      console.log("Something wrong when updating data!");
  }
  })
  res.redirect(`/themdiem${maMH}`)
})
module.exports = router;
