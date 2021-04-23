const express = require("express");
const router = express.Router();
const FichaTecnicaToshiba = require("./FichaTecnicaToshiba");
const FichaTecnicaHaitianJupter = require("./FichaTecnicaHaitianJypter");
const ParametrosReaisToshiba = require("../ParametrosTempoReal/ParametrosReaisToshiba");
const ParametrosReaisAutomata = require("../ParametrosTempoReal/ParametrosReaisAutomata");
const ParametrosReaishaitianJupyter = require("../ParametrosTempoReal/ParametrosReaisHaitianJupyter");
const AlertasAbertosAutomata = require("../Alertas/AlertasAbertos");
const Alertas = require("../Alertas/Alertas");
const Tipo = require("../Tipo/Tipo");
const adminAuth = require("../middlewares/adminAuth");
const { render } = require("ejs");
const Maquinas = require("../Maquinas/Maquinas");
var nodemailer = require('nodemailer');
const LimiteParametrosToshiba = require("../ParametrosTempoReal/LimiteParametrosToshiba");
const LimiteParametrosAutomata = require("../ParametrosTempoReal/LimiteParametrosAutomata");


router.get("/fichas/:maquina?",  (req,res) => {     
    var maquinas;

    var dsMaquina = "",
    dsMaquina = req.params.maquina;


    Maquinas.findAll().then(maquina => {
        maquinas = maquina;
    })

    FichaTecnicaToshiba.findAll().then(fichas => {      
        
        res.render("fichas/index",{
            fichas:fichas,
            dsMaquina : dsMaquina,
            maquinas: maquinas,
            tabela:"",
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_parametros:"",
            nav_ficha: "active",
            nav_alertas:""
        })
    });

    
})

router.get("/fichasUltimo/maquina/:id",  (req,res) => {
   
    var maquinaId= req.params.id;      

    Maquinas.findOne({
        where: {
            id: maquinaId
         },
         include: [{
            model: Tipo,
            required: true
           }]
    }).then(maquina => {   
        
        switch(maquina.tipo.id){

            case 1:
                
                ParametrosReaisToshiba.findAll({
                    limit: 1,
                    where: {
                      mac: maquina.mac
                    },
                    order: [ [ 'createdAt', 'DESC' ]]
                  }).then(output => {
             
                    console.log(output[0])
                    res.send(output[0])
                    
                  }); 
                  break;

            case 2: 

                ParametrosReaisAutomata.findAll({
                    limit: 1,
                    where: {
                    mac: maquina.mac
                    },
                    order: [ [ 'createdAt', 'DESC' ]]
                }).then(output => {
            
                    console.log(output[0])
                    res.send(output[0])
                    
                }); 
                break;

            case 3: 

                ParametrosReaishaitianJupyter.findAll({
                    limit: 1,
                    where: {
                    mac: maquina.mac
                    },
                    order: [ [ 'createdAt', 'DESC' ]]
                }).then(output => {
            
                    console.log(output[0])
                    res.send(output[0])
                    
                }); 
                break;
            

                
        }
  

        
    })      

})

router.get("/parametrosMediosReais/maquina/:id",  (req,res) => {
   
    var maquinaId= req.params.id;

    console.log(maquinaId)

    Maquinas.findOne({
        where: {
            id: maquinaId
         },include: [{
            model: Tipo,
            required: true
           }]
    }).then(maquina => {    

        if(maquina.tipo.id == 1) {
            LimiteParametrosToshiba.findAll({
                limit: 1,
                where: {
                  maquina: maquina.id   
                },
                include: [{
                    model: Maquinas,
                    required: true
                   }],
                order: [ [ 'createdAt', 'DESC' ]]
              }).then(output => {
         
                console.log(output[0])
                res.send(output[0])
                
              }); 
        }else if (maquina.tipo.id == 2) {

            LimiteParametrosAutomata.findAll({
                limit: 1,
                where: {
                  maquina: maquina.id
                },
                order: [ [ 'createdAt', 'DESC' ]]
              }).then(output => {
         
                console.log(output[0])
                res.send(output[0])
                
              }); 
        }

        
    })      

})

router.get("/fichas/maquina/:id",  (req,res) => {
   
    var maquinaId= req.params.id;      

    Maquinas.findOne({
        where: {
            id: maquinaId
         }
    }).then(maquina => {     
        
        if(maquina.tipoId == 3){
            FichaTecnicaHaitianJupter.findAll({
                limit: 1,
                where: {
                  mac: maquina.mac
                },
                order: [ [ 'createdAt', 'DESC' ]]
              }).then(output => {
    
                res.send(output[0])
                
              }); 
        }else{
            FichaTecnicaToshiba.findAll({
                limit: 1,
                where: {
                  mac: maquina.mac
                },
                order: [ [ 'createdAt', 'DESC' ]]
              }).then(output => {
    
                res.send(output[0])
                
              }); 
        }
      
    })   


    

})
router.get("/getAlertasAbertos/:id",  (req,res) => {

    AlertasAbertosAutomata.findAll({
        where:{
            maquinaId : parseInt(req.params.id),
            status:true
        },
        include: [{
            model: Alertas,
            required: true
           }]
    }).then(result => {
        res.send(result)
    })

})

