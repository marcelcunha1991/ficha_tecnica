const express = require("express");
const router = express.Router();
const Maquinas = require("./Maquinas");
const adminAuth = require("../middlewares/adminAuth");
const { render } = require("ejs");


router.get("/maquinas",  (req,res) => {



    Maquinas.findAll().then(maquinas => {
        res.render("maquinas/index",{
            maquinas:maquinas,
            nav_maquinas : "active",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_parametros:"",
            nav_ficha: ""
        })
    });

    
})


router.get("/maquinas/new",  (req,res) => {


    Maquinas.findAll().then(maquinas => {
        res.render("maquinas/new",{            
            nav_maquinas : "active",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_parametros:"",
            nav_ficha: ""
        })
    });

    
})

router.post("/maquinas/create",(req,res) => {
    var descricao = req.body.cliente;
    var codigo = req.body.codigo;
    var mac = req.body.mac;
    var peso = req.body.peso;
    var modelo = req.body.modelo;
    

    Maquinas.create({
        descricao:descricao,
        codigo: codigo,
        mac:mac,
        peso:peso,
        modelo: modelo
    }).then(() => {
        res.redirect("/maquinas");
    })
})


router.get("/maquinas/edit/:id",(req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/maquinas")
    }

    Maquinas.findByPk(id).then(maquina => {

        if(maquina != undefined){

            res.render("maquinas/edit",{
                maquina:maquina,
                nav_maquinas : "active",
                nav_produtos : "",
                nav_mp : "",
                nav_usuarios : "",
                nav_moldes : "",
                nav_parametros:"",
                nav_clientes : "",
                nav_ficha: ""
              
            })

        }else{
            res.redirect("/maquinas");
        }

    }).catch(erro => {
        res.redirect("/maquinas");
    })  

})


router.post("/maquinas/update",(req,res) => {
    
    var descricao = req.body.descricao;
    var codigo = req.body.codigo;
    var peso = req.body.peso;
    var modelo = req.body.modelo;
    var id = req.body.id;

    Maquinas.update({
        descricao:descricao,
        codigo: codigo,
        peso:peso,
        modelo: modelo
    },{
        where:{
            id:id
        }
    }).then(() => {
        res.redirect("/maquinas")
    })
})


router.post("/maquinas/delete",(req,res) => {
    var id = req.body.id;
    if (id != undefined){

        if(!isNaN(id)){

            Maquinas.destroy({
                where:{
                    id:id
                }
            }).then(() => {
                res.redirect("/maquinas");
            })

        }else{
            res.redirect("/maquinas");
        }
    }else{
        res.redirect("/maquinas");
    }
})


router.get("/listaMaquinas",(req,res) => {

    Maquinas.findAll().then(maquinas => {
        res.json({maquinas: maquinas})
    })

})


module.exports = router;
