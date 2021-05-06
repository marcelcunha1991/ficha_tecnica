const Sequelize = require("sequelize");
const conn = require("../database/database");
const Clientes = require("../Clientes/Clientes");
const Moldes = require("../Moldes/Moldes");
const Maquinas = require("../Maquinas/Maquinas");
const Produtos = require("../Produtos/Produtos");
const MateriaPrima = require("../MateriaPrima/MateriasPrimas");

const RevisaoFichaPastoreInjetores = conn.define('revisao_injetores_pastore',{

   revisao: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
   },
   idFichaTecnica:{
      type: Sequelize.INTEGER,
      model: 'injetores_pastore', // <<< Note, its table's name, not object name
      key: 'id'
   },
   maquinaId:{
      type: Sequelize.INTEGER,
      model: 'maquinas', // <<< Note, its table's name, not object name
      key: 'id'
   },
   cilindro1: Sequelize.FLOAT,
   cilindro2: Sequelize.FLOAT,
   cilindro3: Sequelize.FLOAT,
   cilindro4: Sequelize.FLOAT,
   cilindro5: Sequelize.FLOAT,
   cilindro6: Sequelize.FLOAT,
   cilindro7: Sequelize.FLOAT,

   posComut: Sequelize.FLOAT,
   posInjecao1: Sequelize.FLOAT,
   posInjecao2: Sequelize.FLOAT,
   posInjecao3: Sequelize.FLOAT,
   posInjecao4: Sequelize.FLOAT,
   posInjecao5: Sequelize.FLOAT,
   presComut: Sequelize.FLOAT,
   presInjecao1: Sequelize.FLOAT,
   presInjecao2: Sequelize.FLOAT,
   presInjecao3: Sequelize.FLOAT,
   presInjecao4: Sequelize.FLOAT,
   presInjecao5: Sequelize.FLOAT,
   fluxoInjecao1: Sequelize.FLOAT,
   fluxoInjecao2: Sequelize.FLOAT,
   fluxoInjecao3: Sequelize.FLOAT,
   fluxoInjecao4: Sequelize.FLOAT,
   fluxoInjecao5: Sequelize.FLOAT,
   tempoDisparo:  Sequelize.FLOAT,
   pressaoInj:  Sequelize.FLOAT,

   presRecalque1: Sequelize.FLOAT,
   presRecalque2: Sequelize.FLOAT,
   presRecalque3: Sequelize.FLOAT,
   presRecalque4: Sequelize.FLOAT,
   presRecalque5: Sequelize.FLOAT,
   fluxoRecalque1: Sequelize.FLOAT,
   fluxoRecalque2: Sequelize.FLOAT,
   fluxoRecalque3: Sequelize.FLOAT,
   fluxoRecalque4: Sequelize.FLOAT,
   fluxoRecalque5: Sequelize.FLOAT,
   tempoRecalque1: Sequelize.FLOAT,
   tempoRecalque2: Sequelize.FLOAT,
   tempoRecalque3: Sequelize.FLOAT,
   tempoRecalque4: Sequelize.FLOAT,
   tempoRecalque5: Sequelize.FLOAT,

   partDosagem1: Sequelize.FLOAT,
   partDosagem2: Sequelize.FLOAT,
   partDosagem3: Sequelize.FLOAT,
   partDosagem4: Sequelize.FLOAT,
   partDosagem5: Sequelize.FLOAT,
   presDosagem1: Sequelize.FLOAT,
   presDosagem2: Sequelize.FLOAT,
   presDosagem3: Sequelize.FLOAT,
   presDosagem4: Sequelize.FLOAT,
   presDosagem5: Sequelize.FLOAT,
   fluxoDosagem1: Sequelize.FLOAT,
   fluxoDosagem2: Sequelize.FLOAT,
   fluxoDosagem3: Sequelize.FLOAT,
   fluxoDosagem4: Sequelize.FLOAT,
   fluxoDosagem5: Sequelize.FLOAT,
   CPDosagem1: Sequelize.FLOAT,
   CPDosagem2: Sequelize.FLOAT,
   CPDosagem3: Sequelize.FLOAT,
   CPDosagem4: Sequelize.FLOAT,
   CPDosagem5: Sequelize.FLOAT,
   tempoDosagem: Sequelize.FLOAT,

   antesPos: Sequelize.FLOAT,
   antesPres: Sequelize.FLOAT,
   antesFluxo: Sequelize.FLOAT,
   antesTempo: Sequelize.FLOAT,
   depoisPos: Sequelize.FLOAT,
   depoisPres: Sequelize.FLOAT,
   depoisFluxo: Sequelize.FLOAT,
   depoisTempo: Sequelize.FLOAT,

   posFecha1: Sequelize.FLOAT,
   posFecha2: Sequelize.FLOAT,
   posFecha3: Sequelize.FLOAT,
   protMPos: Sequelize.FLOAT,
   AltaPresPos: Sequelize.FLOAT,
   presFecha1: Sequelize.FLOAT,
   presFecha2: Sequelize.FLOAT,
   presFecha3: Sequelize.FLOAT,
   protMPres: Sequelize.FLOAT,
   AltaPresPres: Sequelize.FLOAT,
   fluxoFecha1: Sequelize.FLOAT,
   fluxoFecha2: Sequelize.FLOAT,
   fluxoFecha3: Sequelize.FLOAT,
   protMFluxo: Sequelize.FLOAT,
   AltaPresFluxo: Sequelize.FLOAT,
   tempoProtMolde: Sequelize.FLOAT,
   tempoFecha: Sequelize.FLOAT,

   posAbertura1: Sequelize.FLOAT,
   posAbertura2: Sequelize.FLOAT,
   posAbertura3: Sequelize.FLOAT,
   posAbertura4: Sequelize.FLOAT,
   posAbertura5: Sequelize.FLOAT,
   presAbertura1: Sequelize.FLOAT,
   presAbertura2: Sequelize.FLOAT,
   presAbertura3: Sequelize.FLOAT,
   presAbertura4: Sequelize.FLOAT,
   presAbertura5: Sequelize.FLOAT,
   fluxoAbertura1: Sequelize.FLOAT,
   fluxoAbertura2: Sequelize.FLOAT,
   fluxoAbertura3: Sequelize.FLOAT,
   fluxoAbertura4: Sequelize.FLOAT,
   fluxoAbertura5: Sequelize.FLOAT,
   resfriamento: Sequelize.FLOAT,
   tempoAbertura: Sequelize.FLOAT,

   posAvanco1: Sequelize.FLOAT,
   posAvanco2: Sequelize.FLOAT,
   posAvanco3: Sequelize.FLOAT,
   posRecuo1: Sequelize.FLOAT,
   posRecuo2: Sequelize.FLOAT,
   posRecuo3: Sequelize.FLOAT,
   presAvanco1: Sequelize.FLOAT,
   presAvanco2: Sequelize.FLOAT,
   presAvanco3: Sequelize.FLOAT,
   presRecuo1: Sequelize.FLOAT,
   presRecuo2: Sequelize.FLOAT,
   presRecuo3: Sequelize.FLOAT,
   fluxoAvanco1: Sequelize.FLOAT,
   fluxoAvanco2: Sequelize.FLOAT,
   fluxoAvanco3: Sequelize.FLOAT,
   fluxoRecuo1: Sequelize.FLOAT,
   fluxoRecuo2: Sequelize.FLOAT,
   fluxoRecuo3: Sequelize.FLOAT,
   atraso: Sequelize.FLOAT,
   batida: Sequelize.FLOAT,

   radialTypeEntrada1: Sequelize.FLOAT,
   radialTypeSaida1: Sequelize.FLOAT,
   radialTypeEntrada2: Sequelize.FLOAT,
   radialTypeSaida2: Sequelize.FLOAT,

   radialPresEntrada1: Sequelize.FLOAT,
   radialPresSaida1: Sequelize.FLOAT,
   radialPresEntrada2: Sequelize.FLOAT,
   radialPresSaida2: Sequelize.FLOAT,
   radialPresEntrada3: Sequelize.FLOAT,
   radialPresSaida3: Sequelize.FLOAT,

   radialFluxoEntrada1: Sequelize.FLOAT,
   radialFluxoSaida1: Sequelize.FLOAT,
   radialFluxoEntrada2: Sequelize.FLOAT,
   radialFluxoSaida2: Sequelize.FLOAT,
   radialFluxoEntrada3: Sequelize.FLOAT,
   radialFluxoSaida3: Sequelize.FLOAT,

   radialPosEntrada1: Sequelize.FLOAT,
   radialPosSaida1: Sequelize.FLOAT,
   radialPosEntrada2: Sequelize.FLOAT,
   radialPosSaida2: Sequelize.FLOAT,
   radialPosEntrada3: Sequelize.FLOAT,
   radialPosSaida3: Sequelize.FLOAT,

   radialTempoEntrada1: Sequelize.FLOAT,
   radialTempoSaida1: Sequelize.FLOAT,
   radialTempoEntrada2: Sequelize.FLOAT,
   radialTempoSaida2: Sequelize.FLOAT,
   radialTempoEntrada3: Sequelize.FLOAT,
   radialTempoSaida3: Sequelize.FLOAT,

   radialSCREntrada1: Sequelize.FLOAT,
   radialSCRSaida1: Sequelize.FLOAT,
   radialSCREntrada2: Sequelize.FLOAT,
   radialSCRSaida2: Sequelize.FLOAT,
   radialSCREntrada3: Sequelize.FLOAT,
   radialSCRSaida3: Sequelize.FLOAT,
})

// Clientes.hasMany(RevisaoFichaPastoreInjetores);
// Moldes.hasMany(RevisaoFichaPastoreInjetores);
// Maquinas.hasMany(RevisaoFichaPastoreInjetores);
// Produtos.hasMany(RevisaoFichaPastoreInjetores);
// MateriaPrima.hasMany(RevisaoFichaPastoreInjetores);
RevisaoFichaPastoreInjetores.belongsTo(Maquinas);

module.exports = RevisaoFichaPastoreInjetores;