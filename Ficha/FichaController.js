const express = require("express");
const router = express.Router();
const Fichas = require("./Ficha");
const Parametros = require("./Parametros");
const ParametrosAtuais = require("./ParametrosAtuais");
const adminAuth = require("../middlewares/adminAuth");
const { render } = require("ejs");
const Maquinas = require("../Maquinas/Maquinas");
var nodemailer = require('nodemailer');
const ParametrosMedios = require("../ParametrosTempoReal/ParametrosReal");


router.get("/fichas",  (req,res) => {
    var maquinas;

    Maquinas.findAll().then(maquina => {
        maquinas = maquina;
    })

    Fichas.findAll().then(fichas => {

      
        
        res.render("fichas/index",{
            fichas:fichas,
            maquinas: maquinas,
            tabela:"",
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_parametros:"",
            nav_ficha: "active"
        })
    });

    
})

router.get("/fichasUltimo/maquina/:id",  (req,res) => {
   
    var maquinaId= req.params.id;
      

    Maquinas.findOne({
        where: {
            mac: maquinaId
         }
    }).then(maquina => {     
        
        ParametrosAtuais.findAll({
            limit: 1,
            where: {
              mac: maquina.mac
            },
            order: [ [ 'createdAt', 'DESC' ]]
          }).then(output => {
     
            console.log(output[0])
            res.send(output[0])
            
          }); 
    })   


    

})

router.get("/fichas/maquina/:id",  (req,res) => {
   
    var maquinaId= req.params.id;      

    Maquinas.findOne({
        where: {
            id: maquinaId
         }
    }).then(maquina => {     
        
        Parametros.findAll({
            limit: 1,
            where: {
              mac: maquina.mac
            },
            order: [ [ 'createdAt', 'DESC' ]]
          }).then(output => {

            res.send(output[0])
            
          }); 
    })   


    

})
    
router.get("/ficha/getFicha/:macMaquina",  (req,res) => {

    var maquinaMac= req.params.macMaquina;
 



    Maquinas.findOne({
        where: {
            mac : maquinaMac
        }
    }).then(output => {

        Fichas.findOne({
            where: {
                maquina : output.id
            }
        }).then(output => {
    
         
     
    
            res.send(output)
            
          }); 
        
      }); 


   

})

router.get("/fichas/new",  (req,res) => {

    var maquinas;

    Maquinas.findAll().then(maquina => {
        maquinas = maquina;
    })


    Fichas.findAll().then((fichas) => {
        res.render("fichas/new",{        
            maquinas: maquinas,    
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_parametros:"",
            nav_ficha: "active"
        })
    });

    
})

