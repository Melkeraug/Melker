var Mongoclient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

Mongoclient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [
        { name: 'Company Inc', address: 'Highway 37' },
        { name: 'Dab', address: 'Dabstreet1337'},
        { name: 'Whip', address: 'Whip st 88'}
    ];
    dbo.collection("customers").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });
});