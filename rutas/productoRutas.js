var ruta=require("express").Router();
var {subirArchivo}=require("../middler/middlerware");
var {autorizado,admin}=require("../middler/password");
var{mostrarProductos, nuevoProducto, modificarProducto, buscarporID, borrarProducto}=require("../bd/productoBD");
const Producto = require("../modelos/Productos");

ruta.get("/productos",async(req,res)=>{
  var productos =  await mostrarProductos();
  console.log(productos);
  res.render("productos/mostrar",{productos})
});

ruta.get("/nuevoproducto",admin, async(req,res)=>{
  res.render("productos/nuevo");
});

ruta.post("/nuevoproducto",subirArchivo(),async(req,res)=>{
  var error=await nuevoProducto(req.body);
  res.redirect("/productos/productos");
});

ruta.get("/editarProducto/:id",async(req,res)=>{
  //console.log(req.params.id);
  var producto=req.params.id;
  var producto = await buscarporID(req.params.id);
  //console.log(user);
  res.render("productos/modificar",{producto});
  //res.end();
});

ruta.post("/editarProducto", async(req,res)=>{
 var error=await modificarProducto(req.body);
  res.redirect("/productos/productos");
});

ruta.get("/borrarProducto/:id", async(req,res)=>{
  try{
    await borrarProducto(req.params.id)
    res.redirect("/productos/productos");
  }
  catch(err){
    console.log("Error al borrar Producto" +err);
  }
});

module.exports=ruta;