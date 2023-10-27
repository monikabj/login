var ruta=require("express").Router();
var {mostrarUsuarios, nuevoUsuario, buscarporID, modificarUsusario, borrarUsuario}=require("../bd/usuarioBD");
const Usuario = require("../modelos/Usuario");

ruta.get("/api/mostrarusuarios", async (req,res)=>{
    var usuarios = await mostrarUsuarios();
   
   if (usuarios.length==0){
    res.status(400).json("Error al ingresar");
   }else{
    res.status(200).json(usuarios);
   }
    });

ruta.post("/api/nuevoUsuario",async (req,res)=>{
    var error = await nuevoUsuario(req.body);
    console.log(error);
    if(error==0){
    
        res.status(200).json("Usuario registrado correctamente");
    }else{
        res.status(400).json("El usuario no es encontrado");
    }
});

ruta.get("/api/buscarUsuarioPorId/:id",async(req,res)=>{
   // console.log(req.params.id);
   var user = await buscarporID(req.params.id);
   if(user ==""){
    res.status(400).json("Usuario no encontrado");
   }else{
    res.status(200).json(user);
   }
});
ruta.get("/api/borrarUsuario/:id", async(req,res)=>{
var error = await borrarUsuario(req.params.id);
if(error==0){
    res.status(200).json("Eliminado")
}else{
    res.status(400).json("Vularebibisscooby")
}
    
   
});

ruta.post("/api/editarUsuario",async (req,res)=>{
    console.log(req.body);
   
    var error = await modificarUsusario(req.body);
    if(error==0){
        res.status(200).json("Usuario Actualizado correctamente");
    }else{
        res.status(400).json("Tu usuario no esta actualizado");
    }
            
   

});
module.exports=ruta;

