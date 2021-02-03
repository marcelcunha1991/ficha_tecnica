const express = require("express");
const router = express.Router();
const Alertas = require("./Alertas");
const { render } = require("ejs");
var Tipo = require("../Tipo/Tipo");


router.get("/alertas",  (req,res) => {
    

    Alertas.findAll({
        include: [{
          model: Tipo,
          required: true
         }]
      }).then(alertas => {

        console.log(alertas);
        res.render("alertas/index",{
            alertas:alertas,
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_parametros:"",
            nav_clientes : "",
            nav_ficha: "",
            nav_alertas:"active"
        })
    });

    
})


router.get("/alertas/new",  (req,res) => {


    var tipos;
    Tipo.findAll().then(tipos_ => {
        tipos = tipos_;
    })


    Alertas.findAll().then(alerta => {
        res.render("alertas/new",{      
            tipos:tipos,      
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_parametros:"",
            nav_ficha: "",
            nav_alertas:"active"
        })
    });
    
})


router.post("/alertas/create",(req,res) => {

    var descricao = req.body.descricao;
    var codigo = req.body.codigo;  
    var tipo = req.body.tipos;
    

    Alertas.create({
        descricao:descricao,
        codigo: codigo,
        tipoId:tipo
       
    }).then(result => {
        res.redirect("/alertas");
    })
})


router.get("/alertas/edit/:id",(req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/alertas")
    }

    Alertas.findByPk(id).then(alerta => {

        if(alerta != undefined){

            res.render("alertas/edit",{
                alerta:alerta,
                nav_maquinas : "",
                nav_produtos : "",
                nav_mp : "",
                nav_usuarios : "",
                nav_moldes : "",
                nav_parametros:"",
                nav_clientes : "",
                nav_ficha: "",
                nav_alertas:"active"
              
            })

        }else{
            res.redirect("/alertas");
        }

    }).catch(erro => {
        res.redirect("/alertas");
    })  

})


router.post("/alertas/update",(req,res) => {
    
    var descricao = req.body.descricao;
    var codigo = req.body.codigo;
    var id = req.body.id;

    Alertas.update({
        descricao:descricao,
        codigo: codigo
    },{
        where:{
            id:id
        }
    }).then(() => {
        res.redirect("/alertas")
    })
})


router.post("/alertas/delete",(req,res) => {
    var id = req.body.id;
    if (id != undefined){

        if(!isNaN(id)){

            Alertas.destroy({
                where:{
                    id:id
                }
            }).then(() => {
                res.redirect("/alertas");
            })

        }else{
            res.redirect("/alertas");
        }
    }else{
        res.redirect("/alertas");
    }
})


router.get("/listaAlertas",(req,res) => {

    Alertas.findAll().then(alertas => {
        res.json({alertas: alertas})
    })

})


module.exports = router;