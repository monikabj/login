var conexion=require("./conexion").conexionproductos;
var fs=require("fs");
var Producto=require("../modelos/Productos");


 async function mostrarProductos(){
   var products=[];
   try{
     var productos=await conexion.get();
     productos.forEach((producto)=>{
        //var producto1=new Producto
        var producto1=new Producto(producto.id,producto.data());
        if(producto1.bandera==0){
         products.push(producto1.obtenerProducto);
        }
     });
}
catch(err){
   console.log("Error al obtener los productos de firebase"+err);
   products.push(null);
}
return products;
 }


 async function buscarporID(id){
   var product;
   try{
var productobd=await conexion.doc(id).get();
var productoObjeto=new Producto(productobd.id,productobd.data());
//console.log(productoObjeto);
if (productoObjeto.bandera==0){
    product=productoObjeto.obtenerProducto;
}
   }
   catch(err){
console.log("Error al buscar producto"+err);
product = null;
   }
   //console.log(product);
   return product;
 }

 async function nuevoProducto(datos){
   var producto =new Producto(null,datos);
   var error=1;
   if(producto.bandera==0){
      try{
         console.log(producto.obtenerProducto)
         var e=await conexion.doc().set(producto.obtenerProducto);
         console.log("producto resgitrado correctamente");
         console.log(e);
         error=0;
      }
      catch(err){
         console.log("Error al registrar al producto"+err);
      }
   }
   return error;
 }

 async function modificarProducto(datos){
   var producto=new Producto(datos.id,datos);
   var error=1;
   if (producto.bandera==0){
      try{
         await conexion.doc(producto.id).set(producto.obtenerProducto)
         console.log("producto actualizado correctamente");
         error=0;

      }
      catch(err){
         console.log("Error al modificar el producto"+err);
      }
   }
   else{
      console.log("Los datos no son correctos");
   }
   
   return error;

 }

 async function borrarProducto(id){
   var error=1;
   try{
      await conexion.doc(id).delete();
      console.log("Producto borrar");
      error=0;

   }
   catch(err){
      console.log("Error al borrar al producto"+err);
   }
   return error;
 }

module.exports={
   mostrarProductos,
   buscarporID,
   nuevoProducto,
   modificarProducto,
   borrarProducto
}