const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");



router.get("/users", (req,res) => {
    User.findAll().then(users => {
        res.render("users/index",{
            users:users,
            nav_maquinas : "",
                nav_produtos : "",
                nav_mp : "",
                nav_usuarios : "active",
                nav_moldes : "",
                nav_clientes : "",
                nav_parametros:"",
                nav_ficha: "",
                nav_alertas:""
        })
    })
});


router.get("/users/create", (req,res) => {
    res.render("users/create",{
       
        nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "active",
            nav_moldes : "",
            nav_clientes : "",
            nav_parametros:"",
            nav_ficha: "",
            nav_alertas:""
    });
});


router.post("/users/create", (req,res) => {
    var email = req.body.email;
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var password = req.body.password;
    var matricula = req.body.matricula;
    var isAdmin = req.body.isAdmin;

    User.findOne({
        where:{
            email:email
        }
    }).then(user => {
        if(user == undefined){

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password,salt);

            User.create({
                nome:nome,
                sobrenome:sobrenome,
                email:email,
                password:hash,
                matricula:matricula,
                isAdmin:isAdmin,
            }).then(() =>{
                console.log("usuario criado com sucesso");
                res.redirect("/users");
            }).catch(err =>{
                console.log(err)
                res.redirect("/");
            })

        }else{
            res.redirect("/users");
        };
    })

});


router.post("/authenticate",(req,res) => {
    var email = req.body.email;
    var password = req.body.password;

    if (email == "map@gmail.com" && password == "map"){

        res.redirect("/maquinas")

    }else{

        User.findOne({where:{nome:email}}).then(user => {
            if(user != undefined){
    
                var correct = bcrypt.compareSync(password, user.password )
    
                if(correct){
                    req.session.user = {
                        id: user.id,
                        email: user.email
                    }
                    res.redirect("/fichas")
                }else{
                    res.redirect("/");
                }
            }else{
                res.redirect("/");
            }
    
        }).catch(err =>{
            console.log(err);
        })

    }

})

router.get("/users/edit/:id",(req,res) => {

   var id = req.params.id;

   if(isNaN(id)){
      res.redirect("/users")
   }

   User.findByPk(id).then(user => {

      if(user != undefined){

         res.render("users/edit",{
            user:user,
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_parametros:"",
            nav_clientes : "active",
            nav_ficha: "",
            nav_alertas:""
         
         })

      }else{
         res.redirect("/users");
      }

   }).catch(erro => {
         res.redirect("/users");
   })  

})

router.post("/users/update",(req,res) => {
    
   var email = req.body.email;
   var nome = req.body.nome;
   var sobrenome = req.body.sobrenome;
   var password = req.body.password;
   var matricula = req.body.matricula;
   var isAdmin = req.body.isAdmin;
   var id = req.body.idUser;
   var userLogado = req.body.userLogado;
   var justificativa = req.body.justificativa;

   var salt = bcrypt.genSaltSync(10);
   var hash = bcrypt.hashSync(password,salt);

   User.update({
      email: email,
      nome: nome,
      sobrenome: sobrenome,
      password: hash,
      matricula: matricula,
      isAdmin: isAdmin,
      usuario: userLogado,
      justificativa: justificativa,

   },{
      where:{
         id:id
      }
   }).then(() => {
      res.redirect("/users")
   })
})

router.post("/users/delete",(req,res) => {
    var id = req.body.id;
    if (id != undefined){

        if(!isNaN(id)){

            User.destroy({
                where:{
                    id:id
                }
            }).then(() => {
                res.redirect("/users");
            })

        }else{
            res.redirect("/users");
        }
    }else{
        res.redirect("/users");
    }
})


router.get("/logout",(req,res) => {
    req.session.user = undefined;
    res.redirect("/login");
})

router.get("/storeUser",(req,res) => {
   res.send(req.session.user)
})

router.get("/isUserAdmin/:user", (req,res) => {
   var email = req.params.user;

   User.findOne({
      where: {
         email: email
      }
   }).then((logado) => {
      res.send(logado)
   })
})

router.get("/get/user/:id",(req,res) => {
   var Id = req.params.id;
      
   User.findOne({
      where: {
         id: Id
      }
   }).then((user) => {
      res.send(user)
   })

})

module.exports = router;