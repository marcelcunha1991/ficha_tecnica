const express = require("express");
const router = express.Router();
const Fichas = require("./Ficha");
const adminAuth = require("../middlewares/adminAuth");
const { render } = require("ejs");


router.get("/fichas",  (req,res) => {



    Fichas.findAll().then(fichas => {
        res.render("fichas/index",{
            fichas:fichas,
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_ficha: "active"
        })
    });

    
})


router.get("/fichas/new",  (req,res) => {


    Fichas.findAll().then(maquinas => {
        res.render("fichas/new",{            
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_ficha: "active"
        })
    });

    
})

router.post("/fichas/create",(req,res) => {
    var descricao = req.body.descricao;
    var codigo = req.body.codigo;
    var peso = req.body.peso;
    var modelo = req.body.modelo;
    

    Fichas.create({
        descricao:descricao,
        codigo: codigo,
        peso:peso,
        modelo: modelo
    }).then(() => {
        res.redirect("/fichas");
    })
})


router.get("/fichas/edit/:id",(req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/fichas")
    }

    Fichas.findByPk(id).then(ficha => {

        if(ficha != undefined){

            res.render("fichas/edit",{
                ficha:ficha,
                nav_maquinas : "",
                nav_produtos : "",
                nav_mp : "",
                nav_usuarios : "",
                nav_moldes : "",
                nav_clientes : "",
                nav_ficha: "active"
              
            })

        }else{
            res.redirect("/fichas");
        }

    }).catch(erro => {
        res.redirect("/fichas");
    })  

})


router.post("/fichas/update",(req,res) => {
    
    var descricao = req.body.descricao;
    var codigo = req.body.codigo;
    var peso = req.body.peso;
    var modelo = req.body.modelo;
    var id = req.body.id;

    Fichas.update({
        descricao:descricao,
        codigo: codigo,
        peso:peso,
        modelo: modelo
    },{
        where:{
            id:id
        }
    }).then(() => {
        res.redirect("/fichas")
    })
})


router.post("/fichas/delete",(req,res) => {
    var id = req.body.id;
    if (id != undefined){

        if(!isNaN(id)){

            Fichas.destroy({
                where:{
                    id:id
                }
            }).then(() => {
                res.redirect("/fichas");
            })

        }else{
            res.redirect("/fichas");
        }
    }else{
        res.redirect("/fichas");
    }
})


module.exports = router;
