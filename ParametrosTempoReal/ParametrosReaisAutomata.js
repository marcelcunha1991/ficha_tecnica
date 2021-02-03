const Sequelize = require("sequelize");
const conn = require("../database/database");

const ParametrosAtuais = conn.define('parametros_reais_automata',{

    mac: Sequelize.STRING,
    tempo_de_ciclo:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    tempo_de_fechamento_do_molde: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    tempo_de_abertura_do_molde: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    tempo_de_avanco_do_extrator: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    tempo_de_recuo_do_extrator: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    tempo_de_injecao: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    tempo_de_recalque: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    tempo_de_primeira_descompressao: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    tempo_de_segunda_descompressao: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    tempo_de_plastificacao: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    tempo_de_avanco_da_unidade_injetora: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    tempo_de_recuo_da_unidade_injetora:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    tempo_total_de_ciclo:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    temperatura_da_zona_do_bico: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    temperatura_da_zona_da_flange: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    temperatura_da_zona_A: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    temperatura_da_zona_B: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    temperatura_da_zona_C: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    temperatura_da_zona_D: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    temperatura_da_zona_E: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    temperatura_da_zona_F: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    velocidade_media_durante_a_injecao: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    pressao_media_durante_a_injecao: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    posicao_de_passagem_para_recalque: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    pressao_de_passagem_para_recalque: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    pressao_media_durante_o_recalque: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    colchao_minimo_de_injecao: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    velocidade_media_da_plastificacao: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    contra_pressao_media: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    posicao_de_dosagem: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } 
   


})

// ParametrosAtuais.sync();

module.exports = ParametrosAtuais;