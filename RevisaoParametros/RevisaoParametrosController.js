const express = require("express");
const router = express.Router();
const RevisaoParametros = require("../RevisaoParametros/RevisaoParametros");
const ParametrosReal = require("../ParametrosTempoReal/ParametrosReal");

router.get("/revisaoParametros/visualizacao/:id",(req,res) => {
   var id = req.params.id;

    RevisaoParametros.findAll({
        where: {
            revisao: id
        }
    }).then(revisao => {
        res.render("revisaoParametros/visualizacao", {
            revisoes: revisao[0],
            nav_maquinas : "",
            nav_produtos : "",
            nav_mp : "",
            nav_usuarios : "",
            nav_moldes : "",
            nav_clientes : "",
            nav_parametros:"",
            nav_ficha: "active",
            nav_alertas:"",
        })
    })
})

router.post("/parametros/updateRevisao",(req,res) => {
    
    var id = req.body.id;
    var maquina = req.body.maquina;
    var idFichaTecnica = req.body.idFichaTecnica;
    var VI1_min = req.body.VI1_min !== "" ? req.body.VI1_min : 0.0;
    var VI1_max = req.body.VI1_max !== "" ? req.body.VI1_max : 0.0;
    var VI2_min = req.body.VI2_min !== "" ? req.body.VI2_min : 0.0;
    var VI2_max = req.body.VI2_max !== "" ? req.body.VI2_max : 0.0;     
    var VI3_min = req.body.VI3_min !== "" ? req.body.VI3_min : 0.0;
    var VI3_max = req.body.VI3_max !== "" ? req.body.VI3_max : 0.0;    
    var ok_prodShotMin = req.body.ok_prodShot_min !== "" ? req.body.ok_prodShot_min : 0.0;
    var ok_prodShotMax = req.body.ok_prodShot_min !== "" ? req.body.ok_prodShot_min : 0.0;
    var printShotMin = req.body.printShotMin_min !== "" ? req.body.printShotMin_min : 0.0;
    var printShotMax = req.body.printShotMin_max !== "" ? req.body.printShotMin_max : 0.0;
    var fillingTimeMin = req.body.fillingTime_min !== "" ? req.body.fillingTime_min : 0.0;
    var fillingTimeMax = req.body.fillingTime_max !== "" ? req.body.fillingTime_max : 0.0;
    var chargingTimeMin = req.body.chargingTime_min !== "" ? req.body.chargingTime_min : 0.0;
    var chargingTimeMax = req.body.chargingTime_max !== "" ? req.body.chargingTime_max : 0.0;
    var takeoutTimeMin = req.body.takeoutTime_min !== "" ? req.body.takeoutTime_min : 0.0;
    var takeoutTimeMax = req.body.takeoutTime_max !== "" ? req.body.takeoutTime_max : 0.0;
    var dwellChnagePositionMin = req.body.dwellChnagePosition_min !== "" ? req.body.dwellChnagePosition_min : 0.0;
    var dwellChnagePositionMax = req.body.dwellChnagePosition_max !== "" ? req.body.dwellChnagePosition_max : 0.0;
    var minumumCushionPositionMin = req.body.minumumCushionPosition_min !== "" ? req.body.minumumCushionPosition_min : 0.0;
    var minumumCushionPositionMax = req.body.minumumCushionPosition_max !== "" ? req.body.minumumCushionPosition_max : 0.0;
    var cushionPositionMin = req.body.cushionPosition_min !== "" ? req.body.cushionPosition_min : 0.0;
    var cushionPositionMax = req.body.cushionPosition_max !== "" ? req.body.cushionPosition_max : 0.0;
    var injetStartPositionMin = req.body.injetStartPosition_min !== "" ? req.body.injetStartPosition_min : 0.0;
    var injetStartPositionMax = req.body.injetStartPosition_max !== "" ? req.body.injetStartPosition_max : 0.0;
    var maxInjectPressureMin = req.body.maxInjectPressure_min !== "" ? req.body.maxInjectPressure_min : 0.0;
    var maxInjectPressureMax = req.body.maxInjectPressure_max !== "" ? req.body.maxInjectPressure_max : 0.0;
    var crewRotationSpeedMin = req.body.crewRotationSpeed_min !== "" ? req.body.crewRotationSpeed_min : 0.0;
    var crewRotationSpeedMax = req.body.crewRotationSpeed_max !== "" ? req.body.crewRotationSpeed_max : 0.0;

    var temperature_hen_min = req.body.temperature_hen_min !== "" ? req.body.temperature_hen_min : 0.0;
    var temperature_hen_max = req.body.temperature_hen_max !== "" ? req.body.temperature_hen_max : 0.0;
    var temperature_hn_min = req.body.temperature_hn_min !== "" ? req.body.temperature_hn_min : 0.0;
    var temperature_hn_max = req.body.temperature_hn_max !== "" ? req.body.temperature_hn_max : 0.0;
    var temperature_h1_min = req.body.temperature_h1_min !== "" ? req.body.temperature_h1_min : 0.0;
    var temperature_h1_max = req.body.temperature_h1_max !== "" ? req.body.temperature_h1_max : 0.0;
    var temperature_h2_min = req.body.temperature_h2_min !== "" ? req.body.temperature_h2_min : 0.0;
    var temperature_h2_max = req.body.temperature_h2_max !== "" ? req.body.temperature_h2_max : 0.0;
    var temperature_h3_min = req.body.temperature_h3_min !== "" ? req.body.temperature_h3_min : 0.0;
    var temperature_h3_max = req.body.temperature_h3_max !== "" ? req.body.temperature_h3_max : 0.0;
    var temperature_h4_min = req.body.temperature_h4_min !== "" ? req.body.temperature_h4_min : 0.0;
    var temperature_h4_max = req.body.temperature_h4_max !== "" ? req.body.temperature_h4_max : 0.0;
    var temperature_h5_min = req.body.temperature_h5_min !== "" ? req.body.temperature_h5_min : 0.0;
    var temperature_h5_max = req.body.temperature_h5_max !== "" ? req.body.temperature_h5_max : 0.0;
    var temperature_oil_min = req.body.temperature_oil_min !== "" ? req.body.temperature_oil_min : 0.0;
    var temperature_oil_max = req.body.temperature_oil_max !== "" ? req.body.temperature_oil_max : 0.0;
    var temperature_hop_min = req.body.temperature_hop_min !== "" ? req.body.temperature_hop_min : 0.0;
    var temperature_hop_max = req.body.temperature_hop_max !== "" ? req.body.temperature_hop_max : 0.0;

    ParametrosReal.update({
        maquina:maquina,
        prodShotMin:  VI1_min,
        prodShotMax: VI1_max,
        cycleTimeMin: VI2_min,
        cycleTimeMax: VI2_max,    
        dwellPressureMin: VI3_min,
        dwellPressureMax: VI3_max,
        ok_prodShotMin : ok_prodShotMin,
        ok_prodShotMax : ok_prodShotMax,
        printShotMin : printShotMin,
        printShotMax : printShotMax,
        fillingTimeMin : fillingTimeMin,
        fillingTimeMax : fillingTimeMax,
        chargingTimeMin : chargingTimeMin,
        chargingTimeMax : chargingTimeMax,
        takeoutTimeMin : takeoutTimeMin,
        takeoutTimeMax : takeoutTimeMax,
        dwellChnagePositionMin : dwellChnagePositionMin,
        dwellChnagePositionMax : dwellChnagePositionMax,
        minumumCushionPositionMin : minumumCushionPositionMin,
        minumumCushionPositionMax : minumumCushionPositionMax,
        cushionPositionMin : cushionPositionMin,
        cushionPositionMax : cushionPositionMax,
        injetStartPositionMin : injetStartPositionMin,
        injetStartPositionMax : injetStartPositionMax,
        maxInjectPressureMin : maxInjectPressureMin,
        maxInjectPressureMax : maxInjectPressureMax,
        crewRotationSpeedMin : crewRotationSpeedMin,
        crewRotationSpeedMax : crewRotationSpeedMax,
        temperature_henMin : temperature_hen_min,
        temperature_henMax : temperature_hen_max,
        temperature_hnMin : temperature_hn_min,
        temperature_hnMax : temperature_hn_max,
        temperature_h1Min : temperature_h1_min,
        temperature_h1Max : temperature_h1_max,
        temperature_h2Min : temperature_h2_min,
        temperature_h2Max : temperature_h2_max,
        temperature_h3Min : temperature_h3_min,
        temperature_h3Max : temperature_h3_max,
        temperature_h4Min : temperature_h4_min,
        temperature_h4Max : temperature_h4_max,
        temperature_h5Min : temperature_h5_min,
        temperature_h5Max : temperature_h5_max,
        temperature_oilMin : temperature_oil_min,
        temperature_oilMax : temperature_oil_max,
        temperature_hopMin : temperature_hop_min,
        temperature_hopMax : temperature_hop_max,
    },{
        where:{
            id:idFichaTecnica
        }
    }).then(() => {
        RevisaoParametros.create({
            idFichaTecnica: idFichaTecnica,
            maquina:maquina,
            prodShotMin:  VI1_min,
            prodShotMax: VI1_max,
            cycleTimeMin: VI2_min,
            cycleTimeMax: VI2_max,    
            dwellPressureMin: VI3_min,
            dwellPressureMax: VI3_max,
            ok_prodShotMin : ok_prodShotMin,
            ok_prodShotMax : ok_prodShotMax,
            printShotMin : printShotMin,
            printShotMax : printShotMax,
            fillingTimeMin : fillingTimeMin,
            fillingTimeMax : fillingTimeMax,
            chargingTimeMin : chargingTimeMin,
            chargingTimeMax : chargingTimeMax,
            takeoutTimeMin : takeoutTimeMin,
            takeoutTimeMax : takeoutTimeMax,
            dwellChnagePositionMin : dwellChnagePositionMin,
            dwellChnagePositionMax : dwellChnagePositionMax,
            minumumCushionPositionMin : minumumCushionPositionMin,
            minumumCushionPositionMax : minumumCushionPositionMax,
            cushionPositionMin : cushionPositionMin,
            cushionPositionMax : cushionPositionMax,
            injetStartPositionMin : injetStartPositionMin,
            injetStartPositionMax : injetStartPositionMax,
            maxInjectPressureMin : maxInjectPressureMin,
            maxInjectPressureMax : maxInjectPressureMax,
            crewRotationSpeedMin : crewRotationSpeedMin,
            crewRotationSpeedMax : crewRotationSpeedMax,
            temperature_henMin : temperature_hen_min,
            temperature_henMax : temperature_hen_max,
            temperature_hnMin : temperature_hn_min,
            temperature_hnMax : temperature_hn_max,
            temperature_h1Min : temperature_h1_min,
            temperature_h1Max : temperature_h1_max,
            temperature_h2Min : temperature_h2_min,
            temperature_h2Max : temperature_h2_max,
            temperature_h3Min : temperature_h3_min,
            temperature_h3Max : temperature_h3_max,
            temperature_h4Min : temperature_h4_min,
            temperature_h4Max : temperature_h4_max,
            temperature_h5Min : temperature_h5_min,
            temperature_h5Max : temperature_h5_max,
            temperature_oilMin : temperature_oil_min,
            temperature_oilMax : temperature_oil_max,
            temperature_hopMin : temperature_hop_min,
            temperature_hopMax : temperature_hop_max,
        }).then(() => {
            res.redirect("/revisaoParametros/visualizacao/" + (parseInt(id)+1));
        })
    })
})

module.exports = router;