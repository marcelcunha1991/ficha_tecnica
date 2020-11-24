// document.getElementById("prodShot").addEventListener("click", plotaGrafico);
document.getElementById("cycleTime").addEventListener("click", plotaGrafico2);

function plotaGrafico2(){
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
                        dados.push(nome.cycleTime)
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
                    y: [limites.cycleTimeMin, limites.cycleTimeMin, null, limites.cycleTimeMax, limites.cycleTimeMax],
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
                      range: [limites.cycleTimeMin,limites.cycleTimeMax],
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




$('#maquinas').change(function(){ 
    var value = $( "#maquinas" ).val();   
    
    

    setInterval(function(){

        $.ajax({  
            url:'/fichas/maquina/'+value,  
            method:'get',  
            dataType:'json',
            success: function(parametrosMaquina) {
    
    
                $.ajax({  
                    url:'/fichasUltimo/maquina/'+parametrosMaquina.mac,  
                    method:'get',  
                    dataType:'json',
                    success: function(parametrosAtuais) { 
    
                            $('#prodShot').text("Production Shot :  " + parametrosAtuais.prodShot);
                            $('#cycleTime').text("Cycle Time :  " + parametrosAtuais.cycleTime+ " Seg");
                            $('#dwellPressure').text("Dwell Pressure :  " + parametrosAtuais.dwellPressure+ " Seg");
                            $('#ok_prodShot').text("Ok ProdShot:  " + parametrosAtuais.ok_prodShot+ " Seg");
                            $('#fillingTime').text("Filling Time:  " + parametrosAtuais.fillingTime+ " Seg");
                            $('#chargingTime').text("Charging Time:  " + parametrosAtuais.chargingTime+ " Seg");
                            $('#takeoutTime').text("Take Out Time:  " + parametrosAtuais.takeoutTime+ " Seg");
                            $('#dwellChnagePosition').text("Dwell Change Position:  " + parametrosAtuais.dwellChnagePosition+ " Seg");
                            $('#cushionPosition').text("Cushion Position:  " + parametrosAtuais.cushionPosition+ " Seg");
                            $('#chargingTime').text("Charging Time:  " + parametrosAtuais.chargingTime + " Seg");
                            $('#minumumCushionPosition').text("Minumum Cushion Position :  " + parametrosAtuais.minumumCushionPosition + " Seg");
                            $('#injetStartPosition').text("Injet Start Position :  " + parametrosAtuais.injetStartPosition + " Seg");
                            $('#maxInjectPressure').text("Max Inject Pressure :  " + parametrosAtuais.maxInjectPressure + " Seg");
                            $('#screwRotationSpeed').text("Screw Rotation Speed :  " + parametrosAtuais.screwRotationSpeed + " Seg");
    
                    }
    
                    });
    
    
                $.ajax({  
                    url:'/ficha/getFicha/'+parametrosMaquina.mac,  
                    method:'get',  
                    dataType:'json',
                    success: function(detalheFicha) {     
    
                        console.log(detalheFicha)
                        console.log(parametrosMaquina)
                
            
                        if(detalheFicha.VI1_max < parametrosMaquina.VI1 || detalheFicha.VI1_max > parametrosMaquina.VI1 ){
                            markup = "<tr>"+
                            "<td> VI1 </td>" + 
                            "<td>" + detalheFicha.VI1_min + "</td>" +                             
                            "<td>" + detalheFicha.VI1_max + "</td>" + 
                            "<td>" + parametrosMaquina.VI1 + "</td>" +             
                            "</tr>" 
                        }else{
                            markup = "<tr>"+
                        "<td> VI1 </td>" + 
                        "<td>" + detalheFicha.VI1_min + "</td>" + 
                        "<td>" + detalheFicha.VI1_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI1 + "</td>" +             
                        "</tr>" 
                        }
    
                        if(detalheFicha.VI2_max < parametrosMaquina.VI2){
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
    
    
                        if(detalheFicha.VI3_max < parametrosMaquina.VI3){
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
    
                        if(detalheFicha.VI4_max < parametrosMaquina.VI4){
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
    
                        if(detalheFicha.VI5_max < parametrosMaquina.VI5){
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
    
                        if(detalheFicha.VI6_max < parametrosMaquina.VI6){
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
    
                        if(detalheFicha.VI7_max < parametrosMaquina.VI7){
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
    
                        if(detalheFicha.VI8_max < parametrosMaquina.VI8){
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
    
                        if(detalheFicha.VI9_max < parametrosMaquina.VI9){
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
    
                        if(detalheFicha.VI10_max < parametrosMaquina.VI10){
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
    
                        if(detalheFicha.VI10_max < parametrosMaquina.VI10){
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
    
                        if(detalheFicha.VH1_max < parametrosMaquina.VH1){
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
    
                        if(detalheFicha.VH2_max < parametrosMaquina.VH2){
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
    
                        if(detalheFicha.PI1_max < parametrosMaquina.PI1){
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
    
                        if(detalheFicha.LS4_max < parametrosMaquina.LS4){
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
    
                        if(detalheFicha.LS4A_max < parametrosMaquina.LS4A){
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

   
    
});

