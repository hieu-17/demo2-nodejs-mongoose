const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var objectId = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';

const dbName = 'data';

module.exports.index = function (req, res, next) {
    res.render('index'
    );
}
module.exports.danhsach = (req, res, next) => {
    const findDocuments = function (db, callback) {
        const collection = db.collection('sinhvien');
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
           
            callback(docs);
        });
    }
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        findDocuments(db, function (dulieu) {
            res.render('danhsach', {
                title: 'Danh sách sinh viên',
                data: dulieu
            })
            client.close();
        });
    });

}
module.exports.them = (req, res, next) => {
    const findDocuments = function (db, callback) {
        const collection = db.collection('lop');
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            
            callback(docs);
        });
    }
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        findDocuments(db, function (dulieu) {
            res.render('them', {
                title: 'Thêm Sinh viên',
                data: dulieu
            })
            client.close();
        });
    });

}
module.exports.postThem = (req, res, next) => {
    var dulieu01 = {
        "ten": req.body.ten,
        "masinhvien": req.body.masinhvien,
        "lop": req.body.lop,
        "diachi": req.body.diachi,
        "email": req.body.email,
        "ngaysinh": req.body.ngaysinh,
        "sdt": req.body.sdt,
    }


    const insertDocuments = function (db, callback) {
        const collection = db.collection('sinhvien');
        collection.insert(dulieu01, function (err, result) {
            
            callback(result);
        });
    }
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
      
        const db = client.db(dbName);
        insertDocuments(db, function () {
            client.close();
        });
    });
    res.redirect("/danhsach")
}
module.exports.xoa = (req, res, next) => {
    var idcanxoa = objectId(req.params.idcanxoa);
    // ham xoa
    const removeDocument = function (db, callback) {
        const collection = db.collection('sinhvien');
        collection.deleteOne({
            _id: idcanxoa
        }, function (err, result) {
            assert.equal(err, null);
            
            callback(result);
        });
    }
    // ket noi server
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        
        const db = client.db(dbName);
        removeDocument(db, function () {
            client.close();
            res.redirect('/danhsach')
        });
    });
}
module.exports.sua = (req, res, next) => {
    var idcansua = objectId(req.params.idcansua);
    const findDocuments = function (db, callback) {
        const collection = db.collection('sinhvien');
        collection.find({
            _id: idcansua
        }).toArray(function (err, docs) {
            assert.equal(err, null);
            
            callback(docs);
        });
    }
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        findDocuments(db, function (dulieu) {
            res.render('sua', {
                title: 'Sửa thông tin sinh viên',
                data: dulieu
            })
            
            client.close();
        });
    });
}
module.exports.postSua = (req, res, next) => {
    var idcansua = objectId(req.params.idcansua);
    var dulieu01 = {
        "ten": req.body.ten,
        "masinhvien": req.body.masinhvien,
        "lop": req.body.lop,
        "diachi": req.body.diachi,
        "gioitinh": req.body.gioitinh,
        "diem": req.body.diem,
    }
    //ham update
    const updateDocument = function (db, callback) {
        const collection = db.collection('sinhvien');
        collection.updateOne({
            _id: idcansua
        }, {
            $set: dulieu01
        }, function (err, result) {
            assert.equal(err, null);
            
            callback(result);
        });
    }
    // ket noi server
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);

        const db = client.db(dbName);
        updateDocument(db, function () {
            client.close();
            res.redirect('/danhsach')
        });
    });
}
module.exports.diem = (req, res, next) => {
    const sinhvien = function (db, callback) {
        const collection1 = db.collection('sinhvien');
        collection1.find({}).toArray(function (err, docs) {
            callback(docs);
        });

    }
    const monhoc = function (db, callback) {
        const collection3 = db.collection('monhoc');
        collection3.find({}).toArray(function (err, docs) {
            callback(docs);
        });

    }
    const diem = function (db, callback) {
        const collection2 = db.collection('diem');
        collection2.find({}).toArray(function (err, docs) {
            callback(docs);
        });
    }

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        sinhvien(db, function (sinhvien) {
            monhoc(db, function (monhoc) {
                diem(db, function (diem) {
                    res.render('diem', {
                        title: 'Danh sách Điểm',
                        sinhvien: sinhvien,
                        diem: diem,
                        monhoc: monhoc,
                    })
                });
            });
        });

    });
}



module.exports.monhoc = (req, res, next) => {
    const findDocuments = function (db, callback) {
        const collection = db.collection('monhoc');
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            callback(docs);
        });
    }
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        findDocuments(db, function (dulieu) {
            res.render('monhoc', {
                title: 'Danh sách Môn học',
                data: dulieu
            })
            client.close();
        });
    });

}
// module.exports.suadiem = (req, res, next) => {
//     idcansua = req.params.idcansua
//     console.log(idcansua);
//     const findDocuments1 = function (db, callback) {
//         const collection1 = db.collection('sinhvien');
//         collection1.find({
//             masinhvien: idcansua
//         }).toArray(function (err, docs) {      
//             callback(docs);
//         });
//     }
//     const findDocuments2 = function (db, callback) {
//         const collection2 = db.collection('diem');
//         collection2.find({
//             maSV: idcansua
//         }).toArray(function (err, docs) {      
//             callback(docs);
//         });
//     }
//     MongoClient.connect(url, function (err, client) {
//         assert.equal(null, err);
//         const db = client.db(dbName);
//         findDocuments1(db, function (sinhvien) {
//             findDocuments2(db, function (diem) {
//             res.render('suadiem', {
//                 title: 'Sửa diem sinh viên',
//                 data1: sinhvien,
//                 data2: diem,
//             })
            
