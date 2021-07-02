const express = require("express");
const router = express.Router();
const RevisaoFicha = require("../RevisaoFicha/RevisaoFicha");
const Fichas = require("../Ficha/Ficha");

router.get("/revisaoFicha/visualizacao/:id",(req,res) => {
   var id = req.params.id;

   RevisaoFicha.findAll({
        where: {
            revisao: id
        }
    }).then(revisao => {
        res.render("revisaoFicha/visualizacao", {
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

router.post("/fichas/updateRevisao",(req,res) => {
    console.log(req.body);
    var id = req.body.id;
    var maquina = req.body.maquina;
    var idFichaTecnica = req.body.idFichaTecnica;
    var VI1_min = req.body.VI1_min !==  "" ? req.body.VI1_min : 0.0;
    var VI1_max = req.body.VI1_max !==  "" ? req.body.VI1_max : 0.0;
    var VI2_min = req.body.VI2_min !==  "" ? req.body.VI2_min : 0.0;
    var VI2_max = req.body.VI2_max !==  "" ? req.body.VI2_max : 0.0;
    var VI3_min = req.body.VI3_min !==  "" ? req.body.VI3_min : 0.0;
    var VI3_max = req.body.VI3_max !==  "" ? req.body.VI3_max : 0.0;
    var VI4_min = req.body.VI4_min !==  "" ? req.body.VI4_min : 0.0;
    var VI4_max = req.body.VI4_max !==  "" ? req.body.VI4_max : 0.0;
    var VI5_min = req.body.VI5_min !==  "" ? req.body.VI5_min : 0.0;
    var VI5_max = req.body.VI5_max !==  "" ? req.body.VI5_max : 0.0;
    var VI6_min = req.body.VI6_min !==  "" ? req.body.VI6_min : 0.0;
    var VI6_max = req.body.VI6_max !==  "" ? req.body.VI6_max : 0.0;
    var VI7_min = req.body.VI7_min !==  "" ? req.body.VI7_min : 0.0;
    var VI7_max = req.body.VI7_max !==  "" ? req.body.VI7_max : 0.0;
    var VI8_min = req.body.VI8_min !==  "" ? req.body.VI8_min : 0.0;
    var VI8_max = req.body.VI8_max !==  "" ? req.body.VI8_max : 0.0;
    var VI9_min = req.body.VI9_min !==  "" ? req.body.VI9_min : 0.0;
    var VI9_max = req.body.VI9_max !==  "" ? req.body.VI9_max : 0.0;
    var VI10_min = req.body.VI10_min !==  "" ? req.body.VI10_min : 0.0;
    var VI10_max = req.body.VI10_max !==  "" ? req.body.VI10_max : 0.0;
    var VH1_min = req.body.VH1_min !==  "" ? req.body.VH1_min : 0.0;
    var VH1_max = req.body.VH1_max !==  "" ? req.body.VH1_max : 0.0;
    var VH2_min = req.body.VH2_min !==  "" ? req.body.VH2_min : 0.0;
    var VH2_max = req.body.VH2_max !==  "" ? req.body.VH2_max : 0.0;
    var PI1_min = req.body.PI1_min !==  "" ? req.body.PI1_min : 0.0;
    var PI1_max = req.body.PI1_max !==  "" ? req.body.PI1_max : 0.0;
    var LS4_min = req.body.LS4_min !==  "" ? req.body.LS4_min : 0.0;
    var LS4_max = req.body.LS4_max !==  "" ? req.body.LS4_max : 0.0;
    var LS4A_min = req.body.LS4A_min !==  "" ? req.body.LS4A_min : 0.0;
    var LS4A_max = req.body.LS4A_max !==  "" ? req.body.LS4A_max : 0.0;

    Fichas.update({
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
    },{
        where:{
            id:idFichaTecnica
        }
    }).then(() => {
        RevisaoFicha.create({
            idFichaTecnica: idFichaTecnica,
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
            res.redirect("/revisaoFicha/visualizacao/" + (parseInt(id)+1));
        })
    })
})

module.exports = router;