const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var objectId = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';

const dbName = 'data';

module.exports.login = (req,res)=>{
    res.render('auth/login')
}
module.exports.postLogin = (req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    const findDocuments = function (db, callback) {
        const collection = db.collection('users');
        collection.find({'email':email,'password':password}).toArray(function (err, docs) {
            callback(docs);
        });
    }
    console.log(docs)
    // MongoClient.connect(url, function (err, client) {
    //     assert.equal(null, err);
    //     const db = client.db(dbName);
    //     findDocuments(db, function (dulieu) {
    //         res.render('danhsach', {
    //             title: 'Danh sách sinh viên',
    //             data: dulieu
    //         })
    //         client.close();
    //     });
    // });
}