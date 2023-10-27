var admin = require("firebase-admin");
var keys = require("../keys.json");

admin.initializeApp({
    credential: admin.credential.cert(keys)
});

var db=admin.firestore();
var conexion=db.collection("ejemplos");
var conexionproductos=db.collection("productos");

module.exports={
    conexion,
    conexionproductos
};