//             client.close();
//         });
//         });
//     });
// }
// module.exports.postSuadiem = (req, res, next) => {
//     var idcansua = req.params.idcansua;
//     var dulieu01 = {
//         "DTCS": req.body.DTCS,
//         "LTUD": req.body.LTUD,
//         "HTVT": req.body.HTVT,
//         "LTVM": req.body.LTVM,
//         "KTCM": req.body.KTCM,
//         "DLCM": req.body.DLCM,
//         "TKMS": req.body.TKMS,
//     }
//     //ham update
//     const updateDocument = function (db, callback) {
//         const collection = db.collection('diem');
//         collection.updateOne({
//             maSV: idcansua
//         }, {
//             $set: dulieu01
//         }, function (err, result) {
//             assert.equal(err, null);
//             console.log("Updated the document with the field a equal to 2");
//             callback(result);
//         });
//     }
//     // ket noi server
//     MongoClient.connect(url, function (err, client) {
//         assert.equal(null, err);
//         console.log("Connected successfully to server");
//         const db = client.db(dbName);
//         updateDocument(db, function () {
//             client.close();
//             res.redirect('/diem')
//         });
//     });
// }
module.exports.dsdiem = (req, res, next) => {
    const findDocuments = function(db, callback) {
        const collection = db.collection('monhoc');
        collection.find({}).toArray(function(err, docs) {
          callback(docs);
        });
      }

    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        findDocuments(db, function (dulieu) {
            res.render('dsdiem', {
                title: 'Thêm Điểm sinh viên',
                monhoc: dulieu,
            })
            client.close();
        });
    });

}
module.exports.themdiem = (req, res, next) => {
    var idmonhoc = req.params.idmonhoc
    const findDocuments = function(db, callback) {
        const collection = db.collection('monhoc');
        collection.find({'maMH':idmonhoc}).toArray(function(err, docs) {
          callback(docs);
        });
      }
    const findDocuments1 = function(db, callback) {
        const collection1 = db.collection('sinhvien');
        collection1.find({}).toArray(function(err, docs) {
          callback(docs);
        });
      }
    const findDocuments2 = function(db, callback) {
        const collection2 = db.collection('diem');
        collection2.find({}).toArray(function(err, docs) {
          callback(docs);
        });
      }

    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        findDocuments(db, function (monhoc) {
            findDocuments1(db, function (sinhvien) {
                findDocuments2(db, function (diem) {
                    res.render('themdiem', {
                        title: 'Thêm Điểm sinh viên',
                        monhoc: monhoc,
                        sinhvien:sinhvien,
                        diem : diem,
                        idmonhoc : idmonhoc,
                
            })
            client.close();

        });
        });
        });
    });

}
module.exports.sinhvien = (req, res, next) => {
    var masinhvien = req.params.masinhvien
    res.render('sinhvien',{
        masinhvien:masinhvien
    })

}
module.exports.postSinhvien = (req, res, next) => {
    var masinhvien = req.params.masinhvien;
    var maMH = req.params.maMH;
    var soTC = req.params.soTC;
    var tb = (parseInt(req.body.chuyencan)*0.1 + parseInt(req.body.giuaki)*0.2 + parseInt(req.body.cuoiki)*0.7)
    var diemtb = Math.round(tb * 1000)/1000
    var dulieu01 = {
        "maSV": masinhvien,
        "maMH": maMH,
        "soTC": soTC,
        "chuyencan": req.body.chuyencan,
        "giuaki": req.body.giuaki,
        "cuoiki": req.body.cuoiki,
        "tb": diemtb
    }


    const insertDocuments = function (db, callback) {
        const collection = db.collection('diem');
        collection.insert(dulieu01, function (err, result) {
            callback(result);
        });
    }
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        insertDocuments(db, function () {
            client.close();
        });
        res.redirect('/themdiem'+maMH)
    });
    
}

module.exports.suadiem = (req, res, next) => {
   var masinhvien = req.params.masinhvien
   var maMH = req.params.maMH
    const findDocuments = function(db, callback) {
        const collection = db.collection('diem');
        collection.find({'maSV':masinhvien,'maMH':maMH}).toArray(function(err, docs) {
          callback(docs);
        });
      }
      MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        findDocuments(db, function (diem) {
            
                    res.render('suadiem', {
                        title: 'Sửa điểm',
                        diem : diem
                
            })
            client.close();

      
        });
    });

}
module.exports.postSuadiem = (req, res, next) => {
    var masinhvien = req.params.masinhvien
    var maMH = req.params.maMH
    var tb = (parseInt(req.body.chuyencan)*0.1 + parseInt(req.body.giuaki)*0.2 + parseInt(req.body.cuoiki)*0.7)
    var diemtb = Math.round(tb * 1000)/1000
    var dulieu01 = {
        "chuyencan": req.body.chuyencan,
        "giuaki": req.body.giuaki,
        "cuoiki": req.body.cuoiki,
        "tb":diemtb
    }
    //ham update
    const updateDocument = function (db, callback) {
        const collection = db.collection('diem');
        collection.updateOne({
            maSV: masinhvien,
            maMH: maMH
        }, {
            $set: dulieu01
        }, function (err, result) {
            assert.equal(err, null);
            
            callback(result);
        });
    }
    // ket noi server
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);

        const db = client.db(dbName);
        updateDocument(db, function () {
            client.close();
            res.redirect('/themdiem'+maMH)
        });
    });
}