router.post("/fichas/create",(req,res) => {
   
    var maquina = req.body.maquinas;
    var VI1_min = req.body.VI1_min;
    var VI1_max = req.body.VI1_max;
    var VI2_min = req.body.VI2_min;
    var VI2_max = req.body.VI2_max;
    var VI3_min = req.body.VI3_min;
    var VI3_max = req.body.VI3_max;
    var VI4_min = req.body.VI4_min;
    var VI4_max = req.body.VI4_max;
    var VI5_min = req.body.VI5_min;
    var VI5_max = req.body.VI5_max;
    var VI6_min = req.body.VI6_min;
    var VI6_max = req.body.VI6_max;
    var VI7_min = req.body.VI7_min;
    var VI7_max = req.body.VI7_max;
    var VI8_min = req.body.VI8_min;
    var VI8_max = req.body.VI8_max;
    var VI9_min = req.body.VI9_min;
    var VI9_max = req.body.VI9_max;
    var VI10_min = req.body.VI10_min;
    var VI10_max = req.body.VI10_max;
    var VH1_min = req.body.VH1_min;
    var VH1_max = req.body.VH1_max;
    var VH2_min = req.body.VH2_min;
    var VH2_max = req.body.VH2_max;
    var PI1_min = req.body.PI1_min;
    var PI1_max = req.body.PI1_max;
    var LS4_min = req.body.LS4_min;
    var LS4_max = req.body.LS4_max;
    var LS4A_min = req.body.LS4A_min;
    var LS4A_max = req.body.LS4A_max;    
    

    Fichas.create({
        maquina:maquina,
        VI1_min:  VI1_min,
    VI1_max: VI1_max,
    VI2_min: VI2_min,
    VI2_max: VI2_max,
    VI3_min: VI3_min,
    VI3_max: VI3_max,
    VI4_min: VI4_min,
    VI4_max: VI4_max,
    VI5_min: VI5_min,
    VI5_max: VI5_max,
    VI6_min: VI6_min,
    VI6_max: VI6_max,
    VI7_min: VI7_min,
    VI7_max: VI7_max,
    VI8_min: VI8_min,
    VI8_max: VI8_max,
    VI9_min: VI9_min,
    VI9_max: VI9_max,
    VI10_min: VI10_min,
    VI10_max: VI10_max,
    VH1_min: VH1_min,
    VH1_max: VH1_max,
    VH2_min: VH2_min,
    VH2_max: VH2_max,
    PI1_min: PI1_min,
    PI1_max: PI1_max,
    LS4_min: LS4_min,
    LS4_max: LS4_max,
    LS4A_min: LS4A_min,
    LS4A_max: LS4A_max,
    }).then(() => {
        res.redirect("/fichas");
    })
})

router.post("/parametros/insert",(req,res) => {
 
    
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
    

    Parametros.create({
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
})

router.post("/parametrosAtuais/insert",(req,res) => {
 
    
    var mac = req.body.mac;
    
    var prodShot = req.body.prodShot;
    var cycleTime = req.body.cycleTime;   
    var dwellPressure = req.body.dwellPressure;   
    var ok_prodShot = req.body.ok_prodShot;
    var ok_proprintShotdShot = req.body.printShot;
    var fillingTime = req.body.fillingTime;
    var chargingTime = req.body.chargingTime;
    var takeoutTime = req.body.takeoutTime;
    var dwellChnagePosition = req.body.dwellChnagePosition;
    var minumumCushionPosition = req.body.minumumCushionPosition;
    var cushionPosition = req.body.cushionPosition;
    var injetStartPosition = req.body.injetStartPosition;
    var maxInjectPressure = req.body.maxInjectPressure;
    var screwRotationSpeed = req.body.screwRotationSpeed;

    Maquinas.findOne({
        where: {
            mac: mac
         }
    }).then(maquina => {     
        
        ParametrosMedios.findAll({
            limit: 1,
            where: {
              mac: maquina.mac
            },
            order: [ [ 'createdAt', 'DESC' ]]
          }).then(output => {

            if(output.cycleTimeMin > cycleTime || output.cycleTimeMin < cycleTime ){

                sendMail("Cycle Time fora do esperado");
            }else if (output.dwellPressureMin > dwellPressure || output.dwellPressureMin < dwellPressure ){
                sendMail("Dwell Pressure fora do esperado");
            }
            
          }); 
    })      

    ParametrosAtuais.create({
        mac:mac,
        prodShot : prodShot,
        cycleTime : cycleTime,
        dwellPressure : dwellPressure,
        ok_prodShot : ok_prodShot,   
        ok_proprintShotdShot : ok_proprintShotdShot,
        fillingTime : fillingTime,
        chargingTime : chargingTime,
        takeoutTime : takeoutTime,
        dwellChnagePosition : dwellChnagePosition,
        minumumCushionPosition : minumumCushionPosition,
        cushionPosition : cushionPosition,
        injetStartPosition : injetStartPosition,
        maxInjectPressure : maxInjectPressure,
        screwRotationSpeed : screwRotationSpeed
      
    }).then(() => {
        res.redirect("/fichas");
    })
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
