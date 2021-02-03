const Sequelize = require("sequelize");
const conn = require("../database/database");

const LimiteParametrosAutomata = conn.define('limite_parametros_reais_automata',{

    maquina:{
        type: Sequelize.INTEGER,
        model: 'maquinas', // <<< Note, its table's name, not object name
        key: 'id'
    },   

    tempoDeCicloMin: Sequelize.FLOAT,
    tempoDeCicloMax: Sequelize.FLOAT,
    tempoDeFechamentoDoMoldeMin: Sequelize.FLOAT,
    tempoDeFechamentoDoMoldeMax: Sequelize.FLOAT,
    tempoDeAberturaDoMoldeMin: Sequelize.FLOAT,
    tempoDeAberturaDoMoldeMax: Sequelize.FLOAT,    
    tempoDeAvancoDoExtratorMin: Sequelize.FLOAT,
    tempoDeAvancoDoExtratorMax: Sequelize.FLOAT,
    tempoDeRecuoDoExtratorMin: Sequelize.FLOAT,
    tempoDeRecuoDoExtratorMax: Sequelize.FLOAT,
    tempoDeInjecaoMin: Sequelize.FLOAT,
    tempoDeInjecaoMax: Sequelize.FLOAT,
    tempoDeRecalqueMin: Sequelize.FLOAT,
    tempoDeRecalqueMax: Sequelize.FLOAT,
    tempoDePrimeiraDescompressaoMin: Sequelize.FLOAT,
    tempoDePrimeiraDescompressaoMax: Sequelize.FLOAT,
    tempoDeSegundaDescompressaoMin: Sequelize.FLOAT,
    tempoDeSegundaDescompressaoMax: Sequelize.FLOAT,
    tempoDePlastificacaoMin: Sequelize.FLOAT,
    tempoDePlastificacaoMax: Sequelize.FLOAT,
    tempoDeAvancoDaUnidadeInjetoraMin: Sequelize.FLOAT,
    tempoDeAvancoDaUnidadeInjetoraMax: Sequelize.FLOAT,
    tempoDeRecuoDaUnidadeInjetoraMin: Sequelize.FLOAT,
    tempoDeRecuoDaUnidadeInjetoraMax: Sequelize.FLOAT,
    tempoTotalDeCicloMin: Sequelize.FLOAT,
    tempoTotalDeCicloMax: Sequelize.FLOAT,
    temperaturaDaZonaDoBicoMin: Sequelize.FLOAT, 
    temperaturaDaZonaDoBicoMax: Sequelize.FLOAT,
    temperaturaDaZonaDaFlangeMin: Sequelize.FLOAT, 
    temperaturaDaZonaDaFlangeMax: Sequelize.FLOAT,
    temperaturaDaZonaAMin: Sequelize.FLOAT, 
    temperaturaDaZonaAMax: Sequelize.FLOAT,
    temperaturaDaZonaBMin: Sequelize.FLOAT, 
    temperaturaDaZonaBMax: Sequelize.FLOAT,
    temperaturaDaZonaCMin: Sequelize.FLOAT, 
    temperaturaDaZonaCMax: Sequelize.FLOAT,
    temperaturaDaZonaDMin: Sequelize.FLOAT, 
    temperaturaDaZonaDMax: Sequelize.FLOAT,
    temperaturaDaZonaEMin: Sequelize.FLOAT, 
    temperaturaDaZonaEMax: Sequelize.FLOAT,
    temperaturaDaZonaFMin: Sequelize.FLOAT, 
    temperaturaDaZonaFMax: Sequelize.FLOAT,
    velocidadeMediaDuranteAInjecaoMin: Sequelize.FLOAT, 
    velocidadeMediaDuranteAInjecaoMax: Sequelize.FLOAT,
    pressaoMediaDuranteAInjecaoMin: Sequelize.FLOAT, 
    pressaoMediaDuranteAInjecaoMax: Sequelize.FLOAT,
    posicaoDePassagemParaRecalqueMin: Sequelize.FLOAT, 
    posicaoDePassagemParaRecalqueMax: Sequelize.FLOAT,
    pressaoDePassagemParaRecalqueMin: Sequelize.FLOAT, 
    pressaoDePassagemParaRecalqueMax: Sequelize.FLOAT,
    pressaoMediaDuranteORecalqueMin: Sequelize.FLOAT, 
    pressaoMediaDuranteORecalqueMax: Sequelize.FLOAT,
    colchaoMinimoDeInjecaoMin: Sequelize.FLOAT, 
    colchaoMinimoDeInjecaoMax: Sequelize.FLOAT,
    velocidadeMediaDaPlastificacaoMin: Sequelize.FLOAT, 
    velocidadeMediaDaPlastificacaoMax: Sequelize.FLOAT,
    contraPressaoMediaMin: Sequelize.FLOAT, 
    contraPressaoMediaMax: Sequelize.FLOAT,
    posicaoDeDosagemMin: Sequelize.FLOAT, 
    posicaoDeDosagemMax: Sequelize.FLOAT
    

})


// ParametrosMedios.sync();


module.exports = LimiteParametrosAutomata;