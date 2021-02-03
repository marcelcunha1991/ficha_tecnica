// document.getElementById("prodShot").addEventListener("click", plotaGrafico);





if ($('#dsMaquina').val() != "") {

  $("#maquinas option").filter(function () {
    return this.text == $('#dsMaquina').val();
  }).attr('selected', true)

  atualizaConteudo();

}


function plotaGrafico2(area) {
  var value = $("#maquinas").val();


  var limites;
  var dados = [];
  console.log("value", value);

  console.log("ploty");


  $.ajax({
    url: '/parametrosCadastrados/' + value,
    method: 'get',
    dataType: 'json',
    success: function (parametrosMaquina) {
      console.log("Entrou no parametrosCadastrados")

      limites = parametrosMaquina;
      console.log(limites);

    }

  });

  $.ajax({
    url: '/parametrosReais/' + value,
    method: 'get',
    dataType: 'json',
    success: function (dadosp) {

      console.log("Dados:", dadosp)

      if (area == "cycleTime") {

        dadosp.forEach(function (nome, i) {
          dados.push(nome.cycleTime)
        })
      } else if (area == "dwellPressure") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.dwellPressure)
        })

      } else if (area == "fillingTime") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.fillingTime)
        })

      } else if (area == "chargingTime") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.chargingTime)
        })

      } else if (area == "takeoutTime") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.takeoutTime)
        })

      } else if (area == "dwellChnagePosition") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.dwellChnagePosition)
        })

      } else if (area == "cushionPosition") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.cushionPosition)
        })

      } else if (area == "minumumCushionPosition") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.minumumCushionPosition)
        })

      } else if (area == "injetStartPosition") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.injetStartPosition)
        })

      } else if (area == "maxInjectPressure") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.maxInjectPressure)
        })

      } else if (area == "screwRotationSpeed") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.screwRotationSpeed)
        })

      } else if (area == "temperature_hen") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperature_hen)
        })

      } else if (area == "temperature_hn") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperature_hn)
        })

      } else if (area == "temperature_h1") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperature_h1)
        })

      } else if (area == "temperature_h2") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperature_h2)
        })

      } else if (area == "temperature_h3") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperature_h3)
        })

      } else if (area == "temperature_h4") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperature_h4)
        })

      } else if (area == "temperature_h5") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperature_h5)
        })

      } else if (area == "temperature_oil") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperature_oil)
        })

      } else if (area == "temperature_hop") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperature_hop)
        })       

      }else if (area == "tempo_de_ciclo") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.tempo_de_ciclo)
        })       

      }else if (area == "tempo_de_fechamento_do_molde") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.tempo_de_fechamento_do_molde)
        })       

      }else if (area == "tempo_de_abertura_do_molde") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.tempo_de_abertura_do_molde)
        })       

      }else if (area == "tempo_de_avanco_do_extrator") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.tempo_de_avanco_do_extrator)
        })       

      }else if (area == "tempo_de_recuo_do_extrator") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.tempo_de_recuo_do_extrator)
        })       

      }else if (area == "tempo_de_injecao") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.tempo_de_injecao)
        })       

      }else if (area == "tempo_de_recalque") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.tempo_de_recalque)
        })       

      }else if (area == "tempo_de_primeira_descompressao") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.tempo_de_primeira_descompressao)
        })       

      }else if (area == "tempo_de_segunda_descompressao") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.tempo_de_segunda_descompressao)
        })       

      }else if (area == "tempo_de_plastificacao") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.tempo_de_plastificacao)
        })       

      }else if (area == "tempo_de_avanco_da_unidade_injetora") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.tempo_de_avanco_da_unidade_injetora)
        })       

      }else if (area == "tempo_de_recuo_da_unidade_injetora") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.tempo_de_recuo_da_unidade_injetora)
        })       

      }else if (area == "tempo_total_de_ciclo") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.tempo_total_de_ciclo)
        })       

      }else if (area == "temperatura_da_zona_do_bico") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperatura_da_zona_do_bico)
        })       

      }else if (area == "temperatura_da_zona_da_flange") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperatura_da_zona_da_flange)
        })       

      }else if (area == "temperatura_da_zona_A") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperatura_da_zona_A)
        })       

      }else if (area == "temperatura_da_zona_B") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperatura_da_zona_B)
        })       

      }else if (area == "temperatura_da_zona_C") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperatura_da_zona_C)
        })       

      }else if (area == "temperatura_da_zona_C") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperatura_da_zona_C)
        })       

      }else if (area == "temperatura_da_zona_D") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperatura_da_zona_D)
        })       

      }else if (area == "temperatura_da_zona_E") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperatura_da_zona_E)
        })       

      }else if (area == "temperatura_da_zona_F") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.temperatura_da_zona_F)
        })       

      }else if (area == "velocidade_media_durante_a_injecao") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.velocidade_media_durante_a_injecao)
        })       

      }else if (area == "pressao_media_durante_a_injecao") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.pressao_media_durante_a_injecao)
        })       

      }else if (area == "posicao_de_passagem_para_recalque") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.posicao_de_passagem_para_recalque)
        })       

      }else if (area == "pressao_de_passagem_para_recalque") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.pressao_de_passagem_para_recalque)
        })       

      }else if (area == "pressao_media_durante_o_recalque") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.pressao_media_durante_o_recalque)
        })       

      }else if (area == "colchao_minimo_de_injecao") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.colchao_minimo_de_injecao)
        })       

      }else if (area == "velocidade_media_da_plastificacao") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.velocidade_media_da_plastificacao)
        })       

      }else if (area == "contra_pressao_media") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.contra_pressao_media)
        })      

      }else if (area == "posicao_de_dosagem") {
        dadosp.forEach(function (nome, i) {
          dados.push(nome.posicao_de_dosagem)
        })       

      }



      var Data = {
        type: 'scatter',
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        y: dados,
        mode: 'lines+markers',
        name: 'Data',
        showlegend: true,
        hoverinfo: 'all',
        line: {
          color: 'blue',
          width: 2
        },
        marker: {
          color: 'blue',
          size: 8,
          symbol: 'circle'
        }
      }


      var limite_;

      if (area == "cycleTime") {
        limite_ = [limites.cycleTimeMin, limites.cycleTimeMin, null, limites.cycleTimeMax, limites.cycleTimeMax]
      } else if (area == "dwellPressure") {
        limite_ = [limites.dwellPressureMin, limites.dwellPressureMin, null, limites.dwellPressureMax, limites.dwellPressureMax]
      } else if (area == "fillingTime") {
        limite_ = [limites.fillingTimeMin, limites.fillingTimeMin, null, limites.fillingTimeMax, limites.fillingTimeMax]
      } else if (area == "chargingTime") {
        limite_ = [limites.chargingTimeMin, limites.chargingTimeMin, null, limites.chargingTimeMax, limites.chargingTimeMax]
      } else if (area == "takeoutTime") {
        limite_ = [limites.takeoutTimeMin, limites.takeoutTimeMin, null, limites.takeoutTimeMax, limites.takeoutTimeMax]
      } else if (area == "dwellChnagePosition") {
        limite_ = [limites.dwellChnagePositionMin, limites.dwellChnagePositionMin, null, limites.dwellChnagePositionMax, limites.dwellChnagePositionMax]
      } else if (area == "cushionPosition") {
        limite_ = [limites.cushionPositionMin, limites.cushionPositionMin, null, limites.cushionPositionMax, limites.cushionPositionMax]
      } else if (area == "minumumCushionPosition") {
        limite_ = [limites.minumumCushionPositionMin, limites.minumumCushionPositionMin, null, limites.minumumCushionPositionMax, limites.minumumCushionPositionMax]
      } else if (area == "injetStartPosition") {
        limite_ = [limites.injetStartPositionMin, limites.injetStartPositionMin, null, limites.injetStartPositionMax, limites.injetStartPositionMax]
      } else if (area == "maxInjectPressure") {
        limite_ = [limites.maxInjectPressureMin, limites.maxInjectPressureMin, null, limites.maxInjectPressureMax, limites.maxInjectPressureMax]
      } else if (area == "screwRotationSpeed") {
        limite_ = [limites.screwRotationSpeedMin, limites.screwRotationSpeedMin, null, limites.screwRotationSpeedMax, limites.screwRotationSpeedMax]
      } else if (area == "temperature_hen") {
        limite_ = [limites.temperature_henMin, limites.temperature_henMin, null, limites.temperature_henMax, limites.temperature_henMax]
      } else if (area == "temperature_hn") {
        limite_ = [limites.temperature_hnMin, limites.temperature_hnMin, null, limites.temperature_hnMax, limites.temperature_hnMax]
      } else if (area == "temperature_h1") {
        limite_ = [limites.temperature_h1Min, limites.temperature_h1Min, null, limites.temperature_h1Max, limites.temperature_h1Max]
      } else if (area == "temperature_h2") {
        limite_ = [limites.temperature_h2Min, limites.temperature_h2Min, null, limites.temperature_h2Max, limites.temperature_h2Max]
      } else if (area == "temperature_h3") {
        limite_ = [limites.temperature_h3Min, limites.temperature_h3Min, null, limites.temperature_h3Max, limites.temperature_h3Max]
      } else if (area == "temperature_h4") {
        limite_ = [limites.temperature_h4Min, limites.temperature_h4Min, null, limites.temperature_h4Max, limites.temperature_h4Max]
      } else if (area == "temperature_h5") {
        limite_ = [limites.temperature_h5Min, limites.temperature_h5Min, null, limites.temperature_h5Max, limites.temperature_h5Max]
      } else if (area == "temperature_oil") {
        limite_ = [limites.temperature_oilMin, limites.temperature_oilMin, null, limites.temperature_oilMax, limites.temperature_oilMax]
      } else if (area == "temperature_hop") {
        limite_ = [limites.temperature_hopMin, limites.temperature_hopMin, null, limites.temperature_hopMax, limites.temperature_hopMax]
      }else if (area == "tempo_de_ciclo") {
        limite_ = [limites.tempoDeCicloMin, limites.tempoDeCicloMin, null, limites.tempoDeCicloMax, limites.tempoDeCicloMax]
      } else if (area == "tempo_de_fechamento_do_molde") {
        limite_ = [limites.tempoDeFechamentoDoMoldeMin, limites.tempoDeFechamentoDoMoldeMin, null, limites.tempoDeFechamentoDoMoldeMax, limites.tempoDeFechamentoDoMoldeMax]
      } else if (area == "tempo_de_abertura_do_molde") {
        limite_ = [limites.tempoDeAberturaDoMoldeMin, limites.tempoDeAberturaDoMoldeMin, null, limites.tempoDeAberturaDoMoldeMax, limites.tempoDeAberturaDoMoldeMax]
      }else if (area == "tempo_de_avanco_do_extrator") {
        limite_ = [limites.tempoDeAvancoDoExtratorMin, limites.tempoDeAvancoDoExtratorMin, null, limites.tempoDeAvancoDoExtratorMax, limites.tempoDeAvancoDoExtratorMax]
      }else if (area == "tempo_de_recuo_do_extrator") {
        limite_ = [limites.tempoDeRecuoDoExtratorMin, limites.tempoDeRecuoDoExtratorMin, null, limites.tempoDeRecuoDoExtratorMax, limites.tempoDeRecuoDoExtratorMax]
      }else if (area == "tempo_de_injecao") {
        limite_ = [limites.tempoDeInjecaoMin, limites.tempoDeInjecaoMin, null, limites.tempoDeInjecaoMax, limites.tempoDeInjecaoMax]
      }else if (area == "tempo_de_recalque") {
        limite_ = [limites.tempoDeRecalqueMin, limites.tempoDeRecalqueMin, null, limites.tempoDeRecalqueMax, limites.tempoDeRecalqueMax]
      }else if (area == "tempo_de_primeira_descompressao") {
        limite_ = [limites.tempoDePrimeiraDescompressaoMin, limites.tempoDePrimeiraDescompressaoMin, null, limites.tempoDePrimeiraDescompressaoMax, limites.tempoDePrimeiraDescompressaoMax]
      }else if (area == "tempo_de_segunda_descompressao") {
        limite_ = [limites.tempoDeSegundaDescompressaoMin, limites.tempoDeSegundaDescompressaoMin, null, limites.tempoDeSegundaDescompressaoMax, limites.tempoDeSegundaDescompressaoMax]
      }else if (area == "tempo_de_plastificacao") {
        limite_ = [limites.tempoDePlastificacaoMin, limites.tempoDePlastificacaoMin, null, limites.tempoDePlastificacaoMax, limites.tempoDePlastificacaoMax]
      }else if (area == "tempo_de_avanco_da_unidade_injetora") {
        limite_ = [limites.tempoDeAvancoDaUnidadeInjetoraMin, limites.tempoDeAvancoDaUnidadeInjetoraMin, null, limites.tempoDeAvancoDaUnidadeInjetoraMax, limites.tempoDeAvancoDaUnidadeInjetoraMax]
      }else if (area == "tempo_de_recuo_da_unidade_injetora") {
        limite_ = [limites.tempoDeRecuoDaUnidadeInjetoraMin, limites.tempoDeRecuoDaUnidadeInjetoraMin, null, limites.tempoDeRecuoDaUnidadeInjetoraMax, limites.tempoDeRecuoDaUnidadeInjetoraMax]
      }else if (area == "tempo_total_de_ciclo") {
        limite_ = [limites.tempoTotalDeCicloMin, limites.tempoTotalDeCicloMin, null, limites.tempoTotalDeCicloMax, limites.tempoTotalDeCicloMax]
      }else if (area == "temperatura_da_zona_do_bico") {
        limite_ = [limites.temperaturaDaZonaDoBicoMin, limites.temperaturaDaZonaDoBicoMin, null, limites.temperaturaDaZonaDoBicoMax, limites.temperaturaDaZonaDoBicoMax]
      }else if (area == "temperatura_da_zona_da_flange") {
        limite_ = [limites.temperaturaDaZonaDaFlangeMin, limites.temperaturaDaZonaDaFlangeMin, null, limites.temperaturaDaZonaDaFlangeMax, limites.temperaturaDaZonaDaFlangeMax]
      }else if (area == "temperatura_da_zona_A") {
        limite_ = [limites.temperaturaDaZonaAMin, limites.temperaturaDaZonaAMin, null, limites.temperaturaDaZonaAMax, limites.temperaturaDaZonaAMax]
      }else if (area == "temperatura_da_zona_B") {
        limite_ = [limites.temperaturaDaZonaBMin, limites.temperaturaDaZonaBMin, null, limites.temperaturaDaZonaBMax, limites.temperaturaDaZonaBMax]
      }else if (area == "temperatura_da_zona_C") {
        limite_ = [limites.temperaturaDaZonaCMin, limites.temperaturaDaZonaCMin, null, limites.temperaturaDaZonaCMax, limites.temperaturaDaZonaCMax]
      }else if (area == "temperatura_da_zona_D") {
        limite_ = [limites.temperaturaDaZonaDMin, limites.temperaturaDaZonaDMin, null, limites.temperaturaDaZonaDMax, limites.temperaturaDaZonaDMax]
      }else if (area == "temperatura_da_zona_E") {
        limite_ = [limites.temperaturaDaZonaEMin, limites.temperaturaDaZonaEMin, null, limites.temperaturaDaZonaEMax, limites.temperaturaDaZonaEMax]
      }else if (area == "temperatura_da_zona_F") {
        limite_ = [limites.temperaturaDaZonaFMin, limites.temperaturaDaZonaFMin, null, limites.temperaturaDaZonaFMax, limites.temperaturaDaZonaFMax]
      }else if (area == "velocidade_media_durante_a_injecao") {
        limite_ = [limites.velocidadeMediaDuranteAInjecaoMin, limites.velocidadeMediaDuranteAInjecaoMin, null, limites.velocidadeMediaDuranteAInjecaoMax, limites.velocidadeMediaDuranteAInjecaoMax]
      }else if (area == "pressao_media_durante_a_injecao") {
        limite_ = [limites.pressaoMediaDuranteAInjecaoMin, limites.pressaoMediaDuranteAInjecaoMin, null, limites.pressaoMediaDuranteAInjecaoMax, limites.pressaoMediaDuranteAInjecaoMax]
      }else if (area == "posicao_de_passagem_para_recalque") {
        limite_ = [limites.posicaoDePassagemParaRecalqueMin, limites.posicaoDePassagemParaRecalqueMin, null, limites.posicaoDePassagemParaRecalqueMax, limites.posicaoDePassagemParaRecalqueMax]
      }else if (area == "pressao_de_passagem_para_recalque") {
        limite_ = [limites.pressaoDePassagemParaRecalqueMin, limites.pressaoDePassagemParaRecalqueMin, null, limites.pressaoDePassagemParaRecalqueMax, limites.pressaoDePassagemParaRecalqueMax]
      }else if (area == "pressao_media_durante_o_recalque") {
        limite_ = [limites.pressaoMediaDuranteORecalqueMin, limites.pressaoMediaDuranteORecalqueMin, null, limites.pressaoMediaDuranteORecalqueMax, limites.pressaoMediaDuranteORecalqueMax]
      }else if (area == "colchao_minimo_de_injecao") {
        limite_ = [limites.colchaoMinimoDeInjecaoMin, limites.colchaoMinimoDeInjecaoMin, null, limites.colchaoMinimoDeInjecaoMax, limites.colchaoMinimoDeInjecaoMax]
      }else if (area == "velocidade_media_da_plastificacao") {
        limite_ = [limites.velocidadeMediaDaPlastificacaoMin, limites.velocidadeMediaDaPlastificacaoMin, null, limites.velocidadeMediaDaPlastificacaoMax, limites.velocidadeMediaDaPlastificacaoMax]
      }else if (area == "contra_pressao_media") {
        limite_ = [limites.contraPressaoMediaMin, limites.contraPressaoMediaMin, null, limites.contraPressaoMediaMax, limites.contraPressaoMediaMax]
      }else if (area == "posicao_de_dosagem") {
        limite_ = [limites.posicaoDeDosagemMin, limites.posicaoDeDosagemMin, null, limites.posicaoDeDosagemMax, limites.posicaoDeDosagemMax]
      }


      var CL = {
        type: 'scatter',
        x: [0.5, 10, null, 0.5, 10],
        y: limite_,
        mode: 'lines',
        name: 'LCL/UCL',
        showlegend: true,
        line: {
          color: 'red',
          width: 2,
          dash: 'dash'
        }
      }

      var Centre = {
        type: 'scatter',
        x: [0.5, 10],
        y: [0, 0],
        mode: 'lines',
        name: 'Centre',
        showlegend: true,
        line: {
          color: 'grey',
          width: 2
        }
      }



      var range_;

      if (area == "cycleTime") {
        range_ = [limites.cycleTimeMin + 50, limites.cycleTimeMax - 50]
      } else if (area == "dwellPressure") {
        range_ = [limites.dwellPressureMin + 50, limites.dwellPressureMax - 50]
      } else if (area == "fillingTime") {
        range_ = [limites.fillingTimeMin + 50, limites.fillingTimeMax - 50]
      } else if (area == "chargingTime") {
        range_ = [limites.chargingTimeMin + 50, limites.chargingTimeMax - 50]
      } else if (area == "takeoutTime") {
        range_ = [limites.takeoutTimeMin + 50, limites.takeoutTimeMax - 50]
      } else if (area == "dwellChnagePosition") {
        range_ = [limites.dwellChnagePositionMin + 50, limites.dwellChnagePositionMax - 50]
      } else if (area == "cushionPosition") {
        range_ = [limites.cushionPositionMin + 50, limites.cushionPositionMax - 50]
      } else if (area == "minumumCushionPosition") {
        range_ = [limites.minumumCushionPositionMin + 50, limites.minumumCushionPositionMax - 50]
      } else if (area == "injetStartPosition") {
        range_ = [limites.injetStartPositionMin, limites.injetStartPositionMax]
      } else if (area == "maxInjectPressure") {
        range_ = [limites.maxInjectPressureMin, limites.maxInjectPressureMax]
      } else if (area == "screwRotationSpeed") {
        range_ = [limites.screwRotationSpeedMin + 50, limites.screwRotationSpeedMax - 50]
      } else if (area == "temperature_hen") {
        range_ = [limites.temperature_henMin + 50, limites.temperature_henMax - 50]
      } else if (area == "temperature_hn") {
        range_ = [limites.temperature_hnMin + 50, limites.temperature_hnMax - 50]
      } else if (area == "temperature_h1") {
        range_ = [limites.temperature_h1Min + 50, limites.temperature_h1Max - 50]
      } else if (area == "temperature_h2") {
        range_ = [limites.temperature_h2Min, limites.temperature_h2Max]
      } else if (area == "temperature_h3") {
        range_ = [limites.temperature_h3Min, limites.temperature_h3Max]
      } else if (area == "temperature_h4") {
        range_ = [limites.temperature_h4Min, limites.temperature_h4Max]
      } else if (area == "temperature_h5") {
        range_ = [limites.temperature_h5Min, limites.temperature_h5Max]
      } else if (area == "temperature_oil") {
        range_ = [limites.temperature_oilMin, limites.temperature_oilMax]
      } else if (area == "temperature_hop") {
        range_ = [limites.temperature_hopMin, limites.temperature_hopMax]
      }else if (area == "tempo_de_ciclo") {
        range_ = [limites.tempoDeCicloMin, limites.tempoDeCicloMax]
      }else if (area == "tempo_de_fechamento_do_molde") {
        range_ = [limites.tempoDeFechamentoDoMoldeMin, limites.tempoDeFechamentoDoMoldeMax]
      }else if (area == "tempo_de_abertura_do_molde") {
        range_ = [limites.tempoDeAberturaDoMoldeMin, limites.tempoDeAberturaDoMoldeMax]
      }else if (area == "tempo_de_avanco_do_extrator") {
        range_ = [limites.tempoDeAvancoDoExtratorMin, limites.tempoDeAvancoDoExtratorMax]
      }else if (area == "tempo_de_recuo_do_extrator") {
        range_ = [limites.tempoDeRecuoDoExtratorMin, limites.tempoDeRecuoDoExtratorMax]
      }else if (area == "tempo_de_injecao") {
        range_ = [limites.tempoDeInjecaoMin, limites.tempoDeInjecaoMax]
      }else if (area == "tempo_de_recalque") {
        range_ = [limites.tempoDeRecalqueMin, limites.tempoDeRecalqueMax]
      }else if (area == "tempo_de_primeira_descompressao") {
        range_ = [limites.tempoDePrimeiraDescompressaoMin, limites.tempoDePrimeiraDescompressaoMax]
      }else if (area == "tempo_de_segunda_descompressao") {
        range_ = [limites.tempoDeSegundaDescompressaoMin, limites.tempoDeSegundaDescompressaoMax]
      }else if (area == "tempo_de_plastificacao") {
        range_ = [limites.tempoDePlastificacaoMin, limites.tempoDePlastificacaoMax]
      }else if (area == "tempo_de_avanco_da_unidade_injetora") {
        range_ = [limites.tempoDeAvancoDaUnidadeInjetoraMin, limites.tempoDeAvancoDaUnidadeInjetoraMax]
      }else if (area == "tempo_de_recuo_da_unidade_injetora") {
        range_ = [limites.tempoDeRecuoDaUnidadeInjetoraMin, limites.tempoDeRecuoDaUnidadeInjetoraMax]
      }else if (area == "tempo_total_de_ciclo") {
        range_ = [limites.tempoTotalDeCicloMin, limites.tempoTotalDeCicloMax]
      }else if (area == "temperatura_da_zona_do_bico") {
        range_ = [limites.temperaturaDaZonaDoBicoMin, limites.temperaturaDaZonaDoBicoMax]
      }else if (area == "temperatura_da_zona_da_flange") {
        range_ = [limites.temperaturaDaZonaDaFlangeMin, limites.temperaturaDaZonaDaFlangeMax]
      }else if (area == "temperatura_da_zona_A") {
        range_ = [limites.temperaturaDaZonaAMin, limites.temperaturaDaZonaAMax]
      }else if (area == "temperatura_da_zona_B") {
        range_ = [limites.temperaturaDaZonaBMin, limites.temperaturaDaZonaBMax]
      }else if (area == "temperatura_da_zona_C") {
        range_ = [limites.temperaturaDaZonaCMin, limites.temperaturaDaZonaCMax]
      }else if (area == "temperatura_da_zona_D") {
        range_ = [limites.temperaturaDaZonaDMin, limites.temperaturaDaZonaDMax]
      }else if (area == "temperatura_da_zona_E") {
        range_ = [limites.temperaturaDaZonaEMin, limites.temperaturaDaZonaEMax]
      }else if (area == "temperatura_da_zona_F") {
        range_ = [limites.temperaturaDaZonaFMin, limites.temperaturaDaZonaFMax]
      }else if (area == "velocidade_media_durante_a_injecao") {
        range_ = [limites.velocidadeMediaDuranteAInjecaoMin, limites.velocidadeMediaDuranteAInjecaoMax]
      }else if (area == "pressao_media_durante_a_injecao") {
        range_ = [limites.pressaoMediaDuranteAInjecaoMin, limites.pressaoMediaDuranteAInjecaoMax]
      }else if (area == "posicao_de_passagem_para_recalque") {
        range_ = [limites.posicaoDePassagemParaRecalqueMin, limites.posicaoDePassagemParaRecalqueMax]
      }else if (area == "pressao_de_passagem_para_recalque") {
        range_ = [limites.pressaoDePassagemParaRecalqueMin, limites.pressaoDePassagemParaRecalqueMax]
      }else if (area == "pressao_media_durante_o_recalque") {
        range_ = [limites.pressaoMediaDuranteORecalqueMin, limites.pressaoMediaDuranteORecalqueMax]
      }else if (area == "colchao_minimo_de_injecao") {
        range_ = [limites.colchaoMinimoDeInjecaoMin, limites.colchaoMinimoDeInjecaoMax]
      }else if (area == "velocidade_media_da_plastificacao") {
        range_ = [limites.velocidadeMediaDaPlastificacaoMin, limites.velocidadeMediaDaPlastificacaoMax]
      }else if (area == "contra_pressao_media") {
        range_ = [limites.contraPressaoMediaMin, limites.contraPressaoMediaMax]
      }else if (area == "posicao_de_dosagem") {
        range_ = [limites.posicaoDeDosagemMin, limites.posicaoDeDosagemMax]
      }

      var histo = {
        type: 'histogram',
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        y: [4, 2, -1, 4, -5, -7, 0, 3, 8],
        name: 'Distribution',
        orientation: 'h',
        marker: {
          color: 'blue',
          line: {
            color: 'white',
            width: 1
          }
        },
        xaxis: 'x2',
        yaxis: 'y2'
      }


      // var layout = {
      //   title: 'Carta de Controle',
      //   xaxis: {
      //     zeroline: false
      //   },
      //   yaxis: {
      //     range: range_,
      //     zeroline: false
      //   }
      // }
      var data = [Data, CL, Centre, histo]

      var layout = {
        title: 'Basic SPC Chart',
        xaxis: {
          domain: [0, 0.7], // 0 to 70% of width
          zeroline: false
        },
        yaxis: {
          range: range_,
          zeroline: false
        },
        xaxis2: {
          domain: [0.8, 1] // 70 to 100% of width
        },
        yaxis2: {
          anchor: 'x2',
          showticklabels: false
        }
      }

      Plotly.newPlot('plotly', data, layout);



    }

  });






}


