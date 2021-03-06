const Sequelize = require("sequelize");
const conn = require("../database/database");


const Parametros = conn.define('ficha_tecnica_haitian_jupter',{

    mac: Sequelize.STRING,
 
    NUMERO_MAQUINA: Sequelize.STRING,
    COD_PAM: Sequelize.STRING,
    MATERIAL: Sequelize.STRING,
    DATA: Sequelize.STRING,
    TECNICO: Sequelize.STRING,
    //ALTURA_MOLDE: Sequelize.FLOAT,
    //TIPO_MACHO: Sequelize.STRING,
    //DIAMETRO_FURO_BICO: Sequelize.FLOAT,
    //MICRO_EXTRACAO: Sequelize.STRING,
    //BICO_HOMOGENIZADOR: Sequelize.STRING,
    //NUMERO_ZONAS_CAM_QUENTE: Sequelize.INTEGER,
    //MISTURADOR_PIGMENTO: Sequelize.STRING,
    //CONTROL_INJECAO: Sequelize.STRING,
    //PRE_AQUECIMENTO: Sequelize.STRING,
    //FORNECEDOR_MAT_PRIMA: Sequelize.STRING,
    //COD_PIGMENTO: Sequelize.STRING,
    MEIO_PIGMENTO: Sequelize.STRING,
    //FORNECEDOR_PIGMENTO: Sequelize.STRING,
    TEMPO_SECAGEM: Sequelize.STRING,
    TEMPERATURA_SECAGEM: Sequelize.STRING,
    //DESUMIDIFACADOR: Sequelize.STRING,
    //UTIL_MATERIAL_MOIDO: Sequelize.STRING,
    CLIENTE: Sequelize.STRING,
    PRODUTO: Sequelize.STRING,
    REVISAO: Sequelize.INTEGER,
    //Temperatura
    TEMPERATURA_ZONA_1 : {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPERATURA_ZONA_2 : {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPERATURA_ZONA_3 : {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPERATURA_ZONA_4 : {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPERATURA_ZONA_5 : {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPERATURA_ZONA_6 : {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPERATURA_ZONA_7 : {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPERATURA_BICO : {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },      
    PRESSAO_INJEC_MAX: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROTEC_MOLDE_MAX: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FORCA_FECHAMENTO: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPO_INJEC_REAL: {
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },   
    TEMPO_RECALQUE:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPO_ABERTURA_PLACA_MOVEL:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPO_FECHAMENTO_PLACA_MOVEL:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPO_EXTRACAO:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPO_DOSAGEM:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPO_RESFRIAMENTO:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPO_CICLO:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    VELOCIDADE_INJECAO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } , 
    VELOCIDADE_INJECAO_1_mm:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } , 
    VELOCIDADE_INJECAO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } , 
    VELOCIDADE_INJECAO_2_mm:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    VELOCIDADE_INJECAO_3 :{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    VELOCIDADE_INJECAO_3_mm:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    VELOCIDADE_INJECAO_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } , 
    VELOCIDADE_INJECAO_4_mm:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    VELOCIDADE_INJECAO_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } , 
    VELOCIDADE_INJECAO_5_mm:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    VELOCIDADE_INJECAO_6:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } , 
    VELOCIDADE_INJECAO_6_mm:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    VELOCIDADE_INJECAO_7:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } , 
    VELOCIDADE_INJECAO_7_mm:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    VELOCIDADE_INJECAO_8:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } , 
    VELOCIDADE_INJECAO_8_mm:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    VELOCIDADE_INJECAO_9:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } , 
    VELOCIDADE_INJECAO_9_mm:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    VELOCIDADE_INJECAO_10:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    VELOCIDADE_INJECAO_10_mm:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    } ,
    RECALQUE_PRESSAO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RECALQUE_TEMPO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RECALQUE_FLUXO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RECALQUE_PRESSAO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RECALQUE_TEMPO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RECALQUE_FLUXO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RECALQUE_PRESSAO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RECALQUE_TEMPO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RECALQUE_FLUXO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RECALQUE_PRESSAO_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RECALQUE_TEMPO_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RECALQUE_FLUXO_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RECALQUE_PRESSAO_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RECALQUE_TEMPO_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RECALQUE_FLUXO_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    VALVE_GATE_DELAY_TIME_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    VALVE_GATE_DELAY_TIME_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    VALVE_GATE_DELAY_TIME_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    VALVE_GATE_DELAY_TIME_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    VALVE_GATE_DELAY_TIME_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    VALVE_GATE_ACTIVE_TIME_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    VALVE_GATE_ACTIVE_TIME_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    VALVE_GATE_ACTIVE_TIME_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    VALVE_GATE_ACTIVE_TIME_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    VALVE_GATE_ACTIVE_TIME_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    SQ_RETARDO_11:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },    
    CAMARA_QUENTE_TEMPERATURA_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_6:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_7:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_8:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_9:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_10:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_11:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_12:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_13:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_14:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_15:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CAMARA_QUENTE_TEMPERATURA_16:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_PARTIDA_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_PRESSAO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_FLUXO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_CONTRAPRESSAO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_PARTIDA_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_PRESSAO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_FLUXO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_CONTRAPRESSAO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_PARTIDA_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_PRESSAO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_FLUXO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_CONTRAPRESSAO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_PARTIDA_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_PRESSAO_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_FLUXO_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_CONTRAPRESSAO_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_PARTIDA_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_PRESSAO_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_FLUXO_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    DOSAGEM_CONTRAPRESSAO_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_POSICAO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_POSICAO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_POSICAO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_POSICAO_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_POSICAO_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_PRESSAO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_PRESSAO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_PRESSAO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_PRESSAO_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_PRESSAO_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_FLUXO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_FLUXO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_FLUXO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_FLUXO_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    INJECAO_FLUXO_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    POSICAO_RECALQUE:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CURSO_DOSAGEM:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    RPM_ROSCA:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    CONTRA_PRESS_MAXIMA:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_POSICAO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_POSICAO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_POSICAO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_POSICAO_PROTECAO_MOLDE:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_POSICAO_ALTA_PRESSAO:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_PRESSAO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_PRESSAO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_PRESSAO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_PRESSAO_PROTECAO_MOLDE:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_PRESSAO_ALTA_PRESSAO:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_FLUXO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_FLUXO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_FLUXO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_FLUXO_PROTECAO_MOLDE:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    FECHAMENTO_FLUXO_ALTA_PRESSAO:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_POSICAO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_POSICAO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_POSICAO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_POSICAO_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_POSICAO_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_PRESSAO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_PRESSAO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_PRESSAO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_PRESSAO_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_PRESSAO_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_FLUXO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_FLUXO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_FLUXO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_FLUXO_4:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    ABERTURA_FLUXO_5:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    EXTRACAO_POSICAO_AVANCO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    EXTRACAO_POSICAO_AVANCO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    EXTRACAO_POSICAO_RECUO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    EXTRACAO_POSICAO_RECUO_3:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    EXTRACAO_PRESSAO_AVANCO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    EXTRACAO_PRESSAO_AVANCO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    EXTRACAO_PRESSAO_RECUO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    EXTRACAO_PRESSAO_RECUO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    EXTRACAO_FLUXO_AVANCO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    EXTRACAO_FLUXO_AVANCO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    EXTRACAO_FLUXO_RECUO_1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    EXTRACAO_FLUXO_RECUO_2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    NUMERO_REPETICOES:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    REF_MOLDE_LF:Sequelize.STRING,
    REF_MOLDE_LM:Sequelize.STRING,
    VAP_MINIMO:Sequelize.STRING,
    VAP_MAXIMO:Sequelize.STRING,
    PROG_MACHO_FUNC_E1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_FUNC_S1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_FUNC_E2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_FUNC_S2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_POSICAO_E1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_POSICAO_S1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_POSICAO_E2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_POSICAO_S2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_PARADA_E1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_PARADA_S1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_PARADA_E2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_PARADA_S2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_CDENTRO_E1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_CDENTRO_S1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_CDENTRO_E2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_CDENTRO_S2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_CFORA_E1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_CFORA_S1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_CFORA_E2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_CFORA_S2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_RETARDO_E1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_RETARDO_S1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_RETARDO_E2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_RETARDO_S2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },    
    PROG_MACHO_TATUACAO_E1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_TATUACAO_S1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_TATUACAO_E2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_TATUACAO_S2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_PRESSAO_E1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_PRESSAO_S1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_PRESSAO_E2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_PRESSAO_S2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_VELOCIDADE_E1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_VELOCIDADE_S1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_VELOCIDADE_E2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_VELOCIDADE_S2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_DETENTE_E1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_DETENTE_S1:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_DETENTE_E2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    PROG_MACHO_DETENTE_S2:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },
    TEMPERATURA_AGUA_TORRE:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },     
    TEMPERATURA_AGUA_GELADA:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },  
    PRESSAO_AGUA_TORRE:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    },     
    PRESSAO_AGUA_GELADA:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0
    }, 
    TECNICO_RESP:Sequelize.STRING,
    DATA:Sequelize.STRING

})


// Parametros.sync();


module.exports = Parametros;