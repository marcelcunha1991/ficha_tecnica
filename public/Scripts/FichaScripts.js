// document.getElementById("prodShot").addEventListener("click", plotaGrafico);
document.getElementById("cycleTime").addEventListener("click", function(){
    plotaGrafico2("cycleTime");
},false);

document.getElementById("dwellPressure").addEventListener("click", function(){
    plotaGrafico2("dwellPressure");
},false);

document.getElementById("fillingTime").addEventListener("click", function(){
    plotaGrafico2("fillingTime");
},false);

document.getElementById("chargingTime").addEventListener("click", function(){
    plotaGrafico2("chargingTime");
},false);

document.getElementById("takeoutTime").addEventListener("click", function(){
    plotaGrafico2("takeoutTime");
},false);

document.getElementById("dwellChnagePosition").addEventListener("click", function(){
    plotaGrafico2("dwellChnagePosition");
},false);

document.getElementById("cushionPosition").addEventListener("click", function(){
    plotaGrafico2("cushionPosition");
},false);

document.getElementById("minumumCushionPosition").addEventListener("click", function(){
    plotaGrafico2("minumumCushionPosition");
},false);

document.getElementById("injetStartPosition").addEventListener("click", function(){
    plotaGrafico2("injetStartPosition");
},false);

document.getElementById("maxInjectPressure").addEventListener("click", function(){
    plotaGrafico2("maxInjectPressure");
},false);

document.getElementById("screwRotationSpeed").addEventListener("click", function(){
    plotaGrafico2("screwRotationSpeed");
},false);

document.getElementById("temperature_hen").addEventListener("click", function(){
    plotaGrafico2("temperature_hen");
},false);

document.getElementById("temperature_hn").addEventListener("click", function(){
    plotaGrafico2("temperature_hn");
},false);

document.getElementById("temperature_h1").addEventListener("click", function(){
    plotaGrafico2("temperature_h1");
},false);

document.getElementById("temperature_h2").addEventListener("click", function(){
    plotaGrafico2("temperature_h2");
},false);

document.getElementById("temperature_h3").addEventListener("click", function(){
    plotaGrafico2("temperature_h3");
},false);

document.getElementById("temperature_h4").addEventListener("click", function(){
    plotaGrafico2("temperature_h4");
},false);

document.getElementById("temperature_h5").addEventListener("click", function(){
    plotaGrafico2("temperature_h5");
},false);

document.getElementById("temperature_oil").addEventListener("click", function(){
    plotaGrafico2("temperature_oil");
},false);

document.getElementById("temperature_hop").addEventListener("click", function(){
    plotaGrafico2("temperature_hop");
},false);




if ($('#dsMaquina').val() != ""){

    $("#maquinas option").filter(function() {
        return this.text == $('#dsMaquina').val(); 
    }).attr('selected', true)

    atualizaConteudo();
   
}


