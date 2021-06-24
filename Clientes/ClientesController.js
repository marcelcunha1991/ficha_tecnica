const express = require("express");
const router = express.Router();
const Clientes = require("./Clientes");
const adminAuth = require("../middlewares/adminAuth");
const { render } = require("ejs");


router.get("/clientes",  (req,res) => {

    Clientes.findAll().then(clientes => {
        res.render("clientes/index",{
            clientes:clientes,
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "active",
            nav_ficha: ""
        })
    });

    
})


router.get("/clientes/new",  (req,res) => {


    Clientes.findAll().then(clientes => {
        res.render("clientes/new",{            
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "active",
            nav_ficha: ""
        })
    });

    
})

router.post("/clientes/create",(req,res) => {
    var descricao = req.body.descricao;
    var codigo = req.body.codigo;    

    Clientes.create({
        nome:descricao,
        codigo: codigo,
 
    }).then(() => {
        res.redirect("/clientes");
    })
})


router.get("/clientes/edit/:id",(req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/clientes")
    }

    Clientes.findByPk(id).then(cliente => {

        if(cliente != undefined){

            res.render("clientes/edit",{
                cliente:cliente,
                nav_maquinas : "",
                nav_produtos : "",
                nav_mp : "",
                nav_usuarios : "",
                nav_moldes : "",
                nav_clientes : "active",
                nav_ficha: ""
              
            })

        }else{
            res.redirect("/clientes");
        }

    }).catch(erro => {
        res.redirect("/clientes");
    })  

})


router.post("/clientes/update",(req,res) => {
    
    var nome = req.body.descricao;
    var codigo = req.body.codigo;
    var id = req.body.id;

    Clientes.update({
        nome:nome,
        codigo: codigo,
 
    },{
        where:{
            id:id
        }
    }).then(() => {
        res.redirect("/clientes")
    })
})


router.post("/clientes/delete",(req,res) => {
    var id = req.body.id;
    if (id != undefined){

        if(!isNaN(id)){

            Clientes.destroy({
                where:{
                    id:id
                }
            }).then(() => {
                res.redirect("/clientes");
            })

        }else{
            res.redirect("/clientes");
        }
    }else{
        res.redirect("/clientes");
    }
})




module.exports = router;