function plotaGrafico() {
  var value = $("#maquinas").val();

  var limites;
  var dados = [];
  console.log("value", value);

  console.log("ploty");


  $.ajax({
    url: '/parametrosCadastrados/' + value,
    method: 'get',
    dataType: 'json',
    success: function (parametrosMaquina) {
      console.log("Entrou no parametrosCadastrados")

      limites = parametrosMaquina;

    }

  });

  $.ajax({
    url: '/parametrosReais/' + value,
    method: 'get',
    dataType: 'json',
    success: function (dadosp) {

      console.log("Dados:", dadosp)

      dadosp.forEach(function (nome, i) {
        dados.push(nome.prodShot)
      })




      var Data = {
        type: 'scatter',
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        y: dados,
        mode: 'lines+markers',
        name: 'Data',
        showlegend: true,
        hoverinfo: 'all',
        line: {
          color: 'blue',
          width: 2
        },
        marker: {
          color: 'blue',
          size: 8,
          symbol: 'circle'
        }
      }



      var CL = {
        type: 'scatter',
        x: [0.5, 10, null, 0.5, 10],
        y: [-5, -5, null, 5, 5],
        mode: 'lines',
        name: 'LCL/UCL',
        showlegend: true,
        line: {
          color: 'red',
          width: 2,
          dash: 'dash'
        }
      }

      var Centre = {
        type: 'scatter',
        x: [0.5, 10],
        y: [0, 0],
        mode: 'lines',
        name: 'Centre',
        showlegend: true,
        line: {
          color: 'grey',
          width: 2
        }
      }

      var data = [Data, CL, Centre]

      var layout = {
        title: 'Carta de Controle',
        xaxis: {
          zeroline: false
        },
        yaxis: {
          range: [0, 1000],
          zeroline: false
        }
      }

      Plotly.newPlot('plotly', data, layout);



    }

  });






}


