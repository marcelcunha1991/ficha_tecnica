

var Data = {
    type: 'scatter',
    x: [1,2,3,4,5,6,7,8,9],
    y: [4,2,-1,4,-5,-7,0,3,8],
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
  
  var Viol = {
    type: 'scatter',
    x: [6,9],
    y: [-7,8],
    mode: 'markers',
    name: 'Violation',
    showlegend: true,
    marker: {
      color: 'rgb(255,65,54)',
      line: {width: 3},
      opacity: 0.5,
      size: 12,
      symbol: 'circle-open'
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
  
  var data = [Data,Viol,CL,Centre]
  
  var layout = {
    title: 'Basic SPC Chart',
    xaxis: {
      zeroline: false
    },
    yaxis: {
      range: [-10,10],
      zeroline: false
    }
  }
  
  Plotly.newPlot('plotly', data,layout);



$('#maquinas').change(function(){ 
    var value = $( "#maquinas" ).val();   
    console.log(value);

    $.ajax({  
        url:'/fichas/maquina/'+value,  
        method:'get',  
        dataType:'json',
        success: function(parametrosMaquina) {


            $.ajax({  
                url:'/ficha/getFicha/'+parametrosMaquina.mac,  
                method:'get',  
                dataType:'json',
                success: function(detalheFicha) {     
                    
                    console.log(detalheFicha)
        
                    if(detalheFicha.VI1_max < parametrosMaquina.VI1){
                        markup = "<tr style=\"background-color:#FFFF00\">"+
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
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> VI2 </td>" + 
                        "<td>" + detalheFicha.VI2_min + "</td>" + 
                        "<td>" + detalheFicha.VI2_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI2 + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
                    "<td> VI2 </td>" + 
                    "<td>" + detalheFicha.VI2_min + "</td>" + 
                    "<td>" + detalheFicha.VI2_max + "</td>" + 
                    "<td>" + parametrosMaquina.VI2 + "</td>" +             
                    "</tr>" 
                    }


                    if(detalheFicha.VI3_max < parametrosMaquina.VI3){
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> VI3 </td>" + 
                        "<td>" + detalheFicha.VI3_min + "</td>" + 
                        "<td>" + detalheFicha.VI3_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI3 + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
                    "<td> VI3 </td>" + 
                    "<td>" + detalheFicha.VI3_min + "</td>" + 
                    "<td>" + detalheFicha.VI3_max + "</td>" + 
                    "<td>" + parametrosMaquina.VI3 + "</td>" +             
                    "</tr>" 
                    }

                    if(detalheFicha.VI4_max < parametrosMaquina.VI4){
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> VI4 </td>" + 
                        "<td>" + detalheFicha.VI4_min + "</td>" + 
                        "<td>" + detalheFicha.VI4_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI4 + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
                    "<td> VI4 </td>" + 
                    "<td>" + detalheFicha.VI4_min + "</td>" + 
                    "<td>" + detalheFicha.VI4_max + "</td>" + 
                    "<td>" + parametrosMaquina.VI4 + "</td>" +             
                    "</tr>" 
                    }

                    if(detalheFicha.VI5_max < parametrosMaquina.VI5){
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> VI5 </td>" + 
                        "<td>" + detalheFicha.VI5_min + "</td>" + 
                        "<td>" + detalheFicha.VI5_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI5 + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
                    "<td> VI5 </td>" + 
                    "<td>" + detalheFicha.VI5_min + "</td>" + 
                    "<td>" + detalheFicha.VI5_max + "</td>" + 
                    "<td>" + parametrosMaquina.VI5 + "</td>" +             
                    "</tr>" 
                    }

                    if(detalheFicha.VI6_max < parametrosMaquina.VI6){
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> VI6 </td>" + 
                        "<td>" + detalheFicha.VI6_min + "</td>" + 
                        "<td>" + detalheFicha.VI6_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI6 + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
                    "<td> VI6 </td>" + 
                    "<td>" + detalheFicha.VI6_min + "</td>" + 
                    "<td>" + detalheFicha.VI6_max + "</td>" + 
                    "<td>" + parametrosMaquina.VI6 + "</td>" +             
                    "</tr>" 
                    }

                    if(detalheFicha.VI7_max < parametrosMaquina.VI7){
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> VI7 </td>" + 
                        "<td>" + detalheFicha.VI7_min + "</td>" + 
                        "<td>" + detalheFicha.VI7_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI7 + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
                    "<td> VI7 </td>" + 
                    "<td>" + detalheFicha.VI7_min + "</td>" + 
                    "<td>" + detalheFicha.VI7_max + "</td>" + 
                    "<td>" + parametrosMaquina.VI7 + "</td>" +             
                    "</tr>" 
                    }

                    if(detalheFicha.VI8_max < parametrosMaquina.VI8){
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> VI8 </td>" + 
                        "<td>" + detalheFicha.VI8_min + "</td>" + 
                        "<td>" + detalheFicha.VI8_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI8 + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
                    "<td> VI8 </td>" + 
                    "<td>" + detalheFicha.VI8_min + "</td>" + 
                    "<td>" + detalheFicha.VI8_max + "</td>" + 
                    "<td>" + parametrosMaquina.VI8 + "</td>" +             
                    "</tr>" 
                    }

                    if(detalheFicha.VI9_max < parametrosMaquina.VI9){
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> VI9 </td>" + 
                        "<td>" + detalheFicha.VI9_min + "</td>" + 
                        "<td>" + detalheFicha.VI9_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI9 + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
                    "<td> VI9 </td>" + 
                    "<td>" + detalheFicha.VI9_min + "</td>" + 
                    "<td>" + detalheFicha.VI9_max + "</td>" + 
                    "<td>" + parametrosMaquina.VI9 + "</td>" +             
                    "</tr>" 
                    }

                    if(detalheFicha.VI10_max < parametrosMaquina.VI10){
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> VI10 </td>" + 
                        "<td>" + detalheFicha.VI10_min + "</td>" + 
                        "<td>" + detalheFicha.VI10_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI10 + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
                    "<td> VI10 </td>" + 
                    "<td>" + detalheFicha.VI10_min + "</td>" + 
                    "<td>" + detalheFicha.VI10_max + "</td>" + 
                    "<td>" + parametrosMaquina.VI10 + "</td>" +             
                    "</tr>" 
                    }

                    if(detalheFicha.VI10_max < parametrosMaquina.VI10){
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> VI10 </td>" + 
                        "<td>" + detalheFicha.VI10_min + "</td>" + 
                        "<td>" + detalheFicha.VI10_max + "</td>" + 
                        "<td>" + parametrosMaquina.VI10 + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
                    "<td> VI10 </td>" + 
                    "<td>" + detalheFicha.VI10_min + "</td>" + 
                    "<td>" + detalheFicha.VI10_max + "</td>" + 
                    "<td>" + parametrosMaquina.VI10 + "</td>" +             
                    "</tr>" 
                    }

                    if(detalheFicha.VH1_max < parametrosMaquina.VH1){
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> VH1 </td>" + 
                        "<td>" + detalheFicha.VH1_min + "</td>" + 
                        "<td>" + detalheFicha.VH1_max + "</td>" + 
                        "<td>" + parametrosMaquina.VH1 + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
                    "<td> VH1 </td>" + 
                    "<td>" + detalheFicha.VH1_min + "</td>" + 
                    "<td>" + detalheFicha.VH1_max + "</td>" + 
                    "<td>" + parametrosMaquina.VH1 + "</td>" +             
                    "</tr>" 
                    }

                    if(detalheFicha.VH2_max < parametrosMaquina.VH2){
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> VH2 </td>" + 
                        "<td>" + detalheFicha.VH2_min + "</td>" + 
                        "<td>" + detalheFicha.VH2_max + "</td>" + 
                        "<td>" + parametrosMaquina.VH2 + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
                    "<td> VH2 </td>" + 
                    "<td>" + detalheFicha.VH2_min + "</td>" + 
                    "<td>" + detalheFicha.VH2_max + "</td>" + 
                    "<td>" + parametrosMaquina.VH2 + "</td>" +             
                    "</tr>" 
                    }

                    if(detalheFicha.PI1_max < parametrosMaquina.PI1){
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> PI1 </td>" + 
                        "<td>" + detalheFicha.PI1_min + "</td>" + 
                        "<td>" + detalheFicha.PI1_max + "</td>" + 
                        "<td>" + parametrosMaquina.PI1 + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
                    "<td> PI1 </td>" + 
                    "<td>" + detalheFicha.PI1_min + "</td>" + 
                    "<td>" + detalheFicha.PI1_max + "</td>" + 
                    "<td>" + parametrosMaquina.PI1 + "</td>" +             
                    "</tr>" 
                    }

                    if(detalheFicha.LS4_max < parametrosMaquina.LS4){
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> LS4 </td>" + 
                        "<td>" + detalheFicha.LS4_min + "</td>" + 
                        "<td>" + detalheFicha.LS4_max + "</td>" + 
                        "<td>" + parametrosMaquina.LS4 + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
                    "<td> LS4 </td>" + 
                    "<td>" + detalheFicha.LS4_min + "</td>" + 
                    "<td>" + detalheFicha.LS4_max + "</td>" + 
                    "<td>" + parametrosMaquina.LS4 + "</td>" +             
                    "</tr>" 
                    }

                    if(detalheFicha.LS4A_max < parametrosMaquina.LS4A){
                        markup =markup + "<tr style=\"background-color:#FFFF00\">"+
                        "<td> LS4A </td>" + 
                        "<td>" + detalheFicha.LS4A_min + "</td>" + 
                        "<td>" + detalheFicha.LS4A_max + "</td>" + 
                        "<td>" + parametrosMaquina.LS4A + "</td>" +             
                        "</tr>" 
                    }else{
                        markup = "<tr>"+
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
    
});

