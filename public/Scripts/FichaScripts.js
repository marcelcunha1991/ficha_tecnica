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


function atualizaConteudo() {

  setInterval(function () {
    var maquina;


    //OBTEM DADOS DE MAQUINA
    $.ajax({
      url: '/maquinaById/' + $("#maquinas").val(),
      method: 'get',
      dataType: 'json',
      success: function (maquina_) {     

        // PREENCHE TABELA DE FICHA TECNICA
        $.ajax({
          url: '/fichasUltimo/maquina/' + $("#maquinas").val(),
          method: 'get',
          dataType: 'json',
          success: function (parametrosMaquina) {
            console.log(parametrosMaquina)
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
                  "<th>" + "Valor Esperado" + "</th>" +
                  // "<th>" + "Valor Máximo" + "</th>" +
                  "<th>" + "Último valor setado" + "</th>" +
                  "</tr>"

                  markup = markup + "<tr>" +
                    "<td> TEMPERATURA_ZONA_1 </td>" +  
                    "<td>" + detalheFicha.TEMPERATURA_ZONA_1 + "</td>" +                   
                    "<td>" + parametrosMaquina.TEMPERATURA_ZONA_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> TEMPERATURA_ZONA_2 </td>" +   
                    "<td>" + detalheFicha.TEMPERATURA_ZONA_2 + "</td>" +                    
                    "<td>" + parametrosMaquina.TEMPERATURA_ZONA_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> TEMPERATURA_ZONA_3 </td>" +       
                    "<td>" + detalheFicha.TEMPERATURA_ZONA_3 + "</td>" +                
                    "<td>" + parametrosMaquina.TEMPERATURA_ZONA_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> TEMPERATURA_ZONA_4 </td>" +      
                    "<td>" + detalheFicha.TEMPERATURA_ZONA_4 + "</td>" +                 
                    "<td>" + parametrosMaquina.TEMPERATURA_ZONA_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> TEMPERATURA_ZONA_5 </td>" +
                    "<td>" + detalheFicha.TEMPERATURA_ZONA_5 + "</td>" +                       
                    "<td>" + parametrosMaquina.TEMPERATURA_ZONA_5 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> TEMPERATURA_ZONA_6 </td>" + 
                    "<td>" + detalheFicha.TEMPERATURA_ZONA_6 + "</td>" +                      
                    "<td>" + parametrosMaquina.TEMPERATURA_ZONA_6 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> TEMPERATURA_ZONA_7 </td>" +  
                    "<td>" + detalheFicha.TEMPERATURA_ZONA_7 + "</td>" +                     
                    "<td>" + parametrosMaquina.TEMPERATURA_ZONA_7 + "</td>" +                    
                    "</tr>"
                    
                    markup = markup + "<tr>" +
                    "<td> INJECAO_POSICAO_1 </td>" +   
                    "<td>" + detalheFicha.INJECAO_POSICAO_1 + "</td>" +                    
                    "<td>" + parametrosMaquina.INJECAO_POSICAO_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> INJECAO_POSICAO_2 </td>" +     
                    "<td>" + detalheFicha.INJECAO_POSICAO_2 + "</td>" +               
                    "<td>" + parametrosMaquina.INJECAO_POSICAO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> INJECAO_POSICAO_3 </td>" +        
                    "<td>" + detalheFicha.INJECAO_POSICAO_3 + "</td>" +             
                    "<td>" + parametrosMaquina.INJECAO_POSICAO_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> INJECAO_POSICAO_4 </td>" + 
                    "<td>" + detalheFicha.INJECAO_POSICAO_4 + "</td>" +                   
                    "<td>" + parametrosMaquina.INJECAO_POSICAO_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> INJECAO_POSICAO_5 </td>" +   
                    "<td>" + detalheFicha.INJECAO_POSICAO_5 + "</td>" +                 
                    "<td>" + parametrosMaquina.INJECAO_POSICAO_5 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> INJECAO_PRESSAO_1 </td>" +        
                    "<td>" + detalheFicha.INJECAO_PRESSAO_1 + "</td>" +           
                    "<td>" + parametrosMaquina.INJECAO_PRESSAO_1 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> INJECAO_PRESSAO_2 </td>" +        
                    "<td>" + detalheFicha.INJECAO_PRESSAO_2 + "</td>" +            
                    "<td>" + parametrosMaquina.INJECAO_PRESSAO_2 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> INJECAO_PRESSAO_3 </td>" +       
                    "<td>" + detalheFicha.INJECAO_PRESSAO_3 + "</td>" +            
                    "<td>" + parametrosMaquina.INJECAO_PRESSAO_3 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> INJECAO_PRESSAO_4 </td>" + 
                    "<td>" + detalheFicha.INJECAO_PRESSAO_4 + "</td>" +                  
                    "<td>" + parametrosMaquina.INJECAO_PRESSAO_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> INJECAO_PRESSAO_5 </td>" +   
                    "<td>" + detalheFicha.INJECAO_PRESSAO_5 + "</td>" +                 
                    "<td>" + parametrosMaquina.INJECAO_PRESSAO_5 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> INJECAO_FLUXO_1 </td>" +       
                    "<td>" + detalheFicha.INJECAO_FLUXO_1 + "</td>" +             
                    "<td>" + parametrosMaquina.INJECAO_FLUXO_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> INJECAO_FLUXO_2 </td>" +   
                    "<td>" + detalheFicha.INJECAO_FLUXO_2 + "</td>" +                 
                    "<td>" + parametrosMaquina.INJECAO_FLUXO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> INJECAO_FLUXO_3 </td>" +     
                    "<td>" + detalheFicha.INJECAO_FLUXO_3 + "</td>" +              
                    "<td>" + parametrosMaquina.INJECAO_FLUXO_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> INJECAO_FLUXO_4 </td>" +       
                    "<td>" + detalheFicha.INJECAO_FLUXO_4 + "</td>" +             
                    "<td>" + parametrosMaquina.INJECAO_FLUXO_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> INJECAO_FLUXO_5 </td>" +     
                    "<td>" + detalheFicha.INJECAO_FLUXO_5 + "</td>" +               
                    "<td>" + parametrosMaquina.INJECAO_FLUXO_5 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> RECALQUE_PRESSAO_1 </td>" +     
                    "<td>" + detalheFicha.RECALQUE_PRESSAO_1 + "</td>" +               
                    "<td>" + parametrosMaquina.RECALQUE_PRESSAO_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> RECALQUE_PRESSAO_2 </td>" +  
                    "<td>" + detalheFicha.RECALQUE_PRESSAO_2 + "</td>" +                 
                    "<td>" + parametrosMaquina.RECALQUE_PRESSAO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> RECALQUE_PRESSAO_3 </td>" +        
                    "<td>" + detalheFicha.RECALQUE_PRESSAO_3 + "</td>" +            
                    "<td>" + parametrosMaquina.RECALQUE_PRESSAO_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> RECALQUE_PRESSAO_4 </td>" +   
                    "<td>" + detalheFicha.RECALQUE_PRESSAO_4 + "</td>" +                 
                    "<td>" + parametrosMaquina.RECALQUE_PRESSAO_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> RECALQUE_PRESSAO_5 </td>" +   
                    "<td>" + detalheFicha.RECALQUE_PRESSAO_5 + "</td>" +                  
                    "<td>" + parametrosMaquina.RECALQUE_PRESSAO_5 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> RECALQUE_FLUXO_1 </td>" +  
                    "<td>" + detalheFicha.RECALQUE_FLUXO_1 + "</td>" +                  
                    "<td>" + parametrosMaquina.RECALQUE_FLUXO_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> RECALQUE_FLUXO_2 </td>" +       
                    "<td>" + detalheFicha.RECALQUE_FLUXO_2 + "</td>" +             
                    "<td>" + parametrosMaquina.RECALQUE_FLUXO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> RECALQUE_FLUXO_3 </td>" +    
                    "<td>" + detalheFicha.RECALQUE_FLUXO_3 + "</td>" +                 
                    "<td>" + parametrosMaquina.RECALQUE_FLUXO_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> RECALQUE_FLUXO_4 </td>" +     
                    "<td>" + detalheFicha.RECALQUE_FLUXO_4 + "</td>" +               
                    "<td>" + parametrosMaquina.RECALQUE_FLUXO_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> RECALQUE_FLUXO_5 </td>" +   
                    "<td>" + detalheFicha.RECALQUE_FLUXO_5 + "</td>" +                
                    "<td>" + parametrosMaquina.RECALQUE_FLUXO_5 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> RECALQUE_TEMPO_1 </td>" +    
                    "<td>" + detalheFicha.RECALQUE_TEMPO_1 + "</td>" +               
                    "<td>" + parametrosMaquina.RECALQUE_TEMPO_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> RECALQUE_TEMPO_2 </td>" +      
                    "<td>" + detalheFicha.RECALQUE_TEMPO_2 + "</td>" +              
                    "<td>" + parametrosMaquina.RECALQUE_TEMPO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> RECALQUE_TEMPO_3 </td>" +     
                    "<td>" + detalheFicha.RECALQUE_TEMPO_3 + "</td>" +               
                    "<td>" + parametrosMaquina.RECALQUE_TEMPO_3 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> RECALQUE_TEMPO_4 </td>" +   
                    "<td>" + detalheFicha.RECALQUE_TEMPO_4 + "</td>" +                 
                    "<td>" + parametrosMaquina.RECALQUE_TEMPO_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> RECALQUE_TEMPO_5 </td>" +     
                    "<td>" + detalheFicha.RECALQUE_TEMPO_5 + "</td>" +              
                    "<td>" + parametrosMaquina.RECALQUE_TEMPO_5 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_PARTIDA_1 </td>" +      
                    "<td>" + detalheFicha.DOSAGEM_PARTIDA_1 + "</td>" +             
                    "<td>" + parametrosMaquina.DOSAGEM_PARTIDA_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_PARTIDA_2 </td>" +   
                    "<td>" + detalheFicha.DOSAGEM_PARTIDA_2 + "</td>" +                
                    "<td>" + parametrosMaquina.DOSAGEM_PARTIDA_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_PARTIDA_3 </td>" +   
                    "<td>" + detalheFicha.DOSAGEM_PARTIDA_3 + "</td>" +                  
                    "<td>" + parametrosMaquina.DOSAGEM_PARTIDA_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_PARTIDA_4 </td>" +     
                    "<td>" + detalheFicha.DOSAGEM_PARTIDA_4 + "</td>" +               
                    "<td>" + parametrosMaquina.DOSAGEM_PARTIDA_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_PARTIDA_5 </td>" +   
                    "<td>" + detalheFicha.DOSAGEM_PARTIDA_5 + "</td>" +                 
                    "<td>" + parametrosMaquina.DOSAGEM_PARTIDA_5 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_PRESSAO_1 </td>" +      
                    "<td>" + detalheFicha.DOSAGEM_PRESSAO_1 + "</td>" +              
                    "<td>" + parametrosMaquina.DOSAGEM_PRESSAO_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_PRESSAO_2 </td>" +      
                    "<td>" + detalheFicha.DOSAGEM_PRESSAO_2 + "</td>" +              
                    "<td>" + parametrosMaquina.DOSAGEM_PRESSAO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_PRESSAO_3 </td>" +   
                    "<td>" + detalheFicha.DOSAGEM_PRESSAO_3 + "</td>" +                 
                    "<td>" + parametrosMaquina.DOSAGEM_PRESSAO_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_PRESSAO_4 </td>" +   
                    "<td>" + detalheFicha.DOSAGEM_PRESSAO_4 + "</td>" +                 
                    "<td>" + parametrosMaquina.DOSAGEM_PRESSAO_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_PRESSAO_5 </td>" +   
                    "<td>" + detalheFicha.DOSAGEM_PRESSAO_5 + "</td>" +                    
                    "<td>" + parametrosMaquina.DOSAGEM_PRESSAO_5 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_FLUXO_1 </td>" +    
                    "<td>" + detalheFicha.DOSAGEM_FLUXO_1 + "</td>" +                
                    "<td>" + parametrosMaquina.DOSAGEM_FLUXO_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_FLUXO_2 </td>" +              
                    "<td>" + detalheFicha.DOSAGEM_FLUXO_2 + "</td>" +       
                    "<td>" + parametrosMaquina.DOSAGEM_FLUXO_2 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_FLUXO_3 </td>" +   
                    "<td>" + detalheFicha.DOSAGEM_FLUXO_3 + "</td>" +                
                    "<td>" + parametrosMaquina.DOSAGEM_FLUXO_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_FLUXO_4 </td>" +   
                    "<td>" + detalheFicha.DOSAGEM_FLUXO_4 + "</td>" +                
                    "<td>" + parametrosMaquina.DOSAGEM_FLUXO_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_FLUXO_5 </td>" +     
                    "<td>" + detalheFicha.DOSAGEM_FLUXO_5 + "</td>" +              
                    "<td>" + parametrosMaquina.DOSAGEM_FLUXO_5 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_CONTRAPRESSAO_1 </td>" +   
                    "<td>" + detalheFicha.DOSAGEM_CONTRAPRESSAO_1 + "</td>" +                
                    "<td>" + parametrosMaquina.DOSAGEM_CONTRAPRESSAO_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_CONTRAPRESSAO_2 </td>" +    
                    "<td>" + detalheFicha.DOSAGEM_CONTRAPRESSAO_2 + "</td>" +                 
                    "<td>" + parametrosMaquina.DOSAGEM_CONTRAPRESSAO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_CONTRAPRESSAO_3 </td>" +    
                    "<td>" + detalheFicha.DOSAGEM_CONTRAPRESSAO_3 + "</td>" +                 
                    "<td>" + parametrosMaquina.DOSAGEM_CONTRAPRESSAO_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_CONTRAPRESSAO_4 </td>" +      
                    "<td>" + detalheFicha.DOSAGEM_CONTRAPRESSAO_4 + "</td>" +               
                    "<td>" + parametrosMaquina.DOSAGEM_CONTRAPRESSAO_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> DOSAGEM_CONTRAPRESSAO_5 </td>" +   
                    "<td>" + detalheFicha.DOSAGEM_CONTRAPRESSAO_5 + "</td>" +                  
                    "<td>" + parametrosMaquina.DOSAGEM_CONTRAPRESSAO_5 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_POSICAO_1 </td>" +       
                    "<td>" + detalheFicha.FECHAMENTO_POSICAO_1 + "</td>" +              
                    "<td>" + parametrosMaquina.FECHAMENTO_POSICAO_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_POSICAO_2 </td>" +    
                    "<td>" + detalheFicha.FECHAMENTO_POSICAO_2 + "</td>" +                  
                    "<td>" + parametrosMaquina.FECHAMENTO_POSICAO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_POSICAO_3 </td>" +       
                    "<td>" + detalheFicha.FECHAMENTO_POSICAO_3 + "</td>" +             
                    "<td>" + parametrosMaquina.FECHAMENTO_POSICAO_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_POSICAO_PROTECAO_MOLDE </td>" +    
                    "<td>" + detalheFicha.FECHAMENTO_POSICAO_PROTECAO_MOLDE + "</td>" +         
                    "<td>" + parametrosMaquina.FECHAMENTO_POSICAO_PROTECAO_MOLDE + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_POSICAO_ALTA_PRESSAO </td>" +      
                    "<td>" + detalheFicha.FECHAMENTO_POSICAO_ALTA_PRESSAO + "</td>" +              
                    "<td>" + parametrosMaquina.FECHAMENTO_POSICAO_ALTA_PRESSAO + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_PRESSAO_1 </td>" +     
                    "<td>" + detalheFicha.FECHAMENTO_PRESSAO_1 + "</td>" +                
                    "<td>" + parametrosMaquina.FECHAMENTO_PRESSAO_1 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_PRESSAO_2 </td>" +          
                    "<td>" + detalheFicha.FECHAMENTO_PRESSAO_2 + "</td>" +         
                    "<td>" + parametrosMaquina.FECHAMENTO_PRESSAO_2 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_PRESSAO_3 </td>" +          
                    "<td>" + detalheFicha.FECHAMENTO_PRESSAO_3 + "</td>" +          
                    "<td>" + parametrosMaquina.FECHAMENTO_PRESSAO_3 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_PRESSAO_PROTECAO_MOLDE </td>" +  
                    "<td>" + detalheFicha.FECHAMENTO_PRESSAO_PROTECAO_MOLDE + "</td>" +                  
                    "<td>" + parametrosMaquina.FECHAMENTO_PRESSAO_PROTECAO_MOLDE + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_POSICAO_ALTA_PRESSAO </td>" +   
                    "<td>" + detalheFicha.FECHAMENTO_PRESSAO_ALTA_PRESSAO + "</td>" +                  
                    "<td>" + parametrosMaquina.FECHAMENTO_PRESSAO_ALTA_PRESSAO + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_FLUXO_1 </td>" +     
                    "<td>" + detalheFicha.FECHAMENTO_FLUXO_1 + "</td>" +               
                    "<td>" + parametrosMaquina.FECHAMENTO_FLUXO_1 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_FLUXO_2 </td>" +    
                    "<td>" + detalheFicha.FECHAMENTO_FLUXO_2 + "</td>" +                  
                    "<td>" + parametrosMaquina.FECHAMENTO_FLUXO_2 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_FLUXO_3 </td>" +   
                    "<td>" + detalheFicha.FECHAMENTO_FLUXO_3 + "</td>" +                   
                    "<td>" + parametrosMaquina.FECHAMENTO_FLUXO_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_FLUXO_PROTECAO_MOLDE </td>" + 
                    "<td>" + detalheFicha.FECHAMENTO_FLUXO_PROTECAO_MOLDE + "</td>" +                    
                    "<td>" + parametrosMaquina.FECHAMENTO_FLUXO_PROTECAO_MOLDE + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> FECHAMENTO_FLUXO_ALTA_PRESSAO </td>" +      
                    "<td>" + detalheFicha.FECHAMENTO_FLUXO_ALTA_PRESSAO + "</td>" +              
                    "<td>" + parametrosMaquina.FECHAMENTO_FLUXO_ALTA_PRESSAO + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> ABERTURA_POSICAO_1 </td>" +    
                    "<td>" + detalheFicha.ABERTURA_POSICAO_1 + "</td>" +                  
                    "<td>" + parametrosMaquina.ABERTURA_POSICAO_1 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> ABERTURA_POSICAO_2 </td>" +     
                    "<td>" + detalheFicha.ABERTURA_POSICAO_2 + "</td>" +               
                    "<td>" + parametrosMaquina.ABERTURA_POSICAO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> ABERTURA_POSICAO_3 </td>" +    
                    "<td>" + detalheFicha.ABERTURA_POSICAO_3 + "</td>" +                
                    "<td>" + parametrosMaquina.ABERTURA_POSICAO_3 + "</td>" +                    
                    "</tr>"
                    
                    markup = markup + "<tr>" +
                    "<td> ABERTURA_POSICAO_4 </td>" +    
                    "<td>" + detalheFicha.ABERTURA_POSICAO_4 + "</td>" +                
                    "<td>" + parametrosMaquina.ABERTURA_POSICAO_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> ABERTURA_POSICAO_5 </td>" +    
                    "<td>" + detalheFicha.ABERTURA_POSICAO_5 + "</td>" +                
                    "<td>" + parametrosMaquina.ABERTURA_POSICAO_5 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> ABERTURA_PRESSAO_1 </td>" +     
                    "<td>" + detalheFicha.ABERTURA_PRESSAO_1 + "</td>" +               
                    "<td>" + parametrosMaquina.ABERTURA_PRESSAO_1 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> ABERTURA_PRESSAO_2 </td>" +    
                    "<td>" + detalheFicha.ABERTURA_PRESSAO_2 + "</td>" +                 
                    "<td>" + parametrosMaquina.ABERTURA_PRESSAO_2 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> ABERTURA_PRESSAO_3 </td>" +           
                    "<td>" + detalheFicha.ABERTURA_PRESSAO_3 + "</td>" +          
                    "<td>" + parametrosMaquina.ABERTURA_PRESSAO_3 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> ABERTURA_PRESSAO_4 </td>" +    
                    "<td>" + detalheFicha.ABERTURA_PRESSAO_4 + "</td>" +                 
                    "<td>" + parametrosMaquina.ABERTURA_PRESSAO_4 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> ABERTURA_PRESSAO_5 </td>" +    
                    "<td>" + detalheFicha.ABERTURA_PRESSAO_5 + "</td>" +                 
                    "<td>" + parametrosMaquina.ABERTURA_PRESSAO_5 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> ABERTURA_FLUXO_1 </td>" +   
                    "<td>" + detalheFicha.ABERTURA_FLUXO_1 + "</td>" +                   
                    "<td>" + parametrosMaquina.ABERTURA_FLUXO_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> ABERTURA_FLUXO_2 </td>" +   
                    "<td>" + detalheFicha.ABERTURA_FLUXO_2 + "</td>" +                  
                    "<td>" + parametrosMaquina.ABERTURA_FLUXO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> ABERTURA_FLUXO_3 </td>" +    
                    "<td>" + detalheFicha.ABERTURA_FLUXO_3 + "</td>" +                 
                    "<td>" + parametrosMaquina.ABERTURA_FLUXO_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> ABERTURA_FLUXO_4 </td>" + 
                    "<td>" + detalheFicha.ABERTURA_FLUXO_4 + "</td>" +                    
                    "<td>" + parametrosMaquina.ABERTURA_FLUXO_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> ABERTURA_FLUXO_5 </td>" +   
                    "<td>" + detalheFicha.ABERTURA_FLUXO_5 + "</td>" +                  
                    "<td>" + parametrosMaquina.ABERTURA_FLUXO_5 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> EXTRACAO_POSICAO_AVANCO_2 </td>" +     
                    "<td>" + detalheFicha.EXTRACAO_POSICAO_AVANCO_2 + "</td>" +              
                    "<td>" + parametrosMaquina.EXTRACAO_POSICAO_AVANCO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> EXTRACAO_POSICAO_AVANCO_3 </td>" +   
                    "<td>" + detalheFicha.EXTRACAO_POSICAO_AVANCO_3 + "</td>" +                
                    "<td>" + parametrosMaquina.EXTRACAO_POSICAO_AVANCO_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> EXTRACAO_POSICAO_RECUO_2 </td>" +     
                    "<td>" + detalheFicha.EXTRACAO_POSICAO_RECUO_2 + "</td>" +              
                    "<td>" + parametrosMaquina.EXTRACAO_POSICAO_RECUO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> EXTRACAO_POSICAO_RECUO_3 </td>" +            
                    "<td>" + detalheFicha.EXTRACAO_POSICAO_RECUO_3 + "</td>" +       
                    "<td>" + parametrosMaquina.EXTRACAO_POSICAO_RECUO_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> EXTRACAO_PRESSAO_AVANCO_1 </td>" +           
                    "<td>" + detalheFicha.EXTRACAO_PRESSAO_AVANCO_1 + "</td>" +        
                    "<td>" + parametrosMaquina.EXTRACAO_PRESSAO_AVANCO_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> EXTRACAO_PRESSAO_AVANCO_2 </td>" +  
                    "<td>" + detalheFicha.EXTRACAO_PRESSAO_AVANCO_2 + "</td>" +                 
                    "<td>" + parametrosMaquina.EXTRACAO_PRESSAO_AVANCO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> EXTRACAO_PRESSAO_RECUO_1 </td>" +     
                    "<td>" + detalheFicha.EXTRACAO_PRESSAO_RECUO_1 + "</td>" +               
                    "<td>" + parametrosMaquina.EXTRACAO_PRESSAO_RECUO_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> EXTRACAO_PRESSAO_RECUO_2 </td>" +        
                    "<td>" + detalheFicha.EXTRACAO_PRESSAO_RECUO_2 + "</td>" +            
                    "<td>" + parametrosMaquina.EXTRACAO_PRESSAO_RECUO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> EXTRACAO_FLUXO_AVANCO_1 </td>" +    
                    "<td>" + detalheFicha.EXTRACAO_FLUXO_AVANCO_1 + "</td>" +                
                    "<td>" + parametrosMaquina.EXTRACAO_FLUXO_AVANCO_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> EXTRACAO_FLUXO_AVANCO_2 </td>" +  
                    "<td>" + detalheFicha.EXTRACAO_FLUXO_AVANCO_2 + "</td>" +                  
                    "<td>" + parametrosMaquina.EXTRACAO_FLUXO_AVANCO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> EXTRACAO_FLUXO_RECUO_1 </td>" +   
                    "<td>" + detalheFicha.EXTRACAO_FLUXO_RECUO_1 + "</td>" +                 
                    "<td>" + parametrosMaquina.EXTRACAO_FLUXO_RECUO_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> EXTRACAO_FLUXO_RECUO_2 </td>" +   
                    "<td>" + detalheFicha.EXTRACAO_FLUXO_RECUO_2 + "</td>" +                
                    "<td>" + parametrosMaquina.EXTRACAO_FLUXO_RECUO_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> CAMARA_QUENTE_TEMPERATURA_1 </td>" +   
                    "<td>" + detalheFicha.CAMARA_QUENTE_TEMPERATURA_1 + "</td>" +                 
                    "<td>" + parametrosMaquina.CAMARA_QUENTE_TEMPERATURA_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> CAMARA_QUENTE_TEMPERATURA_2 </td>" +  
                    "<td>" + detalheFicha.CAMARA_QUENTE_TEMPERATURA_2 + "</td>" +                  
                    "<td>" + parametrosMaquina.CAMARA_QUENTE_TEMPERATURA_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> CAMARA_QUENTE_TEMPERATURA_3 </td>" +     
                    "<td>" + detalheFicha.CAMARA_QUENTE_TEMPERATURA_3 + "</td>" +               
                    "<td>" + parametrosMaquina.CAMARA_QUENTE_TEMPERATURA_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> CAMARA_QUENTE_TEMPERATURA_4 </td>" +      
                    "<td>" + detalheFicha.CAMARA_QUENTE_TEMPERATURA_4 + "</td>" +             
                    "<td>" + parametrosMaquina.CAMARA_QUENTE_TEMPERATURA_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> CAMARA_QUENTE_TEMPERATURA_5 </td>" +     
                    "<td>" + detalheFicha.CAMARA_QUENTE_TEMPERATURA_5 + "</td>" +              
                    "<td>" + parametrosMaquina.CAMARA_QUENTE_TEMPERATURA_5 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> CAMARA_QUENTE_TEMPERATURA_6 </td>" +    
                    "<td>" + detalheFicha.CAMARA_QUENTE_TEMPERATURA_6 + "</td>" +               
                    "<td>" + parametrosMaquina.CAMARA_QUENTE_TEMPERATURA_6 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> CAMARA_QUENTE_TEMPERATURA_7 </td>" +  
                    "<td>" + detalheFicha.CAMARA_QUENTE_TEMPERATURA_7 + "</td>" +                 
                    "<td>" + parametrosMaquina.CAMARA_QUENTE_TEMPERATURA_7 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> CAMARA_QUENTE_TEMPERATURA_8 </td>" +     
                    "<td>" + detalheFicha.CAMARA_QUENTE_TEMPERATURA_8 + "</td>" +              
                    "<td>" + parametrosMaquina.CAMARA_QUENTE_TEMPERATURA_8 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> CAMARA_QUENTE_TEMPERATURA_9 </td>" +  
                    "<td>" + detalheFicha.CAMARA_QUENTE_TEMPERATURA_9 + "</td>" +                  
                    "<td>" + parametrosMaquina.CAMARA_QUENTE_TEMPERATURA_9 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> CAMARA_QUENTE_TEMPERATURA_10 </td>" +          
                    "<td>" + detalheFicha.CAMARA_QUENTE_TEMPERATURA_10 + "</td>" +          
                    "<td>" + parametrosMaquina.CAMARA_QUENTE_TEMPERATURA_10 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> CAMARA_QUENTE_TEMPERATURA_11 </td>" +  
                    "<td>" + detalheFicha.CAMARA_QUENTE_TEMPERATURA_11 + "</td>" +                 
                    "<td>" + parametrosMaquina.CAMARA_QUENTE_TEMPERATURA_11 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> CAMARA_QUENTE_TEMPERATURA_12 </td>" +   
                    "<td>" + detalheFicha.CAMARA_QUENTE_TEMPERATURA_12 + "</td>" +                
                    "<td>" + parametrosMaquina.CAMARA_QUENTE_TEMPERATURA_12 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> CAMARA_QUENTE_TEMPERATURA_13 </td>" +    
                    "<td>" + detalheFicha.CAMARA_QUENTE_TEMPERATURA_13 + "</td>" +                
                    "<td>" + parametrosMaquina.CAMARA_QUENTE_TEMPERATURA_13 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> VALVE_GATE_DELAY_TIME_1 </td>" +    
                    "<td>" + detalheFicha.VALVE_GATE_DELAY_TIME_1 + "</td>" +               
                    "<td>" + parametrosMaquina.VALVE_GATE_DELAY_TIME_1 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> VALVE_GATE_DELAY_TIME_2 </td>" +
                    "<td>" + detalheFicha.VALVE_GATE_DELAY_TIME_2 + "</td>" +                   
                    "<td>" + parametrosMaquina.VALVE_GATE_DELAY_TIME_2 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> CAMARA_QUENTE_TEMPERATURA_3 </td>" +    
                    "<td>" + detalheFicha.CAMARA_QUENTE_TEMPERATURA_3 + "</td>" +               
                    "<td>" + parametrosMaquina.CAMARA_QUENTE_TEMPERATURA_3 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> VALVE_GATE_DELAY_TIME_4 </td>" +    
                    "<td>" + detalheFicha.VALVE_GATE_DELAY_TIME_4 + "</td>" +                
                    "<td>" + parametrosMaquina.VALVE_GATE_DELAY_TIME_4 + "</td>" +                    
                    "</tr>"

                    markup = markup + "<tr>" +
                    "<td> VALVE_GATE_DELAY_TIME_5 </td>" +       
                    "<td>" + detalheFicha.VALVE_GATE_DELAY_TIME_5 + "</td>" +            
                    "<td>" + parametrosMaquina.VALVE_GATE_DELAY_TIME_5 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> VALVE_GATE_ACTIVE_TIME_1 </td>" +      
                    "<td>" + detalheFicha.VALVE_GATE_ACTIVE_TIME_1 + "</td>" +              
                    "<td>" + parametrosMaquina.VALVE_GATE_ACTIVE_TIME_1 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> VALVE_GATE_ACTIVE_TIME_2 </td>" +   
                    "<td>" + detalheFicha.VALVE_GATE_ACTIVE_TIME_2 + "</td>" +                 
                    "<td>" + parametrosMaquina.VALVE_GATE_ACTIVE_TIME_2 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> VALVE_GATE_ACTIVE_TIME_3 </td>" +  
                    "<td>" + detalheFicha.VALVE_GATE_ACTIVE_TIME_3 + "</td>" +                 
                    "<td>" + parametrosMaquina.VALVE_GATE_ACTIVE_TIME_3 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> VALVE_GATE_ACTIVE_TIME_4 </td>" +   
                    "<td>" + detalheFicha.VALVE_GATE_ACTIVE_TIME_4 + "</td>" +                 
                    "<td>" + parametrosMaquina.VALVE_GATE_ACTIVE_TIME_4 + "</td>" +                    
                    "</tr>"


                    markup = markup + "<tr>" +
                    "<td> VALVE_GATE_ACTIVE_TIME_5 </td>" +   
                    "<td>" + detalheFicha.VALVE_GATE_ACTIVE_TIME_5 + "</td>" +                 
                    "<td>" + parametrosMaquina.VALVE_GATE_ACTIVE_TIME_5 + "</td>" +                    
                    "</tr>"


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

