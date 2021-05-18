$('#maquinas').change(function () {
   var anchor = '';

   if ($("#maquinas").val() !== "0") {
      anchor += "<button style='margin-right: 5px' class='btn btn-info params' onclick='tipoVisualizacao(1)'>Visualização em lista</button>"
      + "<button class='btn btn-info params' onclick='tipoVisualizacao(2)'>Visualização em Ficha</button>"

      div = $("#nav");
      div.html(anchor);


   } else {
      $(".params").hide();
      
   }
});

$("#parametros").hide();
$("#ficha").hide();

function tipoVisualizacao(tipo) {

   if (tipo === 1) {
      $("#parametros").show();
      $("#ficha").hide();

      setInterval(function () {
         var maquina;


         //OBTEM DADOS DE MAQUINA
         $.ajax({
            url: '/maquinaById/' + $("#maquinas").val(),
            method: 'get',
            dataType: 'json',
            success: function (maquina_) {     

               // PREENCHE TABELA DE FICHA TECNICA DA COLETA PASTORE
               $.ajax({
                  url: '/fichasUltimo/maquina/' + $("#maquinas").val(),
                  method: 'get',
                  dataType: 'json',
                  success: function (parametros) {

                     // console.log(parametrosMaquina)

                     $.ajax({
                        url: '/ficha/getFichaPastoreInjetores/' + parametros.mac,
                        method: 'get',
                        dataType: 'json',
                        success: function (injetor) {
                           // console.log(detalheFichaInjetores)
                           // console.log(parametrosMaquina)

                           $.ajax({
                              url: '/ficha/getFichaPastorePerifericos/' + parametros.mac,
                              method: 'get',
                              dataType: 'json',
                              success: function(perifericos) {
                                 // console.log(detalheFichaPerifericos)

                                 $("#parametros tr").remove();


                                 markup = "<tr>" +
                                 "<th> Parâmetro </th>" +
                                 "<th>" + "Valor Esperado" + "</th>" +
                                 // "<th>" + "Valor Máximo" + "</th>" +
                                 "<th>" + "Último valor setado" + "</th>" +
                                 "</tr>"

                                 if (injetor.cilindro1 !== 0 && (parametros.TEMPERATURA_ZONA_1 < (injetor.cilindro1 - (injetor.cilindro1 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_1 > (injetor.cilindro1 + (injetor.cilindro1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_1 </td>" +  
                                    "<td>" + injetor.cilindro1 + "</td>" +                   
                                    "<td>" + parametros.TEMPERATURA_ZONA_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_1 </td>" +  
                                    "<td>" + injetor.cilindro1 + "</td>" +                   
                                    "<td>" + parametros.TEMPERATURA_ZONA_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.cilindro2 !== 0 && (parametros.TEMPERATURA_ZONA_2 < (injetor.cilindro2 - (injetor.cilindro2 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_2 > (injetor.cilindro2 + (injetor.cilindro2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_2 </td>" +   
                                    "<td>" + injetor.cilindro2 + "</td>" +                    
                                    "<td>" + parametros.TEMPERATURA_ZONA_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_2 </td>" +   
                                    "<td>" + injetor.cilindro2 + "</td>" +                    
                                    "<td>" + parametros.TEMPERATURA_ZONA_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.cilindro3 !== 0 && (parametros.TEMPERATURA_ZONA_3 < (injetor.cilindro3 - (injetor.cilindro3 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_3 > (injetor.cilindro3 + (injetor.cilindro3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_3 </td>" +       
                                    "<td>" + injetor.cilindro3 + "</td>" +                
                                    "<td>" + parametros.TEMPERATURA_ZONA_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_3 </td>" +       
                                    "<td>" + injetor.cilindro3 + "</td>" +                
                                    "<td>" + parametros.TEMPERATURA_ZONA_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.cilindro4 !== 0 && (parametros.TEMPERATURA_ZONA_4 < (injetor.cilindro4 - (injetor.cilindro4 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_4 > (injetor.cilindro4 + (injetor.cilindro4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_4 </td>" +      
                                    "<td>" + injetor.cilindro4 + "</td>" +                 
                                    "<td>" + parametros.TEMPERATURA_ZONA_4 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_4 </td>" +      
                                    "<td>" + injetor.cilindro4 + "</td>" +                 
                                    "<td>" + parametros.TEMPERATURA_ZONA_4 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.cilindro5 !== 0 && (parametros.TEMPERATURA_ZONA_5 < (injetor.cilindro5 - (injetor.cilindro5 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_5 > (injetor.cilindro5 + (injetor.cilindro5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_5 </td>" +
                                    "<td>" + injetor.cilindro5 + "</td>" +                       
                                    "<td>" + parametros.TEMPERATURA_ZONA_5 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_5 </td>" +
                                    "<td>" + injetor.cilindro5 + "</td>" +                       
                                    "<td>" + parametros.TEMPERATURA_ZONA_5 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.cilindro6 !== 0 && (parametros.TEMPERATURA_ZONA_6 < (injetor.cilindro6 - (injetor.cilindro6 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_6 > (injetor.cilindro6 + (injetor.cilindro6 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_6 </td>" + 
                                    "<td>" + injetor.cilindro6 + "</td>" +                      
                                    "<td>" + parametros.TEMPERATURA_ZONA_6 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_6 </td>" + 
                                    "<td>" + injetor.cilindro6 + "</td>" +                      
                                    "<td>" + parametros.TEMPERATURA_ZONA_6 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.cilindro7 !== 0 && (parametros.TEMPERATURA_ZONA_7 < (injetor.cilindro7 - (injetor.cilindro7 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_7 > (injetor.cilindro7 + (injetor.cilindro7 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_7 </td>" +  
                                    "<td>" + injetor.cilindro7 + "</td>" +                     
                                    "<td>" + parametros.TEMPERATURA_ZONA_7 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_7 </td>" +  
                                    "<td>" + injetor.cilindro7 + "</td>" +                     
                                    "<td>" + parametros.TEMPERATURA_ZONA_7 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.posInjecao1 !== 0 && (parametros.INJECAO_POSICAO_1 < (injetor.posInjecao1 - (injetor.posInjecao1 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_1 > (injetor.posInjecao1 + (injetor.posInjecao1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_1 </td>" +   
                                    "<td>" + injetor.posInjecao1 + "</td>" +                    
                                    "<td>" + parametros.INJECAO_POSICAO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_1 </td>" +   
                                    "<td>" + injetor.posInjecao1 + "</td>" +                    
                                    "<td>" + parametros.INJECAO_POSICAO_1 + "</td>" +                    
                                    "</tr>"
                                 }
                                 
                                 if (injetor.posInjecao2 !== 0 && (parametros.INJECAO_POSICAO_2 < (injetor.posInjecao2 - (injetor.posInjecao2 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_2 > (injetor.posInjecao2 + (injetor.posInjecao2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_2 </td>" +     
                                    "<td>" + injetor.posInjecao2 + "</td>" +               
                                    "<td>" + parametros.INJECAO_POSICAO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_2 </td>" +     
                                    "<td>" + injetor.posInjecao2 + "</td>" +               
                                    "<td>" + parametros.INJECAO_POSICAO_2 + "</td>" +                    
                                    "</tr>"
                                 }
                                 
                                 if (injetor.posInjecao3 !== 0 && (parametros.INJECAO_POSICAO_3 < (injetor.posInjecao3 - (injetor.posInjecao3 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_3 > (injetor.posInjecao3 + (injetor.posInjecao3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_3 </td>" +        
                                    "<td>" + injetor.posInjecao3 + "</td>" +             
                                    "<td>" + parametros.INJECAO_POSICAO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_3 </td>" +        
                                    "<td>" + injetor.posInjecao3 + "</td>" +             
                                    "<td>" + parametros.INJECAO_POSICAO_3 + "</td>" +                    
                                    "</tr>"
                                 }
                                 
                                 if (injetor.posInjecao4 !== 0 && (parametros.INJECAO_POSICAO_4 < (injetor.posInjecao4 - (injetor.posInjecao4 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_4 > (injetor.posInjecao4 + (injetor.posInjecao4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_4 </td>" + 
                                    "<td>" + injetor.posInjecao4 + "</td>" +                   
                                    "<td>" + parametros.INJECAO_POSICAO_4 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_4 </td>" + 
                                    "<td>" + injetor.posInjecao4 + "</td>" +                   
                                    "<td>" + parametros.INJECAO_POSICAO_4 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.posInjecao5 !== 0 && (parametros.INJECAO_POSICAO_5 < (injetor.posInjecao5 - (injetor.posInjecao5 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_5 > (injetor.posInjecao5 + (injetor.posInjecao5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_5 </td>" +   
                                    "<td>" + injetor.posInjecao5 + "</td>" +                 
                                    "<td>" + parametros.INJECAO_POSICAO_5 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_5 </td>" +   
                                    "<td>" + injetor.posInjecao5 + "</td>" +                 
                                    "<td>" + parametros.INJECAO_POSICAO_5 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presInjecao1 !== 0 && (parametros.INJECAO_PRESSAO_1 < (injetor.presInjecao1 - (injetor.presInjecao1 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_1 > (injetor.presInjecao1 + (injetor.presInjecao1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_1 </td>" +        
                                    "<td>" + injetor.presInjecao1 + "</td>" +           
                                    "<td>" + parametros.INJECAO_PRESSAO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_1 </td>" +        
                                    "<td>" + injetor.presInjecao1 + "</td>" +           
                                    "<td>" + parametros.INJECAO_PRESSAO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presInjecao2 !== 0 && (parametros.INJECAO_PRESSAO_2 < (injetor.presInjecao2 - (injetor.presInjecao2 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_2 > (injetor.presInjecao2 + (injetor.presInjecao2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_2 </td>" +        
                                    "<td>" + injetor.presInjecao2 + "</td>" +            
                                    "<td>" + parametros.INJECAO_PRESSAO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_2 </td>" +        
                                    "<td>" + injetor.presInjecao2 + "</td>" +            
                                    "<td>" + parametros.INJECAO_PRESSAO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presInjecao3 !== 0 && (parametros.INJECAO_PRESSAO_3 < (injetor.presInjecao3 - (injetor.presInjecao3 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_3 > (injetor.presInjecao3 + (injetor.presInjecao3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_3 </td>" +       
                                    "<td>" + injetor.presInjecao3 + "</td>" +            
                                    "<td>" + parametros.INJECAO_PRESSAO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_3 </td>" +       
                                    "<td>" + injetor.presInjecao3 + "</td>" +            
                                    "<td>" + parametros.INJECAO_PRESSAO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presInjecao4 !== 0 && (parametros.INJECAO_PRESSAO_4 < (injetor.presInjecao4 - (injetor.presInjecao4 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_4 > (injetor.presInjecao4 + (injetor.presInjecao4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_4 </td>" + 
                                    "<td>" + injetor.presInjecao4 + "</td>" +                  
                                    "<td>" + parametros.INJECAO_PRESSAO_4 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_4 </td>" + 
                                    "<td>" + injetor.presInjecao4 + "</td>" +                  
                                    "<td>" + parametros.INJECAO_PRESSAO_4 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presInjecao5 !== 0 && (parametros.INJECAO_PRESSAO_5 < (injetor.presInjecao5 - (injetor.presInjecao5 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_5 > (injetor.presInjecao5 + (injetor.presInjecao5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_5 </td>" +   
                                    "<td>" + injetor.presInjecao5 + "</td>" +                 
                                    "<td>" + parametros.INJECAO_PRESSAO_5 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_5 </td>" +   
                                    "<td>" + injetor.presInjecao5 + "</td>" +                 
                                    "<td>" + parametros.INJECAO_PRESSAO_5 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoInjecao1 !== 0 && (parametros.INJECAO_FLUXO_1 < (injetor.fluxoInjecao1 - (injetor.fluxoInjecao1 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_1 > (injetor.fluxoInjecao1 + (injetor.fluxoInjecao1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_1 </td>" +       
                                    "<td>" + injetor.fluxoInjecao1 + "</td>" +             
                                    "<td>" + parametros.INJECAO_FLUXO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_1 </td>" +       
                                    "<td>" + injetor.fluxoInjecao1 + "</td>" +             
                                    "<td>" + parametros.INJECAO_FLUXO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoInjecao2 !== 0 && (parametros.INJECAO_FLUXO_2 < (injetor.fluxoInjecao2 - (injetor.fluxoInjecao2 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_2 > (injetor.fluxoInjecao2 + (injetor.fluxoInjecao2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_2 </td>" +   
                                    "<td>" + injetor.fluxoInjecao2 + "</td>" +                 
                                    "<td>" + parametros.INJECAO_FLUXO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_2 </td>" +   
                                    "<td>" + injetor.fluxoInjecao2 + "</td>" +                 
                                    "<td>" + parametros.INJECAO_FLUXO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoInjecao3 !== 0 && (parametros.INJECAO_FLUXO_3 < (injetor.fluxoInjecao3 - (injetor.fluxoInjecao3 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_3 > (injetor.fluxoInjecao3 + (injetor.fluxoInjecao3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_3 </td>" +     
                                    "<td>" + injetor.fluxoInjecao3 + "</td>" +              
                                    "<td>" + parametros.INJECAO_FLUXO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_3 </td>" +     
                                    "<td>" + injetor.fluxoInjecao3 + "</td>" +              
                                    "<td>" + parametros.INJECAO_FLUXO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoInjecao4 !== 0 && (parametros.INJECAO_FLUXO_4 < (injetor.fluxoInjecao4 - (injetor.fluxoInjecao4 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_4 > (injetor.fluxoInjecao4 + (injetor.fluxoInjecao4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_4 </td>" +       
                                    "<td>" + injetor.fluxoInjecao4 + "</td>" +             
                                    "<td>" + parametros.INJECAO_FLUXO_4 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_4 </td>" +       
                                    "<td>" + injetor.fluxoInjecao4 + "</td>" +             
                                    "<td>" + parametros.INJECAO_FLUXO_4 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoInjecao5 !== 0 && (parametros.INJECAO_FLUXO_5 < (injetor.fluxoInjecao5 - (injetor.fluxoInjecao5 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_5 > (injetor.fluxoInjecao5 + (injetor.fluxoInjecao5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_5 </td>" +     
                                    "<td>" + injetor.fluxoInjecao5 + "</td>" +               
                                    "<td>" + parametros.INJECAO_FLUXO_5 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_5 </td>" +     
                                    "<td>" + injetor.fluxoInjecao5 + "</td>" +               
                                    "<td>" + parametros.INJECAO_FLUXO_5 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presRecalque1 !== 0 && (parametros.RECALQUE_PRESSAO_1 < (injetor.presRecalque1 - (injetor.presRecalque1 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_1 > (injetor.presRecalque1 + (injetor.presRecalque1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_1 </td>" +     
                                    "<td>" + injetor.presRecalque1 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_1 </td>" +     
                                    "<td>" + injetor.presRecalque1 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presRecalque2 !== 0 && (parametros.RECALQUE_PRESSAO_2 < (injetor.presRecalque2 - (injetor.presRecalque2 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_2 > (injetor.presRecalque2 + (injetor.presRecalque2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_2 </td>" +     
                                    "<td>" + injetor.presRecalque2 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_2 </td>" +     
                                    "<td>" + injetor.presRecalque2 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_2 + "</td>" +                    
                                    "</tr>"
                                 }
                                 
                                 if (injetor.presRecalque3 !== 0 && (parametros.RECALQUE_PRESSAO_3 < (injetor.presRecalque3 - (injetor.presRecalque3 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_3 > (injetor.presRecalque3 + (injetor.presRecalque3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_3 </td>" +     
                                    "<td>" + injetor.presRecalque3 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_3 </td>" +     
                                    "<td>" + injetor.presRecalque3 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presRecalque4 !== 0 && (parametros.RECALQUE_PRESSAO_4 < (injetor.presRecalque4 - (injetor.presRecalque4 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_4 > (injetor.presRecalque4 + (injetor.presRecalque4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_4 </td>" +     
                                    "<td>" + injetor.presRecalque4 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_4 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_4 </td>" +     
                                    "<td>" + injetor.presRecalque4 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_4 + "</td>" +                    
                                    "</tr>"
                                 }
                                 
                                 if (injetor.presRecalque5 !== 0 && (parametros.RECALQUE_PRESSAO_5 < (injetor.presRecalque5 - (injetor.presRecalque5 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_5 > (injetor.presRecalque5 + (injetor.presRecalque5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_5 </td>" +     
                                    "<td>" + injetor.presRecalque5 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_5 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_5 </td>" +     
                                    "<td>" + injetor.presRecalque5 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_5 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoRecalque1 !== 0 && (parametros.RECALQUE_FLUXO_1 < (injetor.fluxoRecalque1 - (injetor.fluxoRecalque1 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_1 > (injetor.fluxoRecalque1 + (injetor.fluxoRecalque1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_1 </td>" +  
                                    "<td>" + injetor.fluxoRecalque1 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_1 </td>" +  
                                    "<td>" + injetor.fluxoRecalque1 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_1 + "</td>" +                    
                                    "</tr>"
                                 }
                                 
                                 if (injetor.fluxoRecalque2 !== 0 && (parametros.RECALQUE_FLUXO_2 < (injetor.fluxoRecalque2 - (injetor.fluxoRecalque2 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_2 > (injetor.fluxoRecalque2 + (injetor.fluxoRecalque2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_2 </td>" +  
                                    "<td>" + injetor.fluxoRecalque2 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_2 </td>" +  
                                    "<td>" + injetor.fluxoRecalque2 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_2 + "</td>" +                    
                                    "</tr>"
                                 }
                                 
                                 if (injetor.fluxoRecalque3 !== 0 && (parametros.RECALQUE_FLUXO_3 < (injetor.fluxoRecalque3 - (injetor.fluxoRecalque3 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_3 > (injetor.fluxoRecalque3 + (injetor.fluxoRecalque3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_3 </td>" +  
                                    "<td>" + injetor.fluxoRecalque3 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_3 </td>" +  
                                    "<td>" + injetor.fluxoRecalque3 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoRecalque4 !== 0 && (parametros.RECALQUE_FLUXO_4 < (injetor.fluxoRecalque4 - (injetor.fluxoRecalque4 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_4 > (injetor.fluxoRecalque4 + (injetor.fluxoRecalque4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_4 </td>" +  
                                    "<td>" + injetor.fluxoRecalque4 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_4 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_4 </td>" +  
                                    "<td>" + injetor.fluxoRecalque4 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_4 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoRecalque5 !== 0 && (parametros.RECALQUE_FLUXO_5 < (injetor.fluxoRecalque5 - (injetor.fluxoRecalque5 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_5 > (injetor.fluxoRecalque5 + (injetor.fluxoRecalque5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_5 </td>" +  
                                    "<td>" + injetor.fluxoRecalque5 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_5 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_5 </td>" +  
                                    "<td>" + injetor.fluxoRecalque5 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_5 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.tempoRecalque1 !== 0 && (parametros.RECALQUE_TEMPO_1 < (injetor.tempoRecalque1 - (injetor.tempoRecalque1 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_1 > (injetor.tempoRecalque1 + (injetor.tempoRecalque1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_1 </td>" +    
                                    "<td>" + injetor.tempoRecalque1 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_1 </td>" +    
                                    "<td>" + injetor.tempoRecalque1 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.tempoRecalque2 !== 0 && (parametros.RECALQUE_TEMPO_2 < (injetor.tempoRecalque2 - (injetor.tempoRecalque2 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_2 > (injetor.tempoRecalque2 + (injetor.tempoRecalque2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_2 </td>" +    
                                    "<td>" + injetor.tempoRecalque2 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_2 </td>" +    
                                    "<td>" + injetor.tempoRecalque2 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.tempoRecalque3 !== 0 && (parametros.RECALQUE_TEMPO_3 < (injetor.tempoRecalque3 - (injetor.tempoRecalque3 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_3 > (injetor.tempoRecalque3 + (injetor.tempoRecalque3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_3 </td>" +    
                                    "<td>" + injetor.tempoRecalque3 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_3 </td>" +    
                                    "<td>" + injetor.tempoRecalque3 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.tempoRecalque4 !== 0 && (parametros.RECALQUE_TEMPO_4 < (injetor.tempoRecalque4 - (injetor.tempoRecalque4 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_4 > (injetor.tempoRecalque4 + (injetor.tempoRecalque4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_4 </td>" +    
                                    "<td>" + injetor.tempoRecalque4 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_4 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_4 </td>" +    
                                    "<td>" + injetor.tempoRecalque4 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_4 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.tempoRecalque5 !== 0 && (parametros.RECALQUE_TEMPO_5 < (injetor.tempoRecalque5 - (injetor.tempoRecalque5 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_5 > (injetor.tempoRecalque5 + (injetor.tempoRecalque5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_5 </td>" +    
                                    "<td>" + injetor.tempoRecalque5 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_5 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_5 </td>" +    
                                    "<td>" + injetor.tempoRecalque5 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_5 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.partDosagem1 !== 0 && (parametros.DOSAGEM_PARTIDA_1 < (injetor.partDosagem1 - (injetor.partDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_1 > (injetor.partDosagem1 + (injetor.partDosagem1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_1 </td>" +      
                                    "<td>" + injetor.partDosagem1 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_1 </td>" +      
                                    "<td>" + injetor.partDosagem1 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.partDosagem2 !== 0 && (parametros.DOSAGEM_PARTIDA_2 < (injetor.partDosagem2 - (injetor.partDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_2 > (injetor.partDosagem2 + (injetor.partDosagem2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_2 </td>" +      
                                    "<td>" + injetor.partDosagem2 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_2 </td>" +      
                                    "<td>" + injetor.partDosagem2 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.partDosagem3 !== 0 && (parametros.DOSAGEM_PARTIDA_3 < (injetor.partDosagem3 - (injetor.partDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_3 > (injetor.partDosagem3 + (injetor.partDosagem3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_3 </td>" +      
                                    "<td>" + injetor.partDosagem3 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_3 </td>" +      
                                    "<td>" + injetor.partDosagem3 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.partDosagem4 !== 0 && (parametros.DOSAGEM_PARTIDA_4 < (injetor.partDosagem4 - (injetor.partDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_4 > (injetor.partDosagem4 + (injetor.partDosagem4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_4 </td>" +      
                                    "<td>" + injetor.partDosagem4 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_4 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_4 </td>" +      
                                    "<td>" + injetor.partDosagem4 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_4 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.partDosagem5 !== 0 && (parametros.DOSAGEM_PARTIDA_5 < (injetor.partDosagem5 - (injetor.partDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_5 > (injetor.partDosagem5 + (injetor.partDosagem5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_5 </td>" +      
                                    "<td>" + injetor.partDosagem5 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_5 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_5 </td>" +      
                                    "<td>" + injetor.partDosagem5 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_5 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presDosagem1 !== 0 && (parametros.DOSAGEM_PRESSAO_1 < (injetor.presDosagem1 - (injetor.presDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_1 > (injetor.presDosagem1 + (injetor.presDosagem1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_1 </td>" +      
                                    "<td>" + injetor.presDosagem1 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_1 </td>" +      
                                    "<td>" + injetor.presDosagem1 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presDosagem2 !== 0 && (parametros.DOSAGEM_PRESSAO_2 < (injetor.presDosagem2 - (injetor.presDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_2 > (injetor.presDosagem2 + (injetor.presDosagem2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_2 </td>" +      
                                    "<td>" + injetor.presDosagem2 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_2 </td>" +      
                                    "<td>" + injetor.presDosagem2 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presDosagem3 !== 0 && (parametros.DOSAGEM_PRESSAO_3 < (injetor.presDosagem3 - (injetor.presDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_3 > (injetor.presDosagem3 + (injetor.presDosagem3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_3 </td>" +      
                                    "<td>" + injetor.presDosagem3 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_3 </td>" +      
                                    "<td>" + injetor.presDosagem3 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presDosagem4 !== 0 && (parametros.DOSAGEM_PRESSAO_4 < (injetor.presDosagem4 - (injetor.presDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_4 > (injetor.presDosagem4 + (injetor.presDosagem4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_4 </td>" +      
                                    "<td>" + injetor.presDosagem4 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_4 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_4 </td>" +      
                                    "<td>" + injetor.presDosagem4 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_4 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presDosagem5 !== 0 && (parametros.DOSAGEM_PRESSAO_5 < (injetor.presDosagem5 - (injetor.presDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_5 > (injetor.presDosagem5 + (injetor.presDosagem5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_5 </td>" +      
                                    "<td>" + injetor.presDosagem5 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_5 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_5 </td>" +      
                                    "<td>" + injetor.presDosagem5 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_5 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoDosagem1 !== 0 && (parametros.DOSAGEM_FLUXO_1 < (injetor.fluxoDosagem1 - (injetor.fluxoDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_1 > (injetor.fluxoDosagem1 + (injetor.fluxoDosagem1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_1 </td>" +    
                                    "<td>" + injetor.fluxoDosagem1 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_1 </td>" +    
                                    "<td>" + injetor.fluxoDosagem1 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoDosagem2 !== 0 && (parametros.DOSAGEM_FLUXO_2 < (injetor.fluxoDosagem2 - (injetor.fluxoDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_2 > (injetor.fluxoDosagem2 + (injetor.fluxoDosagem2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_2 </td>" +    
                                    "<td>" + injetor.fluxoDosagem2 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_2 </td>" +    
                                    "<td>" + injetor.fluxoDosagem2 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoDosagem3 !== 0 && (parametros.DOSAGEM_FLUXO_3 < (injetor.fluxoDosagem3 - (injetor.fluxoDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_3 > (injetor.fluxoDosagem3 + (injetor.fluxoDosagem3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_3 </td>" +    
                                    "<td>" + injetor.fluxoDosagem3 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_3 </td>" +    
                                    "<td>" + injetor.fluxoDosagem3 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoDosagem4 !== 0 && (parametros.DOSAGEM_FLUXO_4 < (injetor.fluxoDosagem4 - (injetor.fluxoDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_4 > (injetor.fluxoDosagem4 + (injetor.fluxoDosagem4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_4 </td>" +    
                                    "<td>" + injetor.fluxoDosagem4 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_4 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_4 </td>" +    
                                    "<td>" + injetor.fluxoDosagem4 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_4 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoDosagem5 !== 0 && (parametros.DOSAGEM_FLUXO_5 < (injetor.fluxoDosagem5 - (injetor.fluxoDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_5 > (injetor.fluxoDosagem5 + (injetor.fluxoDosagem5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_5 </td>" +    
                                    "<td>" + injetor.fluxoDosagem5 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_5 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_5 </td>" +    
                                    "<td>" + injetor.fluxoDosagem5 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_5 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.CPDosagem1 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_1 < (injetor.CPDosagem1 - (injetor.CPDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_1 > (injetor.CPDosagem1 + (injetor.CPDosagem1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_1 </td>" +   
                                    "<td>" + injetor.CPDosagem1 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_1 </td>" +   
                                    "<td>" + injetor.CPDosagem1 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.CPDosagem2 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_2 < (injetor.CPDosagem2 - (injetor.CPDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_2 > (injetor.CPDosagem2 + (injetor.CPDosagem2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_2 </td>" +   
                                    "<td>" + injetor.CPDosagem2 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_2 </td>" +   
                                    "<td>" + injetor.CPDosagem2 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.CPDosagem3 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_3 < (injetor.CPDosagem3 - (injetor.CPDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_3 > (injetor.CPDosagem3 + (injetor.CPDosagem3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_3 </td>" +   
                                    "<td>" + injetor.CPDosagem3 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_3 </td>" +   
                                    "<td>" + injetor.CPDosagem3 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.CPDosagem4 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_4 < (injetor.CPDosagem4 - (injetor.CPDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_4 > (injetor.CPDosagem4 + (injetor.CPDosagem4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_4 </td>" +   
                                    "<td>" + injetor.CPDosagem4 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_4 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_4 </td>" +   
                                    "<td>" + injetor.CPDosagem4 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_4 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.CPDosagem5 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_5 < (injetor.CPDosagem5 - (injetor.CPDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_5 > (injetor.CPDosagem5 + (injetor.CPDosagem5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_5 </td>" +   
                                    "<td>" + injetor.CPDosagem5 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_5 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_5 </td>" +   
                                    "<td>" + injetor.CPDosagem5 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_5 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.posFecha1 !== 0 && (parametros.FECHAMENTO_POSICAO_1 < (injetor.posFecha1 - (injetor.posFecha1 * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_1 > (injetor.posFecha1 + (injetor.posFecha1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_1 </td>" +       
                                    "<td>" + injetor.posFecha1 + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_1 </td>" +       
                                    "<td>" + injetor.posFecha1 + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.posFecha2 !== 0 && (parametros.FECHAMENTO_POSICAO_2 < (injetor.posFecha2 - (injetor.posFecha2 * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_2 > (injetor.posFecha2 + (injetor.posFecha2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_2 </td>" +       
                                    "<td>" + injetor.posFecha2 + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_2 </td>" +       
                                    "<td>" + injetor.posFecha2 + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.posFecha3 !== 0 && (parametros.FECHAMENTO_POSICAO_3 < (injetor.posFecha3 - (injetor.posFecha3 * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_3 > (injetor.posFecha3 + (injetor.posFecha3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_3 </td>" +       
                                    "<td>" + injetor.posFecha3 + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_3 </td>" +       
                                    "<td>" + injetor.posFecha3 + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.tempoProtMolde !== 0 && (parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE < (injetor.tempoProtMolde - (injetor.tempoProtMolde * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE > (injetor.tempoProtMolde + (injetor.tempoProtMolde * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_PROTECAO_MOLDE </td>" +    
                                    "<td>" + injetor.tempoProtMolde + "</td>" +         
                                    "<td>" + parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_PROTECAO_MOLDE </td>" +    
                                    "<td>" + injetor.tempoProtMolde + "</td>" +         
                                    "<td>" + parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.AltaPresPos !== 0 && (parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO < (injetor.AltaPresPos - (injetor.AltaPresPos * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO > (injetor.AltaPresPos + (injetor.AltaPresPos * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_ALTA_PRESSAO </td>" +      
                                    "<td>" + injetor.AltaPresPos + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_ALTA_PRESSAO </td>" +      
                                    "<td>" + injetor.AltaPresPos + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presFecha1 !== 0 && (parametros.FECHAMENTO_PRESSAO_1 < (injetor.presFecha1 - (injetor.presFecha1 * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_1 > (injetor.presFecha1 + (injetor.presFecha1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_1 </td>" +     
                                    "<td>" + injetor.presFecha1 + "</td>" +                
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_1 </td>" +     
                                    "<td>" + injetor.presFecha1 + "</td>" +                
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presFecha2 !== 0 && (parametros.FECHAMENTO_PRESSAO_2 < (injetor.presFecha2 - (injetor.presFecha2 * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_2 > (injetor.presFecha2 + (injetor.presFecha2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_2 </td>" +     
                                    "<td>" + injetor.presFecha2 + "</td>" +                
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_2 </td>" +     
                                    "<td>" + injetor.presFecha2 + "</td>" +                
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presFecha3 !== 0 && (parametros.FECHAMENTO_PRESSAO_3 < (injetor.presFecha3 - (injetor.presFecha3 * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_3 > (injetor.presFecha3 + (injetor.presFecha3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_3 </td>" +     
                                    "<td>" + injetor.presFecha3 + "</td>" +                
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_3 </td>" +     
                                    "<td>" + injetor.presFecha3 + "</td>" +                
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.protMPres !== 0 && (parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE < (injetor.protMPres - (injetor.protMPres * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE > (injetor.protMPres + (injetor.protMPres * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_PROTECAO_MOLDE </td>" +  
                                    "<td>" + injetor.protMPres + "</td>" +                  
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_PROTECAO_MOLDE </td>" +  
                                    "<td>" + injetor.protMPres + "</td>" +                  
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.AltaPresPres !== 0 && (parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO < (injetor.AltaPresPres - (injetor.AltaPresPres * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO > (injetor.AltaPresPres + (injetor.AltaPresPres * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_ALTA_PRESSAO </td>" +   
                                    "<td>" + injetor.AltaPresPres + "</td>" +                  
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_ALTA_PRESSAO </td>" +   
                                    "<td>" + injetor.AltaPresPres + "</td>" +                  
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoFecha1 !== 0 && (parametros.FECHAMENTO_FLUXO_1 < (injetor.fluxoFecha1 - (injetor.fluxoFecha1 * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_1 > (injetor.fluxoFecha1 + (injetor.fluxoFecha1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_1 </td>" +     
                                    "<td>" + injetor.fluxoFecha1 + "</td>" +               
                                    "<td>" + parametros.FECHAMENTO_FLUXO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_1 </td>" +     
                                    "<td>" + injetor.fluxoFecha1 + "</td>" +               
                                    "<td>" + parametros.FECHAMENTO_FLUXO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoFecha2 !== 0 && (parametros.FECHAMENTO_FLUXO_2 < (injetor.fluxoFecha2 - (injetor.fluxoFecha2 * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_2 > (injetor.fluxoFecha2 + (injetor.fluxoFecha2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_2 </td>" +     
                                    "<td>" + injetor.fluxoFecha2 + "</td>" +               
                                    "<td>" + parametros.FECHAMENTO_FLUXO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_2 </td>" +     
                                    "<td>" + injetor.fluxoFecha2 + "</td>" +               
                                    "<td>" + parametros.FECHAMENTO_FLUXO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoFecha3 !== 0 && (parametros.FECHAMENTO_FLUXO_3 < (injetor.fluxoFecha3 - (injetor.fluxoFecha3 * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_3 > (injetor.fluxoFecha3 + (injetor.fluxoFecha3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_3 </td>" +     
                                    "<td>" + injetor.fluxoFecha3 + "</td>" +               
                                    "<td>" + parametros.FECHAMENTO_FLUXO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_3 </td>" +     
                                    "<td>" + injetor.fluxoFecha3 + "</td>" +               
                                    "<td>" + parametros.FECHAMENTO_FLUXO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.protMFluxo !== 0 && (parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE < (injetor.protMFluxo - (injetor.protMFluxo * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE > (injetor.protMFluxo + (injetor.protMFluxo * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_PROTECAO_MOLDE </td>" + 
                                    "<td>" + injetor.protMFluxo + "</td>" +                    
                                    "<td>" + parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_PROTECAO_MOLDE </td>" + 
                                    "<td>" + injetor.protMFluxo + "</td>" +                    
                                    "<td>" + parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.AltaPresFluxo !== 0 && (parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO < (injetor.AltaPresFluxo - (injetor.AltaPresFluxo * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO > (injetor.AltaPresFluxo + (injetor.AltaPresFluxo * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_ALTA_PRESSAO </td>" +      
                                    "<td>" + injetor.AltaPresFluxo + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_ALTA_PRESSAO </td>" +      
                                    "<td>" + injetor.AltaPresFluxo + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.posAbertura1 !== 0 && (parametros.ABERTURA_POSICAO_1 < (injetor.posAbertura1 - (injetor.posAbertura1 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_1 > (injetor.posAbertura1 + (injetor.posAbertura1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_1 </td>" +    
                                    "<td>" + injetor.posAbertura1 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_1 </td>" +    
                                    "<td>" + injetor.posAbertura1 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.posAbertura2 !== 0 && (parametros.ABERTURA_POSICAO_2 < (injetor.posAbertura2 - (injetor.posAbertura2 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_2 > (injetor.posAbertura2 + (injetor.posAbertura2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_2 </td>" +    
                                    "<td>" + injetor.posAbertura2 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_2 </td>" +    
                                    "<td>" + injetor.posAbertura2 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.posAbertura3 !== 0 && (parametros.ABERTURA_POSICAO_3 < (injetor.posAbertura3 - (injetor.posAbertura3 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_3 > (injetor.posAbertura3 + (injetor.posAbertura3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_3 </td>" +    
                                    "<td>" + injetor.posAbertura3 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_3 </td>" +    
                                    "<td>" + injetor.posAbertura3 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.posAbertura4 !== 0 && (parametros.ABERTURA_POSICAO_4 < (injetor.posAbertura4 - (injetor.posAbertura4 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_4 > (injetor.posAbertura4 + (injetor.posAbertura4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_4 </td>" +    
                                    "<td>" + injetor.posAbertura4 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_4 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_4 </td>" +    
                                    "<td>" + injetor.posAbertura4 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_4 + "</td>" +                    
                                    "</tr>"
                                 }
                                 
                                 if (injetor.posAbertura5 !== 0 && (parametros.ABERTURA_POSICAO_5 < (injetor.posAbertura5 - (injetor.posAbertura5 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_5 > (injetor.posAbertura5 + (injetor.posAbertura5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_5 </td>" +    
                                    "<td>" + injetor.posAbertura5 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_5 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_5 </td>" +    
                                    "<td>" + injetor.posAbertura5 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_5 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presAbertura1 !== 0 && (parametros.ABERTURA_PRESSAO_1 < (injetor.presAbertura1 - (injetor.presAbertura1 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_1 > (injetor.presAbertura1 + (injetor.presAbertura1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_1 </td>" +     
                                    "<td>" + injetor.presAbertura1 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_1 </td>" +     
                                    "<td>" + injetor.presAbertura1 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presAbertura2 !== 0 && (parametros.ABERTURA_PRESSAO_2 < (injetor.presAbertura2 - (injetor.presAbertura2 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_2 > (injetor.presAbertura2 + (injetor.presAbertura2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_2 </td>" +     
                                    "<td>" + injetor.presAbertura2 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_2 </td>" +     
                                    "<td>" + injetor.presAbertura2 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presAbertura3 !== 0 && (parametros.ABERTURA_PRESSAO_3 < (injetor.presAbertura3 - (injetor.presAbertura3 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_3 > (injetor.presAbertura3 + (injetor.presAbertura3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_3 </td>" +     
                                    "<td>" + injetor.presAbertura3 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_3 </td>" +     
                                    "<td>" + injetor.presAbertura3 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presAbertura4 !== 0 && (parametros.ABERTURA_PRESSAO_4 < (injetor.presAbertura4 - (injetor.presAbertura4 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_4 > (injetor.presAbertura4 + (injetor.presAbertura4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_4 </td>" +     
                                    "<td>" + injetor.presAbertura4 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_4 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_4 </td>" +     
                                    "<td>" + injetor.presAbertura4 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_4 + "</td>" +                    
                                    "</tr>"
                                 }


                                 if (injetor.presAbertura5 !== 0 && (parametros.ABERTURA_PRESSAO_5 < (injetor.presAbertura5 - (injetor.presAbertura5 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_5 > (injetor.presAbertura5 + (injetor.presAbertura5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_5 </td>" +     
                                    "<td>" + injetor.presAbertura5 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_5 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_5 </td>" +     
                                    "<td>" + injetor.presAbertura5 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_5 + "</td>" +                    
                                    "</tr>"
                                 }


                                 if (injetor.fluxoAbertura1 !== 0 && (parametros.ABERTURA_FLUXO_1 < (injetor.fluxoAbertura1 - (injetor.fluxoAbertura1 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_1 > (injetor.fluxoAbertura1 + (injetor.fluxoAbertura1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_1 </td>" +   
                                    "<td>" + injetor.fluxoAbertura1 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_1 </td>" +   
                                    "<td>" + injetor.fluxoAbertura1 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoAbertura2 !== 0 && (parametros.ABERTURA_FLUXO_2 < (injetor.fluxoAbertura2 - (injetor.fluxoAbertura2 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_2 > (injetor.fluxoAbertura2 + (injetor.fluxoAbertura2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_2 </td>" +   
                                    "<td>" + injetor.fluxoAbertura2 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_2 </td>" +   
                                    "<td>" + injetor.fluxoAbertura2 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoAbertura3 !== 0 && (parametros.ABERTURA_FLUXO_3 < (injetor.fluxoAbertura3 - (injetor.fluxoAbertura3 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_3 > (injetor.fluxoAbertura3 + (injetor.fluxoAbertura3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_3 </td>" +   
                                    "<td>" + injetor.fluxoAbertura3 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_3 </td>" +   
                                    "<td>" + injetor.fluxoAbertura3 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoAbertura4 !== 0 && (parametros.ABERTURA_FLUXO_4 < (injetor.fluxoAbertura4 - (injetor.fluxoAbertura4 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_4 > (injetor.fluxoAbertura4 + (injetor.fluxoAbertura4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_4 </td>" +   
                                    "<td>" + injetor.fluxoAbertura4 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_4 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_4 </td>" +   
                                    "<td>" + injetor.fluxoAbertura4 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_4 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoAbertura5 !== 0 && (parametros.ABERTURA_FLUXO_5 < (injetor.fluxoAbertura5 - (injetor.fluxoAbertura5 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_5 > (injetor.fluxoAbertura5 + (injetor.fluxoAbertura5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_5 </td>" +   
                                    "<td>" + injetor.fluxoAbertura5 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_5 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_5 </td>" +   
                                    "<td>" + injetor.fluxoAbertura5 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_5 + "</td>" +                    
                                    "</tr>"
                                 }
                                 
                                 if (injetor.posAvanco1 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_1 < (injetor.posAvanco1 - (injetor.posAvanco1 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_1 > (injetor.posAvanco1 + (injetor.posAvanco1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_AVANCO_1 </td>" +     
                                    "<td>" + injetor.posAvanco1 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_AVANCO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_AVANCO_1 </td>" +     
                                    "<td>" + injetor.posAvanco1 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_AVANCO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.posAvanco2 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_2 < (injetor.posAvanco2 - (injetor.posAvanco2 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_2 > (injetor.posAvanco2 + (injetor.posAvanco2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_AVANCO_2 </td>" +     
                                    "<td>" + injetor.posAvanco2 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_AVANCO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_AVANCO_2 </td>" +     
                                    "<td>" + injetor.posAvanco2 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_AVANCO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.posAvanco3 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_3 < (injetor.posAvanco3 - (injetor.posAvanco3 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_3 > (injetor.posAvanco3 + (injetor.posAvanco3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_AVANCO_3 </td>" +     
                                    "<td>" + injetor.posAvanco3 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_AVANCO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_AVANCO_3 </td>" +     
                                    "<td>" + injetor.posAvanco3 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_AVANCO_3 + "</td>" +                    
                                    "</tr>"
                                 }
                                 
                                 if (injetor.posRecuo1 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_3 < (injetor.posRecuo1 - (injetor.posRecuo1 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_3 > (injetor.posRecuo1 + (injetor.posRecuo1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_RECUO_1 </td>" +     
                                    "<td>" + injetor.posRecuo1 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_RECUO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_RECUO_1 </td>" +     
                                    "<td>" + injetor.posRecuo1 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_RECUO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.posRecuo2 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_2 < (injetor.posRecuo2 - (injetor.posRecuo2 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_2 > (injetor.posRecuo2 + (injetor.posRecuo2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_RECUO_2 </td>" +     
                                    "<td>" + injetor.posRecuo2 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_RECUO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_RECUO_2 </td>" +     
                                    "<td>" + injetor.posRecuo2 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_RECUO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.posRecuo3 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_1 < (injetor.posRecuo3 - (injetor.posRecuo3 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_1 > (injetor.posRecuo3 + (injetor.posRecuo3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_RECUO_3 </td>" +     
                                    "<td>" + injetor.posRecuo3 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_RECUO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_RECUO_3 </td>" +     
                                    "<td>" + injetor.posRecuo3 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_RECUO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presAvanco1 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_1 < (injetor.presAvanco1 - (injetor.presAvanco1 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_1 > (injetor.presAvanco1 + (injetor.presAvanco1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_AVANCO_1 </td>" +           
                                    "<td>" + injetor.presAvanco1 + "</td>" +        
                                    "<td>" + parametros.EXTRACAO_PRESSAO_AVANCO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_AVANCO_1 </td>" +           
                                    "<td>" + injetor.presAvanco1 + "</td>" +        
                                    "<td>" + parametros.EXTRACAO_PRESSAO_AVANCO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presAvanco2 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_2 < (injetor.presAvanco2 - (injetor.presAvanco2 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_2 > (injetor.presAvanco2 + (injetor.presAvanco2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_AVANCO_2 </td>" +           
                                    "<td>" + injetor.presAvanco2 + "</td>" +        
                                    "<td>" + parametros.EXTRACAO_PRESSAO_AVANCO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_AVANCO_2 </td>" +           
                                    "<td>" + injetor.presAvanco2 + "</td>" +        
                                    "<td>" + parametros.EXTRACAO_PRESSAO_AVANCO_2 + "</td>" +                    
                                    "</tr>"
                                 }
                                 
                                 if (injetor.presAvanco3 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_3 < (injetor.presAvanco3 - (injetor.presAvanco3 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_3 > (injetor.presAvanco3 + (injetor.presAvanco3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_AVANCO_3 </td>" +           
                                    "<td>" + injetor.presAvanco3 + "</td>" +        
                                    "<td>" + parametros.EXTRACAO_PRESSAO_AVANCO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_AVANCO_3 </td>" +           
                                    "<td>" + injetor.presAvanco3 + "</td>" +        
                                    "<td>" + parametros.EXTRACAO_PRESSAO_AVANCO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presRecuo1 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_3 < (injetor.presRecuo1 - (injetor.presRecuo1 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_3 > (injetor.presRecuo1 + (injetor.presRecuo1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_RECUO_1 </td>" +     
                                    "<td>" + injetor.presRecuo1 + "</td>" +               
                                    "<td>" + parametros.EXTRACAO_PRESSAO_RECUO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_RECUO_1 </td>" +     
                                    "<td>" + injetor.presRecuo1 + "</td>" +               
                                    "<td>" + parametros.EXTRACAO_PRESSAO_RECUO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.presRecuo2 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_2 < (injetor.presRecuo2 - (injetor.presRecuo2 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_2 > (injetor.presRecuo2 + (injetor.presRecuo2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_RECUO_2 </td>" +     
                                    "<td>" + injetor.presRecuo2 + "</td>" +               
                                    "<td>" + parametros.EXTRACAO_PRESSAO_RECUO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_RECUO_2 </td>" +     
                                    "<td>" + injetor.presRecuo2 + "</td>" +               
                                    "<td>" + parametros.EXTRACAO_PRESSAO_RECUO_2 + "</td>" +                    
                                    "</tr>"
                                 }
                                 
                                 if (injetor.presRecuo3 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_1 < (injetor.presRecuo3 - (injetor.presRecuo3 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_1 > (injetor.presRecuo3 + (injetor.presRecuo3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_RECUO_3 </td>" +     
                                    "<td>" + injetor.presRecuo3 + "</td>" +               
                                    "<td>" + parametros.EXTRACAO_PRESSAO_RECUO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_RECUO_3 </td>" +     
                                    "<td>" + injetor.presRecuo3 + "</td>" +               
                                    "<td>" + parametros.EXTRACAO_PRESSAO_RECUO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoAvanco1 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_1 < (injetor.fluxoAvanco1 - (injetor.fluxoAvanco1 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_1 > (injetor.fluxoAvanco1 + (injetor.fluxoAvanco1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_AVANCO_1 </td>" +    
                                    "<td>" + injetor.fluxoAvanco1 + "</td>" +                
                                    "<td>" + parametros.EXTRACAO_FLUXO_AVANCO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_AVANCO_1 </td>" +    
                                    "<td>" + injetor.fluxoAvanco1 + "</td>" +                
                                    "<td>" + parametros.EXTRACAO_FLUXO_AVANCO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoAvanco2 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_2 < (injetor.fluxoAvanco2 - (injetor.fluxoAvanco2 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_2 > (injetor.fluxoAvanco2 + (injetor.fluxoAvanco2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_AVANCO_2 </td>" +    
                                    "<td>" + injetor.fluxoAvanco2 + "</td>" +                
                                    "<td>" + parametros.EXTRACAO_FLUXO_AVANCO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_AVANCO_2 </td>" +    
                                    "<td>" + injetor.fluxoAvanco2 + "</td>" +                
                                    "<td>" + parametros.EXTRACAO_FLUXO_AVANCO_2 + "</td>" +                    
                                    "</tr>"
                                 }
                                 //aqui
                                 if (injetor.fluxoAvanco3 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_3 < (injetor.fluxoAvanco3 - (injetor.fluxoAvanco3 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_3 > (injetor.fluxoAvanco3 + (injetor.fluxoAvanco3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_AVANCO_3 </td>" +    
                                    "<td>" + injetor.fluxoAvanco3 + "</td>" +                
                                    "<td>" + parametros.EXTRACAO_FLUXO_AVANCO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_AVANCO_3 </td>" +    
                                    "<td>" + injetor.fluxoAvanco3 + "</td>" +                
                                    "<td>" + parametros.EXTRACAO_FLUXO_AVANCO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoRecuo1 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_3 < (injetor.fluxoRecuo1 - (injetor.fluxoRecuo1 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_3 > (injetor.fluxoRecuo1 + (injetor.fluxoRecuo1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_RECUO_1 </td>" +   
                                    "<td>" + injetor.fluxoRecuo1 + "</td>" +                 
                                    "<td>" + parametros.EXTRACAO_FLUXO_RECUO_3 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_RECUO_1 </td>" +   
                                    "<td>" + injetor.fluxoRecuo1 + "</td>" +                 
                                    "<td>" + parametros.EXTRACAO_FLUXO_RECUO_3 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoRecuo2 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_2 < (injetor.fluxoRecuo2 - (injetor.fluxoRecuo2 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_2 > (injetor.fluxoRecuo2 + (injetor.fluxoRecuo2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_RECUO_2 </td>" +   
                                    "<td>" + injetor.fluxoRecuo2 + "</td>" +                 
                                    "<td>" + parametros.EXTRACAO_FLUXO_RECUO_2 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_RECUO_2 </td>" +   
                                    "<td>" + injetor.fluxoRecuo2 + "</td>" +                 
                                    "<td>" + parametros.EXTRACAO_FLUXO_RECUO_2 + "</td>" +                    
                                    "</tr>"
                                 }

                                 if (injetor.fluxoRecuo3 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_1 < (injetor.fluxoRecuo3 - (injetor.fluxoRecuo3 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_1 > (injetor.fluxoRecuo3 + (injetor.fluxoRecuo3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_RECUO_3 </td>" +   
                                    "<td>" + injetor.fluxoRecuo3 + "</td>" +                 
                                    "<td>" + parametros.EXTRACAO_FLUXO_RECUO_1 + "</td>" +                    
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_RECUO_3 </td>" +   
                                    "<td>" + injetor.fluxoRecuo3 + "</td>" +                 
                                    "<td>" + parametros.EXTRACAO_FLUXO_RECUO_1 + "</td>" +                    
                                    "</tr>"
                                 }

                                 // markup = markup + "<tr>" +
                                 // "<td> CAMARA_QUENTE_TEMPERATURA_1 </td>" +   
                                 // "<td>" + perifericos.camara1 + "</td>" +                 
                                 // "<td>" + parametros.CAMARA_QUENTE_TEMPERATURA_1 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> CAMARA_QUENTE_TEMPERATURA_2 </td>" +  
                                 // "<td>" + perifericos.camara2 + "</td>" +                  
                                 // "<td>" + parametros.CAMARA_QUENTE_TEMPERATURA_2 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> CAMARA_QUENTE_TEMPERATURA_3 </td>" +     
                                 // "<td>" + perifericos.camara3 + "</td>" +               
                                 // "<td>" + parametros.CAMARA_QUENTE_TEMPERATURA_3 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> CAMARA_QUENTE_TEMPERATURA_4 </td>" +      
                                 // "<td>" + perifericos.camara4 + "</td>" +             
                                 // "<td>" + parametros.CAMARA_QUENTE_TEMPERATURA_4 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> CAMARA_QUENTE_TEMPERATURA_5 </td>" +     
                                 // "<td>" + perifericos.camara5 + "</td>" +              
                                 // "<td>" + parametros.CAMARA_QUENTE_TEMPERATURA_5 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> CAMARA_QUENTE_TEMPERATURA_6 </td>" +    
                                 // "<td>" + perifericos.camara6 + "</td>" +               
                                 // "<td>" + parametros.CAMARA_QUENTE_TEMPERATURA_6 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> CAMARA_QUENTE_TEMPERATURA_7 </td>" +  
                                 // "<td>" + perifericos.camara7 + "</td>" +                 
                                 // "<td>" + parametros.CAMARA_QUENTE_TEMPERATURA_7 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> CAMARA_QUENTE_TEMPERATURA_8 </td>" +     
                                 // "<td>" + perifericos.camara8 + "</td>" +              
                                 // "<td>" + parametros.CAMARA_QUENTE_TEMPERATURA_8 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> CAMARA_QUENTE_TEMPERATURA_9 </td>" +  
                                 // "<td>" + perifericos.camara9 + "</td>" +                  
                                 // "<td>" + parametros.CAMARA_QUENTE_TEMPERATURA_9 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> CAMARA_QUENTE_TEMPERATURA_10 </td>" +          
                                 // "<td>" + perifericos.camara10 + "</td>" +          
                                 // "<td>" + parametros.CAMARA_QUENTE_TEMPERATURA_10 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> CAMARA_QUENTE_TEMPERATURA_11 </td>" +  
                                 // "<td>" + perifericos.camara11 + "</td>" +                 
                                 // "<td>" + parametros.CAMARA_QUENTE_TEMPERATURA_11 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> CAMARA_QUENTE_TEMPERATURA_12 </td>" +   
                                 // "<td>" + perifericos.camara12 + "</td>" +                
                                 // "<td>" + parametros.CAMARA_QUENTE_TEMPERATURA_12 + "</td>" +                    
                                 // "</tr>"


                                 // markup = markup + "<tr>" +
                                 // "<td> CAMARA_QUENTE_TEMPERATURA_13 </td>" +    
                                 // "<td>" + perifericos.camara13 + "</td>" +                
                                 // "<td>" + parametros.CAMARA_QUENTE_TEMPERATURA_13 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> VALVE_GATE_DELAY_TIME_1 </td>" +    
                                 // "<td>" + perifericos.VG1DLYTIME + "</td>" +               
                                 // "<td>" + parametros.VALVE_GATE_DELAY_TIME_1 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> VALVE_GATE_DELAY_TIME_2 </td>" +
                                 // "<td>" + perifericos.VG2DLYTIME + "</td>" +                   
                                 // "<td>" + parametros.VALVE_GATE_DELAY_TIME_2 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> CAMARA_QUENTE_TEMPERATURA_3 </td>" +    
                                 // "<td>" + perifericos.camara3 + "</td>" +               
                                 // "<td>" + parametros.CAMARA_QUENTE_TEMPERATURA_3 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> VALVE_GATE_DELAY_TIME_4 </td>" +    
                                 // "<td>" + perifericos.VG4DLYTIME + "</td>" +                
                                 // "<td>" + parametros.VALVE_GATE_DELAY_TIME_4 + "</td>" +                    
                                 // "</tr>"

                                 // markup = markup + "<tr>" +
                                 // "<td> VALVE_GATE_DELAY_TIME_5 </td>" +       
                                 // "<td>" + perifericos.VG5DLYTIME + "</td>" +            
                                 // "<td>" + parametros.VALVE_GATE_DELAY_TIME_5 + "</td>" +                    
                                 // "</tr>"


                                 // markup = markup + "<tr>" +
                                 // "<td> VALVE_GATE_ACTIVE_TIME_1 </td>" +      
                                 // "<td>" + perifericos.VG1ACTTIME + "</td>" +              
                                 // "<td>" + parametros.VALVE_GATE_ACTIVE_TIME_1 + "</td>" +                    
                                 // "</tr>"


                                 // markup = markup + "<tr>" +
                                 // "<td> VALVE_GATE_ACTIVE_TIME_2 </td>" +   
                                 // "<td>" + perifericos.VG2ACTTIME + "</td>" +                 
                                 // "<td>" + parametros.VALVE_GATE_ACTIVE_TIME_2 + "</td>" +                    
                                 // "</tr>"


                                 // markup = markup + "<tr>" +
                                 // "<td> VALVE_GATE_ACTIVE_TIME_3 </td>" +  
                                 // "<td>" + perifericos.VG3ACTTIME + "</td>" +                 
                                 // "<td>" + parametros.VALVE_GATE_ACTIVE_TIME_3 + "</td>" +                    
                                 // "</tr>"


                                 // markup = markup + "<tr>" +
                                 // "<td> VALVE_GATE_ACTIVE_TIME_4 </td>" +   
                                 // "<td>" + perifericos.VG4ACTTIME + "</td>" +                 
                                 // "<td>" + parametros.VALVE_GATE_ACTIVE_TIME_4 + "</td>" +                    
                                 // "</tr>"


                                 // markup = markup + "<tr>" +
                                 // "<td> VALVE_GATE_ACTIVE_TIME_5 </td>" +   
                                 // "<td>" + perifericos.VG5ACTTIME + "</td>" +                 
                                 // "<td>" + parametros.VALVE_GATE_ACTIVE_TIME_5 + "</td>" +                    
                                 // "</tr>"


                                 tableBody = $("#parametros tbody");
                                 tableBody.html(markup);
                              }
                           });
                        }
                     });
                  }
               });
            }
         })

      }, 3000);
      
   } else {
      $("#parametros").hide();
      
      setInterval(function () {
         $("#ficha").show();
         
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
                  success: function (parametros) {
         
                     console.log(parametros)
         
                     $.ajax({
                        url: '/ficha/getFichaPastoreInjetores/' + parametros.mac,
                        method: 'get',
                        dataType: 'json',
                        success: function (injetor) {
                           console.log(injetor)
         
                           $.ajax({
                              url: '/ficha/getFichaPastorePerifericos/' + parametros.mac,
                              method: 'get',
                              dataType: 'json',
                              success: function(perifericos) {
                                 console.log(perifericos)

                                 //CABECALHO FICHA
                                 var header = "<tr>" +
                                                "<td>" +
                                                   "<input class='read-only' readonly style='width: 100%' id='molde' name='molde' value='" + injetor.NúmeroMolde + "'>" +
                                                "</td>" +
                                                "<td>" +
                                                   "<input class='read-only' readonly style='width: 100%' id='numMaquina' name='numMaquina' value='" + injetor.NúmeroMáquina + "'>" +
                                                "</td>" +
                                                "<td>" +
                                                   "<input class='read-only' readonly style='width: 100%' id='cliente' name='cliente' value='" + injetor.Cliente + "'>" +
                                                "</td>" +
                                                "<td>" +
                                                   "<input class='read-only' readonly style='width: 100%' id='codigoPAM' name='codigoPAM' value='" + injetor.CodigoPAM + "'>" +
                                                "</td>" +
                                                "<td>" +
                                                   "<input class='read-only' readonly style='width: 100%' id='tecnico' name='tecnico' value='" + injetor.Tecnico + "'>" +
                                                "</td>" +
                                                "<td>" +
                                                   "<input class='read-only' readonly style='width: 100%' id='produto' name='produto' value='" + injetor.Produto + "'>" +
                                                "</td>" +
                                                "<td>" +
                                                   "<input class='read-only' readonly style='width: 100%' id='material' name='material' value='" + injetor.Material + "'>" +
                                                "</td>" +
                                                "<td>" +
                                                   "<input class='read-only' readonly style='width: 100%' id='material' name='material' value='" + injetor.revisao + "'>" +
                                                "</td>" +
                                             "</tr>"
                                 
                                 tableHeader = $("#headerFicha tbody");
                                 tableHeader.html(header)
                                 
                                 // INJETORES                              
                                 var cilindro = "<tr></tr>";
      
                                 (injetor.cilindro1 !== 0 && (parametros.TEMPERATURA_ZONA_1 < (injetor.cilindro1 - (injetor.cilindro1 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_1 > (injetor.cilindro1 + (injetor.cilindro1 * 0.1)).toFixed(1))) 
                                 ? cilindro += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro1 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_1 + "</span></p></td>"
                                 : cilindro += "<td><p class='read-only'><span class='cadastrados'> " + injetor.cilindro1 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_1 + "</span></p></td>";
                                                               
                                 (injetor.cilindro2 !== 0 && (parametros.TEMPERATURA_ZONA_2 < (injetor.cilindro2 - (injetor.cilindro2 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_2 > (injetor.cilindro2 + (injetor.cilindro2 * 0.1)).toFixed(1)))
                                 ? cilindro += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro2 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_2 + "</span></p></td>"
                                 : cilindro += "<td><p class='read-only'><span class='cadastrados'> " + injetor.cilindro2 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_2 + "</span></p></td>";
                                 
                                 (injetor.cilindro3 !== 0 && (parametros.TEMPERATURA_ZONA_3 < (injetor.cilindro3 - (injetor.cilindro3 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_3 > (injetor.cilindro3 + (injetor.cilindro3 * 0.1)).toFixed(1)))
                                 ? cilindro += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro3 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_3 + "</span></p></td>"
                                 : cilindro += "<td><p class='read-only'><span class='cadastrados'> " + injetor.cilindro3 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_3 + "</span></p></td>";
   
                                 (injetor.cilindro4 !== 0 && (parametros.TEMPERATURA_ZONA_4 < (injetor.cilindro4 - (injetor.cilindro4 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_4 > (injetor.cilindro4 + (injetor.cilindro4 * 0.1)).toFixed(1)))
                                 ? cilindro += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro4 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_4 + "</span></p></td>"
                                 : cilindro += "<td><p class='read-only'><span class='cadastrados'> " + injetor.cilindro4 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_4 + "</span></p></td>";
                              
                                 (injetor.cilindro5 !== 0 && (parametros.TEMPERATURA_ZONA_5 < (injetor.cilindro5 - (injetor.cilindro5 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_5 > (injetor.cilindro5 + (injetor.cilindro5 * 0.1)).toFixed(1)))
                                 ? cilindro += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro5 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_5 + "</span></p></td>"
                                 : cilindro += "<td><p class='read-only'><span class='cadastrados'> " + injetor.cilindro5 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_5 + "</span></p></td>";
   
                                 (injetor.cilindro6 !== 0 && (parametros.TEMPERATURA_ZONA_6 < (injetor.cilindro6 - (injetor.cilindro6 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_6 > (injetor.cilindro6 + (injetor.cilindro6 * 0.1)).toFixed(1)))
                                 ? cilindro += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro6 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_6 + "</span></p></td>"
                                 : cilindro += "<td><p class='read-only'><span class='cadastrados'> " + injetor.cilindro6 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_6 + "</span></p></td>";
   
                                 (injetor.cilindro7 !== 0 && (parametros.TEMPERATURA_ZONA_7 < (injetor.cilindro7 - (injetor.cilindro7 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_7 > (injetor.cilindro7 + (injetor.cilindro7 * 0.1)).toFixed(1)))
                                 ? cilindro += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro7 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_7 + "</span></p></td>"
                                 : cilindro += "<td><p class='read-only'><span class='cadastrados'> " + injetor.cilindro7 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_7 + "</span></p></td>";
   
                                 tableBody = $("#cilindro tbody");
                                 tableBody.html(cilindro);
   
                                 var injecao = "<tr>" + 
                                                   "<th scope='row'>POSIÇÃO</th>" + 
                                                   "<td colspan='1'><p class='read-only'><span class='cadastrados'>" + injetor.posComut + "</span></p></td>";
   
                                 // injecao += "<td colspan='1'><p class='read-only'><span class='cadastrados'>" + injetor.posComut + "</span></p></td>"

                                 (injetor.posInjecao1 !== 0 && (parametros.INJECAO_POSICAO_1 < (injetor.posInjecao1 - (injetor.posInjecao1 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_1 > (injetor.posInjecao1 + (injetor.posInjecao1 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_1 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_1 + "</span></p></td>";
                                 
                                 (injetor.posInjecao2 !== 0 && (parametros.INJECAO_POSICAO_2 < (injetor.posInjecao2 - (injetor.posInjecao2 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_2 > (injetor.posInjecao2 + (injetor.posInjecao2 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_2 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_2 + "</span></p></td>";
   
                                 (injetor.posInjecao3 !== 0 && (parametros.INJECAO_POSICAO_3 < (injetor.posInjecao3 - (injetor.posInjecao3 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_3 > (injetor.posInjecao3 + (injetor.posInjecao3 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_3 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_3 + "</span></p></td>";
   
                                 (injetor.posInjecao4 !== 0 && (parametros.INJECAO_POSICAO_4 < (injetor.posInjecao4 - (injetor.posInjecao4 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_4 > (injetor.posInjecao4 + (injetor.posInjecao4 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_4 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_4 + "</span></p></td>";
   
                                 (injetor.posInjecao5 !== 0 && (parametros.INJECAO_POSICAO_5 < (injetor.posInjecao5 - (injetor.posInjecao5 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_5 > (injetor.posInjecao5 + (injetor.posInjecao5 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_5 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_5 + "</span></p></td>";
   
                                 injecao += "</tr>";
   
                                 injecao += "<tr>" + 
                                                "<th scope='row'>PRESSÃO</th>" + 
                                                "<td colspan='1'><p class='read-only'><span class='cadastrados'>" + injetor.presComut + "</span></p></td>";
                                 
                                 (injetor.presInjecao1 !== 0 && (parametros.INJECAO_PRESSAO_1 < (injetor.presInjecao1 - (injetor.presInjecao1 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_1 > (injetor.presInjecao1 + (injetor.presInjecao1 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_1 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_1 + "</span></p></td>";
                                 
                                 (injetor.presInjecao2 !== 0 && (parametros.INJECAO_PRESSAO_2 < (injetor.presInjecao2 - (injetor.presInjecao2 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_2 > (injetor.presInjecao2 + (injetor.presInjecao2 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_2 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_2 + "</span></p></td>";
   
                                 (injetor.presInjecao3 !== 0 && (parametros.INJECAO_PRESSAO_3 < (injetor.presInjecao3 - (injetor.presInjecao3 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_3 > (injetor.presInjecao3 + (injetor.presInjecao3 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_3 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_3 + "</span></p></td>";
   
                                 (injetor.presInjecao4 !== 0 && (parametros.INJECAO_PRESSAO_4 < (injetor.presInjecao4 - (injetor.presInjecao4 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_4 > (injetor.presInjecao4 + (injetor.presInjecao4 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_4 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_4 + "</span></p></td>";
                                 
                                 (injetor.presInjecao5 !== 0 && (parametros.INJECAO_PRESSAO_5 < (injetor.presInjecao5 - (injetor.presInjecao5 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_5 > (injetor.presInjecao5 + (injetor.presInjecao5 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_5 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_5 + "</span></p></td>";
   
                                 injecao += "</tr>";
   
                                 injecao += "<tr><th scope='row' colspan='2'>FLUXO</th>";
                                 
                                 (injetor.fluxoInjecao1 !== 0 && (parametros.INJECAO_FLUXO_1 < (injetor.fluxoInjecao1 - (injetor.fluxoInjecao1 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_1 > (injetor.fluxoInjecao1 + (injetor.fluxoInjecao1 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_1 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_1 + "</span></p></td>";
                                 
                                 (injetor.fluxoInjecao2 !== 0 && (parametros.INJECAO_FLUXO_2 < (injetor.fluxoInjecao2 - (injetor.fluxoInjecao2 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_2 > (injetor.fluxoInjecao2 + (injetor.fluxoInjecao2 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_2 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_2 + "</span></p></td>";
   
                                 (injetor.fluxoInjecao3 !== 0 && (parametros.INJECAO_FLUXO_3 < (injetor.fluxoInjecao3 - (injetor.fluxoInjecao3 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_3 > (injetor.fluxoInjecao3 + (injetor.fluxoInjecao3 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_3 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_3 + "</span></p></td>";
   
                                 (injetor.fluxoInjecao4 !== 0 && (parametros.INJECAO_FLUXO_4 < (injetor.fluxoInjecao4 - (injetor.fluxoInjecao4 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_4 > (injetor.fluxoInjecao4 + (injetor.fluxoInjecao4 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_4 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_4 + "</span></p></td>";
                                 
                                 (injetor.fluxoInjecao5 !== 0 && (parametros.INJECAO_FLUXO_5 < (injetor.fluxoInjecao5 - (injetor.fluxoInjecao5 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_5 > (injetor.fluxoInjecao5 + (injetor.fluxoInjecao5 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_5 + "</span></p></td>"
                                 : injecao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_5 + "</span></p></td>";
   
                                 injecao += "</tr>";
   
                                 var injecaoFoot = "<tr><th colspan='2'>TEMPO DISPARO:</th>";                              
   
                                 (injetor.tempoDisparo !== 0 && (parametros.TEMPO_DISPARO < (injetor.tempoDisparo - (injetor.tempoDisparo * 0.1)).toFixed(1) || parametros.TEMPO_DISPARO > (injetor.tempoDisparo + (injetor.tempoDisparo * 0.1)).toFixed(1))) 
                                 ? injecaoFoot += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoDisparo + "</span> - <span class='reais'>" + parametros.TEMPO_DISPARO + "</span></p></td>"
                                 : injecaoFoot += "<td><p class='read-only'><span class='cadastrados'> " + injetor.tempoDisparo + "</span> - <span class='reais'>" + parametros.TEMPO_DISPARO + "</span></p></td>";
                                 
                                 injecaoFoot += "<th colspan='3'>TEMPO DE PRESSÃO INJEÇÃO:</th>";
   
                                 (injetor.pressaoInj !== 0 && (parametros.TEMPO_INJECAO < (injetor.pressaoInj - (injetor.pressaoInj * 0.1)).toFixed(1) || parametros.TEMPO_INJECAO > (injetor.pressaoInj + (injetor.pressaoInj * 0.1)).toFixed(1))) 
                                 ? injecaoFoot += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.pressaoInj + "</span> - <span class='reais'>" + parametros.TEMPO_INJECAO + "</span></p></td>"
                                 : injecaoFoot += "<td><p class='read-only'><span class='cadastrados'> " + injetor.pressaoInj + "</span> - <span class='reais'>" + parametros.TEMPO_INJECAO + "</span></p></td>";
   
                                 injecaoFoot += "</tr>";
   
                                 tableBody = $("#injecao tbody");
                                 tableBody.html(injecao);
                                 
                                 tableFoot = $("#injecaoFoot");
                                 tableFoot.html(injecaoFoot);
   
                                 var recalque = "<tr><th scope='row' colspan='2'>PRESSÃO</th>";
   
                                 (injetor.presRecalque1 !== 0 && (parametros.RECALQUE_PRESSAO_1 < (injetor.presRecalque1 - (injetor.presRecalque1 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_1 > (injetor.presRecalque1 + (injetor.presRecalque1 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_1 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_1 + "</span></p></td>";
                                 
                                 (injetor.presRecalque2 !== 0 && (parametros.RECALQUE_PRESSAO_2 < (injetor.presRecalque2 - (injetor.presRecalque2 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_2 > (injetor.presRecalque2 + (injetor.presRecalque2 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_2 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_2 + "</span></p></td>";
                                 
                                 (injetor.presRecalque3 !== 0 && (parametros.RECALQUE_PRESSAO_3 < (injetor.presRecalque3 - (injetor.presRecalque3 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_3 > (injetor.presRecalque3 + (injetor.presRecalque3 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_3 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_3 + "</span></p></td>";
                                 
                                 (injetor.presRecalque4 !== 0 && (parametros.RECALQUE_PRESSAO_4 < (injetor.presRecalque4 - (injetor.presRecalque4 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_4 > (injetor.presRecalque4 + (injetor.presRecalque4 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_4 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_4 + "</span></p></td>";
                                 
                                 (injetor.presRecalque5 !== 0 && (parametros.RECALQUE_PRESSAO_5 < (injetor.presRecalque5 - (injetor.presRecalque5 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_5 > (injetor.presRecalque5 + (injetor.presRecalque5 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_5 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_5 + "</span></p></td>";
   
                                 recalque += "</tr>";
   
                                 recalque += "<tr><th scope='row' colspan='2'>FLUXO</th>";
   
                                 (injetor.fluxoRecalque1 !== 0 && (parametros.RECALQUE_FLUXO_1 < (injetor.fluxoRecalque1 - (injetor.fluxoRecalque1 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_1 > (injetor.fluxoRecalque1 + (injetor.fluxoRecalque1 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_1 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_1 + "</span></p></td>";
                                 
                                 (injetor.fluxoRecalque2 !== 0 && (parametros.RECALQUE_FLUXO_2 < (injetor.fluxoRecalque2 - (injetor.fluxoRecalque2 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_2 > (injetor.fluxoRecalque2 + (injetor.fluxoRecalque2 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_2 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_2 + "</span></p></td>";
                                 
                                 (injetor.fluxoRecalque3 !== 0 && (parametros.RECALQUE_FLUXO_3 < (injetor.fluxoRecalque3 - (injetor.fluxoRecalque3 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_3 > (injetor.fluxoRecalque3 + (injetor.fluxoRecalque3 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_3 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_3 + "</span></p></td>";
                                 
                                 (injetor.fluxoRecalque4 !== 0 && (parametros.RECALQUE_FLUXO_4 < (injetor.fluxoRecalque4 - (injetor.fluxoRecalque4 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_4 > (injetor.fluxoRecalque4 + (injetor.fluxoRecalque4 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_4 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_4 + "</span></p></td>";
                                 
                                 (injetor.fluxoRecalque5 !== 0 && (parametros.RECALQUE_FLUXO_5 < (injetor.fluxoRecalque5 - (injetor.fluxoRecalque5 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_5 > (injetor.fluxoRecalque5 + (injetor.fluxoRecalque5 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_5 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_5 + "</span></p></td>";
   
                                 recalque += "</tr>";
   
                                 recalque += "<tr><th scope='row' colspan='2'>TEMPO</th>";
   
                                 (injetor.tempoRecalque1 !== 0 && (parametros.RECALQUE_TEMPO_1 < (injetor.tempoRecalque1 - (injetor.tempoRecalque1 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_1 > (injetor.tempoRecalque1 + (injetor.tempoRecalque1 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_1 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_1 + "</span></p></td>";
                                 
                                 (injetor.tempoRecalque2 !== 0 && (parametros.RECALQUE_TEMPO_2 < (injetor.tempoRecalque2 - (injetor.tempoRecalque2 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_2 > (injetor.tempoRecalque2 + (injetor.tempoRecalque2 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_2 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_2 + "</span></p></td>";
                                 
                                 (injetor.tempoRecalque3 !== 0 && (parametros.RECALQUE_TEMPO_3 < (injetor.tempoRecalque3 - (injetor.tempoRecalque3 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_3 > (injetor.tempoRecalque3 + (injetor.tempoRecalque3 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_3 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_3 + "</span></p></td>";
                                 
                                 (injetor.tempoRecalque4 !== 0 && (parametros.RECALQUE_TEMPO_4 < (injetor.tempoRecalque4 - (injetor.tempoRecalque4 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_4 > (injetor.tempoRecalque4 + (injetor.tempoRecalque4 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_4 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_4 + "</span></p></td>";
                                 
                                 (injetor.tempoRecalque5 !== 0 && (parametros.RECALQUE_TEMPO_5 < (injetor.tempoRecalque5 - (injetor.tempoRecalque5 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_5 > (injetor.tempoRecalque5 + (injetor.tempoRecalque5 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_5 + "</span></p></td>"
                                 : recalque += "<td><p class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_5 + "</span></p></td>";
   
                                 recalque += "</tr>";
                                 
                                 tableBody = $("#recalque tbody");
                                 tableBody.html(recalque);
   
                                 var dosagem = "<tr><th scope='row' colspan='2'>PARTIDA</th>";
   
                                 (injetor.partDosagem1 !== 0 && (parametros.DOSAGEM_PARTIDA_1 < (injetor.partDosagem1 - (injetor.partDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_1 > (injetor.partDosagem1 + (injetor.partDosagem1 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_1 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.partDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_1 + "</span></p></td>";
                                 
                                 (injetor.partDosagem2 !== 0 && (parametros.DOSAGEM_PARTIDA_2 < (injetor.partDosagem2 - (injetor.partDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_2 > (injetor.partDosagem2 + (injetor.partDosagem2 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_2 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.partDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_2 + "</span></p></td>";
                                 
                                 (injetor.partDosagem3 !== 0 && (parametros.DOSAGEM_PARTIDA_3 < (injetor.partDosagem3 - (injetor.partDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_3 > (injetor.partDosagem3 + (injetor.partDosagem3 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_3 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.partDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_3 + "</span></p></td>";
                                 
                                 (injetor.partDosagem4 !== 0 && (parametros.DOSAGEM_PARTIDA_4 < (injetor.partDosagem4 - (injetor.partDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_4 > (injetor.partDosagem4 + (injetor.partDosagem4 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_4 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.partDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_4 + "</span></p></td>";
                                 
                                 (injetor.partDosagem5 !== 0 && (parametros.DOSAGEM_PARTIDA_5 < (injetor.partDosagem5 - (injetor.partDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_5 > (injetor.partDosagem5 + (injetor.partDosagem5 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_5 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.partDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_5 + "</span></p></td>";
   
                                 dosagem += "</tr>";
   
                                 dosagem += "<tr><th scope='row' colspan='2'>PRESSÃO</th>";
   
                                 (injetor.presDosagem1 !== 0 && (parametros.DOSAGEM_PRESSAO_1 < (injetor.presDosagem1 - (injetor.presDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_1 > (injetor.presDosagem1 + (injetor.presDosagem1 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_1 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_1 + "</span></p></td>";
                                 
                                 (injetor.presDosagem2 !== 0 && (parametros.DOSAGEM_PRESSAO_2 < (injetor.presDosagem2 - (injetor.presDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_2 > (injetor.presDosagem2 + (injetor.presDosagem2 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_2 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_2 + "</span></p></td>";
                                 
                                 (injetor.presDosagem3 !== 0 && (parametros.DOSAGEM_PRESSAO_3 < (injetor.presDosagem3 - (injetor.presDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_3 > (injetor.presDosagem3 + (injetor.presDosagem3 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_3 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_3 + "</span></p></td>";
                                 
                                 (injetor.presDosagem4 !== 0 && (parametros.DOSAGEM_PRESSAO_4 < (injetor.presDosagem4 - (injetor.presDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_4 > (injetor.presDosagem4 + (injetor.presDosagem4 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_4 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_4 + "</span></p></td>";
                                 
                                 (injetor.presDosagem5 !== 0 && (parametros.DOSAGEM_PRESSAO_5 < (injetor.presDosagem5 - (injetor.presDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_5 > (injetor.presDosagem5 + (injetor.presDosagem5 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_5 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_5 + "</span></p></td>";
   
                                 dosagem += "</tr>";
   
                                 dosagem += "<tr><th scope='row' colspan='2'>FLUXO</th>";
   
                                 (injetor.fluxoDosagem1 !== 0 && (parametros.DOSAGEM_FLUXO_1 < (injetor.fluxoDosagem1 - (injetor.fluxoDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_1 > (injetor.fluxoDosagem1 + (injetor.fluxoDosagem1 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_1 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_1 + "</span></p></td>";
                                 
                                 (injetor.fluxoDosagem2 !== 0 && (parametros.DOSAGEM_FLUXO_2 < (injetor.fluxoDosagem2 - (injetor.fluxoDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_2 > (injetor.fluxoDosagem2 + (injetor.fluxoDosagem2 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_2 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_2 + "</span></p></td>";
                                 
                                 (injetor.fluxoDosagem3 !== 0 && (parametros.DOSAGEM_FLUXO_3 < (injetor.fluxoDosagem3 - (injetor.fluxoDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_3 > (injetor.fluxoDosagem3 + (injetor.fluxoDosagem3 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_3 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_3 + "</span></p></td>";
                                 
                                 (injetor.fluxoDosagem4 !== 0 && (parametros.DOSAGEM_FLUXO_4 < (injetor.fluxoDosagem4 - (injetor.fluxoDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_4 > (injetor.fluxoDosagem4 + (injetor.fluxoDosagem4 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_4 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_4 + "</span></p></td>";
                                 
                                 (injetor.fluxoDosagem5 !== 0 && (parametros.DOSAGEM_FLUXO_5 < (injetor.fluxoDosagem5 - (injetor.fluxoDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_5 > (injetor.fluxoDosagem5 + (injetor.fluxoDosagem5 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_5 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_5 + "</span></p></td>";
   
                                 dosagem += "</tr>";
   
                                 dosagem += "<tr><th scope='row' colspan='2'>CONTRAPRESSÃO</th>";
   
                                 (injetor.CPDosagem1 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_1 < (injetor.CPDosagem1 - (injetor.CPDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_1 > (injetor.CPDosagem1 + (injetor.CPDosagem1 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_1 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.CPDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_1 + "</span></p></td>";
                                 
                                 (injetor.CPDosagem2 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_2 < (injetor.CPDosagem2 - (injetor.CPDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_2 > (injetor.CPDosagem2 + (injetor.CPDosagem2 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_2 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.CPDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_2 + "</span></p></td>";
                                 
                                 (injetor.CPDosagem3 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_3 < (injetor.CPDosagem3 - (injetor.CPDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_3 > (injetor.CPDosagem3 + (injetor.CPDosagem3 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_3 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.CPDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_3 + "</span></p></td>";
                                 
                                 (injetor.CPDosagem4 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_4 < (injetor.CPDosagem4 - (injetor.CPDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_4 > (injetor.CPDosagem4 + (injetor.CPDosagem4 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_4 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.CPDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_4 + "</span></p></td>";
                                 
                                 (injetor.CPDosagem5 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_5 < (injetor.CPDosagem5 - (injetor.CPDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_5 > (injetor.CPDosagem5 + (injetor.CPDosagem5 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_5 + "</span></p></td>"
                                 : dosagem += "<td><p class='read-only'><span class='cadastrados'> " + injetor.CPDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_5 + "</span></p></td>";
   
                                 dosagem += "</tr>";
                                 
                                 var dosagemFoot = "<tr><th colspan='2'>TEMPO:</th>";                              
   
                                 (injetor.tempoDosagem !== 0 && (parametros.TEMPO_DOSAGEM < (injetor.tempoDosagem - (injetor.tempoDosagem * 0.1)).toFixed(1) || parametros.TEMPO_DOSAGEM > (injetor.tempoDosagem + (injetor.tempoDosagem * 0.1)).toFixed(1))) 
                                 ? dosagemFoot += "<td colspan='5' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoDosagem + "</span> - <span class='reais'>" + parametros.TEMPO_DOSAGEM + "</span></p></td>"
                                 : dosagemFoot += "<td colspan='5'><p class='read-only'><span class='cadastrados'> " + injetor.tempoDosagem + "</span> - <span class='reais'>" + parametros.TEMPO_DOSAGEM + "</span></p></td>";
                                 
                                 dosagemFoot += "</tr>";
                                 
                                 tableBody = $("#dosagem tbody");
                                 tableBody.html(dosagem);
   
                                 tableFoot = $("#dosagemFoot");
                                 tableFoot.html(dosagemFoot);
   
                                 var descompressao = "<tr>" +
                                                         "<th colspan='3'>ANTES</th>" + 
                                                         "<td colspan='1'>" +
                                                            "<p class='read-only'><span class='cadastrados'>" + injetor.antesPos + "</span></p>" +
                                                         "</td>" +
                                                         "<td colspan='1'>" +
                                                            "<p class='read-only'><span class='cadastrados'>" + injetor.antesPres + "</span></p>" +
                                                         "</td>" +
                                                         "<td colspan='1'>" +
                                                            "<p class='read-only'><span class='cadastrados'>" + injetor.antesFluxo + "</span></p>" +
                                                         "</td>" +
                                                         "<td colspan='1'>" +
                                                            "<p class='read-only'><span class='cadastrados'>" + injetor.antesTempo + "</span></p>" +
                                                         "</td>" +
                                                      "</tr>"
   
                                 descompressao += "<tr>" +
                                                      "<th colspan='3'>DEPOIS</th>" +
                                                      "<td colspan='1'>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + injetor.depoisPos + "</span></p>" +
                                                      "</td>" +
                                                      "<td colspan='1'>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + injetor.depoisPres + "</span></p>" +
                                                      "</td>" +
                                                      "<td colspan='1'>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + injetor.depoisFluxo + "</span></p>" +
                                                      "</td>" +
                                                      "<td colspan='1'>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + injetor.depoisTempo + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                              
                                 tableBody = $("#descompressao tbody");
                                 tableBody.html(descompressao);
   
                                 var fechamento = "<tr><th scope='row' colspan='2'>POSIÇÃO</th>";
   
                                 (injetor.posFecha1 !== 0 && (parametros.FECHAMENTO_POSICAO_1 < (injetor.posFecha1 - (injetor.posFecha1 * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_1 > (injetor.posFecha1 + (injetor.posFecha1 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_1 + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_1 + "</span></p></td>";
                                 
                                 (injetor.posFecha2 !== 0 && (parametros.FECHAMENTO_POSICAO_2 < (injetor.posFecha2 - (injetor.posFecha2 * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_2 > (injetor.posFecha2 + (injetor.posFecha2 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_2 + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_2 + "</span></p></td>";
                                 
                                 (injetor.posFecha3 !== 0 && (parametros.FECHAMENTO_POSICAO_3 < (injetor.posFecha3 - (injetor.posFecha3 * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_3 > (injetor.posFecha3 + (injetor.posFecha3 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_3 + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_3 + "</span></p></td>";
                                 
                                 (injetor.protMPos !== 0 && (parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE < (injetor.protMPos - (injetor.protMPos * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE > (injetor.protMPos + (injetor.protMPos * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.protMPos + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.protMPos + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE + "</span></p></td>";
                                 
                                 (injetor.AltaPresPos !== 0 && (parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO < (injetor.AltaPresPos - (injetor.AltaPresPos * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO > (injetor.AltaPresPos + (injetor.AltaPresPos * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.AltaPresPos + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.AltaPresPos + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO + "</span></p></td>";
   
                                 fechamento += "</tr>";
   
                                 fechamento += "<tr><th scope='row' colspan='2'>PRESSÃO</th>";
   
                                 (injetor.presFecha1 !== 0 && (parametros.FECHAMENTO_PRESSAO_1 < (injetor.presFecha1 - (injetor.presFecha1 * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_1 > (injetor.presFecha1 + (injetor.presFecha1 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_1 + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_1 + "</span></p></td>";
                                 
                                 (injetor.presFecha2 !== 0 && (parametros.FECHAMENTO_PRESSAO_2 < (injetor.presFecha2 - (injetor.presFecha2 * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_2 > (injetor.presFecha2 + (injetor.presFecha2 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_2 + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_2 + "</span></p></td>";
                                 
                                 (injetor.presFecha3 !== 0 && (parametros.FECHAMENTO_PRESSAO_3 < (injetor.presFecha3 - (injetor.presFecha3 * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_3 > (injetor.presFecha3 + (injetor.presFecha3 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_3 + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_3 + "</span></p></td>";
                                 
                                 (injetor.protMPres !== 0 && (parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE < (injetor.protMPres - (injetor.protMPres * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE > (injetor.protMPres + (injetor.protMPres * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.protMPres + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.protMPres + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE + "</span></p></td>";
                                 
                                 (injetor.AltaPresPres !== 0 && (parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO < (injetor.AltaPresPres - (injetor.AltaPresPres * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO > (injetor.AltaPresPres + (injetor.AltaPresPres * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.AltaPresPres + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.AltaPresPres + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO + "</span></p></td>";
   
                                 fechamento += "</tr>";
   
                                 fechamento += "<tr><th scope='row' colspan='2'>FLUXO</th>";
   
                                 (injetor.fluxoFecha1 !== 0 && (parametros.FECHAMENTO_FLUXO_1 < (injetor.fluxoFecha1 - (injetor.fluxoFecha1 * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_1 > (injetor.fluxoFecha1 + (injetor.fluxoFecha1 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_1 + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_1 + "</span></p></td>";
                                 
                                 (injetor.fluxoFecha2 !== 0 && (parametros.FECHAMENTO_FLUXO_2 < (injetor.fluxoFecha2 - (injetor.fluxoFecha2 * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_2 > (injetor.fluxoFecha2 + (injetor.fluxoFecha2 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_2 + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_2 + "</span></p></td>";
                                 
                                 (injetor.fluxoFecha3 !== 0 && (parametros.FECHAMENTO_FLUXO_3 < (injetor.fluxoFecha3 - (injetor.fluxoFecha3 * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_3 > (injetor.fluxoFecha3 + (injetor.fluxoFecha3 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_3 + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_3 + "</span></p></td>";
                                 
                                 (injetor.protMFluxo !== 0 && (parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE < (injetor.protMFluxo - (injetor.protMFluxo * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE > (injetor.protMFluxo + (injetor.protMFluxo * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.protMFluxo + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.protMFluxo + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE + "</span></p></td>";
                                 
                                 (injetor.AltaPresFluxo !== 0 && (parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO < (injetor.AltaPresFluxo - (injetor.AltaPresFluxo * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO > (injetor.AltaPresFluxo + (injetor.AltaPresFluxo * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.AltaPresFluxo + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO + "</span></p></td>"
                                 : fechamento += "<td><p class='read-only'><span class='cadastrados'> " + injetor.AltaPresFluxo + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO + "</span></p></td>";
   
                                 fechamento += "</tr>";
   
                                 var fechamentoFoot = "<tr><th colspan='3'>TEMPO PROTEÇÃO DE MOLDE:</th>";                              
   
                                 (injetor.tempoProtMolde !== 0 && (parametros.TEMPO_PROTECAO_MOLDE < (injetor.tempoProtMolde - (injetor.tempoProtMolde * 0.1)).toFixed(1) || parametros.TEMPO_PROTECAO_MOLDE > (injetor.tempoProtMolde + (injetor.tempoProtMolde * 0.1)).toFixed(1))) 
                                 ? fechamentoFoot += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoProtMolde + "</span> - <span class='reais'>" + parametros.TEMPO_PROTECAO_MOLDE + "</span></p></td>"
                                 : fechamentoFoot += "<td><p class='read-only'><span class='cadastrados'> " + injetor.tempoProtMolde + "</span> - <span class='reais'>" + parametros.TEMPO_PROTECAO_MOLDE + "</span></p></td>";
                                 
                                 fechamentoFoot += "<th colspan='2'>TEMPO FECHAMENTO:</th>";
   
                                 (injetor.tempoFecha !== 0 && (parametros.TEMPO_FECHAMENTO < (injetor.tempoFecha - (injetor.tempoFecha * 0.1)).toFixed(1) || parametros.TEMPO_FECHAMENTO > (injetor.tempoFecha + (injetor.tempoFecha * 0.1)).toFixed(1))) 
                                 ? fechamentoFoot += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoFecha + "</span> - <span class='reais'>" + parametros.TEMPO_FECHAMENTO + "</span></p></td>"
                                 : fechamentoFoot += "<td><p class='read-only'><span class='cadastrados'> " + injetor.tempoFecha + "</span> - <span class='reais'>" + parametros.TEMPO_FECHAMENTO + "</span></p></td>";
   
                                 fechamentoFoot += "</tr>";
   
                                 tableBody = $("#fechamento tbody");
                                 tableBody.html(fechamento);
                                 
                                 tableFoot = $("#fechamentoFoot");
                                 tableFoot.html(fechamentoFoot);
   
                                 var abertura = "<tr><th scope='row' colspan='2'>POSIÇÃO</th>";
   
                                 (injetor.posAbertura1 !== 0 && (parametros.ABERTURA_POSICAO_1 < (injetor.posAbertura1 - (injetor.posAbertura1 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_1 > (injetor.posAbertura1 + (injetor.posAbertura1 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_1 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_1 + "</span></p></td>";
                                 
                                 (injetor.posAbertura2 !== 0 && (parametros.ABERTURA_POSICAO_2 < (injetor.posAbertura2 - (injetor.posAbertura2 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_2 > (injetor.posAbertura2 + (injetor.posAbertura2 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_2 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_2 + "</span></p></td>";
                                 
                                 (injetor.posAbertura3 !== 0 && (parametros.ABERTURA_POSICAO_3 < (injetor.posAbertura3 - (injetor.posAbertura3 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_3 > (injetor.posAbertura3 + (injetor.posAbertura3 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_3 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_3 + "</span></p></td>";
                                 
                                 (injetor.posAbertura4 !== 0 && (parametros.ABERTURA_POSICAO_4 < (injetor.posAbertura4 - (injetor.posAbertura4 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_4 > (injetor.posAbertura4 + (injetor.posAbertura4 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_4 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_4 + "</span></p></td>";
                                 
                                 (injetor.posAbertura5 !== 0 && (parametros.ABERTURA_POSICAO_5 < (injetor.posAbertura5 - (injetor.posAbertura5 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_5 > (injetor.posAbertura5 + (injetor.posAbertura5 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_5 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_5 + "</span></p></td>";
   
                                 abertura += "</tr>";
   
                                 abertura += "<tr><th scope='row' colspan='2'>PRESSÃO</th>";
   
                                 (injetor.presAbertura1 !== 0 && (parametros.ABERTURA_PRESSAO_1 < (injetor.presAbertura1 - (injetor.presAbertura1 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_1 > (injetor.presAbertura1 + (injetor.presAbertura1 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_1 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_1 + "</span></p></td>";
                                 
                                 (injetor.presAbertura2 !== 0 && (parametros.ABERTURA_PRESSAO_2 < (injetor.presAbertura2 - (injetor.presAbertura2 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_2 > (injetor.presAbertura2 + (injetor.presAbertura2 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_2 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_2 + "</span></p></td>";
                                 
                                 (injetor.presAbertura3 !== 0 && (parametros.ABERTURA_PRESSAO_3 < (injetor.presAbertura3 - (injetor.presAbertura3 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_3 > (injetor.presAbertura3 + (injetor.presAbertura3 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_3 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_3 + "</span></p></td>";
                                 
                                 (injetor.presAbertura4 !== 0 && (parametros.ABERTURA_PRESSAO_4 < (injetor.presAbertura4 - (injetor.presAbertura4 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_4 > (injetor.presAbertura4 + (injetor.presAbertura4 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_4 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_4 + "</span></p></td>";
                                 
                                 (injetor.presAbertura5 !== 0 && (parametros.ABERTURA_PRESSAO_5 < (injetor.presAbertura5 - (injetor.presAbertura5 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_5 > (injetor.presAbertura5 + (injetor.presAbertura5 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_5 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_5 + "</span></p></td>";
   
                                 abertura += "</tr>";
   
                                 abertura += "<tr><th scope='row' colspan='2'>FLUXO</th>";
   
                                 (injetor.fluxoAbertura1 !== 0 && (parametros.ABERTURA_FLUXO_1 < (injetor.fluxoAbertura1 - (injetor.fluxoAbertura1 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_1 > (injetor.fluxoAbertura1 + (injetor.fluxoAbertura1 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_1 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_1 + "</span></p></td>";
                                 
                                 (injetor.fluxoAbertura2 !== 0 && (parametros.ABERTURA_FLUXO_2 < (injetor.fluxoAbertura2 - (injetor.fluxoAbertura2 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_2 > (injetor.fluxoAbertura2 + (injetor.fluxoAbertura2 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_2 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_2 + "</span></p></td>";
                                 
                                 (injetor.fluxoAbertura3 !== 0 && (parametros.ABERTURA_FLUXO_3 < (injetor.fluxoAbertura3 - (injetor.fluxoAbertura3 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_3 > (injetor.fluxoAbertura3 + (injetor.fluxoAbertura3 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_3 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_3 + "</span></p></td>";
                                 
                                 (injetor.fluxoAbertura4 !== 0 && (parametros.ABERTURA_FLUXO_4 < (injetor.fluxoAbertura4 - (injetor.fluxoAbertura4 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_4 > (injetor.fluxoAbertura4 + (injetor.fluxoAbertura4 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_4 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_4 + "</span></p></td>";
                                 
                                 (injetor.fluxoAbertura5 !== 0 && (parametros.ABERTURA_FLUXO_5 < (injetor.fluxoAbertura5 - (injetor.fluxoAbertura5 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_5 > (injetor.fluxoAbertura5 + (injetor.fluxoAbertura5 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_5 + "</span></p></td>"
                                 : abertura += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_5 + "</span></p></td>";
   
                                 abertura += "</tr>";
   
                                 var aberturaFoot = "<tr><th colspan='3'>RESFRIAMENTO:</th>";                              
   
                                 (injetor.resfriamento !== 0 && (parametros.TEMPO_RESFRIAMENT0 < (injetor.resfriamento - (injetor.resfriamento * 0.1)).toFixed(1) || parametros.TEMPO_RESFRIAMENT0 > (injetor.resfriamento + (injetor.resfriamento * 0.1)).toFixed(1))) 
                                 ? aberturaFoot += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.resfriamento + "</span> - <span class='reais'>" + parametros.TEMPO_RESFRIAMENT0 + "</span></p></td>"
                                 : aberturaFoot += "<td><p class='read-only'><span class='cadastrados'> " + injetor.resfriamento + "</span> - <span class='reais'>" + parametros.TEMPO_RESFRIAMENT0 + "</span></p></td>";
                                 
                                 aberturaFoot += "<th colspan='2'>TEMPO ABERTURA:</th>";
   
                                 (injetor.tempoAbertura !== 0 && (parametros.TEMPO_ABERTURA < (injetor.tempoAbertura - (injetor.tempoAbertura * 0.1)).toFixed(1) || parametros.TEMPO_ABERTURA > (injetor.tempoAbertura + (injetor.tempoAbertura * 0.1)).toFixed(1))) 
                                 ? aberturaFoot += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoAbertura + "</span> - <span class='reais'>" + parametros.TEMPO_ABERTURA + "</span></p></td>"
                                 : aberturaFoot += "<td><p class='read-only'><span class='cadastrados'> " + injetor.tempoAbertura + "</span> - <span class='reais'>" + parametros.TEMPO_ABERTURA + "</span></p></td>";
   
                                 aberturaFoot += "</tr>";
                                 
                                 tableFoot = $("#aberturaFoot");
                                 tableFoot.html(aberturaFoot);
                                 
                                 tableBody = $("#abertura tbody");
                                 tableBody.html(abertura);
   
                                 var extracao = "<tr><th scope='row' colspan='1'>POSIÇÃO</th>";
   
                                 (injetor.posAvanco1 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_1 < (injetor.posAvanco1 - (injetor.posAvanco1 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_1 > (injetor.posAvanco1 + (injetor.posAvanco1 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_1 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_1 + "</span></p></td>";
                                 
                                 (injetor.posAvanco2 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_2 < (injetor.posAvanco2 - (injetor.posAvanco2 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_2 > (injetor.posAvanco2 + (injetor.posAvanco2 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_2 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_2 + "</span></p></td>";
                                 
                                 (injetor.posAvanco3 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_3 < (injetor.posAvanco3 - (injetor.posAvanco3 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_3 > (injetor.posAvanco3 + (injetor.posAvanco3 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_3 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_3 + "</span></p></td>";
                                 
                                 (injetor.posRecuo1 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_3 < (injetor.posRecuo1 - (injetor.posRecuo1 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_3 > (injetor.posRecuo1 + (injetor.posRecuo1 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_3 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_3 + "</span></p></td>";
                                 
                                 (injetor.posRecuo2 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_2 < (injetor.posRecuo2 - (injetor.posRecuo2 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_2 > (injetor.posRecuo2 + (injetor.posRecuo2 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_2 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_2 + "</span></p></td>";
                                 
                                 (injetor.posRecuo3 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_1 < (injetor.posRecuo3 - (injetor.posRecuo3 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_1 > (injetor.posRecuo3 + (injetor.posRecuo3 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.posRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_1 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.posRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_1 + "</span></p></td>";
   
                                 extracao += "</tr>";
   
                                 extracao += "<tr><th scope='row' colspan='1'>PRESSÃO</th>";
   
                                 (injetor.presAvanco1 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_1 < (injetor.presAvanco1 - (injetor.presAvanco1 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_1 > (injetor.presAvanco1 + (injetor.presAvanco1 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_1 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_1 + "</span></p></td>";
                                 
                                 (injetor.presAvanco2 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_2 < (injetor.presAvanco2 - (injetor.presAvanco2 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_2 > (injetor.presAvanco2 + (injetor.presAvanco2 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_2 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_2 + "</span></p></td>";
                                 
                                 (injetor.presAvanco3 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_3 < (injetor.presAvanco3 - (injetor.presAvanco3 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_3 > (injetor.presAvanco3 + (injetor.presAvanco3 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_3 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_3 + "</span></p></td>";
                                 
                                 (injetor.presRecuo1 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_3 < (injetor.presRecuo1 - (injetor.presRecuo1 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_3 > (injetor.presRecuo1 + (injetor.presRecuo1 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_3 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_3 + "</span></p></td>";
                                 
                                 (injetor.presRecuo2 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_2 < (injetor.presRecuo2 - (injetor.presRecuo2 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_2 > (injetor.presRecuo2 + (injetor.presRecuo2 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_2 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_2 + "</span></p></td>";
                                 
                                 (injetor.presRecuo3 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_1 < (injetor.presRecuo3 - (injetor.presRecuo3 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_1 > (injetor.presRecuo3 + (injetor.presRecuo3 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_1 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.presRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_1 + "</span></p></td>";
   
                                 extracao += "</tr>";
   
                                 extracao += "<tr><th scope='row' colspan='1'>FLUXO</th>";
   
                                 (injetor.fluxoAvanco1 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_1 < (injetor.fluxoAvanco1 - (injetor.fluxoAvanco1 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_1 > (injetor.fluxoAvanco1 + (injetor.fluxoAvanco1 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_1 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_1 + "</span></p></td>";
                                 
                                 (injetor.fluxoAvanco2 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_2 < (injetor.fluxoAvanco2 - (injetor.fluxoAvanco2 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_2 > (injetor.fluxoAvanco2 + (injetor.fluxoAvanco2 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_2 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_2 + "</span></p></td>";
                                 
                                 (injetor.fluxoAvanco3 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_3 < (injetor.fluxoAvanco3 - (injetor.fluxoAvanco3 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_3 > (injetor.fluxoAvanco3 + (injetor.fluxoAvanco3 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_3 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_3 + "</span></p></td>";
                                 
                                 (injetor.fluxoRecuo1 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_3 < (injetor.fluxoRecuo1 - (injetor.fluxoRecuo1 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_3 > (injetor.fluxoRecuo1 + (injetor.fluxoRecuo1 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_3 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_3 + "</span></p></td>";
                                 
                                 (injetor.fluxoRecuo2 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_2 < (injetor.fluxoRecuo2 - (injetor.fluxoRecuo2 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_2 > (injetor.fluxoRecuo2 + (injetor.fluxoRecuo2 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_2 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_2 + "</span></p></td>";
                                 
                                 (injetor.fluxoRecuo3 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_1 < (injetor.fluxoRecuo3 - (injetor.fluxoRecuo3 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_1 > (injetor.fluxoRecuo3 + (injetor.fluxoRecuo3 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_1 + "</span></p></td>"
                                 : extracao += "<td><p class='read-only'><span class='cadastrados'> " + injetor.fluxoRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_1 + "</span></p></td>";
   
                                 extracao += "</tr>";
   
                                 var extracaoFoot = "<tr>" +
                                                      "<th colspan='2'>ATRASO:</th>" +
                                                      "<td colspan='1'>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + injetor.atraso + "</span></p>" +
                                                      "</td>"+
                                                      "<th colspan='2'>BATIDA:</th>" +
                                                      "<td colspan='2'>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + injetor.batida + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                 
                                 tableFoot = $("#extracaoFoot");
                                 tableFoot.html(extracaoFoot);
                                 
                                 tableBody = $("#extracao tbody");
                                 tableBody.html(extracao);
   
                                 var radial = "<tr>" +
                                                "<th colspan='1'>TYPE</th>" +
                                                "<th colspan='1'>TEMPO</th>" +
                                                "<th colspan='1'>LIMITE</th>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + injetor.radialTypeEntrada1 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + injetor.radialTypeSaida1 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + injetor.radialTypeEntrada2 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + injetor.radialTypeSaida2 + "</span></p>" +
                                                "</td>" +
                                             "</tr>"
   
                                 radial += "<tr><th scope='row' colspan='1'>PRESSÃO:</th>";
   
                                 (injetor.radialPresEntrada1 !== 0 && (parametros.RADIAL_PRESSAO_ENTRADA_1 < (injetor.radialPresEntrada1 - (injetor.radialPresEntrada1 * 0.1)).toFixed(1) || parametros.RADIAL_PRESSAO_ENTRADA_1 > (injetor.radialPresEntrada1 + (injetor.radialPresEntrada1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_1 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialPresEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_1 + "</span></p></td>";
                                 
                                 (injetor.radialPresSaida1 !== 0 && (parametros.RADIAL_PRESSAO_SAIDA_1 < (injetor.radialPresSaida1 - (injetor.radialPresSaida1 * 0.1)).toFixed(1) || parametros.RADIAL_PRESSAO_SAIDA_1 > (injetor.radialPresSaida1 + (injetor.radialPresSaida1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_1 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialPresSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_1 + "</span></p></td>";
                                 
                                 (injetor.radialPresEntrada2 !== 0 && (parametros.RADIAL_PRESSAO_ENTRADA_2 < (injetor.radialPresEntrada2 - (injetor.radialPresEntrada2 * 0.1)).toFixed(1) || parametros.RADIAL_PRESSAO_ENTRADA_2 > (injetor.radialPresEntrada2 + (injetor.radialPresEntrada2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_2 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialPresEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_2 + "</span></p></td>";
                                 
                                 (injetor.radialPresSaida2 !== 0 && (parametros.RADIAL_PRESSAO_SAIDA_2 < (injetor.radialPresSaida2 - (injetor.radialPresSaida2 * 0.1)).toFixed(1) || parametros.RADIAL_PRESSAO_SAIDA_2 > (injetor.radialPresSaida2 + (injetor.radialPresSaida2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_2 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialPresSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_2 + "</span></p></td>";
                                 
                                 (injetor.radialPresEntrada3 !== 0 && (parametros.RADIAL_PRESSAO_ENTRADA_3 < (injetor.radialPresEntrada3 - (injetor.radialPresEntrada3 * 0.1)).toFixed(1) || parametros.RADIAL_PRESSAO_ENTRADA_3 > (injetor.radialPresEntrada3 + (injetor.radialPresEntrada3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_3 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialPresEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_3 + "</span></p></td>";
                                 
                                 (injetor.radialPresSaida3 !== 0 && (parametros.RADIAL_PRESSAO_SAIDA_3 < (injetor.radialPresSaida3 - (injetor.radialPresSaida3 * 0.1)).toFixed(1) || parametros.RADIAL_PRESSAO_SAIDA_3 > (injetor.radialPresSaida3 + (injetor.radialPresSaida3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_3 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialPresSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_3 + "</span></p></td>";
   
                                 radial += "</tr>";
   
                                 radial += "<tr><th scope='row' colspan='1'>FLUXO:</th>";
   
                                 (injetor.radialFluxoEntrada1 !== 0 && (parametros.RADIAL_FLUXO_ENTRADA_1 < (injetor.radialFluxoEntrada1 - (injetor.radialFluxoEntrada1 * 0.1)).toFixed(1) || parametros.RADIAL_FLUXO_ENTRADA_1 > (injetor.radialFluxoEntrada1 + (injetor.radialFluxoEntrada1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_1 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_1 + "</span></p></td>";
                                 
                                 (injetor.radialFluxoSaida1 !== 0 && (parametros.RADIAL_FLUXO_SAIDA_1 < (injetor.radialFluxoSaida1 - (injetor.radialFluxoSaida1 * 0.1)).toFixed(1) || parametros.RADIAL_FLUXO_SAIDA_1 > (injetor.radialFluxoSaida1 + (injetor.radialFluxoSaida1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_1 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_1 + "</span></p></td>";
                                 
                                 (injetor.radialFluxoEntrada2 !== 0 && (parametros.RADIAL_FLUXO_ENTRADA_2 < (injetor.radialFluxoEntrada2 - (injetor.radialFluxoEntrada2 * 0.1)).toFixed(1) || parametros.RADIAL_FLUXO_ENTRADA_2 > (injetor.radialFluxoEntrada2 + (injetor.radialFluxoEntrada2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_2 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_2 + "</span></p></td>";
                                 
                                 (injetor.radialFluxoSaida2 !== 0 && (parametros.RADIAL_FLUXO_SAIDA_2 < (injetor.radialFluxoSaida2 - (injetor.radialFluxoSaida2 * 0.1)).toFixed(1) || parametros.RADIAL_FLUXO_SAIDA_2 > (injetor.radialFluxoSaida2 + (injetor.radialFluxoSaida2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_2 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_2 + "</span></p></td>";
                                 
                                 (injetor.radialFluxoEntrada3 !== 0 && (parametros.RADIAL_FLUXO_ENTRADA_3 < (injetor.radialFluxoEntrada3 - (injetor.radialFluxoEntrada3 * 0.1)).toFixed(1) || parametros.RADIAL_FLUXO_ENTRADA_3 > (injetor.radialFluxoEntrada3 + (injetor.radialFluxoEntrada3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_3 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_3 + "</span></p></td>";
                                 
                                 (injetor.radialFluxoSaida3 !== 0 && (parametros.RADIAL_FLUXO_SAIDA_3 < (injetor.radialFluxoSaida3 - (injetor.radialFluxoSaida3 * 0.1)).toFixed(1) || parametros.RADIAL_FLUXO_SAIDA_3 > (injetor.radialFluxoSaida3 + (injetor.radialFluxoSaida3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_3 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_3 + "</span></p></td>";
   
                                 radial += "</tr>";
   
                                 radial += "<tr><th scope='row' colspan='1'>ACT. POSIÇÃO:</th>";
   
                                 (injetor.radialPosEntrada1 !== 0 && (parametros.RADIAL_ACT_POSICAO_ENTRADA_1 < (injetor.radialPosEntrada1 - (injetor.radialPosEntrada1 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_ENTRADA_1 > (injetor.radialPosEntrada1 + (injetor.radialPosEntrada1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_1 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialPosEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_1 + "</span></p></td>";
                                 
                                 (injetor.radialPosSaida1 !== 0 && (parametros.RADIAL_ACT_POSICAO_SAIDA_1 < (injetor.radialPosSaida1 - (injetor.radialPosSaida1 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_SAIDA_1 > (injetor.radialPosSaida1 + (injetor.radialPosSaida1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_1 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialPosSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_1 + "</span></p></td>";
                                 
                                 (injetor.radialPosEntrada2 !== 0 && (parametros.RADIAL_ACT_POSICAO_ENTRADA_2 < (injetor.radialPosEntrada2 - (injetor.radialPosEntrada2 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_ENTRADA_2 > (injetor.radialPosEntrada2 + (injetor.radialPosEntrada2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_2 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialPosEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_2 + "</span></p></td>";
                                 
                                 (injetor.radialPosSaida2 !== 0 && (parametros.RADIAL_ACT_POSICAO_SAIDA_2 < (injetor.radialPosSaida2 - (injetor.radialPosSaida2 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_SAIDA_2 > (injetor.radialPosSaida2 + (injetor.radialPosSaida2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_2 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialPosSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_2 + "</span></p></td>";
                                 
                                 (injetor.radialPosEntrada3 !== 0 && (parametros.RADIAL_ACT_POSICAO_ENTRADA_3 < (injetor.radialPosEntrada3 - (injetor.radialPosEntrada3 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_ENTRADA_3 > (injetor.radialPosEntrada3 + (injetor.radialPosEntrada3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_3 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialPosEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_3 + "</span></p></td>";
                                 
                                 (injetor.radialPosSaida3 !== 0 && (parametros.RADIAL_ACT_POSICAO_SAIDA_3 < (injetor.radialPosSaida3 - (injetor.radialPosSaida3 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_SAIDA_3 > (injetor.radialPosSaida3 + (injetor.radialPosSaida3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_3 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialPosSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_3 + "</span></p></td>";
   
                                 radial += "</tr>";
   
                                 radial += "<tr><th scope='row' colspan='1'>ACT. TEMPO:</th>";
   
                                 (injetor.radialTempoEntrada1 !== 0 && (parametros.RADIAL_ACT_TEMPO_ENTRADA_1 < (injetor.radialTempoEntrada1 - (injetor.radialTempoEntrada1 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_ENTRADA_1 > (injetor.radialTempoEntrada1 + (injetor.radialTempoEntrada1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_1 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_1 + "</span></p></td>";
                                 
                                 (injetor.radialTempoSaida1 !== 0 && (parametros.RADIAL_ACT_TEMPO_SAIDA_1 < (injetor.radialTempoSaida1 - (injetor.radialTempoSaida1 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_SAIDA_1 > (injetor.radialTempoSaida1 + (injetor.radialTempoSaida1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_1 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_1 + "</span></p></td>";
                                 
                                 (injetor.radialTempoEntrada2 !== 0 && (parametros.RADIAL_ACT_TEMPO_ENTRADA_2 < (injetor.radialTempoEntrada2 - (injetor.radialTempoEntrada2 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_ENTRADA_2 > (injetor.radialTempoEntrada2 + (injetor.radialTempoEntrada2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_2 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_2 + "</span></p></td>";
                                 
                                 (injetor.radialTempoSaida2 !== 0 && (parametros.RADIAL_ACT_TEMPO_SAIDA_2 < (injetor.radialTempoSaida2 - (injetor.radialTempoSaida2 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_SAIDA_2 > (injetor.radialTempoSaida2 + (injetor.radialTempoSaida2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_2 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_2 + "</span></p></td>";
                                 
                                 (injetor.radialTempoEntrada3 !== 0 && (parametros.RADIAL_ACT_TEMPO_ENTRADA_3 < (injetor.radialTempoEntrada3 - (injetor.radialTempoEntrada3 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_ENTRADA_3 > (injetor.radialTempoEntrada3 + (injetor.radialTempoEntrada3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_3 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_3 + "</span></p></td>";
                                 
                                 (injetor.radialTempoSaida3 !== 0 && (parametros.RADIAL_ACT_TEMPO_SAIDA_3 < (injetor.radialTempoSaida3 - (injetor.radialTempoSaida3 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_SAIDA_3 > (injetor.radialTempoSaida3 + (injetor.radialTempoSaida3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_3 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_3 + "</span></p></td>";
   
                                 radial += "</tr>";
   
                                 radial += "<tr><th scope='row' colspan='1'>SCRCOUNT:</th>";
   
                                 (injetor.radialSCREntrada1 !== 0 && (parametros.RADIAL_SCRCOUNT_ENTRADA_1 < (injetor.radialSCREntrada1 - (injetor.radialSCREntrada1 * 0.1)).toFixed(1) || parametros.RADIAL_SCRCOUNT_ENTRADA_1 > (injetor.radialSCREntrada1 + (injetor.radialSCREntrada1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCREntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_1 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialSCREntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_1 + "</span></p></td>";
                                 
                                 (injetor.radialSCRSaida1 !== 0 && (parametros.RADIAL_SCRCOUNT_SAIDA_1 < (injetor.radialSCRSaida1 - (injetor.radialSCRSaida1 * 0.1)).toFixed(1) || parametros.RADIAL_SCRCOUNT_SAIDA_1 > (injetor.radialSCRSaida1 + (injetor.radialSCRSaida1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCRSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_1 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialSCRSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_1 + "</span></p></td>";
                                 
                                 (injetor.radialSCREntrada2 !== 0 && (parametros.RADIAL_SCRCOUNT_ENTRADA_2 < (injetor.radialSCREntrada2 - (injetor.radialSCREntrada2 * 0.1)).toFixed(1) || parametros.RADIAL_SCRCOUNT_ENTRADA_2 > (injetor.radialSCREntrada2 + (injetor.radialSCREntrada2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCREntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_2 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialSCREntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_2 + "</span></p></td>";
                                 
                                 (injetor.radialSCRSaida2 !== 0 && (parametros.RADIAL_SCRCOUNT_SAIDA_2 < (injetor.radialSCRSaida2 - (injetor.radialSCRSaida2 * 0.1)).toFixed(1) || parametros.RADIAL_SCRCOUNT_SAIDA_2 > (injetor.radialSCRSaida2 + (injetor.radialSCRSaida2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCRSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_2 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialSCRSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_2 + "</span></p></td>";
                                 
                                 (injetor.radialSCREntrada3 !== 0 && (parametros.RADIAL_SCRCOUNT_ENTRADA_3 < (injetor.radialSCREntrada3 - (injetor.radialSCREntrada3 * 0.1)).toFixed(1) || parametros.RADIAL_SCRCOUNT_ENTRADA_3 > (injetor.radialSCREntrada3 + (injetor.radialSCREntrada3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCREntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_3 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialSCREntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_3 + "</span></p></td>";
                                 
                                 (injetor.radialSCRSaida3 !== 0 && (parametros.RADIAL_SCRCOUNT_SAIDA_3 < (injetor.radialSCRSaida3 - (injetor.radialSCRSaida3 * 0.1)).toFixed(1) || parametros.RADIAL_SCRCOUNT_SAIDA_3 > (injetor.radialSCRSaida3 + (injetor.radialSCRSaida3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCRSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_3 + "</span></p></td>"
                                 : radial += "<td><p class='read-only'><span class='cadastrados'> " + injetor.radialSCRSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_3 + "</span></p></td>";
   
                                 radial += "</tr>";
   
                                 tableBody = $("#radial tbody");
                                 tableBody.html(radial);
   
                                 // FIM INJETORES
   
                                 // PERIFERICOS
   
                                 var camara = "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara1 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara2 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara3 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara4 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara5 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara6 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara7 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara8 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara9 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara10 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara11 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara12 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara13 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara14 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara15 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara16 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara17 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara18 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara19 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara20 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara21 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara22 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara23 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara24 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara25 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara26 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara27 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara28 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara29 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara30 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara31 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara32 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara33 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara34 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara35 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara36 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara37 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara38 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara39 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara40 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara41 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara42 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara43 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara44 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara45 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara46 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara47 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara48 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara49 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara50 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara51 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara52 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara53 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara54 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara55 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara56 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara57 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara58 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara59 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara60 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara61 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara62 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara63 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara64 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara65 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara66 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara67 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara68 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara69 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara70 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara71 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara72 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara73 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara74 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara75 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara76 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara77 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara78 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara79 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara80 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara81 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara82 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara83 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara84 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara85 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara86 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara87 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara88 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara89 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara90 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara91 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara92 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara93 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara94 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara95 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara96 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara97 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara98 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara99 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara100 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara101 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara102 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara103 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara104 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara105 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara106 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara107 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara108 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara109 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara110 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara111 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara112 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara113 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara114 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara115 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara116 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara117 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara118 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara119 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara120 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara121 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara122 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara123 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara124 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara125 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara126 + "</span></p>" +
                                                "</td>" +
                                             "</tr>" +
                                             "<tr>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara127 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara128 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara129 + "</span></p>" +
                                                "</td>" +
                                                "<td colspan='1'>" +
                                                   "<p class='read-only'><span class='cadastrados'>" + perifericos.camara130 + "</span></p>" +
                                                "</td>" +
                                             "</tr>"
   
                                    tableBody = $("#camaraQuente tbody");
                                    tableBody.html(camara);
   
                                    var termopar = "<tr>" +
                                                      "<th colspan='1'>TERMOPAR:</th>" +
                                                      "<th colspan='1'>K:</th>" +
                                                      "<td colspan='1'>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.termoparK1 + "</span></p>" +
                                                      "</td>" +
                                                      "<th colspan='1'>J: 1~78</th>" +
                                                      "<td colspan='1'>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.termoparJ + "</span></p>" +
                                                      "</td>" +
                                                      "<th colspan='1'>K:</th>" +
                                                      "<td colspan='1'>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.termoparK2 + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   
                                    tableBody = $("#termopar tbody");
                                    tableBody.html(termopar);
                                    
                                    var valveGate ="<tr>" +
                                                      "<th>BICO</th>" +
                                                      "<th>DLY TIME</th>" +
                                                      "<th>ACT TIME</th>" +
                                                      "<th>BICO</th>" +
                                                      "<th>DLY TIME</th>" +
                                                      "<th>ACT TIME</th>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG1</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG1DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG1ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                      
                                                      "<th>VG46</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG46DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG46ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG2</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG2DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG2ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG47</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG47DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG47ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG3</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG3DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG3ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG48</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG48DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG48ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG4</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG4DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG4ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG49</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG49DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG49ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG5</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG5DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG5ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG50</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG50DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG50ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG6</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG6DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG6ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG51</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG51DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG51ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG7</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG7DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG7ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG52</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG52DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG52ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG8</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG8DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG8ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG53</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG53DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG53ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG9</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG9DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG9ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG54</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG54DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG54ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG10</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG10DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG10ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG55</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG55DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG55ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG11</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG11DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG11ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG56</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG56DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG56ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG12</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG12DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG12ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG57</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG57DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG57ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG13</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG13DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG13ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG58</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG58DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG58ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG14</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG14DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG14ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG59</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG59DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG59ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG15</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG15DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG15ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG60</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG60DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG60ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG16</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG16DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG16ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG61</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG61DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG61ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG17</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG17DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG17ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG62</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG62DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG62ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG18</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG18DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG18ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG63</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG63DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG63ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG19</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG19DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG19ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG64</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG64DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG64ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG20</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG20DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG20ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG65</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG65DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG65ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG21</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG21DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG21ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG66</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG66DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG66ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG22</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG22DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG22ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG67</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG67DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG67ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG23</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG23DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG23ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG68</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG68DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG68ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG24</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG24DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG24ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                      
                                                      "<th>VG69</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG69DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG69ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG25</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG25DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG25ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG70</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG70DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG70ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG26</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG26DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG26ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG71</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG71DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG71ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG27</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG27DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG27ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG72</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG72DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG72ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG28</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG28DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG28ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG73</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG73DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG73ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG29</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG29DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG29ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG74</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG74DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG74ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG30</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG30DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG30ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG75</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG75DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG75ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG31</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG31DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG31ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG76</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG76DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG76ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG32</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG32DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG32ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG77</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG77DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG77ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG33</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG33DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG33ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG78</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG78DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG78ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG34</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG34DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG34ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG79</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG79DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG79ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG35</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG35DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG35ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG80</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG80DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG80ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG36</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG36DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG36ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG81</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG81DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG81ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG37</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG37DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG37ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG82</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG82DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG82ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG38</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG38DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG38ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG83</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG83DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG83ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG39</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG39DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG39ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG84</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG84DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG84ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG40</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG40DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG40ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG85</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG85DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG85ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                       
                                                   "<tr>" +
                                                      "<th>VG41</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG41DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG41ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG86</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG86DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG86ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG42</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG42DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG42ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG87</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG87DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG87ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG43</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG43DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG43ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG88</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG88DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG88ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG44</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG44DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG44ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG89</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG89DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG89ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>" +
                                                   "<tr>" +
                                                      "<th>VG45</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG45DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG45ACTTIME + "</span></p>" +
                                                      "</td>" +
                                       
                                                      "<th>VG90</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG90DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG90ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   
                                    tableBody = $("#valveGate tbody");
                                    tableBody.html(valveGate);
   
                                    var valveFoot = "<tr>" +
                                                      "<th colspan='1'>VOLTAGEM:</th>" +
                                                      "<td colspan='6'>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.voltagem + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
   
                                    tableFoot = $("#valveGateFoot");
                                    tableFoot.html(valveFoot);
                                    
                                    var refrigeracao = "<tr>" +
                                                         "<th colspan='3' style='text-align: center;'>LADO FIXO</th>" +
                                                         "<th rowspan='3' style='text-align: center;'>TOL<br> &#177;<br> 10%</th>" +
                                                         "<th colspan='3' style='text-align: center;'>LADO MÓVEL</th>" +
                                                      "</tr>" +
                                                      "<tr>" +
                                                         "<td colspan='3'>" +
                                                            "<p class='read-only'><span class='cadastrados'>" + perifericos.refrLadoFixo1 + "</span></p>" +
                                                         "</td>" +
                                                         "<td colspan='3'>" +
                                                            "<p class='read-only'><span class='cadastrados'>" + perifericos.refrLadoMovel1 + "</span></p>" +
                                                         "</td>" +
                                                      "</tr>" +
                                                      "<tr>" +
                                                         "<td colspan='3'>" +
                                                            "<p class='read-only'><span class='cadastrados'>" + perifericos.refrLadoFixo2 + "</span></p>" +
                                                         "</td>" +
                                                         "<td colspan='3'>" +
                                                            "<p class='read-only'><span class='cadastrados'>" + perifericos.refrLadoMovel2 + "</span></p>" +
                                                         "</td>" +
                                                      "</tr>"
   
                                    tableBody = $("#refrigeracao tbody");
                                    tableBody.html(refrigeracao);
                                    
                                    var vapor = "<tr>" +
                                                   "<th colspan='3' style='text-align: center;'>LADO FIXO</th>" +
                                                   "<th rowspan='3' style='text-align: center;'>TOL<br> &#177;<br> 10%</th>" +
                                                   "<th colspan='3' style='text-align: center;'>LADO MÓVEL</th>" +
                                                "</tr>" +
                                                "<tr>" +
                                                   "<td colspan='3'>" +
                                                      "<p class='read-only'><span class='cadastrados'>" + perifericos.vaporLadoFixo1 + "</span></p>" +
                                                   "</td>" +
                                                   "<td colspan='3'>" +
                                                      "<p class='read-only'><span class='cadastrados'>" + perifericos.vaporLadoFixo2 + "</span></p>" +
                                                   "</td>" +
                                                "</tr>" 
   
                                    tableBody = $("#vapor tbody");
                                    tableBody.html(vapor);
                              }
                           });
                        }
                     });
                  }
               });
            }
         })
      }, 3000);
   }
}