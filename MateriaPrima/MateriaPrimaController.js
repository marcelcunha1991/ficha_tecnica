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
            nav_parametros:"",
            nav_clientes : "",
            nav_ficha: "",
            nav_alertas:""
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
            nav_parametros:"",
            nav_clientes : "",
            nav_ficha: "",
            nav_alertas:""
        })
    });

    
})

router.post("/materiaprima/create",(req,res) => {
    var descricao = req.body.descricao;
    var codigo = req.body.codigo.replace(/[\. ,:-]+/g, "");    

    MateriasPrimas.findOne({
      where: {
         descricao: codigo
      }
   }).then(output => {
      if (output === null || output === 'null') {

         MateriasPrimas.create({
            descricao:codigo,
            codigo:codigo,
     
         }).then(() => {
               res.redirect("/materiaprima");
         })

      } else {
         res.redirect("/materiaprima");
         console.log('MATERIA PRIMA JÁ EXISTE. NÃO ADICIONADA')
      }
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
                nav_produtos : "",
                nav_mp : "active",
                nav_usuarios : "",
                nav_moldes : "",
                nav_parametros:"",
                nav_clientes : "",
                nav_ficha: "",
                nav_alertas:""
              
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
    var codigo = req.body.codigo.replace(/[\. ,:-]+/g, "");
    var id = req.body.id;
    var userLogado = req.body.userLogado;
    var justificativa = req.body.justificativa;

    MateriasPrimas.update({
        descricao:codigo,
        codigo: codigo,
        usuario: userLogado,
        justificativa: justificativa,
 
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
