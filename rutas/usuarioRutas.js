var ruta=require("express").Router();
var {subirArchivo}=require("../middler/middlerware");
var {autorizado}=require("../middler/password");
var{mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarporID, borrarUsuario,login}=require("../bd/usuarioBD");
const Usuario = require("../modelos/Usuario");

ruta.get("/",autorizado,async(req,res)=>{
  var usuarios =  await mostrarUsuarios();
  //console.log(usuarios);
  res.render("usuarios/mostrar",{usuarios})
});


ruta.get("/nuevousuario",(req,res)=>{
  res.render("usuarios/nuevo");
});


ruta.post("/nuevousuario",subirArchivo(),async(req,res)=>{
  req.body.foto=req.file.filename;
  //console.log(req.file);
  var error=await nuevoUsuario(req.body);
 // res.end();
  res.redirect("/");
});

ruta.get("/editarUsuario/:id",async(req,res)=>{
  var user=req.params.id;
  var user = await buscarporID(req.params.id);
  res.render("usuarios/modificar",{user});
  //res.end();
});

ruta.post("/editarUsuario",subirArchivo(), async(req,res)=>{
  console.log(req.file);
  if(req.file!=undefined){
    req.body.foto=req.file.filename;
  }
  else{
    req.body.foto=req.body.fotoAnterior;
  }
 var error=await modificarUsuario(req.body);
  res.redirect("/");
});

ruta.get("/borrarUsuario/:id", async(req,res)=>{
  try{
    await borrarUsuario(req.params.id)
    res.redirect("/");
  }
  catch(err){
    console.log("Error al borrar usuario" +err);
  }
});

ruta.get("/login",async(req,res)=>{
  res.render("usuarios/login");
})

ruta.post("/login",async(req,res)=>{
  var user=await login(req.body);
  if(user==undefined){
     res.redirect("/login");
  }
  else{
     if(user.admin){
        console.log("Administrador");
      req.session.admin=req.body.usuario;
        res.redirect("/nuevoProducto");
     }
     else{
        console.log("Usuario");
        req.session.usuario=req.body.usuario;
        res.redirect("/");
     }
  }
   });

   ruta.get("/logout",(req,res)=>{
    req.session=null;
    res.redirect("/login");

   })

module.exports=ruta;