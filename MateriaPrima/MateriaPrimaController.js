const express = require("express");
const router = express.Router();
const MateriasPrimas = require("./MateriasPrimas");
const adminAuth = require("../middlewares/adminAuth");
const { render } = require("ejs");


router.get("/materiaprima",  (req,res) => {

    MateriasPrimas.findAll().then(materiaprima => {
        res.render("materiaprima/index",{
            materiaprima:materiaprima,
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "active",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_ficha: ""
        })
    });

    
})


router.get("/materiaprima/new",  (req,res) => {


    MateriasPrimas.findAll().then(e => {
        res.render("materiaprima/new",{            
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "active",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_ficha: ""
        })
    });

    
})

router.post("/materiaprima/create",(req,res) => {
    var descricao = req.body.descricao;
    var codigo = req.body.codigo;    

    MateriasPrimas.create({
        descricao:descricao,
        codigo: codigo,
 
    }).then(() => {
        res.redirect("/materiaprima");
    })
})


router.get("/materiaprima/edit/:id",(req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/materiaprima")
    }

    MateriasPrimas.findByPk(id).then(materiaprima => {

        if(materiaprima != undefined){

            res.render("materiaprima/edit",{
                materiaprima:materiaprima,
                nav_maquinas : "",
                nav_produtos : "active",
                nav_mp : "",
                nav_usuarios : "",
                nav_moldes : "",
                nav_clientes : "",
                nav_ficha: ""
              
            })

        }else{
            res.redirect("/materiaprima");
        }

    }).catch(erro => {
        res.redirect("/materiaprima");
    })  

})


router.post("/materiaprima/update",(req,res) => {
    
    var descricao = req.body.descricao;
    var codigo = req.body.codigo;
    var id = req.body.id;

    MateriasPrimas.update({
        descricao:descricao,
        codigo: codigo,
 
    },{
        where:{
            id:id
        }
    }).then(() => {
        res.redirect("/materiaprima")
    })
})


router.post("/materiaprima/delete",(req,res) => {
    var id = req.body.id;
    if (id != undefined){

        if(!isNaN(id)){

            MateriasPrimas.destroy({
                where:{
                    id:id
                }
            }).then(() => {
                res.redirect("/materiaprima");
            })

        }else{
            res.redirect("/materiaprima");
        }
    }else{
        res.redirect("/materiaprima");
    }
})




module.exports = router;