function atualizaConteudo() {

  setInterval(function () {
    var maquina;


    //OBTEM DADOS DE MAQUINA
    $.ajax({
      url: '/maquinaById/' + $("#maquinas").val(),
      method: 'get',
      dataType: 'json',
      success: function (maquina_) {




        //PREECHE TABELA DE ALERTAS
        $.ajax({
          url: '/getAlertasAbertos/' + $("#maquinas").val(),
          method: 'get',
          dataType: 'json',
          success: function (alertasAbertos) {
            $("#alertas tr").remove();

            var line = "<tr >" +
              "<th> Descrição dos Alertas </th>" +
              "</tr>"

            alertasAbertos.forEach(element => {
              console.log(element.alertasAutomatum);
              line = line +
                "<td>" + element.alertasAutomatum.descricao + "</td>" +

                "</tr>"
            })

            tableBody = $("#alertas tbody");
            tableBody.append(line);


          }
        })


        // PREENCHE TABELA DE PARAMETROS EM TEMPO REAL
        $.ajax({
          url: '/fichasUltimo/maquina/' + $("#maquinas").val(),
          method: 'get',
          dataType: 'json',
          success: function (parametrosAtuais) {

            console.log(parametrosAtuais)

            $.ajax({
              url: '/parametrosMediosReais/maquina/' + $("#maquinas").val(),
              method: 'get',
              dataType: 'json',
              success: function (parametrosMediosReais) {

                console.log(parametrosMediosReais)

                $("#parametrosReais tr").remove();                

                if (maquina_.tipoId == 1) {
                  tags = "<tr >" +
                    "<th> Parâmetro </th>" +
                    "<th>" + "Valor Mínimo" + "</th>" +
                    "<th>" + "Valor Máximo" + "</th>" +
                    "<th>" + "Último valor lido" + "</th>" +
                    "<th>" + "Plota Gráfico" + "</th>" +
                    "</tr>"

                  if (parametrosMediosReais.prodShotMax < parametrosAtuais.prodShot || parametrosMediosReais.prodShotMin > parametrosAtuais.prodShot) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Production Shot </td>" +
                      "<td>" + parametrosMediosReais.prodShotMin + "</td>" +
                      "<td>" + parametrosMediosReais.prodShotMax + "</td>" +
                      "<td>" + parametrosAtuais.prodShot + "</td>" +
                      "<td>" + '<label id="cycleTime"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> </label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                      "<td> Production Shot </td>" +
                      "<td>" + parametrosMediosReais.prodShotMin + "</td>" +
                      "<td>" + parametrosMediosReais.prodShotMax + "</td>" +
                      "<td>" + parametrosAtuais.prodShot + "</td>" +
                      "<td>" + '<label id="cycleTime"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> </label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.cycleTimeMax < parametrosAtuais.cycleTime || parametrosMediosReais.cycleTimeMin > parametrosAtuais.cycleTime) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Cycle Time </td>" +
                      "<td>" + parametrosMediosReais.cycleTimeMin + "</td>" +
                      "<td>" + parametrosMediosReais.cycleTimeMax + "</td>" +
                      "<td>" + parametrosAtuais.cycleTime + "</td>" +
                      "<td>" + '<label id="cycleTime"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                      "<td> Cycle Time </td>" +
                      "<td>" + parametrosMediosReais.cycleTimeMin + "</td>" +
                      "<td>" + parametrosMediosReais.cycleTimeMax + "</td>" +
                      "<td>" + parametrosAtuais.cycleTime + "</td>" +
                      "<td>" + '<label id="cycleTime"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.dwellPressureMax < parametrosAtuais.dwellPressure || parametrosMediosReais.dwellPressureMin > parametrosAtuais.dwellPressure) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Dwell Pressure </td>" +
                      "<td>" + parametrosMediosReais.dwellPressureMin + "</td>" +
                      "<td>" + parametrosMediosReais.dwellPressureMax + "</td>" +
                      "<td>" + parametrosAtuais.dwellPressure + "</td>" +
                      "<td>" + '<label id="dwellPressure"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"

                  } else {
                    tags = tags + "<tr>" +
                      "<td> Dwell Pressure </td>" +
                      "<td>" + parametrosMediosReais.dwellPressureMin + "</td>" +
                      "<td>" + parametrosMediosReais.dwellPressureMax + "</td>" +
                      "<td>" + parametrosAtuais.dwellPressure + "</td>" +
                      "<td>" + '<label id="dwellPressure"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }


                  if (parametrosMediosReais.ok_prodShotMax < parametrosAtuais.ok_prodShot || parametrosMediosReais.ok_prodShotMin > parametrosAtuais.ok_prodShot) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Ok ProdShot </td>" +
                      "<td>" + parametrosMediosReais.ok_prodShotMin + "</td>" +
                      "<td>" + parametrosMediosReais.ok_prodShotMax + "</td>" +
                      "<td>" + parametrosAtuais.ok_prodShot + "</td>" +
                      "<td>" + '<label id="ok_prodShot"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"

                  } else {
                    tags = tags + "<tr>" +
                      "<td> Ok ProdShot </td>" +
                      "<td>" + parametrosMediosReais.ok_prodShotMin + "</td>" +
                      "<td>" + parametrosMediosReais.ok_prodShotMax + "</td>" +
                      "<td>" + parametrosAtuais.ok_prodShot + "</td>" +
                      "<td>" + '<label id="ok_prodShot"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }


                  if (parametrosMediosReais.fillingTimeMax < parametrosAtuais.fillingTime || parametrosMediosReais.fillingTimeMin > parametrosAtuais.fillingTime) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Filling Time </td>" +
                      "<td>" + parametrosMediosReais.fillingTimeMin + "</td>" +
                      "<td>" + parametrosMediosReais.fillingTimeMax + "</td>" +
                      "<td>" + parametrosAtuais.fillingTime + "</td>" +
                      "<td>" + '<label id="fillingTime"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  } else {
                    tags = tags + "<tr>" +
                      "<td> Filling Time </td>" +
                      "<td>" + parametrosMediosReais.fillingTimeMin + "</td>" +
                      "<td>" + parametrosMediosReais.fillingTimeMax + "</td>" +
                      "<td>" + parametrosAtuais.fillingTime + "</td>" +
                      "<td>" + '<label id="fillingTime"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"
                  }

                  if (parametrosMediosReais.chargingTimeMax < parametrosAtuais.chargingTime || parametrosMediosReais.chargingTimeMin > parametrosAtuais.chargingTime) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Charging Time </td>" +
                      "<td>" + parametrosMediosReais.chargingTimeMin + "</td>" +
                      "<td>" + parametrosMediosReais.chargingTimeMax + "</td>" +
                      "<td>" + parametrosAtuais.chargingTime + "</td>" +
                      "<td>" + '<label id="chargingTime"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  } else {
                    tags = tags + "<tr>" +
                      "<td> Charging Time </td>" +
                      "<td>" + parametrosMediosReais.chargingTimeMin + "</td>" +
                      "<td>" + parametrosMediosReais.chargingTimeMax + "</td>" +
                      "<td>" + parametrosAtuais.chargingTime + "</td>" +
                      "<td>" + '<label id="chargingTime"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"
                  }


                  if (parametrosMediosReais.takeoutTimeMax < parametrosAtuais.takeoutTime || parametrosMediosReais.takeoutTimeMin > parametrosAtuais.takeoutTime) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Take Out Time </td>" +
                      "<td>" + parametrosMediosReais.takeoutTimeMin + "</td>" +
                      "<td>" + parametrosMediosReais.takeoutTimeMax + "</td>" +
                      "<td>" + parametrosAtuais.takeoutTime + "</td>" +
                      "<td>" + '<label id="takeoutTime"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  } else {
                    tags = tags + "<tr>" +
                      "<td> Take Out Time </td>" +
                      "<td>" + parametrosMediosReais.takeoutTimeMin + "</td>" +
                      "<td>" + parametrosMediosReais.takeoutTimeMax + "</td>" +
                      "<td>" + parametrosAtuais.takeoutTime + "</td>" +
                      "<td>" + '<label id="takeoutTime"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"
                  }

                  if (parametrosMediosReais.dwellChnagePositionMax < parametrosAtuais.dwellChnagePosition || parametrosMediosReais.dwellChnagePositionMin > parametrosAtuais.dwellChnagePosition) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Dwell Change Position </td>" +
                      "<td>" + parametrosMediosReais.dwellChnagePositionMin + "</td>" +
                      "<td>" + parametrosMediosReais.dwellChnagePositionMax + "</td>" +
                      "<td>" + parametrosAtuais.dwellChnagePosition + "</td>" +
                      "<td>" + '<label id="dwellChnagePosition"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  } else {
                    tags = tags + "<tr>" +
                      "<td> Dwell Change Position </td>" +
                      "<td>" + parametrosMediosReais.dwellChnagePositionMin + "</td>" +
                      "<td>" + parametrosMediosReais.dwellChnagePositionMax + "</td>" +
                      "<td>" + parametrosAtuais.dwellChnagePosition + "</td>" +
                      "<td>" + '<label id="dwellChnagePosition"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"
                  }


                  if (parametrosMediosReais.cushionPositionMax < parametrosAtuais.cushionPosition || parametrosMediosReais.cushionPositionMin > parametrosAtuais.cushionPosition) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Cushion Position </td>" +
                      "<td>" + parametrosMediosReais.cushionPositionMin + "</td>" +
                      "<td>" + parametrosMediosReais.cushionPositionMax + "</td>" +
                      "<td>" + parametrosAtuais.cushionPosition + "</td>" +
                      "<td>" + '<label id="cushionPosition"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  } else {
                    tags = tags + "<tr>" +
                      "<td> Cushion Position </td>" +
                      "<td>" + parametrosMediosReais.cushionPositionMin + "</td>" +
                      "<td>" + parametrosMediosReais.cushionPositionMax + "</td>" +
                      "<td>" + parametrosAtuais.cushionPosition + "</td>" +
                      "<td>" + '<label id="cushionPosition"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"
                  }


                  if (parametrosMediosReais.chargingTimeMax < parametrosAtuais.chargingTime || parametrosMediosReais.chargingTimeMin > parametrosAtuais.chargingTime) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Charging Time </td>" +
                      "<td>" + parametrosMediosReais.chargingTimeMin + "</td>" +
                      "<td>" + parametrosMediosReais.chargingTimeMax + "</td>" +
                      "<td>" + parametrosAtuais.chargingTime + "</td>" +
                      "<td>" + '<label id="chargingTime"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"


                  } else {

                    tags = tags + "<tr>" +
                      "<td> Charging Time </td>" +
                      "<td>" + parametrosMediosReais.chargingTimeMin + "</td>" +
                      "<td>" + parametrosMediosReais.chargingTimeMax + "</td>" +
                      "<td>" + parametrosAtuais.chargingTime + "</td>" +
                      "<td>" + '<label id="chargingTime"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"
                  }


                  if (parametrosMediosReais.minumumCushionPositionMax < parametrosAtuais.minumumCushionPosition || parametrosMediosReais.minumumCushionPositionMin > parametrosAtuais.minumumCushionPosition) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Minumum Cushion Position </td>" +
                      "<td>" + parametrosMediosReais.minumumCushionPositionMin + "</td>" +
                      "<td>" + parametrosMediosReais.minumumCushionPositionMax + "</td>" +
                      "<td>" + parametrosAtuais.minumumCushionPosition + "</td>" +
                      "<td>" + '<label id="minumumCushionPosition"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  } else {
                    tags = tags + "<tr>" +
                      "<td> Minumum Cushion Position </td>" +
                      "<td>" + parametrosMediosReais.minumumCushionPositionMin + "</td>" +
                      "<td>" + parametrosMediosReais.minumumCushionPositionMax + "</td>" +
                      "<td>" + parametrosAtuais.minumumCushionPosition + "</td>" +
                      "<td>" + '<label id="minumumCushionPosition"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  }


                  if (parametrosMediosReais.injetStartPositionMax < parametrosAtuais.injetStartPosition || parametrosMediosReais.injetStartPositionMin > parametrosAtuais.injetStartPosition) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Injet Start Position </td>" +
                      "<td>" + parametrosMediosReais.injetStartPositionMin + "</td>" +
                      "<td>" + parametrosMediosReais.injetStartPositionMax + "</td>" +
                      "<td>" + parametrosAtuais.injetStartPosition + "</td>" +
                      "<td>" + '<label id="injetStartPosition"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  } else {
                    tags = tags + "<tr>" +
                      "<td> Injet Start Position </td>" +
                      "<td>" + parametrosMediosReais.injetStartPositionMin + "</td>" +
                      "<td>" + parametrosMediosReais.injetStartPositionMax + "</td>" +
                      "<td>" + parametrosAtuais.injetStartPosition + "</td>" +
                      "<td>" + '<label id="injetStartPosition"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  }

                  if (parametrosMediosReais.maxInjectPressureMax < parametrosAtuais.maxInjectPressure || parametrosMediosReais.maxInjectPressureMin > parametrosAtuais.maxInjectPressure) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Max Inject Pressure </td>" +
                      "<td>" + parametrosMediosReais.maxInjectPressureMin + "</td>" +
                      "<td>" + parametrosMediosReais.maxInjectPressureMax + "</td>" +
                      "<td>" + parametrosAtuais.maxInjectPressure + "</td>" +
                      "<td>" + '<label id="maxInjectPressure"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  } else {
                    tags = tags + "<tr>" +
                      "<td> Max Inject Pressure </td>" +
                      "<td>" + parametrosMediosReais.maxInjectPressureMin + "</td>" +
                      "<td>" + parametrosMediosReais.maxInjectPressureMax + "</td>" +
                      "<td>" + parametrosAtuais.maxInjectPressure + "</td>" +
                      "<td>" + '<label id="maxInjectPressure"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  }


                  if (parametrosMediosReais.screwRotationSpeedMax < parametrosAtuais.screwRotationSpeed || parametrosMediosReais.screwRotationSpeedMin > parametrosAtuais.screwRotationSpeed) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Screw Rotation Speed </td>" +
                      "<td>" + parametrosMediosReais.screwRotationSpeedMin + "</td>" +
                      "<td>" + parametrosMediosReais.screwRotationSpeedMax + "</td>" +
                      "<td>" + parametrosAtuais.screwRotationSpeed + "</td>" +
                      "<td>" + '<label id="screwRotationSpeed"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  } else {
                    tags = tags + "<tr>" +
                      "<td> Screw Rotation Speed </td>" +
                      "<td>" + parametrosMediosReais.screwRotationSpeedMin + "</td>" +
                      "<td>" + parametrosMediosReais.screwRotationSpeedMax + "</td>" +
                      "<td>" + parametrosAtuais.screwRotationSpeed + "</td>" +
                      "<td>" + '<label id="screwRotationSpeed"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  }


                  if (parametrosMediosReais.temperature_henMax < parametrosAtuais.temperature_hen || parametrosMediosReais.temperature_henMin > parametrosAtuais.temperature_hen) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Temperature Hen </td>" +
                      "<td>" + parametrosMediosReais.temperature_henMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_henMax + "</td>" +
                      "<td>" + parametrosAtuais.temperature_hen + "</td>" +
                      "<td>" + '<label id="temperature_hen"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  } else {

                    tags = tags + "<tr>" +
                      "<td> Temperature Hen </td>" +
                      "<td>" + parametrosMediosReais.temperature_henMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_henMax + "</td>" +
                      "<td>" + parametrosAtuais.temperature_hen + "</td>" +
                      "<td>" + '<label id="temperature_hen"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  }


                  if (parametrosMediosReais.temperature_hnMax < parametrosAtuais.temperature_hn || parametrosMediosReais.temperature_hnMin > parametrosAtuais.temperature_hn) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Temperature Hen </td>" +
                      "<td>" + parametrosMediosReais.temperature_hnMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_hnMax + "</td>" +
                      "<td>" + parametrosAtuais.temperature_hn + "</td>" +
                      "<td>" + '<label id="temperature_hn"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  } else {

                    tags = tags + "<tr>" +
                      "<td> Temperature Hen </td>" +
                      "<td>" + parametrosMediosReais.temperature_hnMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_hnMax + "</td>" +
                      "<td>" + parametrosAtuais.temperature_hn + "</td>" +
                      "<td>" + '<label id="temperature_hn"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  }

                  if (parametrosMediosReais.temperature_h1Max < parametrosAtuais.temperature_h1 || parametrosMediosReais.temperature_h1Min > parametrosAtuais.temperature_h1) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Temperature H1 </td>" +
                      "<td>" + parametrosMediosReais.temperature_h1Min + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_h1Max + "</td>" +
                      "<td>" + parametrosAtuais.temperature_h1 + "</td>" +
                      "<td>" + '<label id="temperature_h1"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"


                  } else {

                    tags = tags + "<tr>" +
                      "<td> Temperature H1 </td>" +
                      "<td>" + parametrosMediosReais.temperature_h1Min + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_h1Max + "</td>" +
                      "<td>" + parametrosAtuais.temperature_h1 + "</td>" +
                      "<td>" + '<label id="temperature_h1"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"
                  }



                  if (parametrosMediosReais.temperature_h2Max < parametrosAtuais.temperature_h2 || parametrosMediosReais.temperature_h2Min > parametrosAtuais.temperature_h2) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Temperature H2 </td>" +
                      "<td>" + parametrosMediosReais.temperature_h2Min + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_h2Max + "</td>" +
                      "<td>" + parametrosAtuais.temperature_h2 + "</td>" +
                      "<td>" + '<label id="temperature_h2"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"


                  } else {

                    tags = tags + "<tr>" +
                      "<td> Temperature H2 </td>" +
                      "<td>" + parametrosMediosReais.temperature_h2Min + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_h2Max + "</td>" +
                      "<td>" + parametrosAtuais.temperature_h2 + "</td>" +
                      "<td>" + '<label id="temperature_h2"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.temperature_h3Max < parametrosAtuais.temperature_h3 || parametrosMediosReais.temperature_h3Min > parametrosAtuais.temperature_h3) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Temperature H3 </td>" +
                      "<td>" + parametrosMediosReais.temperature_h3Min + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_h3Max + "</td>" +
                      "<td>" + parametrosAtuais.temperature_h3 + "</td>" +
                      "<td>" + '<label id="temperature_h3"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  } else {
                    tags = tags + "<tr>" +
                      "<td> Temperature H3 </td>" +
                      "<td>" + parametrosMediosReais.temperature_h3Min + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_h3Max + "</td>" +
                      "<td>" + parametrosAtuais.temperature_h3 + "</td>" +
                      "<td>" + '<label id="temperature_h3"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"
                  }

                  if (parametrosMediosReais.temperature_h4Max < parametrosAtuais.temperature_h4 || parametrosMediosReais.temperature_h4Min > parametrosAtuais.temperature_h4) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Temperature H4 </td>" +
                      "<td>" + parametrosMediosReais.temperature_h4Min + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_h4Max + "</td>" +
                      "<td>" + parametrosAtuais.temperature_h4 + "</td>" +
                      "<td>" + '<label id="temperature_h4"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  } else {
                    tags = tags + "<tr>" +
                      "<td> Temperature H4 </td>" +
                      "<td>" + parametrosMediosReais.temperature_h4Min + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_h4Max + "</td>" +
                      "<td>" + parametrosAtuais.temperature_h4 + "</td>" +
                      "<td>" + '<label id="temperature_h4"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"
                  }

                  if (parametrosMediosReais.temperature_h5Max < parametrosAtuais.temperature_h5 || parametrosMediosReais.temperature_h5Min > parametrosAtuais.temperature_h5) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Temperature H5 </td>" +
                      "<td>" + parametrosMediosReais.temperature_h5Min + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_h5Max + "</td>" +
                      "<td>" + parametrosAtuais.temperature_h5 + "</td>" +
                      "<td>" + '<label id="temperature_h5"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  } else {
                    tags = tags + "<tr>" +
                      "<td> Temperature H5 </td>" +
                      "<td>" + parametrosMediosReais.temperature_h5Min + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_h5Max + "</td>" +
                      "<td>" + parametrosAtuais.temperature_h5 + "</td>" +
                      "<td>" + '<label id="temperature_h5"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  }


                  if (parametrosMediosReais.temperature_oilMax < parametrosAtuais.temperature_oil || parametrosMediosReais.temperature_oilMin > parametrosAtuais.temperature_oil) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Temperature OIL </td>" +
                      "<td>" + parametrosMediosReais.temperature_oilMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_oilMax + "</td>" +
                      "<td>" + parametrosAtuais.temperature_oil + "</td>" +
                      "<td>" + '<label id="temperature_oil"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"


                  } else {

                    tags = tags + "<tr>" +
                      "<td> Temperature OIL </td>" +
                      "<td>" + parametrosMediosReais.temperature_oilMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_oilMax + "</td>" +
                      "<td>" + parametrosAtuais.temperature_oil + "</td>" +
                      "<td>" + '<label id="temperature_oil"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"
                  }


                  if (parametrosMediosReais.temperature_hopMax < parametrosAtuais.temperature_hop || parametrosMediosReais.temperature_hopMin > parametrosAtuais.temperature_hop) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Temperature HOP </td>" +
                      "<td>" + parametrosMediosReais.temperature_hopMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_hopMax + "</td>" +
                      "<td>" + parametrosAtuais.temperature_hop + "</td>" +
                      "<td>" + '<label id="temperature_hop"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"


                  } else {
                    tags = tags + "<tr>" +
                      "<td> Temperature HOP </td>" +
                      "<td>" + parametrosMediosReais.temperature_hopMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperature_hopMax + "</td>" +
                      "<td>" + parametrosAtuais.temperature_hop + "</td>" +
                      "<td>" + '<label id="temperature_hop"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +

                      "</tr>"

                  }

                  tableBody = $("#parametrosReais tbody");
                  tableBody.append(tags);

                  document.getElementById("cycleTime").addEventListener("click", function () {
                    plotaGrafico2("cycleTime");
                  }, false);

                  document.getElementById("dwellPressure").addEventListener("click", function () {
                    plotaGrafico2("dwellPressure");
                  }, false);

                  document.getElementById("fillingTime").addEventListener("click", function () {
                    plotaGrafico2("fillingTime");
                  }, false);

                  document.getElementById("chargingTime").addEventListener("click", function () {
                    plotaGrafico2("chargingTime");
                  }, false);

                  document.getElementById("takeoutTime").addEventListener("click", function () {
                    plotaGrafico2("takeoutTime");
                  }, false);

                  document.getElementById("dwellChnagePosition").addEventListener("click", function () {
                    plotaGrafico2("dwellChnagePosition");
                  }, false);

                  document.getElementById("cushionPosition").addEventListener("click", function () {
                    plotaGrafico2("cushionPosition");
                  }, false);

                  document.getElementById("minumumCushionPosition").addEventListener("click", function () {
                    plotaGrafico2("minumumCushionPosition");
                  }, false);

                  document.getElementById("injetStartPosition").addEventListener("click", function () {
                    plotaGrafico2("injetStartPosition");
                  }, false);

                  document.getElementById("maxInjectPressure").addEventListener("click", function () {
                    plotaGrafico2("maxInjectPressure");
                  }, false);

                  document.getElementById("screwRotationSpeed").addEventListener("click", function () {
                    plotaGrafico2("screwRotationSpeed");
                  }, false);

                  document.getElementById("temperature_hen").addEventListener("click", function () {
                    plotaGrafico2("temperature_hen");
                  }, false);

                  document.getElementById("temperature_hn").addEventListener("click", function () {
                    plotaGrafico2("temperature_hn");
                  }, false);

                  document.getElementById("temperature_h1").addEventListener("click", function () {
                    plotaGrafico2("temperature_h1");
                  }, false);

                  document.getElementById("temperature_h2").addEventListener("click", function () {
                    plotaGrafico2("temperature_h2");
                  }, false);

                  document.getElementById("temperature_h3").addEventListener("click", function () {
                    plotaGrafico2("temperature_h3");
                  }, false);

                  document.getElementById("temperature_h4").addEventListener("click", function () {
                    plotaGrafico2("temperature_h4");
                  }, false);

                  document.getElementById("temperature_h5").addEventListener("click", function () {
                    plotaGrafico2("temperature_h5");
                  }, false);

                  document.getElementById("temperature_oil").addEventListener("click", function () {
                    plotaGrafico2("temperature_oil");
                  }, false);

                  document.getElementById("temperature_hop").addEventListener("click", function () {
                    plotaGrafico2("temperature_hop");
                  }, false);


                } else if (maquina_.tipoId == 2) {

                  console.log("Entrou no tipo 2")
                

                  tags = "<tr >" +
                    "<th> Parâmetro </th>" +
                    "<th>" + "Valor Mínimo" + "</th>" +
                    "<th>" + "Valor Máximo" + "</th>" +
                    "<th>" + "Último valor lido" + "</th>" +
                    "<th>" + "Plota Gráfico" + "</th>" +
                    "<tr>";

                  if (parametrosMediosReais.tempoDeCicloMax < parametrosAtuais.tempo_de_ciclo || parametrosMediosReais.tempoDeCicloMin > parametrosAtuais.tempo_de_ciclo) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Tempo De Ciclo </td>" +
                      "<td>" + parametrosMediosReais.tempoDeCicloMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeCicloMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_ciclo + "</td>" +
                      "<td>" + '<label id="tempo_de_ciclo"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> </label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Tempo De Ciclo </td>" +
                      "<td>" + parametrosMediosReais.tempoDeCicloMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeCicloMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_ciclo + "</td>" +
                      "<td>" + '<label id="tempo_de_ciclo"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> </label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.tempoDeFechamentoDoMoldeMax < parametrosAtuais.tempo_de_fechamento_do_molde || parametrosMediosReais.tempoDeFechamentoDoMoldeMin > parametrosAtuais.tempo_de_fechamento_do_molde) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Tempo De Fechamento do Molde </td>" +
                      "<td>" + parametrosMediosReais.tempoDeFechamentoDoMoldeMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeFechamentoDoMoldeMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_fechamento_do_molde + "</td>" +
                      "<td>" + '<label id="tempo_de_fechamento_do_molde"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Tempo De Fechamento do Molde </td>" +
                      "<td>" + parametrosMediosReais.tempoDeFechamentoDoMoldeMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeFechamentoDoMoldeMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_fechamento_do_molde + "</td>" +
                      "<td>" + '<label id="tempo_de_fechamento_do_molde"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.tempoDeAberturaDoMoldeMax < parametrosAtuais.tempo_de_abertura_do_molde || parametrosMediosReais.tempoDeAberturaDoMoldeMin > parametrosAtuais.tempo_de_abertura_do_molde) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Tempo de Abertura do Molde </td>" +
                      "<td>" + parametrosMediosReais.tempoDeAberturaDoMoldeMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeAberturaDoMoldeMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_abertura_do_molde + "</td>" +
                      "<td>" + '<label id="tempo_de_abertura_do_molde"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Tempo de Abertura do Molde </td>" +
                      "<td>" + parametrosMediosReais.tempoDeAberturaDoMoldeMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeAberturaDoMoldeMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_abertura_do_molde + "</td>" +
                      "<td>" + '<label id="tempo_de_abertura_do_molde"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.tempoDeAvancoDoExtratorMax < parametrosAtuais.tempo_de_avanco_do_extrator ||
                    parametrosMediosReais.tempoDeAvancoDoExtratorMin > parametrosAtuais.tempo_de_avanco_do_extrator) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Tempo de Avanço do Extrator </td>" +
                      "<td>" + parametrosMediosReais.tempoDeAvancoDoExtratorMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeAvancoDoExtratorMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_avanco_do_extrator + "</td>" +
                      "<td>" + '<label id="tempo_de_avanco_do_extrator"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                      "<td> Tempo de Avanço do Extrator </td>" +
                      "<td>" + parametrosMediosReais.tempoDeAvancoDoExtratorMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeAvancoDoExtratorMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_avanco_do_extrator + "</td>" +
                      "<td>" + '<label id="tempo_de_avanco_do_extrator"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.tempoDeRecuoDoExtratorMax < parametrosAtuais.tempo_de_recuo_do_extrator ||
                    parametrosMediosReais.tempoDeRecuoDoExtratorMin > parametrosAtuais.tempo_de_recuo_do_extrator) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Tempo de Recuo do Extrator </td>" +
                      "<td>" + parametrosMediosReais.tempoDeRecuoDoExtratorMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeRecuoDoExtratorMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_recuo_do_extrator + "</td>" +
                      "<td>" + '<label id="tempo_de_recuo_do_extrator"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                      "<td> Tempo de Recuo do Extrator </td>" +
                      "<td>" + parametrosMediosReais.tempoDeRecuoDoExtratorMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeRecuoDoExtratorMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_recuo_do_extrator + "</td>" +
                      "<td>" + '<label id="tempo_de_recuo_do_extrator"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.tempoDeInjecaoMax < parametrosAtuais.tempo_de_injecao ||
                    parametrosMediosReais.tempoDeInjecaoMin > parametrosAtuais.tempo_de_injecao) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Tempo de Injeção </td>" +
                      "<td>" + parametrosMediosReais.tempoDeInjecaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeInjecaoMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_injecao + "</td>" +
                      "<td>" + '<label id="tempo_de_injecao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                      "<td> Tempo de Injeção </td>" +
                      "<td>" + parametrosMediosReais.tempoDeInjecaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeInjecaoMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_injecao + "</td>" +
                      "<td>" + '<label id="tempo_de_injecao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.tempoDeRecalqueMax < parametrosAtuais.tempo_de_recalque ||
                    parametrosMediosReais.tempoDeRecalqueMin > parametrosAtuais.tempo_de_recalque) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Tempo de Recalque </td>" +
                      "<td>" + parametrosMediosReais.tempoDeRecalqueMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeRecalqueMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_recalque + "</td>" +
                      "<td>" + '<label id="tempo_de_recalque"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                      "<td> Tempo de Recalque </td>" +
                      "<td>" + parametrosMediosReais.tempoDeRecalqueMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeRecalqueMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_recalque + "</td>" +
                      "<td>" + '<label id="tempo_de_recalque"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }


                  if (parametrosMediosReais.tempoDePrimeiraDescompressaoMax < parametrosAtuais.tempo_de_primeira_descompressao ||
                    parametrosMediosReais.tempoDePrimeiraDescompressaoMin > parametrosAtuais.tempo_de_primeira_descompressao) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Tempo de Primeira Descompressao</td>" +
                      "<td>" + parametrosMediosReais.tempoDePrimeiraDescompressaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDePrimeiraDescompressaoMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_primeira_descompressao + "</td>" +
                      "<td>" + '<label id="tempo_de_primeira_descompressao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                      "<td> Tempo de Primeira Descompressao</td>" +
                      "<td>" + parametrosMediosReais.tempoDePrimeiraDescompressaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDePrimeiraDescompressaoMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_primeira_descompressao + "</td>" +
                      "<td>" + '<label id="tempo_de_primeira_descompressao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.tempoDeSegundaDescompressaoMax < parametrosAtuais.tempo_de_segunda_descompressao ||
                    parametrosMediosReais.tempoDeSegundaDescompressaoMin > parametrosAtuais.tempo_de_segunda_descompressao) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Tempo de Segunda Descompressao</td>" +
                      "<td>" + parametrosMediosReais.tempoDeSegundaDescompressaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeSegundaDescompressaoMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_segunda_descompressao + "</td>" +
                      "<td>" + '<label id="tempo_de_segunda_descompressao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                      "<td> Tempo de Segunda Descompressao</td>" +
                      "<td>" + parametrosMediosReais.tempoDeSegundaDescompressaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeSegundaDescompressaoMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_segunda_descompressao + "</td>" +
                      "<td>" + '<label id="tempo_de_segunda_descompressao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }


                  if (parametrosMediosReais.tempoDePlastificacaoMax < parametrosAtuais.tempo_de_plastificacao ||
                    parametrosMediosReais.tempoDePlastificacaoMin > parametrosAtuais.tempo_de_plastificacao) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                      "<td> Tempo de Plastificação</td>" +
                      "<td>" + parametrosMediosReais.tempoDePlastificacaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDePlastificacaoMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_plastificacao + "</td>" +
                      "<td>" + '<label id="tempo_de_plastificacao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                      "<td> Tempo de Plastificação</td>" +
                      "<td>" + parametrosMediosReais.tempoDePlastificacaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDePlastificacaoMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_plastificacao + "</td>" +
                      "<td>" + '<label id="tempo_de_plastificacao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.tempoDeAvancoDaUnidadeInjetoraMax < parametrosAtuais.tempo_de_avanco_da_unidade_injetora ||
                    parametrosMediosReais.tempoDeAvancoDaUnidadeInjetoraMin > parametrosAtuais.tempo_de_avanco_da_unidade_injetora) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Tempo de Avanço da unidade injetora</td>" +
                      "<td>" + parametrosMediosReais.tempoDeAvancoDaUnidadeInjetoraMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeAvancoDaUnidadeInjetoraMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_avanco_da_unidade_injetora + "</td>" +
                      "<td>" + '<label id="tempo_de_avanco_da_unidade_injetora"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Tempo de Avanço da unidade injetora</td>" +
                      "<td>" + parametrosMediosReais.tempoDeAvancoDaUnidadeInjetoraMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeAvancoDaUnidadeInjetoraMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_avanco_da_unidade_injetora + "</td>" +
                      "<td>" + '<label id="tempo_de_avanco_da_unidade_injetora"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.tempoDeRecuoDaUnidadeInjetoraMax < parametrosAtuais.tempo_de_recuo_da_unidade_injetora ||
                    parametrosMediosReais.tempoDeRecuoDaUnidadeInjetoraMin > parametrosAtuais.tempo_de_recuo_da_unidade_injetora) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Tempo de Recuo da unidade injetora</td>" +
                      "<td>" + parametrosMediosReais.tempoDeRecuoDaUnidadeInjetoraMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeRecuoDaUnidadeInjetoraMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_recuo_da_unidade_injetora + "</td>" +
                      "<td>" + '<label id="tempo_de_recuo_da_unidade_injetora"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Tempo de Recuo da unidade injetora</td>" +
                      "<td>" + parametrosMediosReais.tempoDeRecuoDaUnidadeInjetoraMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoDeRecuoDaUnidadeInjetoraMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_de_recuo_da_unidade_injetora + "</td>" +
                      "<td>" + '<label id="tempo_de_recuo_da_unidade_injetora"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }


                  if (parametrosMediosReais.tempoTotalDeCicloMax < parametrosAtuais.tempo_total_de_ciclo ||
                    parametrosMediosReais.tempoTotalDeCicloMin > parametrosAtuais.tempo_total_de_ciclo) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Tempo de Total de Ciclo</td>" +
                      "<td>" + parametrosMediosReais.tempoTotalDeCicloMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoTotalDeCicloMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_total_de_ciclo + "</td>" +
                      "<td>" + '<label id="tempo_total_de_ciclo"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Tempo de Total de Ciclo</td>" +
                      "<td>" + parametrosMediosReais.tempoTotalDeCicloMin + "</td>" +
                      "<td>" + parametrosMediosReais.tempoTotalDeCicloMax + "</td>" +
                      "<td>" + parametrosAtuais.tempo_total_de_ciclo + "</td>" +
                      "<td>" + '<label id="tempo_total_de_ciclo"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.temperaturaDaZonaDoBicoMax < parametrosAtuais.temperatura_da_zona_do_bico ||
                    parametrosMediosReais.temperaturaDaZonaDoBicoMin > parametrosAtuais.temperatura_da_zona_do_bico) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Temperatura da zona de bico</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaDoBicoMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaDoBicoMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_do_bico + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_do_bico"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Temperatura da zona de bico</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaDoBicoMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaDoBicoMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_do_bico + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_do_bico"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }


                  if (parametrosMediosReais.temperaturaDaZonaDaFlangeMax < parametrosAtuais.temperatura_da_zona_da_flange ||
                    parametrosMediosReais.temperaturaDaZonaDaFlangeMin > parametrosAtuais.temperatura_da_zona_da_flange) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Temperatura da zona de Flange</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaDaFlangeMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaDaFlangeMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_da_flange + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_da_flange"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Temperatura da zona de Flange</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaDaFlangeMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaDaFlangeMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_da_flange + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_da_flange"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }


                  if (parametrosMediosReais.temperaturaDaZonaAMax < parametrosAtuais.temperatura_da_zona_A ||
                    parametrosMediosReais.temperaturaDaZonaAMin > parametrosAtuais.temperatura_da_zona_A) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Temperatura da zona A</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaAMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaAMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_A + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_A"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Temperatura da zona A</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaAMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaAMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_A + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_A"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }


                  if (parametrosMediosReais.temperaturaDaZonaBMax < parametrosAtuais.temperatura_da_zona_B ||
                    parametrosMediosReais.temperaturaDaZonaBMin > parametrosAtuais.temperatura_da_zona_B) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Temperatura da zona B</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaBMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaBMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_B + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_B"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Temperatura da zona B</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaBMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaBMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_B + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_B"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.temperaturaDaZonaCMax < parametrosAtuais.temperatura_da_zona_C ||
                    parametrosMediosReais.temperaturaDaZonaCMin > parametrosAtuais.temperatura_da_zona_C) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Temperatura da zona C</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaCMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaCMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_C + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_C"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Temperatura da zona C</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaCMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaCMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_C + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_C"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }
                    

                  if (parametrosMediosReais.temperaturaDaZonaDMax < parametrosAtuais.temperatura_da_zona_D ||
                    parametrosMediosReais.temperaturaDaZonaDMin > parametrosAtuais.temperatura_da_zona_D) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Temperatura da zona D</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaDMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaDMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_D + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_D"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Temperatura da zona D</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaDMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaDMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_D + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_D"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }
                   

                  if (parametrosMediosReais.temperaturaDaZonaEMax < parametrosAtuais.temperatura_da_zona_E ||
                    parametrosMediosReais.temperaturaDaZonaEMin > parametrosAtuais.temperatura_da_zona_E) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Temperatura da zona E</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaEMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaEMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_E + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_E"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Temperatura da zona E</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaEMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaEMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_E + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_E"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }


                  if (parametrosMediosReais.temperaturaDaZonaFMax < parametrosAtuais.temperatura_da_zona_F ||
                    parametrosMediosReais.temperaturaDaZonaFMin > parametrosAtuais.temperatura_da_zona_F) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Temperatura da zona F</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaFMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaFMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_F + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_F"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Temperatura da zona F</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaFMin + "</td>" +
                      "<td>" + parametrosMediosReais.temperaturaDaZonaFMax + "</td>" +
                      "<td>" + parametrosAtuais.temperatura_da_zona_F + "</td>" +
                      "<td>" + '<label id="temperatura_da_zona_F"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.velocidadeMediaDuranteAInjecaoMax < parametrosAtuais.velocidade_media_durante_a_injecao ||
                    parametrosMediosReais.velocidadeMediaDuranteAInjecaoMin > parametrosAtuais.velocidade_media_durante_a_injecao) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Velocidade Média durante a injeção</td>" +
                      "<td>" + parametrosMediosReais.velocidadeMediaDuranteAInjecaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.velocidadeMediaDuranteAInjecaoMax + "</td>" +
                      "<td>" + parametrosAtuais.velocidade_media_durante_a_injecao + "</td>" +
                      "<td>" + '<label id="velocidade_media_durante_a_injecao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Velocidade Média durante a injeção</td>" +
                      "<td>" + parametrosMediosReais.velocidadeMediaDuranteAInjecaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.velocidadeMediaDuranteAInjecaoMax + "</td>" +
                      "<td>" + parametrosAtuais.velocidade_media_durante_a_injecao + "</td>" +
                      "<td>" + '<label id="velocidade_media_durante_a_injecao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }


                  if (parametrosMediosReais.pressaoMediaDuranteAInjecaoMax < parametrosAtuais.pressao_media_durante_a_injecao ||
                    parametrosMediosReais.pressaoMediaDuranteAInjecaoMin > parametrosAtuais.pressao_media_durante_a_injecao) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Pressão Média Durante a Injeção</td>" +
                      "<td>" + parametrosMediosReais.pressaoMediaDuranteAInjecaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.pressaoMediaDuranteAInjecaoMax + "</td>" +
                      "<td>" + parametrosAtuais.pressao_media_durante_a_injecao + "</td>" +
                      "<td>" + '<label id="pressao_media_durante_a_injecao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Pressão Média Durante a Injeção</td>" +
                      "<td>" + parametrosMediosReais.pressaoMediaDuranteAInjecaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.pressaoMediaDuranteAInjecaoMax + "</td>" +
                      "<td>" + parametrosAtuais.pressao_media_durante_a_injecao + "</td>" +
                      "<td>" + '<label id="pressao_media_durante_a_injecao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }


                  if (parametrosMediosReais.posicaoDePassagemParaRecalqueMax < parametrosAtuais.posicao_de_passagem_para_recalque ||
                    parametrosMediosReais.posicaoDePassagemParaRecalqueMin > parametrosAtuais.posicao_de_passagem_para_recalque) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Posição de Passagem para recalque</td>" +
                      "<td>" + parametrosMediosReais.posicaoDePassagemParaRecalqueMin + "</td>" +
                      "<td>" + parametrosMediosReais.posicaoDePassagemParaRecalqueMax + "</td>" +
                      "<td>" + parametrosAtuais.posicao_de_passagem_para_recalque + "</td>" +
                      "<td>" + '<label id="posicao_de_passagem_para_recalque"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Posição de Passagem para recalque</td>" +
                      "<td>" + parametrosMediosReais.posicaoDePassagemParaRecalqueMin + "</td>" +
                      "<td>" + parametrosMediosReais.posicaoDePassagemParaRecalqueMax + "</td>" +
                      "<td>" + parametrosAtuais.posicao_de_passagem_para_recalque + "</td>" +
                      "<td>" + '<label id="posicao_de_passagem_para_recalque"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }
                   

                  if (parametrosMediosReais.pressaoDePassagemParaRecalqueMax < parametrosAtuais.pressao_de_passagem_para_recalque ||
                    parametrosMediosReais.pressaoDePassagemParaRecalqueMin > parametrosAtuais.pressao_de_passagem_para_recalque) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Pressão de passagem para recalque</td>" +
                      "<td>" + parametrosMediosReais.pressaoDePassagemParaRecalqueMin + "</td>" +
                      "<td>" + parametrosMediosReais.pressaoDePassagemParaRecalqueMax + "</td>" +
                      "<td>" + parametrosAtuais.pressao_de_passagem_para_recalque + "</td>" +
                      "<td>" + '<label id="pressao_de_passagem_para_recalque"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Pressão de passagem para recalque</td>" +
                      "<td>" + parametrosMediosReais.pressaoDePassagemParaRecalqueMin + "</td>" +
                      "<td>" + parametrosMediosReais.pressaoDePassagemParaRecalqueMax + "</td>" +
                      "<td>" + parametrosAtuais.pressao_de_passagem_para_recalque + "</td>" +
                      "<td>" + '<label id="pressao_de_passagem_para_recalque"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }
                   
                  if (parametrosMediosReais.pressaoMediaDuranteORecalqueMax < parametrosAtuais.pressao_media_durante_o_recalque ||
                    parametrosMediosReais.pressaoMediaDuranteORecalqueMin > parametrosAtuais.pressao_media_durante_o_recalque) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Pressão média durante o recalque</td>" +
                      "<td>" + parametrosMediosReais.pressaoMediaDuranteORecalqueMin + "</td>" +
                      "<td>" + parametrosMediosReais.pressaoMediaDuranteORecalqueMax + "</td>" +
                      "<td>" + parametrosAtuais.pressao_media_durante_o_recalque + "</td>" +
                      "<td>" + '<label id="pressao_media_durante_o_recalque"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Pressão média durante o recalque</td>" +
                      "<td>" + parametrosMediosReais.pressaoMediaDuranteORecalqueMin + "</td>" +
                      "<td>" + parametrosMediosReais.pressaoMediaDuranteORecalqueMax + "</td>" +
                      "<td>" + parametrosAtuais.pressao_media_durante_o_recalque + "</td>" +
                      "<td>" + '<label id="pressao_media_durante_o_recalque"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }
                  
                   
                  if (parametrosMediosReais.colchaoMinimoDeInjecaoMax < parametrosAtuais.colchao_minimo_de_injecao ||
                    parametrosMediosReais.colchaoMinimoDeInjecaoMin > parametrosAtuais.colchao_minimo_de_injecao) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Colchão mínimo de injeção</td>" +
                      "<td>" + parametrosMediosReais.colchaoMinimoDeInjecaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.colchaoMinimoDeInjecaoMax + "</td>" +
                      "<td>" + parametrosAtuais.colchao_minimo_de_injecao + "</td>" +
                      "<td>" + '<label id="colchao_minimo_de_injecao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Colchão mínimo de injeção</td>" +
                      "<td>" + parametrosMediosReais.colchaoMinimoDeInjecaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.colchaoMinimoDeInjecaoMax + "</td>" +
                      "<td>" + parametrosAtuais.colchao_minimo_de_injecao + "</td>" +
                      "<td>" + '<label id="colchao_minimo_de_injecao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }


                  if (parametrosMediosReais.velocidadeMediaDaPlastificacaoMax < parametrosAtuais.velocidade_media_da_plastificacao ||
                    parametrosMediosReais.velocidadeMediaDaPlastificacaoMin > parametrosAtuais.velocidade_media_da_plastificacao) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Velocidade Média da Plastificação</td>" +
                      "<td>" + parametrosMediosReais.velocidadeMediaDaPlastificacaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.velocidadeMediaDaPlastificacaoMax + "</td>" +
                      "<td>" + parametrosAtuais.velocidade_media_da_plastificacao + "</td>" +
                      "<td>" + '<label id="velocidade_media_da_plastificacao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Velocidade Média da Plastificação</td>" +
                      "<td>" + parametrosMediosReais.velocidadeMediaDaPlastificacaoMin + "</td>" +
                      "<td>" + parametrosMediosReais.velocidadeMediaDaPlastificacaoMax + "</td>" +
                      "<td>" + parametrosAtuais.velocidade_media_da_plastificacao + "</td>" +
                      "<td>" + '<label id="velocidade_media_da_plastificacao"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }

                  if (parametrosMediosReais.contraPressaoMediaMax < parametrosAtuais.contra_pressao_media ||
                    parametrosMediosReais.contraPressaoMediaMin > parametrosAtuais.contra_pressao_media) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Contra Pressão Média</td>" +
                      "<td>" + parametrosMediosReais.contraPressaoMediaMin + "</td>" +
                      "<td>" + parametrosMediosReais.contraPressaoMediaMax + "</td>" +
                      "<td>" + parametrosAtuais.contra_pressao_media + "</td>" +
                      "<td>" + '<label id="contra_pressao_media"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Contra Pressão Média</td>" +
                      "<td>" + parametrosMediosReais.contraPressaoMediaMin + "</td>" +
                      "<td>" + parametrosMediosReais.contraPressaoMediaMax + "</td>" +
                      "<td>" + parametrosAtuais.contra_pressao_media + "</td>" +
                      "<td>" + '<label id="contra_pressao_media"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }


                  if (parametrosMediosReais.posicaoDeDosagemMax < parametrosAtuais.posicao_de_dosagem ||
                    parametrosMediosReais.posicaoDeDosagemMin > parametrosAtuais.posicao_de_dosagem) {
                    tags = tags + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> Posição e Dosagem</td>" +
                      "<td>" + parametrosMediosReais.posicaoDeDosagemMin + "</td>" +
                      "<td>" + parametrosMediosReais.posicaoDeDosagemMax + "</td>" +
                      "<td>" + parametrosAtuais.posicao_de_dosagem + "</td>" +
                      "<td>" + '<label id="posicao_de_dosagem"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  } else {
                    tags = tags + "<tr>" +
                    "<td> Posição e Dosagem</td>" +
                      "<td>" + parametrosMediosReais.posicaoDeDosagemMin + "</td>" +
                      "<td>" + parametrosMediosReais.posicaoDeDosagemMax + "</td>" +
                      "<td>" + parametrosAtuais.posicao_de_dosagem + "</td>" +
                      "<td>" + '<label id="posicao_de_dosagem"style="margin-right: 4%; font-size: 12px; font-weight:bold;" data-toggle="modal" data-target="#myModal"> Clique para o gráfico</label>' + "</td>" +
                      "</tr>"
                  }                 
               

                  tableBody = $("#parametrosReais tbody");
                  tableBody.append(tags);

                  document.getElementById("tempo_de_ciclo").addEventListener("click", function () {
                    plotaGrafico2("tempo_de_ciclo");
                  }, false);

                  document.getElementById("tempo_de_fechamento_do_molde").addEventListener("click", function () {
                    plotaGrafico2("tempo_de_fechamento_do_molde");
                  }, false);

                  document.getElementById("tempo_de_abertura_do_molde").addEventListener("click", function () {
                    plotaGrafico2("tempo_de_abertura_do_molde");
                  }, false);

                  document.getElementById("tempo_de_avanco_do_extrator").addEventListener("click", function () {
                    plotaGrafico2("tempo_de_avanco_do_extrator");
                  }, false);

                  document.getElementById("tempo_de_recuo_do_extrator").addEventListener("click", function () {
                    plotaGrafico2("tempo_de_recuo_do_extrator");
                  }, false);

                  document.getElementById("tempo_de_injecao").addEventListener("click", function () {
                    plotaGrafico2("tempo_de_injecao");
                  }, false);

                  document.getElementById("tempo_de_recalque").addEventListener("click", function () {
                    plotaGrafico2("tempo_de_recalque");
                  }, false);

                  document.getElementById("tempo_de_primeira_descompressao").addEventListener("click", function () {
                    plotaGrafico2("tempo_de_primeira_descompressao");
                  }, false);

                  document.getElementById("tempo_de_segunda_descompressao").addEventListener("click", function () {
                    plotaGrafico2("tempo_de_segunda_descompressao");
                  }, false);

                  document.getElementById("tempo_de_plastificacao").addEventListener("click", function () {
                    plotaGrafico2("tempo_de_plastificacao");
                  }, false);

                  document.getElementById("tempo_de_avanco_da_unidade_injetora").addEventListener("click", function () {
                    plotaGrafico2("tempo_de_avanco_da_unidade_injetora");
                  }, false);

                  document.getElementById("tempo_de_recuo_da_unidade_injetora").addEventListener("click", function () {
                    plotaGrafico2("tempo_de_recuo_da_unidade_injetora");
                  }, false);

                  document.getElementById("tempo_total_de_ciclo").addEventListener("click", function () {
                    plotaGrafico2("tempo_total_de_ciclo");
                  }, false);

                  document.getElementById("temperatura_da_zona_do_bico").addEventListener("click", function () {
                    plotaGrafico2("temperatura_da_zona_do_bico");
                  }, false);

                  document.getElementById("temperatura_da_zona_da_flange").addEventListener("click", function () {
                    plotaGrafico2("temperatura_da_zona_da_flange");
                  }, false);

                  document.getElementById("temperatura_da_zona_A").addEventListener("click", function () {
                    plotaGrafico2("temperatura_da_zona_A");
                  }, false);

                  document.getElementById("temperatura_da_zona_B").addEventListener("click", function () {
                    plotaGrafico2("temperatura_da_zona_B");
                  }, false);

                  document.getElementById("temperatura_da_zona_C").addEventListener("click", function () {
                    plotaGrafico2("temperatura_da_zona_C");
                  }, false);

                  document.getElementById("temperatura_da_zona_D").addEventListener("click", function () {
                    plotaGrafico2("temperatura_da_zona_D");
                  }, false);

                  document.getElementById("temperatura_da_zona_E").addEventListener("click", function () {
                    plotaGrafico2("temperatura_da_zona_E");
                  }, false);

                  document.getElementById("temperatura_da_zona_F").addEventListener("click", function () {
                    plotaGrafico2("temperatura_da_zona_F");
                  }, false);

                  document.getElementById("velocidade_media_durante_a_injecao").addEventListener("click", function () {
                    plotaGrafico2("velocidade_media_durante_a_injecao");
                  }, false);

                  document.getElementById("pressao_media_durante_a_injecao").addEventListener("click", function () {
                    plotaGrafico2("pressao_media_durante_a_injecao");
                  }, false);

                  document.getElementById("posicao_de_passagem_para_recalque").addEventListener("click", function () {
                    plotaGrafico2("posicao_de_passagem_para_recalque");
                  }, false);

                  document.getElementById("pressao_de_passagem_para_recalque").addEventListener("click", function () {
                    plotaGrafico2("pressao_de_passagem_para_recalque");
                  }, false);

                  document.getElementById("pressao_media_durante_o_recalque").addEventListener("click", function () {
                    plotaGrafico2("pressao_media_durante_o_recalque");
                  }, false);

                  document.getElementById("colchao_minimo_de_injecao").addEventListener("click", function () {
                    plotaGrafico2("colchao_minimo_de_injecao");
                  }, false);

                  document.getElementById("velocidade_media_da_plastificacao").addEventListener("click", function () {
                    plotaGrafico2("velocidade_media_da_plastificacao");
                  }, false);

                  document.getElementById("contra_pressao_media").addEventListener("click", function () {
                    plotaGrafico2("contra_pressao_media");
                  }, false);

                  document.getElementById("posicao_de_dosagem").addEventListener("click", function () {
                    plotaGrafico2("posicao_de_dosagem");
                  }, false);

                  


                }

              }

            });

          }

        });


        // PREENCHE TABELA DE FICHA TECNICA
        $.ajax({
          url: '/fichas/maquina/' + $("#maquinas").val(),
          method: 'get',
          dataType: 'json',
          success: function (parametrosMaquina) {

            $.ajax({
              url: '/ficha/getFicha/' + parametrosMaquina.mac,
              method: 'get',
              dataType: 'json',
              success: function (detalheFicha) {

                console.log(detalheFicha)
                console.log(parametrosMaquina)

                $("#parametros tr").remove();


                markup = "<tr>" +
                  "<th> Parâmetro </th>" +
                  "<th>" + "Valor Mínimo" + "</th>" +
                  "<th>" + "Valor Máximo" + "</th>" +
                  "<th>" + "Último valor setado" + "</th>" +
                  "</tr>"


                if (detalheFicha.VI1_max < parametrosMaquina.VI1 || detalheFicha.VI1_min > parametrosMaquina.VI1) {
                  markup = markup + "<tr>" +
                    "<td> VI1 </td>" +
                    "<td>" + detalheFicha.VI1_min + "</td>" +
                    "<td>" + detalheFicha.VI1_max + "</td>" +
                    "<td>" + parametrosMaquina.VI1 + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> VI1 </td>" +
                    "<td>" + detalheFicha.VI1_min + "</td>" +
                    "<td>" + detalheFicha.VI1_max + "</td>" +
                    "<td>" + parametrosMaquina.VI1 + "</td>" +
                    "</tr>"
                }

                if (detalheFicha.VI2_max < parametrosMaquina.VI2 || detalheFicha.VI2_min > parametrosMaquina.VI2) {
                  markup = markup + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> VI2 </td>" +
                    "<td>" + detalheFicha.VI2_min + "</td>" +
                    "<td>" + detalheFicha.VI2_max + "</td>" +
                    "<td>" + parametrosMaquina.VI2 + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> VI2 </td>" +
                    "<td>" + detalheFicha.VI2_min + "</td>" +
                    "<td>" + detalheFicha.VI2_max + "</td>" +
                    "<td>" + parametrosMaquina.VI2 + "</td>" +
                    "</tr>"
                }


                if (detalheFicha.VI3_max < parametrosMaquina.VI3 || detalheFicha.VI3_min > parametrosMaquina.VI3) {
                  markup = markup + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> VI3 </td>" +
                    "<td>" + detalheFicha.VI3_min + "</td>" +
                    "<td>" + detalheFicha.VI3_max + "</td>" +
                    "<td>" + parametrosMaquina.VI3 + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> VI3 </td>" +
                    "<td>" + detalheFicha.VI3_min + "</td>" +
                    "<td>" + detalheFicha.VI3_max + "</td>" +
                    "<td>" + parametrosMaquina.VI3 + "</td>" +
                    "</tr>"
                }

                if (detalheFicha.VI4_max < parametrosMaquina.VI4 || detalheFicha.VI4_min > parametrosMaquina.VI4) {
                  markup = markup + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> VI4 </td>" +
                    "<td>" + detalheFicha.VI4_min + "</td>" +
                    "<td>" + detalheFicha.VI4_max + "</td>" +
                    "<td>" + parametrosMaquina.VI4 + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> VI4 </td>" +
                    "<td>" + detalheFicha.VI4_min + "</td>" +
                    "<td>" + detalheFicha.VI4_max + "</td>" +
                    "<td>" + parametrosMaquina.VI4 + "</td>" +
                    "</tr>"
                }

                if (detalheFicha.VI5_max < parametrosMaquina.VI5 || detalheFicha.VI5_min > parametrosMaquina.VI5) {
                  markup = markup + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> VI5 </td>" +
                    "<td>" + detalheFicha.VI5_min + "</td>" +
                    "<td>" + detalheFicha.VI5_max + "</td>" +
                    "<td>" + parametrosMaquina.VI5 + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> VI5 </td>" +
                    "<td>" + detalheFicha.VI5_min + "</td>" +
                    "<td>" + detalheFicha.VI5_max + "</td>" +
                    "<td>" + parametrosMaquina.VI5 + "</td>" +
                    "</tr>"
                }

                if (detalheFicha.VI6_max < parametrosMaquina.VI6 || detalheFicha.VI6_min > parametrosMaquina.VI6) {
                  markup = markup + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> VI6 </td>" +
                    "<td>" + detalheFicha.VI6_min + "</td>" +
                    "<td>" + detalheFicha.VI6_max + "</td>" +
                    "<td>" + parametrosMaquina.VI6 + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> VI6 </td>" +
                    "<td>" + detalheFicha.VI6_min + "</td>" +
                    "<td>" + detalheFicha.VI6_max + "</td>" +
                    "<td>" + parametrosMaquina.VI6 + "</td>" +
                    "</tr>"
                }

                if (detalheFicha.VI7_max < parametrosMaquina.VI7 || detalheFicha.VI7_min > parametrosMaquina.VI7) {
                  markup = markup + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> VI7 </td>" +
                    "<td>" + detalheFicha.VI7_min + "</td>" +
                    "<td>" + detalheFicha.VI7_max + "</td>" +
                    "<td>" + parametrosMaquina.VI7 + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> VI7 </td>" +
                    "<td>" + detalheFicha.VI7_min + "</td>" +
                    "<td>" + detalheFicha.VI7_max + "</td>" +
                    "<td>" + parametrosMaquina.VI7 + "</td>" +
                    "</tr>"
                }

                if (detalheFicha.VI8_max < parametrosMaquina.VI8 || detalheFicha.VI8_min > parametrosMaquina.VI8) {
                  markup = markup + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> VI8 </td>" +
                    "<td>" + detalheFicha.VI8_min + "</td>" +
                    "<td>" + detalheFicha.VI8_max + "</td>" +
                    "<td>" + parametrosMaquina.VI8 + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> VI8 </td>" +
                    "<td>" + detalheFicha.VI8_min + "</td>" +
                    "<td>" + detalheFicha.VI8_max + "</td>" +
                    "<td>" + parametrosMaquina.VI8 + "</td>" +
                    "</tr>"
                }

                if (detalheFicha.VI9_max < parametrosMaquina.VI9 || detalheFicha.VI9_min > parametrosMaquina.VI9) {
                  markup = markup + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> VI9 </td>" +
                    "<td>" + detalheFicha.VI9_min + "</td>" +
                    "<td>" + detalheFicha.VI9_max + "</td>" +
                    "<td>" + parametrosMaquina.VI9 + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> VI9 </td>" +
                    "<td>" + detalheFicha.VI9_min + "</td>" +
                    "<td>" + detalheFicha.VI9_max + "</td>" +
                    "<td>" + parametrosMaquina.VI9 + "</td>" +
                    "</tr>"
                }

                if (detalheFicha.VI10_max < parametrosMaquina.VI10 || detalheFicha.VI10_min > parametrosMaquina.VI10) {
                  markup = markup + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> VI10 </td>" +
                    "<td>" + detalheFicha.VI10_min + "</td>" +
                    "<td>" + detalheFicha.VI10_max + "</td>" +
                    "<td>" + parametrosMaquina.VI10 + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> VI10 </td>" +
                    "<td>" + detalheFicha.VI10_min + "</td>" +
                    "<td>" + detalheFicha.VI10_max + "</td>" +
                    "<td>" + parametrosMaquina.VI10 + "</td>" +
                    "</tr>"
                }

                if (detalheFicha.VH1_max < parametrosMaquina.VH1 || detalheFicha.VH1_min > parametrosMaquina.VH1) {
                  markup = markup + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> VH1 </td>" +
                    "<td>" + detalheFicha.VH1_min + "</td>" +
                    "<td>" + detalheFicha.VH1_max + "</td>" +
                    "<td>" + parametrosMaquina.VH1 + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> VH1 </td>" +
                    "<td>" + detalheFicha.VH1_min + "</td>" +
                    "<td>" + detalheFicha.VH1_max + "</td>" +
                    "<td>" + parametrosMaquina.VH1 + "</td>" +
                    "</tr>"
                }

                if (detalheFicha.VH2_max < parametrosMaquina.VH2 || detalheFicha.VH2_min > parametrosMaquina.VH2) {
                  markup = markup + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> VH2 </td>" +
                    "<td>" + detalheFicha.VH2_min + "</td>" +
                    "<td>" + detalheFicha.VH2_max + "</td>" +
                    "<td>" + parametrosMaquina.VH2 + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> VH2 </td>" +
                    "<td>" + detalheFicha.VH2_min + "</td>" +
                    "<td>" + detalheFicha.VH2_max + "</td>" +
                    "<td>" + parametrosMaquina.VH2 + "</td>" +
                    "</tr>"
                }

                if (detalheFicha.PI1_max < parametrosMaquina.PI1 || detalheFicha.PI1_min > parametrosMaquina.PI1) {
                  markup = markup + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> PI1 </td>" +
                    "<td>" + detalheFicha.PI1_min + "</td>" +
                    "<td>" + detalheFicha.PI1_max + "</td>" +
                    "<td>" + parametrosMaquina.PI1 + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> PI1 </td>" +
                    "<td>" + detalheFicha.PI1_min + "</td>" +
                    "<td>" + detalheFicha.PI1_max + "</td>" +
                    "<td>" + parametrosMaquina.PI1 + "</td>" +
                    "</tr>"
                }

                if (detalheFicha.LS4_max < parametrosMaquina.LS4 || detalheFicha.LS4_min > parametrosMaquina.LS4) {
                  markup = markup + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> LS4 </td>" +
                    "<td>" + detalheFicha.LS4_min + "</td>" +
                    "<td>" + detalheFicha.LS4_max + "</td>" +
                    "<td>" + parametrosMaquina.LS4 + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> LS4 </td>" +
                    "<td>" + detalheFicha.LS4_min + "</td>" +
                    "<td>" + detalheFicha.LS4_max + "</td>" +
                    "<td>" + parametrosMaquina.LS4 + "</td>" +
                    "</tr>"
                }

                if (detalheFicha.LS4A_max < parametrosMaquina.LS4A || detalheFicha.LS4A_min > parametrosMaquina.LS4A) {
                  markup = markup + "<tr style=\"background-color:#FDFD96\">" +
                    "<td> LS4A </td>" +
                    "<td>" + detalheFicha.LS4A_min + "</td>" +
                    "<td>" + detalheFicha.LS4A_max + "</td>" +
                    "<td>" + parametrosMaquina.LS4A + "</td>" +
                    "</tr>"
                } else {
                  markup = markup + "<tr>" +
                    "<td> LS4A </td>" +
                    "<td>" + detalheFicha.LS4A_min + "</td>" +
                    "<td>" + detalheFicha.LS4A_max + "</td>" +
                    "<td>" + parametrosMaquina.LS4A + "</td>" +
                    "</tr>"
                }





                tableBody = $("#parametros tbody");
                tableBody.append(markup);



              }
            });

          }
        });

      }
    })

  }, 3000);

}




$('#maquinas').change(function () {


  atualizaConteudo();



});