router.get("/ficha/getFicha/:macMaquina",  (req,res) => {

    var maquinaMac= req.params.macMaquina;

    Maquinas.findOne({
        where: {
            mac : maquinaMac
        }
    }).then(output => {
        console.log(output.tipoId)
        if(output.tipoId  ==  3){
            FichaTecnicaHaitianJupter.findOne({
                where: {
                    mac : output.mac
                },
                order: [
                    ['id', 'DESC']                   
                ]
            }).then(output => {             

                res.send(output)
                
              }); 
        }else{
            FichaTecnicaToshiba.findOne({
                where: {
                    maquina : output.id
                }
            }).then(output => {
        
             
         
        
                res.send(output)
                
              }); 
        }
       
        
      }); 


   

})

router.get("/novaficha",  (req,res) => {

    var maquinas;

    Maquinas.findAll().then(maquina => {
        maquinas = maquina;
    })


    FichaTecnicaToshiba.findAll().then((fichas) => {
        res.render("fichas/new",{        
            maquinas: maquinas,    
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_parametros:"",
            nav_ficha: "active",
            nav_alertas:""
        })
    });

    
})

router.post("/fichas/create",(req,res) => {

    Maquinas.findOne({
        where:{
            id: req.body.maquinas
        }
    }).then(result =>{
        req.body.mac = result.mac;
        FichaTecnicaHaitianJupter.create(req.body).then(() => {
            res.redirect("/fichas");
        })
    })
    
})

router.post("/parametros/insert",(req,res) => {
 

    console.log(req.body);

    if(req.body.tipo == "3"){
        FichaTecnicaHaitianJupter.create(req.body).then(() => {
            res.redirect("/fichas");
        })
    }else{
        var mac = req.body.mac;
    
        var VI1 = req.body.VI1;
        var VI2 = req.body.VI2;
        var VI3 = req.body.VI3;
        var VI4 = req.body.VI4;
        var VI5 = req.body.VI5;
        var VI6 = req.body.VI6;
        var VI7 = req.body.VI7;
        var VI8 = req.body.VI8;
        var VI9 = req.body.VI9;
        var VI10 = req.body.VI10;
        var VH1 = req.body.VH1;
        var VH2 = req.body.VH2;
        var PI1 = req.body.PI1;
        var LS4 = req.body.LS4;
        var LS4A = req.body.LS4A;
        
    
        FichaTecnicaToshiba.create({
            mac:mac,
            VI1: VI1,
            VI2:VI2,
            VI3: VI3,
            VI4: VI4,
            VI5: VI5,
            VI6: VI6,
            VI7: VI7,
            VI8: VI8,
            VI9: VI9,
            VI10: VI10,
            VH1: VH1,
            VH2: VH2,
            PI1: PI1,
            LS4: LS4,
            LS4A: LS4A,
        }).then(() => {
            res.redirect("/fichas");
        })
    }
    
})

router.post("/parametrosAtuais/insertAlarm",(req,res) => {

    console.log(req.body);

    var alarmes = req.body.alarmes;
    var mac = req.body.mac;
    var tipo = req.body.tipo;

    Maquinas.findOne({
        where: {
            mac: mac
         }
    }).then(maquina => {     

        alarmes.forEach(element => {



            if (tipo == "2"){
                AlertasAbertosAutomata.findAll({
                    where:{
                        alertasAutomatumId : parseInt(element),
                        maquinaId: maquina.id
                    }
                }).then(alertaAberto => {
                    if (alertaAberto === null) {
                        console.log('Alarme Aberto');
                      }else{

                        alertaAberto.forEach(element => {
                            element.update({
                                status:false
                            });
                        });                        
                      }
    
                      AlertasAbertosAutomata.create({
                          alertasAutomatumId : parseInt(element),
                          maquinaId:maquina.id
                      })
                })
            }
            
            
        });       
       
    })


    res.sendStatus(200);

})

function insertDataToshiba(body){

   ParametrosReaisToshiba.create(body).then(() => {
        return result;
    }).catch(error =>{
        return error;
    })

}

function insertDataAutomata(body){

    ParametrosReaisAutomata.create(body).then((result) => {
        return result;
    }).catch(error =>{
        return error;
    })

}

function insertDataHaitianJupyter(body){
    console.log(body)
    ParametrosReaishaitianJupyter.create(body).then((result) => {
        return result;
    }).catch(error =>{
        return error;
    })

}

router.post("/parametrosAtuais/insert",(req,res) => {
 
    console.log(req.body)
    var tipo = req.body.tipo;

    switch(parseInt(tipo)){
        case 1:
            insertDataToshiba(req.body);
            res.sendStatus(200);
        case 2:
            insertDataAutomata(req.body);
            res.sendStatus(200);
        case 3:
            insertDataHaitianJupyter(req.body);
            res.sendStatus(200);
 
 
        
        
    }
  
})

function emailSender(texto){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'marcel.silva1991@gmail.com',
          pass: 'Marcel21003839'
        }
      });

    var mailOptions = {
        from: 'marcel.silva1991@gmail.com',
        to: 'marcel.silva1991@gmail.com',
        subject: 'Variação fora do esperado',
        text: texto
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

router.get("/fichas/edit/:id",(req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/fichas")
    }

    FichaTecnicaToshiba.findByPk(id).then(ficha => {

        if(ficha != undefined){

            res.render("fichas/edit",{
                ficha:ficha,
                nav_maquinas : "",
                nav_produtos : "",
                nav_mp : "",
                nav_usuarios : "",
                nav_moldes : "",
                nav_clientes : "",
                nav_ficha: "active",
                nav_ficha: ""
              
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

    FichaTecnicaToshiba.update({
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

            FichaTecnicaToshiba.destroy({
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
