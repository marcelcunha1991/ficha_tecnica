const Sequelize = require("sequelize");
const conn = require("../../database/database");
const Clientes = require("../../Clientes/Clientes");
const Moldes = require("../../Moldes/Moldes");
const Maquinas = require("../../Maquinas/Maquinas");
const Produtos = require("../../Produtos/Produtos");
const MateriaPrima = require("../../MateriaPrima/MateriasPrimas");

const FichaPastorePerifericos = conn.define('perifericos_pastore',{
   maq:{
      type: Sequelize.INTEGER,
      model: 'maquinas', // <<< Note, its table's name, not object name
      key: 'id'
   },
   termopar: Sequelize.STRING,
   voltagem: Sequelize.STRING,
   tolCamara: Sequelize.FLOAT,
   camara1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara5: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara6: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara7: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara8: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara9: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara10: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara11: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara12: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara13: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara14: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara15: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara16: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara17: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara18: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara19: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara20: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara21: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara22: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara23: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara24: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara25: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara26: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara27: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara28: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara29: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara30: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara31: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara32: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara33: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara34: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara35: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara36: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara37: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara38: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara39: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara40: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara41: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara42: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara43: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara44: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara45: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara46: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara47: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara48: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara49: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara50: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara51: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara52: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara53: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara54: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara55: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara56: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara57: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara58: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara59: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara60: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara61: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara62: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara63: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara64: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara65: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara66: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara67: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara68: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara69: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara70: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara71: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara72: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara73: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara74: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara75: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara76: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara77: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara78: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara79: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara80: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara81: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara82: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara83: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara84: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara85: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara86: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara87: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara88: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara89: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara90: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara91: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara92: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara93: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara94: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara95: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara96: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara97: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara98: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara99: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara100: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara101: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara102: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara103: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara104: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara105: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara106: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara107: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara108: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara109: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara110: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara111: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara112: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara113: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara114: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara115: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara116: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara117: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara118: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara119: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara120: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara121: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara122: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara123: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara124: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara125: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara126: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara127: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara128: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara129: {type: Sequelize.FLOAT, defaultValue: 0.0},
   camara130: {type: Sequelize.FLOAT, defaultValue: 0.0},
   
   tolValve: Sequelize.FLOAT,
   VG1DLYTIME: Sequelize.STRING,
   VG1ACTTIME: Sequelize.STRING,
   VG2DLYTIME: Sequelize.STRING,
   VG2ACTTIME: Sequelize.STRING,
   VG3DLYTIME: Sequelize.STRING,
   VG3ACTTIME: Sequelize.STRING,
   VG4DLYTIME: Sequelize.STRING,
   VG4ACTTIME: Sequelize.STRING,
   VG5DLYTIME: Sequelize.STRING,
   VG5ACTTIME: Sequelize.STRING,
   VG6DLYTIME: Sequelize.STRING,
   VG6ACTTIME: Sequelize.STRING,
   VG7DLYTIME: Sequelize.STRING,
   VG7ACTTIME: Sequelize.STRING,
   VG8DLYTIME: Sequelize.STRING,
   VG8ACTTIME: Sequelize.STRING,
   VG9DLYTIME: Sequelize.STRING,
   VG9ACTTIME: Sequelize.STRING,
   VG10DLYTIME: Sequelize.STRING,
   VG10ACTTIME: Sequelize.STRING,
   VG11DLYTIME: Sequelize.STRING,
   VG11ACTTIME: Sequelize.STRING,
   VG12DLYTIME: Sequelize.STRING,
   VG12ACTTIME: Sequelize.STRING,
   VG13DLYTIME: Sequelize.STRING,
   VG13ACTTIME: Sequelize.STRING,
   VG14DLYTIME: Sequelize.STRING,
   VG14ACTTIME: Sequelize.STRING,
   VG15DLYTIME: Sequelize.STRING,
   VG15ACTTIME: Sequelize.STRING,
   VG16DLYTIME: Sequelize.STRING,
   VG16ACTTIME: Sequelize.STRING,
   VG17DLYTIME: Sequelize.STRING,
   VG17ACTTIME: Sequelize.STRING,
   VG18DLYTIME: Sequelize.STRING,
   VG18ACTTIME: Sequelize.STRING,
   VG19DLYTIME: Sequelize.STRING,
   VG19ACTTIME: Sequelize.STRING,
   VG20DLYTIME: Sequelize.STRING,
   VG20ACTTIME: Sequelize.STRING,
   VG21DLYTIME: Sequelize.STRING,
   VG21ACTTIME: Sequelize.STRING,
   VG22DLYTIME: Sequelize.STRING,
   VG22ACTTIME: Sequelize.STRING,
   VG23DLYTIME: Sequelize.STRING,
   VG23ACTTIME: Sequelize.STRING,
   VG24DLYTIME: Sequelize.STRING,
   VG24ACTTIME: Sequelize.STRING,
   VG25DLYTIME: Sequelize.STRING,
   VG25ACTTIME: Sequelize.STRING,
   VG26DLYTIME: Sequelize.STRING,
   VG26ACTTIME: Sequelize.STRING,
   VG27DLYTIME: Sequelize.STRING,
   VG27ACTTIME: Sequelize.STRING,
   VG28DLYTIME: Sequelize.STRING,
   VG28ACTTIME: Sequelize.STRING,
   VG29DLYTIME: Sequelize.STRING,
   VG29ACTTIME: Sequelize.STRING,
   VG30DLYTIME: Sequelize.STRING,
   VG30ACTTIME: Sequelize.STRING,
   VG31DLYTIME: Sequelize.STRING,
   VG31ACTTIME: Sequelize.STRING,
   VG32DLYTIME: Sequelize.STRING,
   VG32ACTTIME: Sequelize.STRING,
   VG33DLYTIME: Sequelize.STRING,
   VG33ACTTIME: Sequelize.STRING,
   VG34DLYTIME: Sequelize.STRING,
   VG34ACTTIME: Sequelize.STRING,
   VG35DLYTIME: Sequelize.STRING,
   VG35ACTTIME: Sequelize.STRING,
   VG36DLYTIME: Sequelize.STRING,
   VG36ACTTIME: Sequelize.STRING,
   VG37DLYTIME: Sequelize.STRING,
   VG37ACTTIME: Sequelize.STRING,
   VG38DLYTIME: Sequelize.STRING,
   VG38ACTTIME: Sequelize.STRING,
   VG39DLYTIME: Sequelize.STRING,
   VG39ACTTIME: Sequelize.STRING,
   VG40DLYTIME: Sequelize.STRING,
   VG40ACTTIME: Sequelize.STRING,

   tolRefrigeracao: Sequelize.FLOAT,
   refrLadoFixo1: Sequelize.STRING,
   fixoRefrig1: Sequelize.STRING,
   refrLadoFixo2: Sequelize.STRING,
   fixoRefrig2: Sequelize.STRING,
   refrLadoFixo3: Sequelize.STRING,
   fixoRefrig3: Sequelize.STRING,
   refrLadoFixo4: Sequelize.STRING,
   fixoRefrig4: Sequelize.STRING,

   refrLadoMovel1: Sequelize.STRING,
   movelRefrig1: Sequelize.STRING,
   refrLadoMovel2: Sequelize.STRING,
   movelRefrig2: Sequelize.STRING,
   refrLadoMovel3: Sequelize.STRING,
   movelRefrig3: Sequelize.STRING,
   refrLadoMovel4: Sequelize.STRING,
   movelRefrig4: Sequelize.STRING,

   tolVapor: Sequelize.FLOAT,
   vaporLadoFixo1: Sequelize.STRING,
   vaporLadoMovel1: Sequelize.STRING,
   vaporLadoFixo2: Sequelize.STRING,
   vaporLadoMovel2: Sequelize.STRING,
   vaporLadoFixo3: Sequelize.STRING,
   vaporLadoMovel3: Sequelize.STRING,
   vaporLadoFixo4: Sequelize.STRING,
   vaporLadoMovel4: Sequelize.STRING,
   vaporLadoFixo5: Sequelize.STRING,
   vaporLadoMovel5: Sequelize.STRING,
   fixoSteam: Sequelize.STRING,
   movelSteam: Sequelize.STRING,
})

Clientes.hasMany(FichaPastorePerifericos);
Moldes.hasMany(FichaPastorePerifericos);
Maquinas.hasMany(FichaPastorePerifericos);
Produtos.hasMany(FichaPastorePerifericos);
MateriaPrima.hasMany(FichaPastorePerifericos);


module.exports = FichaPastorePerifericos;