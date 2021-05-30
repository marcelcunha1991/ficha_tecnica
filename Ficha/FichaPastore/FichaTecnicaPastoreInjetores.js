const Sequelize = require("sequelize");
const conn = require("../../database/database");
const Clientes = require("../../Clientes/Clientes");
const Moldes = require("../../Moldes/Moldes");
const Maquinas = require("../../Maquinas/Maquinas");
const Produtos = require("../../Produtos/Produtos");
const MateriaPrima = require("../../MateriaPrima/MateriasPrimas");

const FichaPastoreInjetores = conn.define('injetores_pastore',{

   maq:{
      type: Sequelize.INTEGER,
      model: 'maquinas', // <<< Note, its table's name, not object name
      key: 'id'
   },
   NúmeroMolde: Sequelize.STRING,
   NúmeroMáquina: Sequelize.STRING,
   Revisao: Sequelize.STRING,
   Cliente: Sequelize.STRING,
   CodigoPAM: Sequelize.STRING,
   Tecnico: Sequelize.STRING,
   Produto: Sequelize.STRING,
   Material: Sequelize.STRING,
   Data: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},

   tolCilindro: Sequelize.FLOAT,
   cilindro1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   cilindro2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   cilindro3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   cilindro4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   cilindro5: {type: Sequelize.FLOAT, defaultValue: 0.0},
   cilindro6: {type: Sequelize.FLOAT, defaultValue: 0.0},
   cilindro7: {type: Sequelize.FLOAT, defaultValue: 0.0},

   tolInjecao: Sequelize.FLOAT,
   posComut: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posInjecao1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posInjecao2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posInjecao3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posInjecao4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posInjecao5: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presComut: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presInjecao1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presInjecao2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presInjecao3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presInjecao4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presInjecao5: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoInjecao1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoInjecao2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoInjecao3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoInjecao4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoInjecao5: {type: Sequelize.FLOAT, defaultValue: 0.0},
   tempoDisparo:  {type: Sequelize.FLOAT, defaultValue: 0.0},
   pressaoInj:  {type: Sequelize.FLOAT, defaultValue: 0.0},

   tolRecalque: Sequelize.FLOAT,
   presRecalque1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presRecalque2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presRecalque3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presRecalque4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presRecalque5: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoRecalque1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoRecalque2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoRecalque3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoRecalque4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoRecalque5: {type: Sequelize.FLOAT, defaultValue: 0.0},
   tempoRecalque1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   tempoRecalque2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   tempoRecalque3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   tempoRecalque4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   tempoRecalque5: {type: Sequelize.FLOAT, defaultValue: 0.0},

   tolDosagem: Sequelize.FLOAT,
   partDosagem1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   partDosagem2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   partDosagem3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   partDosagem4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   partDosagem5: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presDosagem1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presDosagem2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presDosagem3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presDosagem4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presDosagem5: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoDosagem1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoDosagem2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoDosagem3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoDosagem4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoDosagem5: {type: Sequelize.FLOAT, defaultValue: 0.0},
   CPDosagem1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   CPDosagem2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   CPDosagem3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   CPDosagem4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   CPDosagem5: {type: Sequelize.FLOAT, defaultValue: 0.0},
   tempoDosagem: {type: Sequelize.FLOAT, defaultValue: 0.0},

   tolDescompressao: Sequelize.FLOAT,
   antesPos: {type: Sequelize.FLOAT, defaultValue: 0.0},
   antesPres: {type: Sequelize.FLOAT, defaultValue: 0.0},
   antesFluxo: {type: Sequelize.FLOAT, defaultValue: 0.0},
   antesTempo: {type: Sequelize.FLOAT, defaultValue: 0.0},
   depoisPos: {type: Sequelize.FLOAT, defaultValue: 0.0},
   depoisPres: {type: Sequelize.FLOAT, defaultValue: 0.0},
   depoisFluxo: {type: Sequelize.FLOAT, defaultValue: 0.0},
   depoisTempo: {type: Sequelize.FLOAT, defaultValue: 0.0},

   tolFechamento: Sequelize.FLOAT,
   posFecha1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posFecha2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posFecha3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   protMPos: {type: Sequelize.FLOAT, defaultValue: 0.0},
   AltaPresPos: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presFecha1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presFecha2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presFecha3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   protMPres: {type: Sequelize.FLOAT, defaultValue: 0.0},
   AltaPresPres: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoFecha1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoFecha2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoFecha3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   protMFluxo: {type: Sequelize.FLOAT, defaultValue: 0.0},
   AltaPresFluxo: {type: Sequelize.FLOAT, defaultValue: 0.0},
   tempoProtMolde: {type: Sequelize.FLOAT, defaultValue: 0.0},
   tempoFecha: {type: Sequelize.FLOAT, defaultValue: 0.0},

   tolAbertura: Sequelize.FLOAT,
   posAbertura1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posAbertura2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posAbertura3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posAbertura4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posAbertura5: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presAbertura1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presAbertura2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presAbertura3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presAbertura4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presAbertura5: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoAbertura1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoAbertura2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoAbertura3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoAbertura4: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoAbertura5: {type: Sequelize.FLOAT, defaultValue: 0.0},
   resfriamento: {type: Sequelize.FLOAT, defaultValue: 0.0},
   tempoAbertura: {type: Sequelize.FLOAT, defaultValue: 0.0},

   tolExtracao: Sequelize.FLOAT,
   posAvanco1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posAvanco2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posAvanco3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posRecuo1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posRecuo2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   posRecuo3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presAvanco1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presAvanco2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presAvanco3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presRecuo1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presRecuo2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   presRecuo3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoAvanco1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoAvanco2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoAvanco3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoRecuo1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoRecuo2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   fluxoRecuo3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   atraso: {type: Sequelize.FLOAT, defaultValue: 0.0},
   batida: {type: Sequelize.FLOAT, defaultValue: 0.0},

   tolRadial: Sequelize.FLOAT,
   radialTypeEntrada1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialTypeSaida1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialTypeEntrada2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialTypeSaida2: {type: Sequelize.FLOAT, defaultValue: 0.0},

   radialPresEntrada1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialPresSaida1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialPresEntrada2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialPresSaida2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialPresEntrada3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialPresSaida3: {type: Sequelize.FLOAT, defaultValue: 0.0},

   radialFluxoEntrada1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialFluxoSaida1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialFluxoEntrada2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialFluxoSaida2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialFluxoEntrada3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialFluxoSaida3: {type: Sequelize.FLOAT, defaultValue: 0.0},

   radialPosEntrada1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialPosSaida1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialPosEntrada2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialPosSaida2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialPosEntrada3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialPosSaida3: {type: Sequelize.FLOAT, defaultValue: 0.0},

   radialTempoEntrada1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialTempoSaida1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialTempoEntrada2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialTempoSaida2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialTempoEntrada3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialTempoSaida3: {type: Sequelize.FLOAT, defaultValue: 0.0},

   radialSCREntrada1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialSCRSaida1: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialSCREntrada2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialSCRSaida2: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialSCREntrada3: {type: Sequelize.FLOAT, defaultValue: 0.0},
   radialSCRSaida3: {type: Sequelize.FLOAT, defaultValue: 0.0},
})

Clientes.hasMany(FichaPastoreInjetores);
Moldes.hasMany(FichaPastoreInjetores);
Maquinas.hasMany(FichaPastoreInjetores);
Produtos.hasMany(FichaPastoreInjetores);
MateriaPrima.hasMany(FichaPastoreInjetores);

module.exports = FichaPastoreInjetores;