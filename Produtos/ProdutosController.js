const express = require("express");
const router = express.Router();
const Produtos = require("./Produtos");
const adminAuth = require("../middlewares/adminAuth");
const { render } = require("ejs");


router.get("/produtos",  (req,res) => {

    Produtos.findAll().then(produtos => {
        res.render("produtos/index",{
            produtos:produtos,
            nav_maquinas : "",
            nav_produtos : "active",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_parametros:"",
            nav_clientes : "",
            nav_ficha: "",
            nav_alertas:""
        })
    });

    
})


router.get("/produtos/new",  (req,res) => {


    Produtos.findAll().then(produtos => {
        res.render("produtos/new",{            
            nav_maquinas : "",
            nav_produtos : "active",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_ficha: "",
            nav_alertas:""
        })
    });

    
})

router.post("/produtos/create",(req,res) => {
    var descricao = req.body.descricao;
    var codigo = req.body.codigo;    

    Produtos.create({
        descricao:descricao,
        codigo: codigo,
 
    }).then(() => {
        res.redirect("/produtos");
    })
})


router.get("/produtos/edit/:id",(req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/produtos")
    }

    Produtos.findByPk(id).then(produto => {

        if(produto != undefined){

            res.render("produtos/edit",{
                produto:produto,
                nav_maquinas : "",
                nav_produtos : "active",
                nav_mp : "",
                nav_usuarios : "",
                nav_moldes : "",
                nav_clientes : "",
                nav_ficha: "",
                nav_alertas:""
              
            })

        }else{
            res.redirect("/produtos");
        }

    }).catch(erro => {
        res.redirect("/produtos");
    })  

})


router.post("/produtos/update",(req,res) => {
    
    var descricao = req.body.descricao;
    var codigo = req.body.codigo;
    var id = req.body.id;

    Produtos.update({
        descricao:descricao,
        codigo: codigo,
 
    },{
        where:{
            id:id
        }
    }).then(() => {
        res.redirect("/produtos")
    })
})


router.post("/produtos/delete",(req,res) => {
    var id = req.body.id;
    if (id != undefined){

        if(!isNaN(id)){

            Produtos.destroy({
                where:{
                    id:id
                }
            }).then(() => {
                res.redirect("/produtos");
            })

        }else{
            res.redirect("/produtos");
        }
    }else{
        res.redirect("/produtos");
    }
})




module.exports = router;