function plotaGrafico2(area){
    var value = $( "#maquinas" ).val();  

    
    var limites;
    var dados = [];
    console.log("value",value);

    console.log("ploty");   


    $.ajax({  
        url:'/parametrosCadastrados/'+value,  
        method:'get',  
        dataType:'json',
        success: function(parametrosMaquina) {
            console.log("Entrou no parametrosCadastrados")
            
            limites = parametrosMaquina;
            console.log(limites);

        }

        });

        $.ajax({  
            url:'/parametrosReais/'+value,  
            method:'get',  
            dataType:'json',
            success: function(dadosp) {
            
                     console.log("Dados:" , dadosp)

                     if(area == "cycleTime"){

                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.cycleTime)
                        })
                     }else if(area == "dwellPressure"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.dwellPressure)
                        })
                        
                     }else if(area == "fillingTime"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.fillingTime)
                        })
                        
                     }else if(area == "chargingTime"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.chargingTime)
                        })
                        
                     }else if(area == "takeoutTime"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.takeoutTime)
                        })
                        
                     }else if(area == "dwellChnagePosition"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.dwellChnagePosition)
                        })
                        
                     }else if(area == "cushionPosition"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.cushionPosition)
                        })
                        
                     }else if(area == "minumumCushionPosition"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.minumumCushionPosition)
                        })
                        
                     }else if(area == "injetStartPosition"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.injetStartPosition)
                        })
                        
                     }else if(area == "maxInjectPressure"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.maxInjectPressure)
                        })
                        
                     }else if(area == "screwRotationSpeed"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.screwRotationSpeed)
                        })
                        
                     }else if(area == "temperature_hen"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.temperature_hen)
                        })
                        
                     }else if(area == "temperature_hn"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.temperature_hn)
                        })
                        
                     }else if(area == "temperature_h1"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.temperature_h1)
                        })
                        
                     }else if(area == "temperature_h2"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.temperature_h2)
                        })
                        
                     }else if(area == "temperature_h3"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.temperature_h3)
                        })
                        
                     }else if(area == "temperature_h4"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.temperature_h4)
                        })
                        
                     }else if(area == "temperature_h5"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.temperature_h5)
                        })
                        
                     }else if(area == "temperature_oil"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.temperature_oil)
                        })
                        
                     }else if(area == "temperature_hop"){
                        dadosp.forEach(function(nome,i) {
                            dados.push(nome.temperature_hop)
                        })
                        
                     }
                     
                     
                     
                var Data = {
                    type: 'scatter',
                    x:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
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

                  if (area == "cycleTime"){
                    limite_ = [limites.cycleTimeMin, limites.cycleTimeMin, null, limites.cycleTimeMax, limites.cycleTimeMax]
                  } else if (area == "dwellPressure"){                    
                    limite_ = [limites.dwellPressureMin, limites.dwellPressureMin, null, limites.dwellPressureMax, limites.dwellPressureMax]
                  }else if (area == "fillingTime"){                    
                    limite_ = [limites.fillingTimeMin, limites.fillingTimeMin, null, limites.fillingTimeMax, limites.fillingTimeMax]
                  }else if (area == "chargingTime"){                    
                    limite_ = [limites.chargingTimeMin, limites.chargingTimeMin, null, limites.chargingTimeMax, limites.chargingTimeMax]
                  }else if (area == "takeoutTime"){                    
                    limite_ = [limites.takeoutTimeMin, limites.takeoutTimeMin, null, limites.takeoutTimeMax, limites.takeoutTimeMax]
                  }else if (area == "dwellChnagePosition"){                    
                    limite_ = [limites.dwellChnagePositionMin, limites.dwellChnagePositionMin, null, limites.dwellChnagePositionMax, limites.dwellChnagePositionMax]
                  }else if (area == "cushionPosition"){                    
                    limite_ = [limites.cushionPositionMin, limites.cushionPositionMin, null, limites.cushionPositionMax, limites.cushionPositionMax]
                  }else if (area == "minumumCushionPosition"){                    
                    limite_ = [limites.minumumCushionPositionMin, limites.minumumCushionPositionMin, null, limites.minumumCushionPositionMax, limites.minumumCushionPositionMax]
                  }else if (area == "injetStartPosition"){                    
                    limite_ = [limites.injetStartPositionMin, limites.injetStartPositionMin, null, limites.injetStartPositionMax, limites.injetStartPositionMax]
                  }else if (area == "maxInjectPressure"){                    
                    limite_ = [limites.maxInjectPressureMin, limites.maxInjectPressureMin, null, limites.maxInjectPressureMax, limites.maxInjectPressureMax]
                  }else if (area == "screwRotationSpeed"){                    
                    limite_ = [limites.screwRotationSpeedMin, limites.screwRotationSpeedMin, null, limites.screwRotationSpeedMax, limites.screwRotationSpeedMax]
                  }else if (area == "temperature_hen"){                    
                    limite_ = [limites.temperature_henMin, limites.temperature_henMin, null, limites.temperature_henMax, limites.temperature_henMax]
                  }else if (area == "temperature_hn"){                    
                    limite_ = [limites.temperature_hnMin, limites.temperature_hnMin, null, limites.temperature_hnMax, limites.temperature_hnMax]
                  }else if (area == "temperature_h1"){                    
                    limite_ = [limites.temperature_h1Min, limites.temperature_h1Min, null, limites.temperature_h1Max, limites.temperature_h1Max]
                  }else if (area == "temperature_h2"){                    
                    limite_ = [limites.temperature_h2Min, limites.temperature_h2Min, null, limites.temperature_h2Max, limites.temperature_h2Max]
                  }else if (area == "temperature_h3"){                    
                    limite_ = [limites.temperature_h3Min, limites.temperature_h3Min, null, limites.temperature_h3Max, limites.temperature_h3Max]
                  }else if (area == "temperature_h4"){                    
                    limite_ = [limites.temperature_h4Min, limites.temperature_h4Min, null, limites.temperature_h4Max, limites.temperature_h4Max]
                  }else if (area == "temperature_h5"){                    
                    limite_ = [limites.temperature_h5Min, limites.temperature_h5Min, null, limites.temperature_h5Max, limites.temperature_h5Max]
                  }else if (area == "temperature_oil"){                    
                    limite_ = [limites.temperature_oilMin, limites.temperature_oilMin, null, limites.temperature_oilMax, limites.temperature_oilMax]
                  }else if (area == "temperature_hop"){                    
                    limite_ = [limites.temperature_hopMin, limites.temperature_hopMin, null, limites.temperature_hopMax, limites.temperature_hopMax]
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
                  
                  var data = [Data,CL,Centre]

                  var range_;

                  if (area == "cycleTime"){
                    range_ = [limites.cycleTimeMin +50,limites.cycleTimeMax - 50]
                  } else if (area == "dwellPressure"){                    
                    range_ = [limites.dwellPressureMin + 50,limites.dwellPressureMax -50]
                  }else if (area == "fillingTime"){                    
                    range_ = [limites.fillingTimeMin + 50,limites.fillingTimeMax - 50]
                  }else if (area == "chargingTime"){                    
                    range_ = [limites.chargingTimeMin + 50,limites.chargingTimeMax - 50]
                  }else if (area == "takeoutTime"){                    
                    range_ = [limites.takeoutTimeMin + 50,limites.takeoutTimeMax - 50]
                  }else if (area == "dwellChnagePosition"){                    
                    range_ = [limites.dwellChnagePositionMin + 50,limites.dwellChnagePositionMax - 50]
                  }else if (area == "cushionPosition"){                    
                    range_ = [limites.cushionPositionMin + 50,limites.cushionPositionMax - 50]
                  }else if (area == "minumumCushionPosition"){                    
                    range_ = [limites.minumumCushionPositionMin + 50,limites.minumumCushionPositionMax - 50]
                  }else if (area == "injetStartPosition"){                    
                    range_ = [limites.injetStartPositionMin,limites.injetStartPositionMax]
                  }else if (area == "maxInjectPressure"){                    
                    range_ = [limites.maxInjectPressureMin,limites.maxInjectPressureMax]
                  }else if (area == "screwRotationSpeed"){                    
                    range_ = [limites.screwRotationSpeedMin + 50,limites.screwRotationSpeedMax - 50]
                  }else if (area == "temperature_hen"){                    
                    range_ = [limites.temperature_henMin + 50,limites.temperature_henMax - 50]
                  }else if (area == "temperature_hn"){                    
                    range_ = [limites.temperature_hnMin + 50,limites.temperature_hnMax - 50]
                  }else if (area == "temperature_h1"){                    
                    range_ = [limites.temperature_h1Min + 50,limites.temperature_h1Max - 50]
                  }else if (area == "temperature_h2"){                    
                    range_ = [limites.temperature_h2Min,limites.temperature_h2Max]
                  }else if (area == "temperature_h3"){                    
                    range_ = [limites.temperature_h3Min,limites.temperature_h3Max]
                  }else if (area == "temperature_h4"){                    
                    range_ = [limites.temperature_h4Min,limites.temperature_h4Max]
                  }else if (area == "temperature_h5"){                    
                    range_ = [limites.temperature_h5Min,limites.temperature_h5Max]
                  }else if (area == "temperature_oil"){                    
                    range_ = [limites.temperature_oilMin,limites.temperature_oilMax]
                  }else if (area == "temperature_hop"){                    
                    range_ = [limites.temperature_hopMin,limites.temperature_hopMax]
                  }
                  
                  
                  var layout = {
                    title: 'Carta de Controle',
                    xaxis: {
                      zeroline: false
                    },
                    yaxis: {
                      range: range_,
                      zeroline: false
                    }
                  }
                  
                  Plotly.newPlot('plotly', data,layout);
                
                
    
            }
    
            });


        


    
}


