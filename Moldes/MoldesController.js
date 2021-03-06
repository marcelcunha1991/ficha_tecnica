const express = require("express");
const router = express.Router();
const Moldes = require("./Moldes");
const adminAuth = require("../middlewares/adminAuth");
const { render } = require("ejs");


router.get("/moldes",  (req,res) => {

    Moldes.findAll().then(moldes => {
        res.render("moldes/index",{
            moldes:moldes,
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "active",
            nav_parametros:"",
            nav_clientes : "",
            nav_ficha: "",
            nav_alertas:""
        })
    });

    
})


router.get("/moldes/new",  (req,res) => {


    Moldes.findAll().then(moldes => {
        res.render("moldes/new",{            
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "active",
            nav_clientes : "",
            nav_ficha: "",
            nav_alertas:""
        })
    });

    
})

router.post("/moldes/create",(req,res) => {
    var descricao = req.body.descricao;
    var codigo = req.body.codigo;    

    Moldes.create({
        descricao:descricao,
        codigo: codigo,
 
    }).then(() => {
        res.redirect("/moldes");
    })
})


router.get("/moldes/edit/:id",(req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/moldes")
    }

    Moldes.findByPk(id).then(molde => {

        if(molde != undefined){

            res.render("moldes/edit",{
                molde:molde,
                nav_maquinas : "",
                nav_produtos : "",
                nav_mp : "",
                nav_usuarios : "",
                nav_moldes : "active",
                nav_clientes : "",
                nav_ficha: "",
                nav_alertas:""
              
            })

        }else{
            res.redirect("/moldes");
        }

    }).catch(erro => {
        res.redirect("/moldes");
    })  

})


router.post("/moldes/update",(req,res) => {
    
    var descricao = req.body.descricao;
    var codigo = req.body.codigo;
    var id = req.body.id;

    Moldes.update({
        descricao:descricao,
        codigo: codigo,
 
    },{
        where:{
            id:id
        }
    }).then(() => {
        res.redirect("/moldes")
    })
})


router.post("/moldes/delete",(req,res) => {
    var id = req.body.id;
    if (id != undefined){

        if(!isNaN(id)){

            Moldes.destroy({
                where:{
                    id:id
                }
            }).then(() => {
                res.redirect("/moldes");
            })

        }else{
            res.redirect("/moldes");
        }
    }else{
        res.redirect("/moldes");
    }
})




module.exports = router;
