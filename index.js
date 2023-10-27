var express=require("express");
var cors= require("cors");
var session=require("cookie-session");
var usuariosRutas=require("./rutas/usuarioRutas");
var productosRutas=require("./rutas/productoRutas");
var usuarioRutasApi=require("./rutas/usuarioRutasApi");
var productosRutasApi=require("./rutas/productoRutasApi")
require("dotenv").config();


var express=require("express"); 
var path=require("path");
var cors=require("cors");
var productosRutas=require("./rutas/productoRutas");
var usuariosRutas=require("./rutas/usuarioRutas");
var usuarioRutasApi=require("./rutas/usuarioRutasApi");
var productosRutasApi=require("./rutas/productoRutasApi")
const exp = require("constants");


var app=express();
app.set("view engine","ejs");
app.use(cors());
app.use(session({
name:"session",
keys:["jiminujfe"],
maxAge:24*60*60*1000
}));
app.use(express.urlencoded({extended:true}));
app.use("/",express.static(path.join(__dirname,"/web")));
app.use("/",usuariosRutas);
app.use("/productos",productosRutas);
app.use("/productos",productosRutasApi);
app.use("/",usuarioRutasApi);

var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port);
})