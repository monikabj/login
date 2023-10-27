var crypto=require("crypto");

function generarPassword(password){
    var salt=crypto.randomBytes(32);
    var hash=crypto.scryptSync(password,salt,10000,64,'sha512').toString("hex");
    return{
        salt,
        hash
    }
}

generarPassword("HOliis")

function validarPassword(password,hash,salt ){
    var hashValidar=crypto.scryptSync(password,salt,10000,64,'sha512').toString("hex");
    return hashValidar===hash

}

function autorizado(req,res,siguiente){
    console.log("usuario autorizado");
    if(req.session.usuario || req.session.admin){
        siguiente();
    }
    else{
        res.redirect("/login");
    }
    
}

function admin(req,res,siguiente){
    console.log("administrador autorizado");
    if(req.session.admin){
    siguiente();
    }
    else{
        if(req.session.usuario){
            res.redirect("/")
        }
        else{
            res.redirect("/login");
        }
    }
}



module.exports={
    generarPassword,
    validarPassword,
    autorizado,
    admin
}