function plotaGrafico(){
    var value = $( "#maquinas" ).val();  

    var limites;
    var dados = [];
    console.log("value",value);

    console.log("ploty");   


    $.ajax({  
        url:'/parametrosCadastrados/'+value,  
        method:'get',  
        dataType:'json',
        success: function(parametrosMaquina) {
            console.log("Entrou no parametrosCadastrados")
            
            limites = parametrosMaquina;

        }

        });

        $.ajax({  
            url:'/parametrosReais/'+value,  
            method:'get',  
            dataType:'json',
            success: function(dadosp) {
            
                     console.log("Dados:" , dadosp)

                    dadosp.forEach(function(nome,i) {
                        dados.push(nome.prodShot)
                    })

                   
                   

                    
                

                var Data = {
                    type: 'scatter',
                    x:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
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
                  
                  var data = [Data,CL,Centre]
                  
                  var layout = {
                    title: 'Carta de Controle',
                    xaxis: {
                      zeroline: false
                    },
                    yaxis: {
                      range: [0,1000],
                      zeroline: false
                    }
                  }
                  
                  Plotly.newPlot('plotly', data,layout);
                
                
    
            }
    
            });


        


    
}


function atualizaConteudo(){

    setInterval(function(){

        $.ajax({  
            url:'/fichas/maquina/'+ $( "#maquinas" ).val(),  
            method:'get',  
            dataType:'json',
            success: function(parametrosMaquina) {
    
    
                $.ajax({  
                    url:'/fichasUltimo/maquina/'+parametrosMaquina.mac,  
                    method:'get',  
                    dataType:'json',
                    success: function(parametrosAtuais) { 
    
                            
                            $('#prodShot').text("Production Shot :  " + parametrosAtuais.prodShot);
                            $('#cycleTime').text("Cycle Time :  " + parametrosAtuais.cycleTime+ " s");
                            $('#dwellPressure').text("Dwell Pressure :  " + parametrosAtuais.dwellPressure+ " s");
                            $('#ok_prodShot').text("Ok ProdShot:  " + parametrosAtuais.ok_prodShot+ " s");
                            $('#fillingTime').text("Filling Time:  " + parametrosAtuais.fillingTime+ " s");
                            $('#chargingTime').text("Charging Time:  " + parametrosAtuais.chargingTime+ " s");
                            $('#takeoutTime').text("Take Out Time:  " + parametrosAtuais.takeoutTime+ " s");
                            $('#dwellChnagePosition').text("Dwell Change Position:  " + parametrosAtuais.dwellChnagePosition+ " s");
                            $('#cushionPosition').text("Cushion Position:  " + parametrosAtuais.cushionPosition+ " s");
                            $('#chargingTime').text("Charging Time:  " + parametrosAtuais.chargingTime + " s");
                            $('#minumumCushionPosition').text("Minumum Cushion Position :  " + parametrosAtuais.minumumCushionPosition + " s");
                            $('#injetStartPosition').text("Injet Start Position :  " + parametrosAtuais.injetStartPosition + " s");
                            $('#maxInjectPressure').text("Max Inject Pressure :  " + parametrosAtuais.maxInjectPressure + " s");
                            $('#screwRotationSpeed').text("Screw Rotation Speed :  " + parametrosAtuais.screwRotationSpeed + " s");
                            $('#temperature_hen').text("Temperature Hen :  " + parametrosAtuais.temperature_hen + " C");
                            $('#temperature_hn').text("Temperature Hn :  " + parametrosAtuais.temperature_hn + " C");
                            $('#temperature_h1').text("Temperature H1 :  " + parametrosAtuais.temperature_h1 + " C");
                            $('#temperature_h2').text("Temperature H2 :  " + parametrosAtuais.temperature_h2 + " C");
                            $('#temperature_h3').text("Temperature H3 :  " + parametrosAtuais.temperature_h3 + " C");                            
                            $('#temperature_h4').text("Temperature H4 :  " + parametrosAtuais.temperature_h4 + " C");
                            $('#temperature_h5').text("Temperature H5 :  " + parametrosAtuais.temperature_h5 + " C");
                            $('#temperature_oil').text("Temperature OIL :  " + parametrosAtuais.temperature_oil + " C");
                            $('#temperature_hop').text("Temperature HOP :  " + parametrosAtuais.temperature_hop + " C");
                            
    
                    }
    
                    });
    
    
                $.ajax({  
                    url:'/ficha/getFicha/'+parametrosMaquina.mac,  
                    method:'get',  
                    dataType:'json',
                    success: function(detalheFicha) {     
    
                        console.log(detalheFicha)
                        console.log(parametrosMaquina)

                        $("#parametros tr").remove();


                        markup = "<tr>"+
                            "<th> Parâmetro </th>" + 
                            "<th>" + "Valor Mínimo" + "</th>" +                             
                            "<th>" + "Valor Máximo" + "</th>" + 
                            "<th>" + "Último valor setado" + "</th>" +             
                            "</tr>" 
                
            
                        if(detalheFicha.VI1_max < parametrosMaquina.VI1 || detalheFicha.VI1_min > parametrosMaquina.VI1 ){
                            markup = markup + "<tr>"+
                            "<td> VI1 </td>" + 
                            "<td>" + detalheFicha.VI1_min + "</td>" +                             
                            "<td>" + detalheFicha.VI1_max + "</td>" + 
                            "<td>" + parametrosMaquina.VI1 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup = markup + "<tr>"+
                        "<td> VI1 </td>" + 
                        "<td>" + detalheFicha.VI1_min + "</td>" + 
                        "<td>" + detalheFicha.VI1_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI1 + "</td>" +             
                        "</tr>" 
                        }
    
                        if(detalheFicha.VI2_max < parametrosMaquina.VI2 || detalheFicha.VI2_min > parametrosMaquina.VI2){
                            markup =markup + "<tr style=\"background-color:#FDFD96\">"+
                            "<td> VI2 </td>" + 
                            "<td>" + detalheFicha.VI2_min + "</td>" + 
                            "<td>" + detalheFicha.VI2_max + "</td>" + 
                            "<td>" + parametrosMaquina.VI2 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup =  markup + "<tr>"+
                        "<td> VI2 </td>" + 
                        "<td>" + detalheFicha.VI2_min + "</td>" + 
                        "<td>" + detalheFicha.VI2_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI2 + "</td>" +             
                        "</tr>" 
                        }
    
    
                        if(detalheFicha.VI3_max < parametrosMaquina.VI3 || detalheFicha.VI3_min > parametrosMaquina.VI3){
                            markup =markup + "<tr style=\"background-color:#FDFD96\">"+
                            "<td> VI3 </td>" + 
                            "<td>" + detalheFicha.VI3_min + "</td>" + 
                            "<td>" + detalheFicha.VI3_max + "</td>" + 
                            "<td>" + parametrosMaquina.VI3 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup = markup +"<tr>"+
                        "<td> VI3 </td>" + 
                        "<td>" + detalheFicha.VI3_min + "</td>" + 
                        "<td>" + detalheFicha.VI3_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI3 + "</td>" +             
                        "</tr>" 
                        }
    
                        if(detalheFicha.VI4_max < parametrosMaquina.VI4 || detalheFicha.VI4_min > parametrosMaquina.VI4){
                            markup =markup + "<tr style=\"background-color:#FDFD96\">"+
                            "<td> VI4 </td>" + 
                            "<td>" + detalheFicha.VI4_min + "</td>" + 
                            "<td>" + detalheFicha.VI4_max + "</td>" + 
                            "<td>" + parametrosMaquina.VI4 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup = markup +"<tr>"+
                        "<td> VI4 </td>" + 
                        "<td>" + detalheFicha.VI4_min + "</td>" + 
                        "<td>" + detalheFicha.VI4_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI4 + "</td>" +             
                        "</tr>" 
                        }
    
                        if(detalheFicha.VI5_max < parametrosMaquina.VI5 || detalheFicha.VI5_min > parametrosMaquina.VI5){
                            markup =markup + "<tr style=\"background-color:#FDFD96\">"+
                            "<td> VI5 </td>" + 
                            "<td>" + detalheFicha.VI5_min + "</td>" + 
                            "<td>" + detalheFicha.VI5_max + "</td>" + 
                            "<td>" + parametrosMaquina.VI5 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup = markup +"<tr>"+
                        "<td> VI5 </td>" + 
                        "<td>" + detalheFicha.VI5_min + "</td>" + 
                        "<td>" + detalheFicha.VI5_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI5 + "</td>" +             
                        "</tr>" 
                        }
    
                        if(detalheFicha.VI6_max < parametrosMaquina.VI6 || detalheFicha.VI6_min > parametrosMaquina.VI6){
                            markup =markup + "<tr style=\"background-color:#FDFD96\">"+
                            "<td> VI6 </td>" + 
                            "<td>" + detalheFicha.VI6_min + "</td>" + 
                            "<td>" + detalheFicha.VI6_max + "</td>" + 
                            "<td>" + parametrosMaquina.VI6 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup = markup +"<tr>"+
                        "<td> VI6 </td>" + 
                        "<td>" + detalheFicha.VI6_min + "</td>" + 
                        "<td>" + detalheFicha.VI6_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI6 + "</td>" +             
                        "</tr>" 
                        }
    
                        if(detalheFicha.VI7_max < parametrosMaquina.VI7 || detalheFicha.VI7_min > parametrosMaquina.VI7){
                            markup =markup + "<tr style=\"background-color:#FDFD96\">"+
                            "<td> VI7 </td>" + 
                            "<td>" + detalheFicha.VI7_min + "</td>" + 
                            "<td>" + detalheFicha.VI7_max + "</td>" + 
                            "<td>" + parametrosMaquina.VI7 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup = markup + "<tr>"+
                        "<td> VI7 </td>" + 
                        "<td>" + detalheFicha.VI7_min + "</td>" + 
                        "<td>" + detalheFicha.VI7_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI7 + "</td>" +             
                        "</tr>" 
                        }
    
                        if(detalheFicha.VI8_max < parametrosMaquina.VI8 || detalheFicha.VI8_min > parametrosMaquina.VI8){
                            markup =markup + "<tr style=\"background-color:#FDFD96\">"+
                            "<td> VI8 </td>" + 
                            "<td>" + detalheFicha.VI8_min + "</td>" + 
                            "<td>" + detalheFicha.VI8_max + "</td>" + 
                            "<td>" + parametrosMaquina.VI8 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup = markup +"<tr>"+
                        "<td> VI8 </td>" + 
                        "<td>" + detalheFicha.VI8_min + "</td>" + 
                        "<td>" + detalheFicha.VI8_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI8 + "</td>" +             
                        "</tr>" 
                        }
    
                        if(detalheFicha.VI9_max < parametrosMaquina.VI9 || detalheFicha.VI9_min > parametrosMaquina.VI9){
                            markup =markup + "<tr style=\"background-color:#FDFD96\">"+
                            "<td> VI9 </td>" + 
                            "<td>" + detalheFicha.VI9_min + "</td>" + 
                            "<td>" + detalheFicha.VI9_max + "</td>" + 
                            "<td>" + parametrosMaquina.VI9 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup = markup +"<tr>"+
                        "<td> VI9 </td>" + 
                        "<td>" + detalheFicha.VI9_min + "</td>" + 
                        "<td>" + detalheFicha.VI9_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI9 + "</td>" +             
                        "</tr>" 
                        }
    
                        if(detalheFicha.VI10_max < parametrosMaquina.VI10 || detalheFicha.VI10_min > parametrosMaquina.VI10){
                            markup =markup + "<tr style=\"background-color:#FDFD96\">"+
                            "<td> VI10 </td>" + 
                            "<td>" + detalheFicha.VI10_min + "</td>" + 
                            "<td>" + detalheFicha.VI10_max + "</td>" + 
                            "<td>" + parametrosMaquina.VI10 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup =markup + "<tr>"+
                        "<td> VI10 </td>" + 
                        "<td>" + detalheFicha.VI10_min + "</td>" + 
                        "<td>" + detalheFicha.VI10_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI10 + "</td>" +             
                        "</tr>" 
                        }    
    
                        if(detalheFicha.VH1_max < parametrosMaquina.VH1 || detalheFicha.VH1_min > parametrosMaquina.VH1){
                            markup =markup + "<tr style=\"background-color:#FDFD96\">"+
                            "<td> VH1 </td>" + 
                            "<td>" + detalheFicha.VH1_min + "</td>" + 
                            "<td>" + detalheFicha.VH1_max + "</td>" + 
                            "<td>" + parametrosMaquina.VH1 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup =markup + "<tr>"+
                        "<td> VH1 </td>" + 
                        "<td>" + detalheFicha.VH1_min + "</td>" + 
                        "<td>" + detalheFicha.VH1_max + "</td>" + 
                        "<td>" + parametrosMaquina.VH1 + "</td>" +             
                        "</tr>" 
                        }
    
                        if(detalheFicha.VH2_max < parametrosMaquina.VH2 || detalheFicha.VH2_min > parametrosMaquina.VH2){
                            markup =markup + "<tr style=\"background-color:#FDFD96\">"+
                            "<td> VH2 </td>" + 
                            "<td>" + detalheFicha.VH2_min + "</td>" + 
                            "<td>" + detalheFicha.VH2_max + "</td>" + 
                            "<td>" + parametrosMaquina.VH2 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup =markup + "<tr>"+
                        "<td> VH2 </td>" + 
                        "<td>" + detalheFicha.VH2_min + "</td>" + 
                        "<td>" + detalheFicha.VH2_max + "</td>" + 
                        "<td>" + parametrosMaquina.VH2 + "</td>" +             
                        "</tr>" 
                        }
    
                        if(detalheFicha.PI1_max < parametrosMaquina.PI1 || detalheFicha.PI1_min > parametrosMaquina.PI1){
                            markup =markup + "<tr style=\"background-color:#FDFD96\">"+
                            "<td> PI1 </td>" + 
                            "<td>" + detalheFicha.PI1_min + "</td>" + 
                            "<td>" + detalheFicha.PI1_max + "</td>" + 
                            "<td>" + parametrosMaquina.PI1 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup = markup +"<tr>"+
                        "<td> PI1 </td>" + 
                        "<td>" + detalheFicha.PI1_min + "</td>" + 
                        "<td>" + detalheFicha.PI1_max + "</td>" + 
                        "<td>" + parametrosMaquina.PI1 + "</td>" +             
                        "</tr>" 
                        }
    
                        if(detalheFicha.LS4_max < parametrosMaquina.LS4 || detalheFicha.LS4_min > parametrosMaquina.LS4){
                            markup =markup + "<tr style=\"background-color:#FDFD96\">"+
                            "<td> LS4 </td>" + 
                            "<td>" + detalheFicha.LS4_min + "</td>" + 
                            "<td>" + detalheFicha.LS4_max + "</td>" + 
                            "<td>" + parametrosMaquina.LS4 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup = markup +"<tr>"+
                        "<td> LS4 </td>" + 
                        "<td>" + detalheFicha.LS4_min + "</td>" + 
                        "<td>" + detalheFicha.LS4_max + "</td>" + 
                        "<td>" + parametrosMaquina.LS4 + "</td>" +             
                        "</tr>" 
                        }
    
                        if(detalheFicha.LS4A_max < parametrosMaquina.LS4A || detalheFicha.LS4A_min > parametrosMaquina.LS4A){
                            markup =markup + "<tr style=\"background-color:#FDFD96\">"+
                            "<td> LS4A </td>" + 
                            "<td>" + detalheFicha.LS4A_min + "</td>" + 
                            "<td>" + detalheFicha.LS4A_max + "</td>" + 
                            "<td>" + parametrosMaquina.LS4A + "</td>" +             
                            "</tr>" 
                        }else{
                            markup = markup +"<tr>"+
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

    },3000);

}




$('#maquinas').change(function(){ 
    

    atualizaConteudo();

   
    
});

