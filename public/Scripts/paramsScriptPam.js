$('#maquinas').change(function () {
   var anchor = '';

   if ($("#maquinas").val() !== "0") {
      anchor += "<h5>Escolha uma forma de visualização:</h5>" + 
      "<button style='margin-right: 5px' class='btn btn-info params' onclick='tipoVisualizacao(1)'>Visualização em lista</button>"
      + "<button class='btn btn-info params' onclick='tipoVisualizacao(2)'>Visualização em Ficha</button>"

      div = $("#nav");
      div.html(anchor);


   } else {
      $(".params").hide();
      
   }
});

$("#parametros").hide();
$("#ficha").hide();

var injetoresLimite = [];

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
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listacilindro1'>Clique para o gráfico</button></td>" +                 
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_1 </td>" +  
                                    "<td>" + injetor.cilindro1 + "</td>" +                   
                                    "<td>" + parametros.TEMPERATURA_ZONA_1 + "</td>" +   
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listacilindro1'>Clique para o gráfico</button></td>" +                 
                                    "</tr>"
                                 }

                                 if (injetor.cilindro2 !== 0 && (parametros.TEMPERATURA_ZONA_2 < (injetor.cilindro2 - (injetor.cilindro2 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_2 > (injetor.cilindro2 + (injetor.cilindro2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_2 </td>" +   
                                    "<td>" + injetor.cilindro2 + "</td>" +                    
                                    "<td>" + parametros.TEMPERATURA_ZONA_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listacilindro2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_2 </td>" +   
                                    "<td>" + injetor.cilindro2 + "</td>" +                    
                                    "<td>" + parametros.TEMPERATURA_ZONA_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listacilindro2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.cilindro3 !== 0 && (parametros.TEMPERATURA_ZONA_3 < (injetor.cilindro3 - (injetor.cilindro3 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_3 > (injetor.cilindro3 + (injetor.cilindro3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_3 </td>" +       
                                    "<td>" + injetor.cilindro3 + "</td>" +                
                                    "<td>" + parametros.TEMPERATURA_ZONA_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listacilindro3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_3 </td>" +       
                                    "<td>" + injetor.cilindro3 + "</td>" +                
                                    "<td>" + parametros.TEMPERATURA_ZONA_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listacilindro3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.cilindro4 !== 0 && (parametros.TEMPERATURA_ZONA_4 < (injetor.cilindro4 - (injetor.cilindro4 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_4 > (injetor.cilindro4 + (injetor.cilindro4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_4 </td>" +      
                                    "<td>" + injetor.cilindro4 + "</td>" +                 
                                    "<td>" + parametros.TEMPERATURA_ZONA_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listacilindro4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_4 </td>" +      
                                    "<td>" + injetor.cilindro4 + "</td>" +                 
                                    "<td>" + parametros.TEMPERATURA_ZONA_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listacilindro4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.cilindro5 !== 0 && (parametros.TEMPERATURA_ZONA_5 < (injetor.cilindro5 - (injetor.cilindro5 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_5 > (injetor.cilindro5 + (injetor.cilindro5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_5 </td>" +
                                    "<td>" + injetor.cilindro5 + "</td>" +                       
                                    "<td>" + parametros.TEMPERATURA_ZONA_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listacilindro5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_5 </td>" +
                                    "<td>" + injetor.cilindro5 + "</td>" +                       
                                    "<td>" + parametros.TEMPERATURA_ZONA_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listacilindro5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.cilindro6 !== 0 && (parametros.TEMPERATURA_ZONA_6 < (injetor.cilindro6 - (injetor.cilindro6 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_6 > (injetor.cilindro6 + (injetor.cilindro6 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_6 </td>" + 
                                    "<td>" + injetor.cilindro6 + "</td>" +                      
                                    "<td>" + parametros.TEMPERATURA_ZONA_6 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listacilindro6'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_6 </td>" + 
                                    "<td>" + injetor.cilindro6 + "</td>" +                      
                                    "<td>" + parametros.TEMPERATURA_ZONA_6 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listacilindro6'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.cilindro7 !== 0 && (parametros.TEMPERATURA_ZONA_7 < (injetor.cilindro7 - (injetor.cilindro7 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_7 > (injetor.cilindro7 + (injetor.cilindro7 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_7 </td>" +  
                                    "<td>" + injetor.cilindro7 + "</td>" +                     
                                    "<td>" + parametros.TEMPERATURA_ZONA_7 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listacilindro7'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> TEMPERATURA_ZONA_7 </td>" +  
                                    "<td>" + injetor.cilindro7 + "</td>" +                     
                                    "<td>" + parametros.TEMPERATURA_ZONA_7 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listacilindro7'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.posInjecao1 !== 0 && (parametros.INJECAO_POSICAO_1 < (injetor.posInjecao1 - (injetor.posInjecao1 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_1 > (injetor.posInjecao1 + (injetor.posInjecao1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_1 </td>" +   
                                    "<td>" + injetor.posInjecao1 + "</td>" +                    
                                    "<td>" + parametros.INJECAO_POSICAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposInjecao1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_1 </td>" +   
                                    "<td>" + injetor.posInjecao1 + "</td>" +                    
                                    "<td>" + parametros.INJECAO_POSICAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposInjecao1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }
                                 
                                 if (injetor.posInjecao2 !== 0 && (parametros.INJECAO_POSICAO_2 < (injetor.posInjecao2 - (injetor.posInjecao2 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_2 > (injetor.posInjecao2 + (injetor.posInjecao2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_2 </td>" +     
                                    "<td>" + injetor.posInjecao2 + "</td>" +               
                                    "<td>" + parametros.INJECAO_POSICAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposInjecao2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_2 </td>" +     
                                    "<td>" + injetor.posInjecao2 + "</td>" +               
                                    "<td>" + parametros.INJECAO_POSICAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposInjecao2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }
                                 
                                 if (injetor.posInjecao3 !== 0 && (parametros.INJECAO_POSICAO_3 < (injetor.posInjecao3 - (injetor.posInjecao3 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_3 > (injetor.posInjecao3 + (injetor.posInjecao3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_3 </td>" +        
                                    "<td>" + injetor.posInjecao3 + "</td>" +             
                                    "<td>" + parametros.INJECAO_POSICAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposInjecao3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_3 </td>" +        
                                    "<td>" + injetor.posInjecao3 + "</td>" +             
                                    "<td>" + parametros.INJECAO_POSICAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposInjecao3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }
                                 
                                 if (injetor.posInjecao4 !== 0 && (parametros.INJECAO_POSICAO_4 < (injetor.posInjecao4 - (injetor.posInjecao4 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_4 > (injetor.posInjecao4 + (injetor.posInjecao4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_4 </td>" + 
                                    "<td>" + injetor.posInjecao4 + "</td>" +                   
                                    "<td>" + parametros.INJECAO_POSICAO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposInjecao4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_4 </td>" + 
                                    "<td>" + injetor.posInjecao4 + "</td>" +                   
                                    "<td>" + parametros.INJECAO_POSICAO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposInjecao4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.posInjecao5 !== 0 && (parametros.INJECAO_POSICAO_5 < (injetor.posInjecao5 - (injetor.posInjecao5 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_5 > (injetor.posInjecao5 + (injetor.posInjecao5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_5 </td>" +   
                                    "<td>" + injetor.posInjecao5 + "</td>" +                 
                                    "<td>" + parametros.INJECAO_POSICAO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposInjecao5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_POSICAO_5 </td>" +   
                                    "<td>" + injetor.posInjecao5 + "</td>" +                 
                                    "<td>" + parametros.INJECAO_POSICAO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposInjecao5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presInjecao1 !== 0 && (parametros.INJECAO_PRESSAO_1 < (injetor.presInjecao1 - (injetor.presInjecao1 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_1 > (injetor.presInjecao1 + (injetor.presInjecao1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_1 </td>" +        
                                    "<td>" + injetor.presInjecao1 + "</td>" +           
                                    "<td>" + parametros.INJECAO_PRESSAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresInjecao1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_1 </td>" +        
                                    "<td>" + injetor.presInjecao1 + "</td>" +           
                                    "<td>" + parametros.INJECAO_PRESSAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresInjecao1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presInjecao2 !== 0 && (parametros.INJECAO_PRESSAO_2 < (injetor.presInjecao2 - (injetor.presInjecao2 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_2 > (injetor.presInjecao2 + (injetor.presInjecao2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_2 </td>" +        
                                    "<td>" + injetor.presInjecao2 + "</td>" +            
                                    "<td>" + parametros.INJECAO_PRESSAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresInjecao2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_2 </td>" +        
                                    "<td>" + injetor.presInjecao2 + "</td>" +            
                                    "<td>" + parametros.INJECAO_PRESSAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresInjecao2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presInjecao3 !== 0 && (parametros.INJECAO_PRESSAO_3 < (injetor.presInjecao3 - (injetor.presInjecao3 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_3 > (injetor.presInjecao3 + (injetor.presInjecao3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_3 </td>" +       
                                    "<td>" + injetor.presInjecao3 + "</td>" +            
                                    "<td>" + parametros.INJECAO_PRESSAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresInjecao3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_3 </td>" +       
                                    "<td>" + injetor.presInjecao3 + "</td>" +            
                                    "<td>" + parametros.INJECAO_PRESSAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresInjecao3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presInjecao4 !== 0 && (parametros.INJECAO_PRESSAO_4 < (injetor.presInjecao4 - (injetor.presInjecao4 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_4 > (injetor.presInjecao4 + (injetor.presInjecao4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_4 </td>" + 
                                    "<td>" + injetor.presInjecao4 + "</td>" +                  
                                    "<td>" + parametros.INJECAO_PRESSAO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresInjecao4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_4 </td>" + 
                                    "<td>" + injetor.presInjecao4 + "</td>" +                  
                                    "<td>" + parametros.INJECAO_PRESSAO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresInjecao4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presInjecao5 !== 0 && (parametros.INJECAO_PRESSAO_5 < (injetor.presInjecao5 - (injetor.presInjecao5 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_5 > (injetor.presInjecao5 + (injetor.presInjecao5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_5 </td>" +   
                                    "<td>" + injetor.presInjecao5 + "</td>" +                 
                                    "<td>" + parametros.INJECAO_PRESSAO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresInjecao5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_PRESSAO_5 </td>" +   
                                    "<td>" + injetor.presInjecao5 + "</td>" +                 
                                    "<td>" + parametros.INJECAO_PRESSAO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresInjecao5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoInjecao1 !== 0 && (parametros.INJECAO_FLUXO_1 < (injetor.fluxoInjecao1 - (injetor.fluxoInjecao1 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_1 > (injetor.fluxoInjecao1 + (injetor.fluxoInjecao1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_1 </td>" +       
                                    "<td>" + injetor.fluxoInjecao1 + "</td>" +             
                                    "<td>" + parametros.INJECAO_FLUXO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoInjecao1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_1 </td>" +       
                                    "<td>" + injetor.fluxoInjecao1 + "</td>" +             
                                    "<td>" + parametros.INJECAO_FLUXO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoInjecao1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoInjecao2 !== 0 && (parametros.INJECAO_FLUXO_2 < (injetor.fluxoInjecao2 - (injetor.fluxoInjecao2 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_2 > (injetor.fluxoInjecao2 + (injetor.fluxoInjecao2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_2 </td>" +   
                                    "<td>" + injetor.fluxoInjecao2 + "</td>" +                 
                                    "<td>" + parametros.INJECAO_FLUXO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoInjecao2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_2 </td>" +   
                                    "<td>" + injetor.fluxoInjecao2 + "</td>" +                 
                                    "<td>" + parametros.INJECAO_FLUXO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoInjecao2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoInjecao3 !== 0 && (parametros.INJECAO_FLUXO_3 < (injetor.fluxoInjecao3 - (injetor.fluxoInjecao3 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_3 > (injetor.fluxoInjecao3 + (injetor.fluxoInjecao3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_3 </td>" +     
                                    "<td>" + injetor.fluxoInjecao3 + "</td>" +              
                                    "<td>" + parametros.INJECAO_FLUXO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoInjecao3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_3 </td>" +     
                                    "<td>" + injetor.fluxoInjecao3 + "</td>" +              
                                    "<td>" + parametros.INJECAO_FLUXO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoInjecao3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoInjecao4 !== 0 && (parametros.INJECAO_FLUXO_4 < (injetor.fluxoInjecao4 - (injetor.fluxoInjecao4 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_4 > (injetor.fluxoInjecao4 + (injetor.fluxoInjecao4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_4 </td>" +       
                                    "<td>" + injetor.fluxoInjecao4 + "</td>" +             
                                    "<td>" + parametros.INJECAO_FLUXO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoInjecao4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_4 </td>" +       
                                    "<td>" + injetor.fluxoInjecao4 + "</td>" +             
                                    "<td>" + parametros.INJECAO_FLUXO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoInjecao4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoInjecao5 !== 0 && (parametros.INJECAO_FLUXO_5 < (injetor.fluxoInjecao5 - (injetor.fluxoInjecao5 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_5 > (injetor.fluxoInjecao5 + (injetor.fluxoInjecao5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_5 </td>" +     
                                    "<td>" + injetor.fluxoInjecao5 + "</td>" +               
                                    "<td>" + parametros.INJECAO_FLUXO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoInjecao5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> INJECAO_FLUXO_5 </td>" +     
                                    "<td>" + injetor.fluxoInjecao5 + "</td>" +               
                                    "<td>" + parametros.INJECAO_FLUXO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoInjecao5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presRecalque1 !== 0 && (parametros.RECALQUE_PRESSAO_1 < (injetor.presRecalque1 - (injetor.presRecalque1 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_1 > (injetor.presRecalque1 + (injetor.presRecalque1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_1 </td>" +     
                                    "<td>" + injetor.presRecalque1 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecalque1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_1 </td>" +     
                                    "<td>" + injetor.presRecalque1 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecalque1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presRecalque2 !== 0 && (parametros.RECALQUE_PRESSAO_2 < (injetor.presRecalque2 - (injetor.presRecalque2 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_2 > (injetor.presRecalque2 + (injetor.presRecalque2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_2 </td>" +     
                                    "<td>" + injetor.presRecalque2 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecalque2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_2 </td>" +     
                                    "<td>" + injetor.presRecalque2 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecalque2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }
                                 
                                 if (injetor.presRecalque3 !== 0 && (parametros.RECALQUE_PRESSAO_3 < (injetor.presRecalque3 - (injetor.presRecalque3 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_3 > (injetor.presRecalque3 + (injetor.presRecalque3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_3 </td>" +     
                                    "<td>" + injetor.presRecalque3 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecalque3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_3 </td>" +     
                                    "<td>" + injetor.presRecalque3 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecalque3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presRecalque4 !== 0 && (parametros.RECALQUE_PRESSAO_4 < (injetor.presRecalque4 - (injetor.presRecalque4 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_4 > (injetor.presRecalque4 + (injetor.presRecalque4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_4 </td>" +     
                                    "<td>" + injetor.presRecalque4 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecalque4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_4 </td>" +     
                                    "<td>" + injetor.presRecalque4 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecalque4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }
                                 
                                 if (injetor.presRecalque5 !== 0 && (parametros.RECALQUE_PRESSAO_5 < (injetor.presRecalque5 - (injetor.presRecalque5 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_5 > (injetor.presRecalque5 + (injetor.presRecalque5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_5 </td>" +     
                                    "<td>" + injetor.presRecalque5 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecalque5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_PRESSAO_5 </td>" +     
                                    "<td>" + injetor.presRecalque5 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_PRESSAO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecalque5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoRecalque1 !== 0 && (parametros.RECALQUE_FLUXO_1 < (injetor.fluxoRecalque1 - (injetor.fluxoRecalque1 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_1 > (injetor.fluxoRecalque1 + (injetor.fluxoRecalque1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_1 </td>" +  
                                    "<td>" + injetor.fluxoRecalque1 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecalque1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_1 </td>" +  
                                    "<td>" + injetor.fluxoRecalque1 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecalque1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }
                                 
                                 if (injetor.fluxoRecalque2 !== 0 && (parametros.RECALQUE_FLUXO_2 < (injetor.fluxoRecalque2 - (injetor.fluxoRecalque2 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_2 > (injetor.fluxoRecalque2 + (injetor.fluxoRecalque2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_2 </td>" +  
                                    "<td>" + injetor.fluxoRecalque2 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecalque2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_2 </td>" +  
                                    "<td>" + injetor.fluxoRecalque2 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecalque2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }
                                 
                                 if (injetor.fluxoRecalque3 !== 0 && (parametros.RECALQUE_FLUXO_3 < (injetor.fluxoRecalque3 - (injetor.fluxoRecalque3 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_3 > (injetor.fluxoRecalque3 + (injetor.fluxoRecalque3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_3 </td>" +  
                                    "<td>" + injetor.fluxoRecalque3 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecalque3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_3 </td>" +  
                                    "<td>" + injetor.fluxoRecalque3 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecalque3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoRecalque4 !== 0 && (parametros.RECALQUE_FLUXO_4 < (injetor.fluxoRecalque4 - (injetor.fluxoRecalque4 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_4 > (injetor.fluxoRecalque4 + (injetor.fluxoRecalque4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_4 </td>" +  
                                    "<td>" + injetor.fluxoRecalque4 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecalque4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_4 </td>" +  
                                    "<td>" + injetor.fluxoRecalque4 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecalque4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoRecalque5 !== 0 && (parametros.RECALQUE_FLUXO_5 < (injetor.fluxoRecalque5 - (injetor.fluxoRecalque5 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_5 > (injetor.fluxoRecalque5 + (injetor.fluxoRecalque5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_5 </td>" +  
                                    "<td>" + injetor.fluxoRecalque5 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecalque5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_FLUXO_5 </td>" +  
                                    "<td>" + injetor.fluxoRecalque5 + "</td>" +                  
                                    "<td>" + parametros.RECALQUE_FLUXO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecalque5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.tempoRecalque1 !== 0 && (parametros.RECALQUE_TEMPO_1 < (injetor.tempoRecalque1 - (injetor.tempoRecalque1 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_1 > (injetor.tempoRecalque1 + (injetor.tempoRecalque1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_1 </td>" +    
                                    "<td>" + injetor.tempoRecalque1 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listatempoRecalque1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_1 </td>" +    
                                    "<td>" + injetor.tempoRecalque1 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listatempoRecalque1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.tempoRecalque2 !== 0 && (parametros.RECALQUE_TEMPO_2 < (injetor.tempoRecalque2 - (injetor.tempoRecalque2 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_2 > (injetor.tempoRecalque2 + (injetor.tempoRecalque2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_2 </td>" +    
                                    "<td>" + injetor.tempoRecalque2 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listatempoRecalque2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_2 </td>" +    
                                    "<td>" + injetor.tempoRecalque2 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listatempoRecalque2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.tempoRecalque3 !== 0 && (parametros.RECALQUE_TEMPO_3 < (injetor.tempoRecalque3 - (injetor.tempoRecalque3 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_3 > (injetor.tempoRecalque3 + (injetor.tempoRecalque3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_3 </td>" +    
                                    "<td>" + injetor.tempoRecalque3 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listatempoRecalque3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_3 </td>" +    
                                    "<td>" + injetor.tempoRecalque3 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listatempoRecalque3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.tempoRecalque4 !== 0 && (parametros.RECALQUE_TEMPO_4 < (injetor.tempoRecalque4 - (injetor.tempoRecalque4 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_4 > (injetor.tempoRecalque4 + (injetor.tempoRecalque4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_4 </td>" +    
                                    "<td>" + injetor.tempoRecalque4 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listatempoRecalque4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_4 </td>" +    
                                    "<td>" + injetor.tempoRecalque4 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listatempoRecalque4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.tempoRecalque5 !== 0 && (parametros.RECALQUE_TEMPO_5 < (injetor.tempoRecalque5 - (injetor.tempoRecalque5 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_5 > (injetor.tempoRecalque5 + (injetor.tempoRecalque5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_5 </td>" +    
                                    "<td>" + injetor.tempoRecalque5 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listatempoRecalque5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> RECALQUE_TEMPO_5 </td>" +    
                                    "<td>" + injetor.tempoRecalque5 + "</td>" +               
                                    "<td>" + parametros.RECALQUE_TEMPO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listatempoRecalque5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.partDosagem1 !== 0 && (parametros.DOSAGEM_PARTIDA_1 < (injetor.partDosagem1 - (injetor.partDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_1 > (injetor.partDosagem1 + (injetor.partDosagem1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_1 </td>" +      
                                    "<td>" + injetor.partDosagem1 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapartDosagem1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_1 </td>" +      
                                    "<td>" + injetor.partDosagem1 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapartDosagem1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.partDosagem2 !== 0 && (parametros.DOSAGEM_PARTIDA_2 < (injetor.partDosagem2 - (injetor.partDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_2 > (injetor.partDosagem2 + (injetor.partDosagem2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_2 </td>" +      
                                    "<td>" + injetor.partDosagem2 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapartDosagem2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_2 </td>" +      
                                    "<td>" + injetor.partDosagem2 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapartDosagem2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.partDosagem3 !== 0 && (parametros.DOSAGEM_PARTIDA_3 < (injetor.partDosagem3 - (injetor.partDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_3 > (injetor.partDosagem3 + (injetor.partDosagem3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_3 </td>" +      
                                    "<td>" + injetor.partDosagem3 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapartDosagem3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_3 </td>" +      
                                    "<td>" + injetor.partDosagem3 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapartDosagem3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.partDosagem4 !== 0 && (parametros.DOSAGEM_PARTIDA_4 < (injetor.partDosagem4 - (injetor.partDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_4 > (injetor.partDosagem4 + (injetor.partDosagem4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_4 </td>" +      
                                    "<td>" + injetor.partDosagem4 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapartDosagem4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_4 </td>" +      
                                    "<td>" + injetor.partDosagem4 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapartDosagem4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.partDosagem5 !== 0 && (parametros.DOSAGEM_PARTIDA_5 < (injetor.partDosagem5 - (injetor.partDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_5 > (injetor.partDosagem5 + (injetor.partDosagem5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_5 </td>" +      
                                    "<td>" + injetor.partDosagem5 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapartDosagem5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PARTIDA_5 </td>" +      
                                    "<td>" + injetor.partDosagem5 + "</td>" +             
                                    "<td>" + parametros.DOSAGEM_PARTIDA_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapartDosagem5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presDosagem1 !== 0 && (parametros.DOSAGEM_PRESSAO_1 < (injetor.presDosagem1 - (injetor.presDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_1 > (injetor.presDosagem1 + (injetor.presDosagem1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_1 </td>" +      
                                    "<td>" + injetor.presDosagem1 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresDosagem1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_1 </td>" +      
                                    "<td>" + injetor.presDosagem1 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresDosagem1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presDosagem2 !== 0 && (parametros.DOSAGEM_PRESSAO_2 < (injetor.presDosagem2 - (injetor.presDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_2 > (injetor.presDosagem2 + (injetor.presDosagem2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_2 </td>" +      
                                    "<td>" + injetor.presDosagem2 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresDosagem2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_2 </td>" +      
                                    "<td>" + injetor.presDosagem2 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresDosagem2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presDosagem3 !== 0 && (parametros.DOSAGEM_PRESSAO_3 < (injetor.presDosagem3 - (injetor.presDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_3 > (injetor.presDosagem3 + (injetor.presDosagem3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_3 </td>" +      
                                    "<td>" + injetor.presDosagem3 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresDosagem3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_3 </td>" +      
                                    "<td>" + injetor.presDosagem3 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresDosagem3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presDosagem4 !== 0 && (parametros.DOSAGEM_PRESSAO_4 < (injetor.presDosagem4 - (injetor.presDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_4 > (injetor.presDosagem4 + (injetor.presDosagem4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_4 </td>" +      
                                    "<td>" + injetor.presDosagem4 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresDosagem4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_4 </td>" +      
                                    "<td>" + injetor.presDosagem4 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresDosagem4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presDosagem5 !== 0 && (parametros.DOSAGEM_PRESSAO_5 < (injetor.presDosagem5 - (injetor.presDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_5 > (injetor.presDosagem5 + (injetor.presDosagem5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_5 </td>" +      
                                    "<td>" + injetor.presDosagem5 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresDosagem5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_PRESSAO_5 </td>" +      
                                    "<td>" + injetor.presDosagem5 + "</td>" +              
                                    "<td>" + parametros.DOSAGEM_PRESSAO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresDosagem5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoDosagem1 !== 0 && (parametros.DOSAGEM_FLUXO_1 < (injetor.fluxoDosagem1 - (injetor.fluxoDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_1 > (injetor.fluxoDosagem1 + (injetor.fluxoDosagem1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_1 </td>" +    
                                    "<td>" + injetor.fluxoDosagem1 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoDosagem1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_1 </td>" +    
                                    "<td>" + injetor.fluxoDosagem1 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoDosagem1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoDosagem2 !== 0 && (parametros.DOSAGEM_FLUXO_2 < (injetor.fluxoDosagem2 - (injetor.fluxoDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_2 > (injetor.fluxoDosagem2 + (injetor.fluxoDosagem2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_2 </td>" +    
                                    "<td>" + injetor.fluxoDosagem2 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoDosagem2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_2 </td>" +    
                                    "<td>" + injetor.fluxoDosagem2 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoDosagem2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoDosagem3 !== 0 && (parametros.DOSAGEM_FLUXO_3 < (injetor.fluxoDosagem3 - (injetor.fluxoDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_3 > (injetor.fluxoDosagem3 + (injetor.fluxoDosagem3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_3 </td>" +    
                                    "<td>" + injetor.fluxoDosagem3 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoDosagem3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_3 </td>" +    
                                    "<td>" + injetor.fluxoDosagem3 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoDosagem3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoDosagem4 !== 0 && (parametros.DOSAGEM_FLUXO_4 < (injetor.fluxoDosagem4 - (injetor.fluxoDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_4 > (injetor.fluxoDosagem4 + (injetor.fluxoDosagem4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_4 </td>" +    
                                    "<td>" + injetor.fluxoDosagem4 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoDosagem4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_4 </td>" +    
                                    "<td>" + injetor.fluxoDosagem4 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoDosagem4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoDosagem5 !== 0 && (parametros.DOSAGEM_FLUXO_5 < (injetor.fluxoDosagem5 - (injetor.fluxoDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_5 > (injetor.fluxoDosagem5 + (injetor.fluxoDosagem5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_5 </td>" +    
                                    "<td>" + injetor.fluxoDosagem5 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoDosagem5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_FLUXO_5 </td>" +    
                                    "<td>" + injetor.fluxoDosagem5 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_FLUXO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoDosagem5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.CPDosagem1 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_1 < (injetor.CPDosagem1 - (injetor.CPDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_1 > (injetor.CPDosagem1 + (injetor.CPDosagem1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_1 </td>" +   
                                    "<td>" + injetor.CPDosagem1 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaCPDosagem1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_1 </td>" +   
                                    "<td>" + injetor.CPDosagem1 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaCPDosagem1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.CPDosagem2 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_2 < (injetor.CPDosagem2 - (injetor.CPDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_2 > (injetor.CPDosagem2 + (injetor.CPDosagem2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_2 </td>" +   
                                    "<td>" + injetor.CPDosagem2 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaCPDosagem2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_2 </td>" +   
                                    "<td>" + injetor.CPDosagem2 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaCPDosagem2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.CPDosagem3 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_3 < (injetor.CPDosagem3 - (injetor.CPDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_3 > (injetor.CPDosagem3 + (injetor.CPDosagem3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_3 </td>" +   
                                    "<td>" + injetor.CPDosagem3 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaCPDosagem3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_3 </td>" +   
                                    "<td>" + injetor.CPDosagem3 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaCPDosagem3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.CPDosagem4 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_4 < (injetor.CPDosagem4 - (injetor.CPDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_4 > (injetor.CPDosagem4 + (injetor.CPDosagem4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_4 </td>" +   
                                    "<td>" + injetor.CPDosagem4 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaCPDosagem4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_4 </td>" +   
                                    "<td>" + injetor.CPDosagem4 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaCPDosagem4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.CPDosagem5 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_5 < (injetor.CPDosagem5 - (injetor.CPDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_5 > (injetor.CPDosagem5 + (injetor.CPDosagem5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_5 </td>" +   
                                    "<td>" + injetor.CPDosagem5 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaCPDosagem5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> DOSAGEM_CONTRAPRESSAO_5 </td>" +   
                                    "<td>" + injetor.CPDosagem5 + "</td>" +                
                                    "<td>" + parametros.DOSAGEM_CONTRAPRESSAO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaCPDosagem5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.posFecha1 !== 0 && (parametros.FECHAMENTO_POSICAO_1 < (injetor.posFecha1 - (injetor.posFecha1 * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_1 > (injetor.posFecha1 + (injetor.posFecha1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_1 </td>" +       
                                    "<td>" + injetor.posFecha1 + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposFecha1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_1 </td>" +       
                                    "<td>" + injetor.posFecha1 + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposFecha1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.posFecha2 !== 0 && (parametros.FECHAMENTO_POSICAO_2 < (injetor.posFecha2 - (injetor.posFecha2 * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_2 > (injetor.posFecha2 + (injetor.posFecha2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_2 </td>" +       
                                    "<td>" + injetor.posFecha2 + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposFecha2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_2 </td>" +       
                                    "<td>" + injetor.posFecha2 + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposFecha2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.posFecha3 !== 0 && (parametros.FECHAMENTO_POSICAO_3 < (injetor.posFecha3 - (injetor.posFecha3 * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_3 > (injetor.posFecha3 + (injetor.posFecha3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_3 </td>" +       
                                    "<td>" + injetor.posFecha3 + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposFecha3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_3 </td>" +       
                                    "<td>" + injetor.posFecha3 + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposFecha3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.tempoProtMolde !== 0 && (parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE < (injetor.tempoProtMolde - (injetor.tempoProtMolde * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE > (injetor.tempoProtMolde + (injetor.tempoProtMolde * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_PROTECAO_MOLDE </td>" +    
                                    "<td>" + injetor.tempoProtMolde + "</td>" +         
                                    "<td>" + parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listatempoProtMolde'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_PROTECAO_MOLDE </td>" +    
                                    "<td>" + injetor.tempoProtMolde + "</td>" +         
                                    "<td>" + parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listatempoProtMolde'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.AltaPresPos !== 0 && (parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO < (injetor.AltaPresPos - (injetor.AltaPresPos * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO > (injetor.AltaPresPos + (injetor.AltaPresPos * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_ALTA_PRESSAO </td>" +      
                                    "<td>" + injetor.AltaPresPos + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaAltaPresPos'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_ALTA_PRESSAO </td>" +      
                                    "<td>" + injetor.AltaPresPos + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaAltaPresPos'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presFecha1 !== 0 && (parametros.FECHAMENTO_PRESSAO_1 < (injetor.presFecha1 - (injetor.presFecha1 * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_1 > (injetor.presFecha1 + (injetor.presFecha1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_1 </td>" +     
                                    "<td>" + injetor.presFecha1 + "</td>" +                
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresFecha1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_1 </td>" +     
                                    "<td>" + injetor.presFecha1 + "</td>" +                
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresFecha1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presFecha2 !== 0 && (parametros.FECHAMENTO_PRESSAO_2 < (injetor.presFecha2 - (injetor.presFecha2 * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_2 > (injetor.presFecha2 + (injetor.presFecha2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_2 </td>" +     
                                    "<td>" + injetor.presFecha2 + "</td>" +                
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresFecha2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_2 </td>" +     
                                    "<td>" + injetor.presFecha2 + "</td>" +                
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresFecha2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presFecha3 !== 0 && (parametros.FECHAMENTO_PRESSAO_3 < (injetor.presFecha3 - (injetor.presFecha3 * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_3 > (injetor.presFecha3 + (injetor.presFecha3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_3 </td>" +     
                                    "<td>" + injetor.presFecha3 + "</td>" +                
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresFecha3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_3 </td>" +     
                                    "<td>" + injetor.presFecha3 + "</td>" +                
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresFecha3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.protMPres !== 0 && (parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE < (injetor.protMPres - (injetor.protMPres * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE > (injetor.protMPres + (injetor.protMPres * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_PROTECAO_MOLDE </td>" +  
                                    "<td>" + injetor.protMPres + "</td>" +                  
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaprotMPres'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_PRESSAO_PROTECAO_MOLDE </td>" +  
                                    "<td>" + injetor.protMPres + "</td>" +                  
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaprotMPres'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.AltaPresPres !== 0 && (parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO < (injetor.AltaPresPres - (injetor.AltaPresPres * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO > (injetor.AltaPresPres + (injetor.AltaPresPres * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_ALTA_PRESSAO </td>" +   
                                    "<td>" + injetor.AltaPresPres + "</td>" +                  
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaAltaPresPres'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_POSICAO_ALTA_PRESSAO </td>" +   
                                    "<td>" + injetor.AltaPresPres + "</td>" +                  
                                    "<td>" + parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaAltaPresPres'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoFecha1 !== 0 && (parametros.FECHAMENTO_FLUXO_1 < (injetor.fluxoFecha1 - (injetor.fluxoFecha1 * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_1 > (injetor.fluxoFecha1 + (injetor.fluxoFecha1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_1 </td>" +     
                                    "<td>" + injetor.fluxoFecha1 + "</td>" +               
                                    "<td>" + parametros.FECHAMENTO_FLUXO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoFecha1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_1 </td>" +     
                                    "<td>" + injetor.fluxoFecha1 + "</td>" +               
                                    "<td>" + parametros.FECHAMENTO_FLUXO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoFecha1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoFecha2 !== 0 && (parametros.FECHAMENTO_FLUXO_2 < (injetor.fluxoFecha2 - (injetor.fluxoFecha2 * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_2 > (injetor.fluxoFecha2 + (injetor.fluxoFecha2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_2 </td>" +     
                                    "<td>" + injetor.fluxoFecha2 + "</td>" +               
                                    "<td>" + parametros.FECHAMENTO_FLUXO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoFecha2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_2 </td>" +     
                                    "<td>" + injetor.fluxoFecha2 + "</td>" +               
                                    "<td>" + parametros.FECHAMENTO_FLUXO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoFecha2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoFecha3 !== 0 && (parametros.FECHAMENTO_FLUXO_3 < (injetor.fluxoFecha3 - (injetor.fluxoFecha3 * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_3 > (injetor.fluxoFecha3 + (injetor.fluxoFecha3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_3 </td>" +     
                                    "<td>" + injetor.fluxoFecha3 + "</td>" +               
                                    "<td>" + parametros.FECHAMENTO_FLUXO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoFecha3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_3 </td>" +     
                                    "<td>" + injetor.fluxoFecha3 + "</td>" +               
                                    "<td>" + parametros.FECHAMENTO_FLUXO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoFecha3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.protMFluxo !== 0 && (parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE < (injetor.protMFluxo - (injetor.protMFluxo * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE > (injetor.protMFluxo + (injetor.protMFluxo * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_PROTECAO_MOLDE </td>" + 
                                    "<td>" + injetor.protMFluxo + "</td>" +                    
                                    "<td>" + parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaprotMFluxo'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_PROTECAO_MOLDE </td>" + 
                                    "<td>" + injetor.protMFluxo + "</td>" +                    
                                    "<td>" + parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaprotMFluxo'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.AltaPresFluxo !== 0 && (parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO < (injetor.AltaPresFluxo - (injetor.AltaPresFluxo * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO > (injetor.AltaPresFluxo + (injetor.AltaPresFluxo * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_ALTA_PRESSAO </td>" +      
                                    "<td>" + injetor.AltaPresFluxo + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaAltaPresFluxo'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> FECHAMENTO_FLUXO_ALTA_PRESSAO </td>" +      
                                    "<td>" + injetor.AltaPresFluxo + "</td>" +              
                                    "<td>" + parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaAltaPresFluxo'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.posAbertura1 !== 0 && (parametros.ABERTURA_POSICAO_1 < (injetor.posAbertura1 - (injetor.posAbertura1 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_1 > (injetor.posAbertura1 + (injetor.posAbertura1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_1 </td>" +    
                                    "<td>" + injetor.posAbertura1 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAbertura1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_1 </td>" +    
                                    "<td>" + injetor.posAbertura1 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAbertura1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.posAbertura2 !== 0 && (parametros.ABERTURA_POSICAO_2 < (injetor.posAbertura2 - (injetor.posAbertura2 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_2 > (injetor.posAbertura2 + (injetor.posAbertura2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_2 </td>" +    
                                    "<td>" + injetor.posAbertura2 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAbertura2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_2 </td>" +    
                                    "<td>" + injetor.posAbertura2 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAbertura2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.posAbertura3 !== 0 && (parametros.ABERTURA_POSICAO_3 < (injetor.posAbertura3 - (injetor.posAbertura3 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_3 > (injetor.posAbertura3 + (injetor.posAbertura3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_3 </td>" +    
                                    "<td>" + injetor.posAbertura3 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAbertura3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_3 </td>" +    
                                    "<td>" + injetor.posAbertura3 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAbertura3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.posAbertura4 !== 0 && (parametros.ABERTURA_POSICAO_4 < (injetor.posAbertura4 - (injetor.posAbertura4 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_4 > (injetor.posAbertura4 + (injetor.posAbertura4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_4 </td>" +    
                                    "<td>" + injetor.posAbertura4 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAbertura4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_4 </td>" +    
                                    "<td>" + injetor.posAbertura4 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAbertura4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }
                                 
                                 if (injetor.posAbertura5 !== 0 && (parametros.ABERTURA_POSICAO_5 < (injetor.posAbertura5 - (injetor.posAbertura5 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_5 > (injetor.posAbertura5 + (injetor.posAbertura5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_5 </td>" +    
                                    "<td>" + injetor.posAbertura5 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAbertura5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_POSICAO_5 </td>" +    
                                    "<td>" + injetor.posAbertura5 + "</td>" +                  
                                    "<td>" + parametros.ABERTURA_POSICAO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAbertura5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presAbertura1 !== 0 && (parametros.ABERTURA_PRESSAO_1 < (injetor.presAbertura1 - (injetor.presAbertura1 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_1 > (injetor.presAbertura1 + (injetor.presAbertura1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_1 </td>" +     
                                    "<td>" + injetor.presAbertura1 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAbertura1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_1 </td>" +     
                                    "<td>" + injetor.presAbertura1 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAbertura1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presAbertura2 !== 0 && (parametros.ABERTURA_PRESSAO_2 < (injetor.presAbertura2 - (injetor.presAbertura2 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_2 > (injetor.presAbertura2 + (injetor.presAbertura2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_2 </td>" +     
                                    "<td>" + injetor.presAbertura2 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAbertura2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_2 </td>" +     
                                    "<td>" + injetor.presAbertura2 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAbertura2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presAbertura3 !== 0 && (parametros.ABERTURA_PRESSAO_3 < (injetor.presAbertura3 - (injetor.presAbertura3 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_3 > (injetor.presAbertura3 + (injetor.presAbertura3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_3 </td>" +     
                                    "<td>" + injetor.presAbertura3 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAbertura3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_3 </td>" +     
                                    "<td>" + injetor.presAbertura3 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAbertura3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presAbertura4 !== 0 && (parametros.ABERTURA_PRESSAO_4 < (injetor.presAbertura4 - (injetor.presAbertura4 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_4 > (injetor.presAbertura4 + (injetor.presAbertura4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_4 </td>" +     
                                    "<td>" + injetor.presAbertura4 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAbertura4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_4 </td>" +     
                                    "<td>" + injetor.presAbertura4 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAbertura4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }


                                 if (injetor.presAbertura5 !== 0 && (parametros.ABERTURA_PRESSAO_5 < (injetor.presAbertura5 - (injetor.presAbertura5 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_5 > (injetor.presAbertura5 + (injetor.presAbertura5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_5 </td>" +     
                                    "<td>" + injetor.presAbertura5 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAbertura5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_PRESSAO_5 </td>" +     
                                    "<td>" + injetor.presAbertura5 + "</td>" +               
                                    "<td>" + parametros.ABERTURA_PRESSAO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAbertura5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }


                                 if (injetor.fluxoAbertura1 !== 0 && (parametros.ABERTURA_FLUXO_1 < (injetor.fluxoAbertura1 - (injetor.fluxoAbertura1 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_1 > (injetor.fluxoAbertura1 + (injetor.fluxoAbertura1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_1 </td>" +   
                                    "<td>" + injetor.fluxoAbertura1 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAbertura1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_1 </td>" +   
                                    "<td>" + injetor.fluxoAbertura1 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAbertura1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoAbertura2 !== 0 && (parametros.ABERTURA_FLUXO_2 < (injetor.fluxoAbertura2 - (injetor.fluxoAbertura2 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_2 > (injetor.fluxoAbertura2 + (injetor.fluxoAbertura2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_2 </td>" +   
                                    "<td>" + injetor.fluxoAbertura2 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAbertura2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_2 </td>" +   
                                    "<td>" + injetor.fluxoAbertura2 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAbertura2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoAbertura3 !== 0 && (parametros.ABERTURA_FLUXO_3 < (injetor.fluxoAbertura3 - (injetor.fluxoAbertura3 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_3 > (injetor.fluxoAbertura3 + (injetor.fluxoAbertura3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_3 </td>" +   
                                    "<td>" + injetor.fluxoAbertura3 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAbertura3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_3 </td>" +   
                                    "<td>" + injetor.fluxoAbertura3 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAbertura3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoAbertura4 !== 0 && (parametros.ABERTURA_FLUXO_4 < (injetor.fluxoAbertura4 - (injetor.fluxoAbertura4 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_4 > (injetor.fluxoAbertura4 + (injetor.fluxoAbertura4 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_4 </td>" +   
                                    "<td>" + injetor.fluxoAbertura4 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAbertura4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_4 </td>" +   
                                    "<td>" + injetor.fluxoAbertura4 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_4 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAbertura4'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoAbertura5 !== 0 && (parametros.ABERTURA_FLUXO_5 < (injetor.fluxoAbertura5 - (injetor.fluxoAbertura5 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_5 > (injetor.fluxoAbertura5 + (injetor.fluxoAbertura5 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_5 </td>" +   
                                    "<td>" + injetor.fluxoAbertura5 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAbertura5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> ABERTURA_FLUXO_5 </td>" +   
                                    "<td>" + injetor.fluxoAbertura5 + "</td>" +                   
                                    "<td>" + parametros.ABERTURA_FLUXO_5 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAbertura5'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }
                                 
                                 if (injetor.posAvanco1 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_1 < (injetor.posAvanco1 - (injetor.posAvanco1 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_1 > (injetor.posAvanco1 + (injetor.posAvanco1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_AVANCO_1 </td>" +     
                                    "<td>" + injetor.posAvanco1 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_AVANCO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAvanco1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_AVANCO_1 </td>" +     
                                    "<td>" + injetor.posAvanco1 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_AVANCO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAvanco1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.posAvanco2 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_2 < (injetor.posAvanco2 - (injetor.posAvanco2 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_2 > (injetor.posAvanco2 + (injetor.posAvanco2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_AVANCO_2 </td>" +     
                                    "<td>" + injetor.posAvanco2 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_AVANCO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAvanco2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_AVANCO_2 </td>" +     
                                    "<td>" + injetor.posAvanco2 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_AVANCO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAvanco2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.posAvanco3 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_3 < (injetor.posAvanco3 - (injetor.posAvanco3 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_3 > (injetor.posAvanco3 + (injetor.posAvanco3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_AVANCO_3 </td>" +     
                                    "<td>" + injetor.posAvanco3 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_AVANCO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAvanco3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_AVANCO_3 </td>" +     
                                    "<td>" + injetor.posAvanco3 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_AVANCO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposAvanco3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }
                                 
                                 if (injetor.posRecuo1 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_3 < (injetor.posRecuo1 - (injetor.posRecuo1 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_3 > (injetor.posRecuo1 + (injetor.posRecuo1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_RECUO_1 </td>" +     
                                    "<td>" + injetor.posRecuo1 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_RECUO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposRecuo1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_RECUO_1 </td>" +     
                                    "<td>" + injetor.posRecuo1 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_RECUO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposRecuo1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.posRecuo2 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_2 < (injetor.posRecuo2 - (injetor.posRecuo2 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_2 > (injetor.posRecuo2 + (injetor.posRecuo2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_RECUO_2 </td>" +     
                                    "<td>" + injetor.posRecuo2 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_RECUO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposRecuo2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_RECUO_2 </td>" +     
                                    "<td>" + injetor.posRecuo2 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_RECUO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposRecuo2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.posRecuo3 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_1 < (injetor.posRecuo3 - (injetor.posRecuo3 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_1 > (injetor.posRecuo3 + (injetor.posRecuo3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_RECUO_3 </td>" +     
                                    "<td>" + injetor.posRecuo3 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_RECUO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposRecuo3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_POSICAO_RECUO_3 </td>" +     
                                    "<td>" + injetor.posRecuo3 + "</td>" +              
                                    "<td>" + parametros.EXTRACAO_POSICAO_RECUO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listaposRecuo3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presAvanco1 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_1 < (injetor.presAvanco1 - (injetor.presAvanco1 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_1 > (injetor.presAvanco1 + (injetor.presAvanco1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_AVANCO_1 </td>" +           
                                    "<td>" + injetor.presAvanco1 + "</td>" +        
                                    "<td>" + parametros.EXTRACAO_PRESSAO_AVANCO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAvanco1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_AVANCO_1 </td>" +           
                                    "<td>" + injetor.presAvanco1 + "</td>" +        
                                    "<td>" + parametros.EXTRACAO_PRESSAO_AVANCO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAvanco1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presAvanco2 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_2 < (injetor.presAvanco2 - (injetor.presAvanco2 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_2 > (injetor.presAvanco2 + (injetor.presAvanco2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_AVANCO_2 </td>" +           
                                    "<td>" + injetor.presAvanco2 + "</td>" +        
                                    "<td>" + parametros.EXTRACAO_PRESSAO_AVANCO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAvanco2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_AVANCO_2 </td>" +           
                                    "<td>" + injetor.presAvanco2 + "</td>" +        
                                    "<td>" + parametros.EXTRACAO_PRESSAO_AVANCO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAvanco2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }
                                 
                                 if (injetor.presAvanco3 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_3 < (injetor.presAvanco3 - (injetor.presAvanco3 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_3 > (injetor.presAvanco3 + (injetor.presAvanco3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_AVANCO_3 </td>" +           
                                    "<td>" + injetor.presAvanco3 + "</td>" +        
                                    "<td>" + parametros.EXTRACAO_PRESSAO_AVANCO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAvanco3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_AVANCO_3 </td>" +           
                                    "<td>" + injetor.presAvanco3 + "</td>" +        
                                    "<td>" + parametros.EXTRACAO_PRESSAO_AVANCO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresAvanco3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presRecuo1 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_3 < (injetor.presRecuo1 - (injetor.presRecuo1 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_3 > (injetor.presRecuo1 + (injetor.presRecuo1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_RECUO_1 </td>" +     
                                    "<td>" + injetor.presRecuo1 + "</td>" +               
                                    "<td>" + parametros.EXTRACAO_PRESSAO_RECUO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecuo1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_RECUO_1 </td>" +     
                                    "<td>" + injetor.presRecuo1 + "</td>" +               
                                    "<td>" + parametros.EXTRACAO_PRESSAO_RECUO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecuo1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.presRecuo2 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_2 < (injetor.presRecuo2 - (injetor.presRecuo2 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_2 > (injetor.presRecuo2 + (injetor.presRecuo2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_RECUO_2 </td>" +     
                                    "<td>" + injetor.presRecuo2 + "</td>" +               
                                    "<td>" + parametros.EXTRACAO_PRESSAO_RECUO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecuo2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_RECUO_2 </td>" +     
                                    "<td>" + injetor.presRecuo2 + "</td>" +               
                                    "<td>" + parametros.EXTRACAO_PRESSAO_RECUO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecuo2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }
                                 
                                 if (injetor.presRecuo3 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_1 < (injetor.presRecuo3 - (injetor.presRecuo3 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_1 > (injetor.presRecuo3 + (injetor.presRecuo3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_RECUO_3 </td>" +     
                                    "<td>" + injetor.presRecuo3 + "</td>" +               
                                    "<td>" + parametros.EXTRACAO_PRESSAO_RECUO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecuo3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_PRESSAO_RECUO_3 </td>" +     
                                    "<td>" + injetor.presRecuo3 + "</td>" +               
                                    "<td>" + parametros.EXTRACAO_PRESSAO_RECUO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listapresRecuo3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoAvanco1 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_1 < (injetor.fluxoAvanco1 - (injetor.fluxoAvanco1 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_1 > (injetor.fluxoAvanco1 + (injetor.fluxoAvanco1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_AVANCO_1 </td>" +    
                                    "<td>" + injetor.fluxoAvanco1 + "</td>" +                
                                    "<td>" + parametros.EXTRACAO_FLUXO_AVANCO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAvanco1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_AVANCO_1 </td>" +    
                                    "<td>" + injetor.fluxoAvanco1 + "</td>" +                
                                    "<td>" + parametros.EXTRACAO_FLUXO_AVANCO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAvanco1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoAvanco2 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_2 < (injetor.fluxoAvanco2 - (injetor.fluxoAvanco2 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_2 > (injetor.fluxoAvanco2 + (injetor.fluxoAvanco2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_AVANCO_2 </td>" +    
                                    "<td>" + injetor.fluxoAvanco2 + "</td>" +                
                                    "<td>" + parametros.EXTRACAO_FLUXO_AVANCO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAvanco2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_AVANCO_2 </td>" +    
                                    "<td>" + injetor.fluxoAvanco2 + "</td>" +                
                                    "<td>" + parametros.EXTRACAO_FLUXO_AVANCO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAvanco2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }
                                 //aqui
                                 if (injetor.fluxoAvanco3 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_3 < (injetor.fluxoAvanco3 - (injetor.fluxoAvanco3 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_3 > (injetor.fluxoAvanco3 + (injetor.fluxoAvanco3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_AVANCO_3 </td>" +    
                                    "<td>" + injetor.fluxoAvanco3 + "</td>" +                
                                    "<td>" + parametros.EXTRACAO_FLUXO_AVANCO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAvanco3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_AVANCO_3 </td>" +    
                                    "<td>" + injetor.fluxoAvanco3 + "</td>" +                
                                    "<td>" + parametros.EXTRACAO_FLUXO_AVANCO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoAvanco3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoRecuo1 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_3 < (injetor.fluxoRecuo1 - (injetor.fluxoRecuo1 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_3 > (injetor.fluxoRecuo1 + (injetor.fluxoRecuo1 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_RECUO_1 </td>" +   
                                    "<td>" + injetor.fluxoRecuo1 + "</td>" +                 
                                    "<td>" + parametros.EXTRACAO_FLUXO_RECUO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecuo1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_RECUO_1 </td>" +   
                                    "<td>" + injetor.fluxoRecuo1 + "</td>" +                 
                                    "<td>" + parametros.EXTRACAO_FLUXO_RECUO_3 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecuo1'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoRecuo2 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_2 < (injetor.fluxoRecuo2 - (injetor.fluxoRecuo2 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_2 > (injetor.fluxoRecuo2 + (injetor.fluxoRecuo2 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_RECUO_2 </td>" +   
                                    "<td>" + injetor.fluxoRecuo2 + "</td>" +                 
                                    "<td>" + parametros.EXTRACAO_FLUXO_RECUO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecuo2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_RECUO_2 </td>" +   
                                    "<td>" + injetor.fluxoRecuo2 + "</td>" +                 
                                    "<td>" + parametros.EXTRACAO_FLUXO_RECUO_2 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecuo2'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 }

                                 if (injetor.fluxoRecuo3 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_1 < (injetor.fluxoRecuo3 - (injetor.fluxoRecuo3 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_1 > (injetor.fluxoRecuo3 + (injetor.fluxoRecuo3 * 0.1)).toFixed(1))) {
                                    markup = markup + "<tr class='outOfRange'>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_RECUO_3 </td>" +   
                                    "<td>" + injetor.fluxoRecuo3 + "</td>" +                 
                                    "<td>" + parametros.EXTRACAO_FLUXO_RECUO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecuo3'>Clique para o gráfico</button></td>" +
                                    "</tr>"
                                 } else {
                                    markup = markup + "<tr>" +
                                    "<td style='font-weight: bold'> EXTRACAO_FLUXO_RECUO_3 </td>" +   
                                    "<td>" + injetor.fluxoRecuo3 + "</td>" +                 
                                    "<td>" + parametros.EXTRACAO_FLUXO_RECUO_1 + "</td>" +                    
                                    "<td><button class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='listafluxoRecuo3'>Clique para o gráfico</button></td>" +
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

                                 document.getElementById("listacilindro1").addEventListener("click", function () {
                                    plotaGrafico("cilindro1");
                                 }, false);
                                 document.getElementById("listacilindro2").addEventListener("click", function () {
                                    plotaGrafico("cilindro2");
                                 }, false);
                                 document.getElementById("listacilindro3").addEventListener("click", function () {
                                    plotaGrafico("cilindro3");
                                 }, false);
                                 document.getElementById("listacilindro4").addEventListener("click", function () {
                                    plotaGrafico("cilindro4");
                                 }, false);
                                 document.getElementById("listacilindro5").addEventListener("click", function () {
                                    plotaGrafico("cilindro5");
                                 }, false);
                                 document.getElementById("listacilindro6").addEventListener("click", function () {
                                    plotaGrafico("cilindro6");
                                 }, false);
                                 document.getElementById("listacilindro7").addEventListener("click", function () {
                                    plotaGrafico("cilindro7");
                                 }, false);
                                 document.getElementById("listaposInjecao1").addEventListener("click", function () {
                                    plotaGrafico("posInjecao1");
                                 }, false);
                                 document.getElementById("listaposInjecao2").addEventListener("click", function () {
                                    plotaGrafico("posInjecao2");
                                 }, false);
                                 document.getElementById("listaposInjecao3").addEventListener("click", function () {
                                    plotaGrafico("posInjecao3");
                                 }, false);
                                 document.getElementById("listaposInjecao4").addEventListener("click", function () {
                                    plotaGrafico("posInjecao4");
                                 }, false);
                                 document.getElementById("listaposInjecao5").addEventListener("click", function () {
                                    plotaGrafico("posInjecao5");
                                 }, false);
                                 document.getElementById("listapresInjecao1").addEventListener("click", function () {
                                    plotaGrafico("presInjecao1");
                                 }, false);
                                 document.getElementById("listapresInjecao2").addEventListener("click", function () {
                                    plotaGrafico("presInjecao2");
                                 }, false);
                                 document.getElementById("listapresInjecao3").addEventListener("click", function () {
                                    plotaGrafico("presInjecao3");
                                 }, false);
                                 document.getElementById("listapresInjecao4").addEventListener("click", function () {
                                    plotaGrafico("presInjecao4");
                                 }, false);
                                 document.getElementById("listapresInjecao5").addEventListener("click", function () {
                                    plotaGrafico("presInjecao5");
                                 }, false);
                                 document.getElementById("listafluxoInjecao1").addEventListener("click", function () {
                                    plotaGrafico("fluxoInjecao1");
                                 }, false);
                                 document.getElementById("listafluxoInjecao2").addEventListener("click", function () {
                                    plotaGrafico("fluxoInjecao2");
                                 }, false);
                                 document.getElementById("listafluxoInjecao3").addEventListener("click", function () {
                                    plotaGrafico("fluxoInjecao3");
                                 }, false);
                                 document.getElementById("listafluxoInjecao4").addEventListener("click", function () {
                                    plotaGrafico("fluxoInjecao4");
                                 }, false);
                                 document.getElementById("listafluxoInjecao5").addEventListener("click", function () {
                                    plotaGrafico("fluxoInjecao5");
                                 }, false);
                                 document.getElementById("listapresRecalque1").addEventListener("click", function () {
                                    plotaGrafico("presRecalque1");
                                 }, false);
                                 document.getElementById("listapresRecalque2").addEventListener("click", function () {
                                    plotaGrafico("presRecalque2");
                                 }, false);
                                 document.getElementById("listapresRecalque3").addEventListener("click", function () {
                                    plotaGrafico("presRecalque3");
                                 }, false);
                                 document.getElementById("listapresRecalque4").addEventListener("click", function () {
                                    plotaGrafico("presRecalque4");
                                 }, false);
                                 document.getElementById("listapresRecalque5").addEventListener("click", function () {
                                    plotaGrafico("presRecalque5");
                                 }, false);
                                 document.getElementById("listafluxoRecalque1").addEventListener("click", function () {
                                    plotaGrafico("fluxoRecalque1");
                                 }, false);
                                 document.getElementById("listafluxoRecalque2").addEventListener("click", function () {
                                    plotaGrafico("fluxoRecalque2");
                                 }, false);
                                 document.getElementById("listafluxoRecalque3").addEventListener("click", function () {
                                    plotaGrafico("fluxoRecalque3");
                                 }, false);
                                 document.getElementById("listafluxoRecalque4").addEventListener("click", function () {
                                    plotaGrafico("fluxoRecalque4");
                                 }, false);
                                 document.getElementById("listafluxoRecalque5").addEventListener("click", function () {
                                    plotaGrafico("fluxoRecalque5");
                                 }, false);
                                 document.getElementById("listatempoRecalque1").addEventListener("click", function () {
                                    plotaGrafico("tempoRecalque1");
                                 }, false);
                                 document.getElementById("listatempoRecalque2").addEventListener("click", function () {
                                    plotaGrafico("tempoRecalque2");
                                 }, false);
                                 document.getElementById("listatempoRecalque3").addEventListener("click", function () {
                                    plotaGrafico("tempoRecalque3");
                                 }, false);
                                 document.getElementById("listatempoRecalque4").addEventListener("click", function () {
                                    plotaGrafico("tempoRecalque4");
                                 }, false);
                                 document.getElementById("listatempoRecalque5").addEventListener("click", function () {
                                    plotaGrafico("tempoRecalque5");
                                 }, false);
                                 document.getElementById("listapartDosagem1").addEventListener("click", function () {
                                    plotaGrafico("partDosagem1");
                                 }, false);
                                 document.getElementById("listapartDosagem2").addEventListener("click", function () {
                                    plotaGrafico("partDosagem2");
                                 }, false);
                                 document.getElementById("listapartDosagem3").addEventListener("click", function () {
                                    plotaGrafico("partDosagem3");
                                 }, false);
                                 document.getElementById("listapartDosagem4").addEventListener("click", function () {
                                    plotaGrafico("partDosagem4");
                                 }, false);
                                 document.getElementById("listapartDosagem5").addEventListener("click", function () {
                                    plotaGrafico("partDosagem5");
                                 }, false);
                                 document.getElementById("listapresDosagem1").addEventListener("click", function () {
                                    plotaGrafico("presDosagem1");
                                 }, false);
                                 document.getElementById("listapresDosagem2").addEventListener("click", function () {
                                    plotaGrafico("presDosagem2");
                                 }, false);
                                 document.getElementById("listapresDosagem3").addEventListener("click", function () {
                                    plotaGrafico("presDosagem3");
                                 }, false);
                                 document.getElementById("listapresDosagem4").addEventListener("click", function () {
                                    plotaGrafico("presDosagem4");
                                 }, false);
                                 document.getElementById("listapresDosagem5").addEventListener("click", function () {
                                    plotaGrafico("presDosagem5");
                                 }, false);
                                 document.getElementById("listafluxoDosagem1").addEventListener("click", function () {
                                    plotaGrafico("fluxoDosagem1");
                                 }, false);
                                 document.getElementById("listafluxoDosagem2").addEventListener("click", function () {
                                    plotaGrafico("fluxoDosagem2");
                                 }, false);
                                 document.getElementById("listafluxoDosagem3").addEventListener("click", function () {
                                    plotaGrafico("fluxoDosagem3");
                                 }, false);
                                 document.getElementById("listafluxoDosagem4").addEventListener("click", function () {
                                    plotaGrafico("fluxoDosagem4");
                                 }, false);
                                 document.getElementById("listafluxoDosagem5").addEventListener("click", function () {
                                    plotaGrafico("fluxoDosagem5");
                                 }, false);
                                 document.getElementById("listaCPDosagem1").addEventListener("click", function () {
                                    plotaGrafico("CPDosagem1");
                                 }, false);
                                 document.getElementById("listaCPDosagem2").addEventListener("click", function () {
                                    plotaGrafico("CPDosagem2");
                                 }, false);
                                 document.getElementById("listaCPDosagem3").addEventListener("click", function () {
                                    plotaGrafico("CPDosagem3");
                                 }, false);
                                 document.getElementById("listaCPDosagem4").addEventListener("click", function () {
                                    plotaGrafico("CPDosagem4");
                                 }, false);
                                 document.getElementById("listaCPDosagem5").addEventListener("click", function () {
                                    plotaGrafico("CPDosagem5");
                                 }, false);
                                 document.getElementById("listaposFecha1").addEventListener("click", function () {
                                    plotaGrafico("posFecha1");
                                 }, false);
                                 document.getElementById("listaposFecha2").addEventListener("click", function () {
                                    plotaGrafico("posFecha2");
                                 }, false);
                                 document.getElementById("listaposFecha3").addEventListener("click", function () {
                                    plotaGrafico("posFecha3");
                                 }, false);
                                 document.getElementById("listatempoProtMolde").addEventListener("click", function () {
                                    plotaGrafico("tempoProtMolde");
                                 }, false);
                                 document.getElementById("listaAltaPresPos").addEventListener("click", function () {
                                    plotaGrafico("AltaPresPos");
                                 }, false);
                                 document.getElementById("listapresFecha1").addEventListener("click", function () {
                                    plotaGrafico("presFecha1");
                                 }, false);
                                 document.getElementById("listapresFecha2").addEventListener("click", function () {
                                    plotaGrafico("presFecha2");
                                 }, false);
                                 document.getElementById("listapresFecha3").addEventListener("click", function () {
                                    plotaGrafico("presFecha3");
                                 }, false);
                                 document.getElementById("listaprotMPres").addEventListener("click", function () {
                                    plotaGrafico("protMPres");
                                 }, false);
                                 document.getElementById("listaAltaPresPres").addEventListener("click", function () {
                                    plotaGrafico("AltaPresPres");
                                 }, false);
                                 document.getElementById("listafluxoFecha1").addEventListener("click", function () {
                                    plotaGrafico("fluxoFecha1");
                                 }, false);
                                 document.getElementById("listafluxoFecha2").addEventListener("click", function () {
                                    plotaGrafico("fluxoFecha2");
                                 }, false);
                                 document.getElementById("listafluxoFecha3").addEventListener("click", function () {
                                    plotaGrafico("fluxoFecha3");
                                 }, false);
                                 document.getElementById("listaprotMFluxo").addEventListener("click", function () {
                                    plotaGrafico("protMFluxo");
                                 }, false);
                                 document.getElementById("listaAltaPresFluxo").addEventListener("click", function () {
                                    plotaGrafico("AltaPresFluxo");
                                 }, false);
                                 document.getElementById("listaposAbertura1").addEventListener("click", function () {
                                    plotaGrafico("posAbertura1");
                                 }, false);
                                 document.getElementById("listaposAbertura2").addEventListener("click", function () {
                                    plotaGrafico("posAbertura2");
                                 }, false);
                                 document.getElementById("listaposAbertura3").addEventListener("click", function () {
                                    plotaGrafico("posAbertura3");
                                 }, false);
                                 document.getElementById("listaposAbertura4").addEventListener("click", function () {
                                    plotaGrafico("posAbertura4");
                                 }, false);
                                 document.getElementById("listaposAbertura5").addEventListener("click", function () {
                                    plotaGrafico("posAbertura5");
                                 }, false);
                                 document.getElementById("listapresAbertura1").addEventListener("click", function () {
                                    plotaGrafico("presAbertura1");
                                 }, false);
                                 document.getElementById("listapresAbertura2").addEventListener("click", function () {
                                    plotaGrafico("presAbertura2");
                                 }, false);
                                 document.getElementById("listapresAbertura3").addEventListener("click", function () {
                                    plotaGrafico("presAbertura3");
                                 }, false);
                                 document.getElementById("listapresAbertura4").addEventListener("click", function () {
                                    plotaGrafico("presAbertura4");
                                 }, false);
                                 document.getElementById("listapresAbertura5").addEventListener("click", function () {
                                    plotaGrafico("presAbertura5");
                                 }, false);
                                 document.getElementById("listafluxoAbertura1").addEventListener("click", function () {
                                    plotaGrafico("fluxoAbertura1");
                                 }, false);
                                 document.getElementById("listafluxoAbertura2").addEventListener("click", function () {
                                    plotaGrafico("fluxoAbertura2");
                                 }, false);
                                 document.getElementById("listafluxoAbertura3").addEventListener("click", function () {
                                    plotaGrafico("fluxoAbertura3");
                                 }, false);
                                 document.getElementById("listafluxoAbertura4").addEventListener("click", function () {
                                    plotaGrafico("fluxoAbertura4");
                                 }, false);
                                 document.getElementById("listafluxoAbertura5").addEventListener("click", function () {
                                    plotaGrafico("fluxoAbertura5");
                                 }, false);
                                 document.getElementById("listaposAvanco1").addEventListener("click", function () {
                                    plotaGrafico("posAvanco1");
                                 }, false);
                                 document.getElementById("listaposAvanco2").addEventListener("click", function () {
                                    plotaGrafico("posAvanco2");
                                 }, false);
                                 document.getElementById("listaposAvanco3").addEventListener("click", function () {
                                    plotaGrafico("posAvanco3");
                                 }, false);
                                 document.getElementById("listaposRecuo1").addEventListener("click", function () {
                                    plotaGrafico("posRecuo1");
                                 }, false);
                                 document.getElementById("listaposRecuo2").addEventListener("click", function () {
                                    plotaGrafico("posRecuo2");
                                 }, false);
                                 document.getElementById("listaposRecuo3").addEventListener("click", function () {
                                    plotaGrafico("posRecuo3");
                                 }, false);
                                 document.getElementById("listapresAvanco1").addEventListener("click", function () {
                                    plotaGrafico("presAvanco1");
                                 }, false);
                                 document.getElementById("listapresAvanco2").addEventListener("click", function () {
                                    plotaGrafico("presAvanco2");
                                 }, false);
                                 document.getElementById("listapresAvanco3").addEventListener("click", function () {
                                    plotaGrafico("presAvanco3");
                                 }, false);
                                 document.getElementById("listapresRecuo1").addEventListener("click", function () {
                                    plotaGrafico("presRecuo1");
                                 }, false);
                                 document.getElementById("listapresRecuo2").addEventListener("click", function () {
                                    plotaGrafico("presRecuo2");
                                 }, false);
                                 document.getElementById("listapresRecuo3").addEventListener("click", function () {
                                    plotaGrafico("presRecuo3");
                                 }, false);
                                 document.getElementById("listafluxoAvanco1").addEventListener("click", function () {
                                    plotaGrafico("fluxoAvanco1");
                                 }, false);
                                 document.getElementById("listafluxoAvanco2").addEventListener("click", function () {
                                    plotaGrafico("fluxoAvanco2");
                                 }, false);
                                 document.getElementById("listafluxoAvanco3").addEventListener("click", function () {
                                    plotaGrafico("fluxoAvanco3");
                                 }, false);
                                 document.getElementById("listafluxoRecuo1").addEventListener("click", function () {
                                    plotaGrafico("fluxoRecuo1");
                                 }, false);
                                 document.getElementById("listafluxoRecuo2").addEventListener("click", function () {
                                    plotaGrafico("fluxoRecuo2");
                                 }, false);
                                 document.getElementById("listafluxoRecuo3").addEventListener("click", function () {
                                    plotaGrafico("fluxoRecuo3");
                                 }, false);
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
      $("#ficha").show();
      
      setInterval(function () {
         
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
         
                     // console.log(parametros)
         
                     $.ajax({
                        url: '/ficha/getFichaPastoreInjetores/' + parametros.mac,
                        method: 'get',
                        dataType: 'json',
                        success: function (injetor) {
                           // console.log(injetor)
                           injetoresLimite = [];
                           injetoresLimite = injetor;

                           $.ajax({
                              url: '/ficha/getFichaPastorePerifericos/' + parametros.mac,
                              method: 'get',
                              dataType: 'json',
                              success: function(perifericos) {
                                 // console.log(perifericos)

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
                                                   "<p id='descMaterial'>" + injetor.Material + "</p>" +
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
                                 ? cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro1 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_1 + "</span></p></td>"
                                 : cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.cilindro1 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_1 + "</span></p></td>";
                                                               
                                 (injetor.cilindro2 !== 0 && (parametros.TEMPERATURA_ZONA_2 < (injetor.cilindro2 - (injetor.cilindro2 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_2 > (injetor.cilindro2 + (injetor.cilindro2 * 0.1)).toFixed(1)))
                                 ? cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro2 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_2 + "</span></p></td>"
                                 : cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.cilindro2 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_2 + "</span></p></td>";
                                 
                                 (injetor.cilindro3 !== 0 && (parametros.TEMPERATURA_ZONA_3 < (injetor.cilindro3 - (injetor.cilindro3 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_3 > (injetor.cilindro3 + (injetor.cilindro3 * 0.1)).toFixed(1)))
                                 ? cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro3 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_3 + "</span></p></td>"
                                 : cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.cilindro3 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_3 + "</span></p></td>";
   
                                 (injetor.cilindro4 !== 0 && (parametros.TEMPERATURA_ZONA_4 < (injetor.cilindro4 - (injetor.cilindro4 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_4 > (injetor.cilindro4 + (injetor.cilindro4 * 0.1)).toFixed(1)))
                                 ? cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro4' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro4 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_4 + "</span></p></td>"
                                 : cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro4'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.cilindro4 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_4 + "</span></p></td>";
                              
                                 (injetor.cilindro5 !== 0 && (parametros.TEMPERATURA_ZONA_5 < (injetor.cilindro5 - (injetor.cilindro5 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_5 > (injetor.cilindro5 + (injetor.cilindro5 * 0.1)).toFixed(1)))
                                 ? cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro5 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_5 + "</span></p></td>"
                                 : cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.cilindro5 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_5 + "</span></p></td>";
   
                                 (injetor.cilindro6 !== 0 && (parametros.TEMPERATURA_ZONA_6 < (injetor.cilindro6 - (injetor.cilindro6 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_6 > (injetor.cilindro6 + (injetor.cilindro6 * 0.1)).toFixed(1)))
                                 ? cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro6' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro6 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_6 + "</span></p></td>"
                                 : cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro6'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.cilindro6 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_6 + "</span></p></td>";
   
                                 (injetor.cilindro7 !== 0 && (parametros.TEMPERATURA_ZONA_7 < (injetor.cilindro7 - (injetor.cilindro7 * 0.1)).toFixed(1) || parametros.TEMPERATURA_ZONA_7 > (injetor.cilindro7 + (injetor.cilindro7 * 0.1)).toFixed(1)))
                                 ? cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro7' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro7 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_7 + "</span></p></td>"
                                 : cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro7'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.cilindro7 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_7 + "</span></p></td>";
   
                                 tableBody = $("#cilindro tbody");
                                 tableBody.html(cilindro);
   
                                 var injecao = "<tr>" + 
                                                   "<th scope='row'>POSIÇÃO</th>" + 
                                                   "<td colspan='1'><p class='read-only'><span class='cadastrados'>" + injetor.posComut + "</span></p></td>";
   
                                 // injecao += "<td colspan='1'><p class='read-only'><span class='cadastrados'>" + injetor.posComut + "</span></p></td>"

                                 (injetor.posInjecao1 !== 0 && (parametros.INJECAO_POSICAO_1 < (injetor.posInjecao1 - (injetor.posInjecao1 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_1 > (injetor.posInjecao1 + (injetor.posInjecao1 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_1 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_1 + "</span></p></td>";
                                 
                                 (injetor.posInjecao2 !== 0 && (parametros.INJECAO_POSICAO_2 < (injetor.posInjecao2 - (injetor.posInjecao2 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_2 > (injetor.posInjecao2 + (injetor.posInjecao2 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_2 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_2 + "</span></p></td>";
   
                                 (injetor.posInjecao3 !== 0 && (parametros.INJECAO_POSICAO_3 < (injetor.posInjecao3 - (injetor.posInjecao3 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_3 > (injetor.posInjecao3 + (injetor.posInjecao3 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_3 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_3 + "</span></p></td>";
   
                                 (injetor.posInjecao4 !== 0 && (parametros.INJECAO_POSICAO_4 < (injetor.posInjecao4 - (injetor.posInjecao4 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_4 > (injetor.posInjecao4 + (injetor.posInjecao4 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao4' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_4 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao4'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_4 + "</span></p></td>";
   
                                 (injetor.posInjecao5 !== 0 && (parametros.INJECAO_POSICAO_5 < (injetor.posInjecao5 - (injetor.posInjecao5 * 0.1)).toFixed(1) || parametros.INJECAO_POSICAO_5 > (injetor.posInjecao5 + (injetor.posInjecao5 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_5 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_5 + "</span></p></td>";
   
                                 injecao += "</tr>";
   
                                 injecao += "<tr>" + 
                                                "<th scope='row'>PRESSÃO</th>" + 
                                                "<td colspan='1'><p class='read-only'><span class='cadastrados'>" + injetor.presComut + "</span></p></td>";
                                 
                                 (injetor.presInjecao1 !== 0 && (parametros.INJECAO_PRESSAO_1 < (injetor.presInjecao1 - (injetor.presInjecao1 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_1 > (injetor.presInjecao1 + (injetor.presInjecao1 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_1 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_1 + "</span></p></td>";
                                 
                                 (injetor.presInjecao2 !== 0 && (parametros.INJECAO_PRESSAO_2 < (injetor.presInjecao2 - (injetor.presInjecao2 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_2 > (injetor.presInjecao2 + (injetor.presInjecao2 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_2 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_2 + "</span></p></td>";
   
                                 (injetor.presInjecao3 !== 0 && (parametros.INJECAO_PRESSAO_3 < (injetor.presInjecao3 - (injetor.presInjecao3 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_3 > (injetor.presInjecao3 + (injetor.presInjecao3 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_3 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_3 + "</span></p></td>";
   
                                 (injetor.presInjecao4 !== 0 && (parametros.INJECAO_PRESSAO_4 < (injetor.presInjecao4 - (injetor.presInjecao4 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_4 > (injetor.presInjecao4 + (injetor.presInjecao4 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao4' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_4 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao4'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_4 + "</span></p></td>";
                                 
                                 (injetor.presInjecao5 !== 0 && (parametros.INJECAO_PRESSAO_5 < (injetor.presInjecao5 - (injetor.presInjecao5 * 0.1)).toFixed(1) || parametros.INJECAO_PRESSAO_5 > (injetor.presInjecao5 + (injetor.presInjecao5 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_5 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_5 + "</span></p></td>";
   
                                 injecao += "</tr>";
   
                                 injecao += "<tr><th scope='row' colspan='2'>FLUXO</th>";
                                 
                                 (injetor.fluxoInjecao1 !== 0 && (parametros.INJECAO_FLUXO_1 < (injetor.fluxoInjecao1 - (injetor.fluxoInjecao1 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_1 > (injetor.fluxoInjecao1 + (injetor.fluxoInjecao1 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_1 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_1 + "</span></p></td>";
                                 
                                 (injetor.fluxoInjecao2 !== 0 && (parametros.INJECAO_FLUXO_2 < (injetor.fluxoInjecao2 - (injetor.fluxoInjecao2 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_2 > (injetor.fluxoInjecao2 + (injetor.fluxoInjecao2 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_2 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_2 + "</span></p></td>";
   
                                 (injetor.fluxoInjecao3 !== 0 && (parametros.INJECAO_FLUXO_3 < (injetor.fluxoInjecao3 - (injetor.fluxoInjecao3 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_3 > (injetor.fluxoInjecao3 + (injetor.fluxoInjecao3 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_3 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_3 + "</span></p></td>";
   
                                 (injetor.fluxoInjecao4 !== 0 && (parametros.INJECAO_FLUXO_4 < (injetor.fluxoInjecao4 - (injetor.fluxoInjecao4 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_4 > (injetor.fluxoInjecao4 + (injetor.fluxoInjecao4 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao4' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_4 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao4'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_4 + "</span></p></td>";
                                 
                                 (injetor.fluxoInjecao5 !== 0 && (parametros.INJECAO_FLUXO_5 < (injetor.fluxoInjecao5 - (injetor.fluxoInjecao5 * 0.1)).toFixed(1) || parametros.INJECAO_FLUXO_5 > (injetor.fluxoInjecao5 + (injetor.fluxoInjecao5 * 0.1)).toFixed(1))) 
                                 ? injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_5 + "</span></p></td>"
                                 : injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_5 + "</span></p></td>";
   
                                 injecao += "</tr>";
   
                                 var injecaoFoot = "<tr><th colspan='2'>TEMPO DISPARO:</th>";                              
   
                                 (injetor.tempoDisparo !== 0 && (parametros.TEMPO_DISPARO < (injetor.tempoDisparo - (injetor.tempoDisparo * 0.1)).toFixed(1) || parametros.TEMPO_DISPARO > (injetor.tempoDisparo + (injetor.tempoDisparo * 0.1)).toFixed(1))) 
                                 ? injecaoFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoDisparo' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoDisparo + "</span> - <span class='reais'>" + parametros.TEMPO_DISPARO + "</span></p></td>"
                                 : injecaoFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoDisparo'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoDisparo + "</span> - <span class='reais'>" + parametros.TEMPO_DISPARO + "</span></p></td>";
                                 
                                 injecaoFoot += "<th colspan='3'>TEMPO DE PRESSÃO INJEÇÃO:</th>";
   
                                 (injetor.pressaoInj !== 0 && (parametros.TEMPO_INJECAO < (injetor.pressaoInj - (injetor.pressaoInj * 0.1)).toFixed(1) || parametros.TEMPO_INJECAO > (injetor.pressaoInj + (injetor.pressaoInj * 0.1)).toFixed(1))) 
                                 ? injecaoFoot += "<td data-toggle='modal' data-target='#myModal' id='pressaoInj' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.pressaoInj + "</span> - <span class='reais'>" + parametros.TEMPO_INJECAO + "</span></p></td>"
                                 : injecaoFoot += "<td data-toggle='modal' data-target='#myModal' id='pressaoInj'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.pressaoInj + "</span> - <span class='reais'>" + parametros.TEMPO_INJECAO + "</span></p></td>";
   
                                 injecaoFoot += "</tr>";
   
                                 tableBody = $("#injecao tbody");
                                 tableBody.html(injecao);
                                 
                                 tableFoot = $("#injecaoFoot");
                                 tableFoot.html(injecaoFoot);
   
                                 var recalque = "<tr><th scope='row' colspan='2'>PRESSÃO</th>";
   
                                 (injetor.presRecalque1 !== 0 && (parametros.RECALQUE_PRESSAO_1 < (injetor.presRecalque1 - (injetor.presRecalque1 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_1 > (injetor.presRecalque1 + (injetor.presRecalque1 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_1 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_1 + "</span></p></td>";
                                 
                                 (injetor.presRecalque2 !== 0 && (parametros.RECALQUE_PRESSAO_2 < (injetor.presRecalque2 - (injetor.presRecalque2 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_2 > (injetor.presRecalque2 + (injetor.presRecalque2 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_2 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_2 + "</span></p></td>";
                                 
                                 (injetor.presRecalque3 !== 0 && (parametros.RECALQUE_PRESSAO_3 < (injetor.presRecalque3 - (injetor.presRecalque3 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_3 > (injetor.presRecalque3 + (injetor.presRecalque3 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_3 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_3 + "</span></p></td>";
                                 
                                 (injetor.presRecalque4 !== 0 && (parametros.RECALQUE_PRESSAO_4 < (injetor.presRecalque4 - (injetor.presRecalque4 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_4 > (injetor.presRecalque4 + (injetor.presRecalque4 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque4' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_4 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque4'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_4 + "</span></p></td>";
                                 
                                 (injetor.presRecalque5 !== 0 && (parametros.RECALQUE_PRESSAO_5 < (injetor.presRecalque5 - (injetor.presRecalque5 * 0.1)).toFixed(1) || parametros.RECALQUE_PRESSAO_5 > (injetor.presRecalque5 + (injetor.presRecalque5 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_5 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_5 + "</span></p></td>";
   
                                 recalque += "</tr>";
   
                                 recalque += "<tr><th scope='row' colspan='2'>FLUXO</th>";
   
                                 (injetor.fluxoRecalque1 !== 0 && (parametros.RECALQUE_FLUXO_1 < (injetor.fluxoRecalque1 - (injetor.fluxoRecalque1 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_1 > (injetor.fluxoRecalque1 + (injetor.fluxoRecalque1 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_1 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_1 + "</span></p></td>";
                                 
                                 (injetor.fluxoRecalque2 !== 0 && (parametros.RECALQUE_FLUXO_2 < (injetor.fluxoRecalque2 - (injetor.fluxoRecalque2 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_2 > (injetor.fluxoRecalque2 + (injetor.fluxoRecalque2 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_2 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_2 + "</span></p></td>";
                                 
                                 (injetor.fluxoRecalque3 !== 0 && (parametros.RECALQUE_FLUXO_3 < (injetor.fluxoRecalque3 - (injetor.fluxoRecalque3 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_3 > (injetor.fluxoRecalque3 + (injetor.fluxoRecalque3 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_3 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_3 + "</span></p></td>";
                                 
                                 (injetor.fluxoRecalque4 !== 0 && (parametros.RECALQUE_FLUXO_4 < (injetor.fluxoRecalque4 - (injetor.fluxoRecalque4 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_4 > (injetor.fluxoRecalque4 + (injetor.fluxoRecalque4 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque4' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_4 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque4'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_4 + "</span></p></td>";
                                 
                                 (injetor.fluxoRecalque5 !== 0 && (parametros.RECALQUE_FLUXO_5 < (injetor.fluxoRecalque5 - (injetor.fluxoRecalque5 * 0.1)).toFixed(1) || parametros.RECALQUE_FLUXO_5 > (injetor.fluxoRecalque5 + (injetor.fluxoRecalque5 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_5 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_5 + "</span></p></td>";
   
                                 recalque += "</tr>";
   
                                 recalque += "<tr><th scope='row' colspan='2'>TEMPO</th>";
   
                                 (injetor.tempoRecalque1 !== 0 && (parametros.RECALQUE_TEMPO_1 < (injetor.tempoRecalque1 - (injetor.tempoRecalque1 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_1 > (injetor.tempoRecalque1 + (injetor.tempoRecalque1 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_1 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_1 + "</span></p></td>";
                                 
                                 (injetor.tempoRecalque2 !== 0 && (parametros.RECALQUE_TEMPO_2 < (injetor.tempoRecalque2 - (injetor.tempoRecalque2 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_2 > (injetor.tempoRecalque2 + (injetor.tempoRecalque2 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_2 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_2 + "</span></p></td>";
                                 
                                 (injetor.tempoRecalque3 !== 0 && (parametros.RECALQUE_TEMPO_3 < (injetor.tempoRecalque3 - (injetor.tempoRecalque3 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_3 > (injetor.tempoRecalque3 + (injetor.tempoRecalque3 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_3 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_3 + "</span></p></td>";
                                 
                                 (injetor.tempoRecalque4 !== 0 && (parametros.RECALQUE_TEMPO_4 < (injetor.tempoRecalque4 - (injetor.tempoRecalque4 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_4 > (injetor.tempoRecalque4 + (injetor.tempoRecalque4 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque4' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_4 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque4'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_4 + "</span></p></td>";
                                 
                                 (injetor.tempoRecalque5 !== 0 && (parametros.RECALQUE_TEMPO_5 < (injetor.tempoRecalque5 - (injetor.tempoRecalque5 * 0.1)).toFixed(1) || parametros.RECALQUE_TEMPO_5 > (injetor.tempoRecalque5 + (injetor.tempoRecalque5 * 0.1)).toFixed(1))) 
                                 ? recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_5 + "</span></p></td>"
                                 : recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_5 + "</span></p></td>";
   
                                 recalque += "</tr>";
                                 
                                 tableBody = $("#recalque tbody");
                                 tableBody.html(recalque);
   
                                 var dosagem = "<tr><th scope='row' colspan='2'>PARTIDA</th>";
   
                                 (injetor.partDosagem1 !== 0 && (parametros.DOSAGEM_PARTIDA_1 < (injetor.partDosagem1 - (injetor.partDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_1 > (injetor.partDosagem1 + (injetor.partDosagem1 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_1 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.partDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_1 + "</span></p></td>";
                                 
                                 (injetor.partDosagem2 !== 0 && (parametros.DOSAGEM_PARTIDA_2 < (injetor.partDosagem2 - (injetor.partDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_2 > (injetor.partDosagem2 + (injetor.partDosagem2 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_2 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.partDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_2 + "</span></p></td>";
                                 
                                 (injetor.partDosagem3 !== 0 && (parametros.DOSAGEM_PARTIDA_3 < (injetor.partDosagem3 - (injetor.partDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_3 > (injetor.partDosagem3 + (injetor.partDosagem3 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_3 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.partDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_3 + "</span></p></td>";
                                 
                                 (injetor.partDosagem4 !== 0 && (parametros.DOSAGEM_PARTIDA_4 < (injetor.partDosagem4 - (injetor.partDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_4 > (injetor.partDosagem4 + (injetor.partDosagem4 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem4' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_4 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem4'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.partDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_4 + "</span></p></td>";
                                 
                                 (injetor.partDosagem5 !== 0 && (parametros.DOSAGEM_PARTIDA_5 < (injetor.partDosagem5 - (injetor.partDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_PARTIDA_5 > (injetor.partDosagem5 + (injetor.partDosagem5 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_5 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.partDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_5 + "</span></p></td>";
   
                                 dosagem += "</tr>";
   
                                 dosagem += "<tr><th scope='row' colspan='2'>PRESSÃO</th>";
   
                                 (injetor.presDosagem1 !== 0 && (parametros.DOSAGEM_PRESSAO_1 < (injetor.presDosagem1 - (injetor.presDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_1 > (injetor.presDosagem1 + (injetor.presDosagem1 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_1 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_1 + "</span></p></td>";
                                 
                                 (injetor.presDosagem2 !== 0 && (parametros.DOSAGEM_PRESSAO_2 < (injetor.presDosagem2 - (injetor.presDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_2 > (injetor.presDosagem2 + (injetor.presDosagem2 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_2 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_2 + "</span></p></td>";
                                 
                                 (injetor.presDosagem3 !== 0 && (parametros.DOSAGEM_PRESSAO_3 < (injetor.presDosagem3 - (injetor.presDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_3 > (injetor.presDosagem3 + (injetor.presDosagem3 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_3 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_3 + "</span></p></td>";
                                 
                                 (injetor.presDosagem4 !== 0 && (parametros.DOSAGEM_PRESSAO_4 < (injetor.presDosagem4 - (injetor.presDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_4 > (injetor.presDosagem4 + (injetor.presDosagem4 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem4' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_4 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem4'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_4 + "</span></p></td>";
                                 
                                 (injetor.presDosagem5 !== 0 && (parametros.DOSAGEM_PRESSAO_5 < (injetor.presDosagem5 - (injetor.presDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_PRESSAO_5 > (injetor.presDosagem5 + (injetor.presDosagem5 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_5 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_5 + "</span></p></td>";
   
                                 dosagem += "</tr>";
   
                                 dosagem += "<tr><th scope='row' colspan='2'>FLUXO</th>";
   
                                 (injetor.fluxoDosagem1 !== 0 && (parametros.DOSAGEM_FLUXO_1 < (injetor.fluxoDosagem1 - (injetor.fluxoDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_1 > (injetor.fluxoDosagem1 + (injetor.fluxoDosagem1 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_1 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_1 + "</span></p></td>";
                                 
                                 (injetor.fluxoDosagem2 !== 0 && (parametros.DOSAGEM_FLUXO_2 < (injetor.fluxoDosagem2 - (injetor.fluxoDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_2 > (injetor.fluxoDosagem2 + (injetor.fluxoDosagem2 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_2 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_2 + "</span></p></td>";
                                 
                                 (injetor.fluxoDosagem3 !== 0 && (parametros.DOSAGEM_FLUXO_3 < (injetor.fluxoDosagem3 - (injetor.fluxoDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_3 > (injetor.fluxoDosagem3 + (injetor.fluxoDosagem3 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_3 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_3 + "</span></p></td>";
                                 
                                 (injetor.fluxoDosagem4 !== 0 && (parametros.DOSAGEM_FLUXO_4 < (injetor.fluxoDosagem4 - (injetor.fluxoDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_4 > (injetor.fluxoDosagem4 + (injetor.fluxoDosagem4 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem4' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_4 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem4'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_4 + "</span></p></td>";
                                 
                                 (injetor.fluxoDosagem5 !== 0 && (parametros.DOSAGEM_FLUXO_5 < (injetor.fluxoDosagem5 - (injetor.fluxoDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_FLUXO_5 > (injetor.fluxoDosagem5 + (injetor.fluxoDosagem5 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_5 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_5 + "</span></p></td>";
   
                                 dosagem += "</tr>";
   
                                 dosagem += "<tr><th scope='row' colspan='2'>CONTRAPRESSÃO</th>";
   
                                 (injetor.CPDosagem1 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_1 < (injetor.CPDosagem1 - (injetor.CPDosagem1 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_1 > (injetor.CPDosagem1 + (injetor.CPDosagem1 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_1 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.CPDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_1 + "</span></p></td>";
                                 
                                 (injetor.CPDosagem2 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_2 < (injetor.CPDosagem2 - (injetor.CPDosagem2 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_2 > (injetor.CPDosagem2 + (injetor.CPDosagem2 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_2 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.CPDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_2 + "</span></p></td>";
                                 
                                 (injetor.CPDosagem3 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_3 < (injetor.CPDosagem3 - (injetor.CPDosagem3 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_3 > (injetor.CPDosagem3 + (injetor.CPDosagem3 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_3 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.CPDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_3 + "</span></p></td>";
                                 
                                 (injetor.CPDosagem4 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_4 < (injetor.CPDosagem4 - (injetor.CPDosagem4 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_4 > (injetor.CPDosagem4 + (injetor.CPDosagem4 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem4' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_4 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem4'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.CPDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_4 + "</span></p></td>";
                                 
                                 (injetor.CPDosagem5 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_5 < (injetor.CPDosagem5 - (injetor.CPDosagem5 * 0.1)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_5 > (injetor.CPDosagem5 + (injetor.CPDosagem5 * 0.1)).toFixed(1))) 
                                 ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_5 + "</span></p></td>"
                                 : dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.CPDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_5 + "</span></p></td>";
   
                                 dosagem += "</tr>";
                                 
                                 var dosagemFoot = "<tr><th colspan='2'>TEMPO:</th>";                              
   
                                 (injetor.tempoDosagem !== 0 && (parametros.TEMPO_DOSAGEM < (injetor.tempoDosagem - (injetor.tempoDosagem * 0.1)).toFixed(1) || parametros.TEMPO_DOSAGEM > (injetor.tempoDosagem + (injetor.tempoDosagem * 0.1)).toFixed(1))) 
                                 ? dosagemFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoDosagem' colspan='5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoDosagem + "</span> - <span class='reais'>" + parametros.TEMPO_DOSAGEM + "</span></p></td>"
                                 : dosagemFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoDosagem' colspan='5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoDosagem + "</span> - <span class='reais'>" + parametros.TEMPO_DOSAGEM + "</span></p></td>";
                                 
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
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='posFecha1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_1 + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='posFecha1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_1 + "</span></p></td>";
                                 
                                 (injetor.posFecha2 !== 0 && (parametros.FECHAMENTO_POSICAO_2 < (injetor.posFecha2 - (injetor.posFecha2 * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_2 > (injetor.posFecha2 + (injetor.posFecha2 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='posFecha2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_2 + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='posFecha2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_2 + "</span></p></td>";
                                 
                                 (injetor.posFecha3 !== 0 && (parametros.FECHAMENTO_POSICAO_3 < (injetor.posFecha3 - (injetor.posFecha3 * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_3 > (injetor.posFecha3 + (injetor.posFecha3 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='posFecha3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_3 + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='posFecha3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_3 + "</span></p></td>";
                                 
                                 (injetor.protMPos !== 0 && (parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE < (injetor.protMPos - (injetor.protMPos * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE > (injetor.protMPos + (injetor.protMPos * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='protMPos' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.protMPos + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='protMPos'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.protMPos + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE + "</span></p></td>";
                                 
                                 (injetor.AltaPresPos !== 0 && (parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO < (injetor.AltaPresPos - (injetor.AltaPresPos * 0.1)).toFixed(1) || parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO > (injetor.AltaPresPos + (injetor.AltaPresPos * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='AltaPresPos' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.AltaPresPos + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='AltaPresPos'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.AltaPresPos + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO + "</span></p></td>";
   
                                 fechamento += "</tr>";
   
                                 fechamento += "<tr><th scope='row' colspan='2'>PRESSÃO</th>";
   
                                 (injetor.presFecha1 !== 0 && (parametros.FECHAMENTO_PRESSAO_1 < (injetor.presFecha1 - (injetor.presFecha1 * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_1 > (injetor.presFecha1 + (injetor.presFecha1 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='presFecha1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_1 + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='presFecha1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_1 + "</span></p></td>";
                                 
                                 (injetor.presFecha2 !== 0 && (parametros.FECHAMENTO_PRESSAO_2 < (injetor.presFecha2 - (injetor.presFecha2 * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_2 > (injetor.presFecha2 + (injetor.presFecha2 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='presFecha2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_2 + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='presFecha2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_2 + "</span></p></td>";
                                 
                                 (injetor.presFecha3 !== 0 && (parametros.FECHAMENTO_PRESSAO_3 < (injetor.presFecha3 - (injetor.presFecha3 * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_3 > (injetor.presFecha3 + (injetor.presFecha3 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='presFecha3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_3 + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='presFecha3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_3 + "</span></p></td>";
                                 
                                 (injetor.protMPres !== 0 && (parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE < (injetor.protMPres - (injetor.protMPres * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE > (injetor.protMPres + (injetor.protMPres * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='protMPres' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.protMPres + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='protMPres'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.protMPres + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE + "</span></p></td>";
                                 
                                 (injetor.AltaPresPres !== 0 && (parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO < (injetor.AltaPresPres - (injetor.AltaPresPres * 0.1)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO > (injetor.AltaPresPres + (injetor.AltaPresPres * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='AltaPresPres' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.AltaPresPres + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='AltaPresPres'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.AltaPresPres + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO + "</span></p></td>";
   
                                 fechamento += "</tr>";
   
                                 fechamento += "<tr><th scope='row' colspan='2'>FLUXO</th>";
   
                                 (injetor.fluxoFecha1 !== 0 && (parametros.FECHAMENTO_FLUXO_1 < (injetor.fluxoFecha1 - (injetor.fluxoFecha1 * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_1 > (injetor.fluxoFecha1 + (injetor.fluxoFecha1 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='fluxoFecha1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_1 + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='fluxoFecha1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_1 + "</span></p></td>";
                                 
                                 (injetor.fluxoFecha2 !== 0 && (parametros.FECHAMENTO_FLUXO_2 < (injetor.fluxoFecha2 - (injetor.fluxoFecha2 * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_2 > (injetor.fluxoFecha2 + (injetor.fluxoFecha2 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='fluxoFecha2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_2 + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='fluxoFecha2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_2 + "</span></p></td>";
                                 
                                 (injetor.fluxoFecha3 !== 0 && (parametros.FECHAMENTO_FLUXO_3 < (injetor.fluxoFecha3 - (injetor.fluxoFecha3 * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_3 > (injetor.fluxoFecha3 + (injetor.fluxoFecha3 * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='fluxoFecha3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_3 + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='fluxoFecha3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_3 + "</span></p></td>";
                                 
                                 (injetor.protMFluxo !== 0 && (parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE < (injetor.protMFluxo - (injetor.protMFluxo * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE > (injetor.protMFluxo + (injetor.protMFluxo * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='protMFluxo' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.protMFluxo + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='protMFluxo'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.protMFluxo + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE + "</span></p></td>";
                                 
                                 (injetor.AltaPresFluxo !== 0 && (parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO < (injetor.AltaPresFluxo - (injetor.AltaPresFluxo * 0.1)).toFixed(1) || parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO > (injetor.AltaPresFluxo + (injetor.AltaPresFluxo * 0.1)).toFixed(1))) 
                                 ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='AltaPresFluxo' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.AltaPresFluxo + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO + "</span></p></td>"
                                 : fechamento += "<td data-toggle='modal' data-target='#myModal' id='AltaPresFluxo'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.AltaPresFluxo + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO + "</span></p></td>";
   
                                 fechamento += "</tr>";
   
                                 var fechamentoFoot = "<tr><th colspan='3'>TEMPO PROTEÇÃO DE MOLDE:</th>";                              
   
                                 (injetor.tempoProtMolde !== 0 && (parametros.TEMPO_PROTECAO_MOLDE < (injetor.tempoProtMolde - (injetor.tempoProtMolde * 0.1)).toFixed(1) || parametros.TEMPO_PROTECAO_MOLDE > (injetor.tempoProtMolde + (injetor.tempoProtMolde * 0.1)).toFixed(1))) 
                                 ? fechamentoFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoProtMolde' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoProtMolde + "</span> - <span class='reais'>" + parametros.TEMPO_PROTECAO_MOLDE + "</span></p></td>"
                                 : fechamentoFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoProtMolde'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoProtMolde + "</span> - <span class='reais'>" + parametros.TEMPO_PROTECAO_MOLDE + "</span></p></td>";
                                 
                                 fechamentoFoot += "<th colspan='2'>TEMPO FECHAMENTO:</th>";
   
                                 (injetor.tempoFecha !== 0 && (parametros.TEMPO_FECHAMENTO < (injetor.tempoFecha - (injetor.tempoFecha * 0.1)).toFixed(1) || parametros.TEMPO_FECHAMENTO > (injetor.tempoFecha + (injetor.tempoFecha * 0.1)).toFixed(1))) 
                                 ? fechamentoFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoFecha' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoFecha + "</span> - <span class='reais'>" + parametros.TEMPO_FECHAMENTO + "</span></p></td>"
                                 : fechamentoFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoFecha'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoFecha + "</span> - <span class='reais'>" + parametros.TEMPO_FECHAMENTO + "</span></p></td>";
   
                                 fechamentoFoot += "</tr>";
   
                                 tableBody = $("#fechamento tbody");
                                 tableBody.html(fechamento);
                                 
                                 tableFoot = $("#fechamentoFoot");
                                 tableFoot.html(fechamentoFoot);
   
                                 var abertura = "<tr><th scope='row' colspan='2'>POSIÇÃO</th>";
   
                                 (injetor.posAbertura1 !== 0 && (parametros.ABERTURA_POSICAO_1 < (injetor.posAbertura1 - (injetor.posAbertura1 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_1 > (injetor.posAbertura1 + (injetor.posAbertura1 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_1 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_1 + "</span></p></td>";
                                 
                                 (injetor.posAbertura2 !== 0 && (parametros.ABERTURA_POSICAO_2 < (injetor.posAbertura2 - (injetor.posAbertura2 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_2 > (injetor.posAbertura2 + (injetor.posAbertura2 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_2 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_2 + "</span></p></td>";
                                 
                                 (injetor.posAbertura3 !== 0 && (parametros.ABERTURA_POSICAO_3 < (injetor.posAbertura3 - (injetor.posAbertura3 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_3 > (injetor.posAbertura3 + (injetor.posAbertura3 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_3 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_3 + "</span></p></td>";
                                 
                                 (injetor.posAbertura4 !== 0 && (parametros.ABERTURA_POSICAO_4 < (injetor.posAbertura4 - (injetor.posAbertura4 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_4 > (injetor.posAbertura4 + (injetor.posAbertura4 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura4' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_4 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura4'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_4 + "</span></p></td>";
                                 
                                 (injetor.posAbertura5 !== 0 && (parametros.ABERTURA_POSICAO_5 < (injetor.posAbertura5 - (injetor.posAbertura5 * 0.1)).toFixed(1) || parametros.ABERTURA_POSICAO_5 > (injetor.posAbertura5 + (injetor.posAbertura5 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_5 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_5 + "</span></p></td>";
   
                                 abertura += "</tr>";
   
                                 abertura += "<tr><th scope='row' colspan='2'>PRESSÃO</th>";
   
                                 (injetor.presAbertura1 !== 0 && (parametros.ABERTURA_PRESSAO_1 < (injetor.presAbertura1 - (injetor.presAbertura1 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_1 > (injetor.presAbertura1 + (injetor.presAbertura1 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_1 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_1 + "</span></p></td>";
                                 
                                 (injetor.presAbertura2 !== 0 && (parametros.ABERTURA_PRESSAO_2 < (injetor.presAbertura2 - (injetor.presAbertura2 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_2 > (injetor.presAbertura2 + (injetor.presAbertura2 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_2 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_2 + "</span></p></td>";
                                 
                                 (injetor.presAbertura3 !== 0 && (parametros.ABERTURA_PRESSAO_3 < (injetor.presAbertura3 - (injetor.presAbertura3 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_3 > (injetor.presAbertura3 + (injetor.presAbertura3 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_3 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_3 + "</span></p></td>";
                                 
                                 (injetor.presAbertura4 !== 0 && (parametros.ABERTURA_PRESSAO_4 < (injetor.presAbertura4 - (injetor.presAbertura4 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_4 > (injetor.presAbertura4 + (injetor.presAbertura4 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura4' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_4 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura4'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_4 + "</span></p></td>";
                                 
                                 (injetor.presAbertura5 !== 0 && (parametros.ABERTURA_PRESSAO_5 < (injetor.presAbertura5 - (injetor.presAbertura5 * 0.1)).toFixed(1) || parametros.ABERTURA_PRESSAO_5 > (injetor.presAbertura5 + (injetor.presAbertura5 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_5 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_5 + "</span></p></td>";
   
                                 abertura += "</tr>";
   
                                 abertura += "<tr><th scope='row' colspan='2'>FLUXO</th>";
   
                                 (injetor.fluxoAbertura1 !== 0 && (parametros.ABERTURA_FLUXO_1 < (injetor.fluxoAbertura1 - (injetor.fluxoAbertura1 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_1 > (injetor.fluxoAbertura1 + (injetor.fluxoAbertura1 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_1 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_1 + "</span></p></td>";
                                 
                                 (injetor.fluxoAbertura2 !== 0 && (parametros.ABERTURA_FLUXO_2 < (injetor.fluxoAbertura2 - (injetor.fluxoAbertura2 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_2 > (injetor.fluxoAbertura2 + (injetor.fluxoAbertura2 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_2 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_2 + "</span></p></td>";
                                 
                                 (injetor.fluxoAbertura3 !== 0 && (parametros.ABERTURA_FLUXO_3 < (injetor.fluxoAbertura3 - (injetor.fluxoAbertura3 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_3 > (injetor.fluxoAbertura3 + (injetor.fluxoAbertura3 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_3 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_3 + "</span></p></td>";
                                 
                                 (injetor.fluxoAbertura4 !== 0 && (parametros.ABERTURA_FLUXO_4 < (injetor.fluxoAbertura4 - (injetor.fluxoAbertura4 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_4 > (injetor.fluxoAbertura4 + (injetor.fluxoAbertura4 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura4' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_4 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura4'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_4 + "</span></p></td>";
                                 
                                 (injetor.fluxoAbertura5 !== 0 && (parametros.ABERTURA_FLUXO_5 < (injetor.fluxoAbertura5 - (injetor.fluxoAbertura5 * 0.1)).toFixed(1) || parametros.ABERTURA_FLUXO_5 > (injetor.fluxoAbertura5 + (injetor.fluxoAbertura5 * 0.1)).toFixed(1))) 
                                 ? abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_5 + "</span></p></td>"
                                 : abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_5 + "</span></p></td>";
   
                                 abertura += "</tr>";
   
                                 var aberturaFoot = "<tr><th colspan='3'>RESFRIAMENTO:</th>";                              
   
                                 (injetor.resfriamento !== 0 && (parametros.TEMPO_RESFRIAMENT0 < (injetor.resfriamento - (injetor.resfriamento * 0.1)).toFixed(1) || parametros.TEMPO_RESFRIAMENT0 > (injetor.resfriamento + (injetor.resfriamento * 0.1)).toFixed(1))) 
                                 ? aberturaFoot += "<td data-toggle='modal' data-target='#myModal' id='resfriamento' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.resfriamento + "</span> - <span class='reais'>" + parametros.TEMPO_RESFRIAMENT0 + "</span></p></td>"
                                 : aberturaFoot += "<td data-toggle='modal' data-target='#myModal' id='resfriamento'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.resfriamento + "</span> - <span class='reais'>" + parametros.TEMPO_RESFRIAMENT0 + "</span></p></td>";
                                 
                                 aberturaFoot += "<th colspan='2'>TEMPO ABERTURA:</th>";
   
                                 (injetor.tempoAbertura !== 0 && (parametros.TEMPO_ABERTURA < (injetor.tempoAbertura - (injetor.tempoAbertura * 0.1)).toFixed(1) || parametros.TEMPO_ABERTURA > (injetor.tempoAbertura + (injetor.tempoAbertura * 0.1)).toFixed(1))) 
                                 ? aberturaFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoAbertura' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoAbertura + "</span> - <span class='reais'>" + parametros.TEMPO_ABERTURA + "</span></p></td>"
                                 : aberturaFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoAbertura'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoAbertura + "</span> - <span class='reais'>" + parametros.TEMPO_ABERTURA + "</span></p></td>";
   
                                 aberturaFoot += "</tr>";
                                 
                                 tableFoot = $("#aberturaFoot");
                                 tableFoot.html(aberturaFoot);
                                 
                                 tableBody = $("#abertura tbody");
                                 tableBody.html(abertura);
   
                                 var extracao = "<tr><th scope='row' colspan='1'>POSIÇÃO</th>";
   
                                 (injetor.posAvanco1 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_1 < (injetor.posAvanco1 - (injetor.posAvanco1 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_1 > (injetor.posAvanco1 + (injetor.posAvanco1 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='posAvanco1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_1 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='posAvanco1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_1 + "</span></p></td>";
                                 
                                 (injetor.posAvanco2 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_2 < (injetor.posAvanco2 - (injetor.posAvanco2 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_2 > (injetor.posAvanco2 + (injetor.posAvanco2 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='posAvanco2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_2 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='posAvanco2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_2 + "</span></p></td>";
                                 
                                 (injetor.posAvanco3 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_3 < (injetor.posAvanco3 - (injetor.posAvanco3 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_3 > (injetor.posAvanco3 + (injetor.posAvanco3 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='posAvanco3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_3 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='posAvanco3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_3 + "</span></p></td>";
                                 
                                 (injetor.posRecuo1 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_3 < (injetor.posRecuo1 - (injetor.posRecuo1 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_3 > (injetor.posRecuo1 + (injetor.posRecuo1 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='posRecuo1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_3 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='posRecuo1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_3 + "</span></p></td>";
                                 
                                 (injetor.posRecuo2 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_2 < (injetor.posRecuo2 - (injetor.posRecuo2 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_2 > (injetor.posRecuo2 + (injetor.posRecuo2 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='posRecuo2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_2 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='posRecuo2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_2 + "</span></p></td>";
                                 
                                 (injetor.posRecuo3 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_1 < (injetor.posRecuo3 - (injetor.posRecuo3 * 0.1)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_1 > (injetor.posRecuo3 + (injetor.posRecuo3 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='posRecuo3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_1 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='posRecuo3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_1 + "</span></p></td>";
   
                                 extracao += "</tr>";
   
                                 extracao += "<tr><th scope='row' colspan='1'>PRESSÃO</th>";
   
                                 (injetor.presAvanco1 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_1 < (injetor.presAvanco1 - (injetor.presAvanco1 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_1 > (injetor.presAvanco1 + (injetor.presAvanco1 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='presAvanco1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_1 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='presAvanco1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_1 + "</span></p></td>";
                                 
                                 (injetor.presAvanco2 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_2 < (injetor.presAvanco2 - (injetor.presAvanco2 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_2 > (injetor.presAvanco2 + (injetor.presAvanco2 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='presAvanco2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_2 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='presAvanco2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_2 + "</span></p></td>";
                                 
                                 (injetor.presAvanco3 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_3 < (injetor.presAvanco3 - (injetor.presAvanco3 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_3 > (injetor.presAvanco3 + (injetor.presAvanco3 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='presAvanco3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_3 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='presAvanco3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_3 + "</span></p></td>";
                                 
                                 (injetor.presRecuo1 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_3 < (injetor.presRecuo1 - (injetor.presRecuo1 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_3 > (injetor.presRecuo1 + (injetor.presRecuo1 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='presRecuo1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_3 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='presRecuo1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_3 + "</span></p></td>";
                                 
                                 (injetor.presRecuo2 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_2 < (injetor.presRecuo2 - (injetor.presRecuo2 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_2 > (injetor.presRecuo2 + (injetor.presRecuo2 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='presRecuo2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_2 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='presRecuo2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_2 + "</span></p></td>";
                                 
                                 (injetor.presRecuo3 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_1 < (injetor.presRecuo3 - (injetor.presRecuo3 * 0.1)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_1 > (injetor.presRecuo3 + (injetor.presRecuo3 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='presRecuo3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_1 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='presRecuo3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_1 + "</span></p></td>";
   
                                 extracao += "</tr>";
   
                                 extracao += "<tr><th scope='row' colspan='1'>FLUXO</th>";
   
                                 (injetor.fluxoAvanco1 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_1 < (injetor.fluxoAvanco1 - (injetor.fluxoAvanco1 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_1 > (injetor.fluxoAvanco1 + (injetor.fluxoAvanco1 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoAvanco1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_1 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoAvanco1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_1 + "</span></p></td>";
                                 
                                 (injetor.fluxoAvanco2 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_2 < (injetor.fluxoAvanco2 - (injetor.fluxoAvanco2 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_2 > (injetor.fluxoAvanco2 + (injetor.fluxoAvanco2 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoAvanco2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_2 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoAvanco2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_2 + "</span></p></td>";
                                 
                                 (injetor.fluxoAvanco3 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_3 < (injetor.fluxoAvanco3 - (injetor.fluxoAvanco3 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_3 > (injetor.fluxoAvanco3 + (injetor.fluxoAvanco3 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoAvanco3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_3 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoAvanco3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_3 + "</span></p></td>";
                                 
                                 (injetor.fluxoRecuo1 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_3 < (injetor.fluxoRecuo1 - (injetor.fluxoRecuo1 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_3 > (injetor.fluxoRecuo1 + (injetor.fluxoRecuo1 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecuo1' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_3 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecuo1'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_3 + "</span></p></td>";
                                 
                                 (injetor.fluxoRecuo2 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_2 < (injetor.fluxoRecuo2 - (injetor.fluxoRecuo2 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_2 > (injetor.fluxoRecuo2 + (injetor.fluxoRecuo2 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecuo2' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_2 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecuo2'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_2 + "</span></p></td>";
                                 
                                 (injetor.fluxoRecuo3 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_1 < (injetor.fluxoRecuo3 - (injetor.fluxoRecuo3 * 0.1)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_1 > (injetor.fluxoRecuo3 + (injetor.fluxoRecuo3 * 0.1)).toFixed(1))) 
                                 ? extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecuo3' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_1 + "</span></p></td>"
                                 : extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecuo3'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_1 + "</span></p></td>";
   
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
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada1' class='outOfRange'><p tle='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_1 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada1'><p tle='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_1 + "</span></p></td>";
                                 
                                 (injetor.radialPresSaida1 !== 0 && (parametros.RADIAL_PRESSAO_SAIDA_1 < (injetor.radialPresSaida1 - (injetor.radialPresSaida1 * 0.1)).toFixed(1) || parametros.RADIAL_PRESSAO_SAIDA_1 > (injetor.radialPresSaida1 + (injetor.radialPresSaida1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida1' class='outOfRange'><p tle='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_1 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida1'><p tle='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_1 + "</span></p></td>";
                                 
                                 (injetor.radialPresEntrada2 !== 0 && (parametros.RADIAL_PRESSAO_ENTRADA_2 < (injetor.radialPresEntrada2 - (injetor.radialPresEntrada2 * 0.1)).toFixed(1) || parametros.RADIAL_PRESSAO_ENTRADA_2 > (injetor.radialPresEntrada2 + (injetor.radialPresEntrada2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada2' class='outOfRange'><p tle='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_2 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada2'><p tle='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_2 + "</span></p></td>";
                                 
                                 (injetor.radialPresSaida2 !== 0 && (parametros.RADIAL_PRESSAO_SAIDA_2 < (injetor.radialPresSaida2 - (injetor.radialPresSaida2 * 0.1)).toFixed(1) || parametros.RADIAL_PRESSAO_SAIDA_2 > (injetor.radialPresSaida2 + (injetor.radialPresSaida2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida2' class='outOfRange'><p tle='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_2 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida2'><p tle='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_2 + "</span></p></td>";
                                 
                                 (injetor.radialPresEntrada3 !== 0 && (parametros.RADIAL_PRESSAO_ENTRADA_3 < (injetor.radialPresEntrada3 - (injetor.radialPresEntrada3 * 0.1)).toFixed(1) || parametros.RADIAL_PRESSAO_ENTRADA_3 > (injetor.radialPresEntrada3 + (injetor.radialPresEntrada3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada3' class='outOfRange'><p tle='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_3 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada3'><p tle='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_3 + "</span></p></td>";
                                 
                                 (injetor.radialPresSaida3 !== 0 && (parametros.RADIAL_PRESSAO_SAIDA_3 < (injetor.radialPresSaida3 - (injetor.radialPresSaida3 * 0.1)).toFixed(1) || parametros.RADIAL_PRESSAO_SAIDA_3 > (injetor.radialPresSaida3 + (injetor.radialPresSaida3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida3' class='outOfRange'><p tle='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_3 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida3'><p tle='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_3 + "</span></p></td>";
   
                                 radial += "</tr>";
   
                                 radial += "<tr><th scope='row' colspan='1'>FLUXO:</th>";
   
                                 (injetor.radialFluxoEntrada1 !== 0 && (parametros.RADIAL_FLUXO_ENTRADA_1 < (injetor.radialFluxoEntrada1 - (injetor.radialFluxoEntrada1 * 0.1)).toFixed(1) || parametros.RADIAL_FLUXO_ENTRADA_1 > (injetor.radialFluxoEntrada1 + (injetor.radialFluxoEntrada1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada1' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_1 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada1'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_1 + "</span></p></td>";
                                 
                                 (injetor.radialFluxoSaida1 !== 0 && (parametros.RADIAL_FLUXO_SAIDA_1 < (injetor.radialFluxoSaida1 - (injetor.radialFluxoSaida1 * 0.1)).toFixed(1) || parametros.RADIAL_FLUXO_SAIDA_1 > (injetor.radialFluxoSaida1 + (injetor.radialFluxoSaida1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida1' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_1 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida1'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_1 + "</span></p></td>";
                                 
                                 (injetor.radialFluxoEntrada2 !== 0 && (parametros.RADIAL_FLUXO_ENTRADA_2 < (injetor.radialFluxoEntrada2 - (injetor.radialFluxoEntrada2 * 0.1)).toFixed(1) || parametros.RADIAL_FLUXO_ENTRADA_2 > (injetor.radialFluxoEntrada2 + (injetor.radialFluxoEntrada2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada2' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_2 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada2'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_2 + "</span></p></td>";
                                 
                                 (injetor.radialFluxoSaida2 !== 0 && (parametros.RADIAL_FLUXO_SAIDA_2 < (injetor.radialFluxoSaida2 - (injetor.radialFluxoSaida2 * 0.1)).toFixed(1) || parametros.RADIAL_FLUXO_SAIDA_2 > (injetor.radialFluxoSaida2 + (injetor.radialFluxoSaida2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida2' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_2 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida2'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_2 + "</span></p></td>";
                                 
                                 (injetor.radialFluxoEntrada3 !== 0 && (parametros.RADIAL_FLUXO_ENTRADA_3 < (injetor.radialFluxoEntrada3 - (injetor.radialFluxoEntrada3 * 0.1)).toFixed(1) || parametros.RADIAL_FLUXO_ENTRADA_3 > (injetor.radialFluxoEntrada3 + (injetor.radialFluxoEntrada3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada3' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_3 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada3'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_3 + "</span></p></td>";
                                 
                                 (injetor.radialFluxoSaida3 !== 0 && (parametros.RADIAL_FLUXO_SAIDA_3 < (injetor.radialFluxoSaida3 - (injetor.radialFluxoSaida3 * 0.1)).toFixed(1) || parametros.RADIAL_FLUXO_SAIDA_3 > (injetor.radialFluxoSaida3 + (injetor.radialFluxoSaida3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida3' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_3 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida3'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_3 + "</span></p></td>";
   
                                 radial += "</tr>";
   
                                 radial += "<tr><th scope='row' colspan='1'>ACT. POSIÇÃO:</th>";
   
                                 (injetor.radialPosEntrada1 !== 0 && (parametros.RADIAL_ACT_POSICAO_ENTRADA_1 < (injetor.radialPosEntrada1 - (injetor.radialPosEntrada1 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_ENTRADA_1 > (injetor.radialPosEntrada1 + (injetor.radialPosEntrada1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada1' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_1 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada1'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_1 + "</span></p></td>";
                                 
                                 (injetor.radialPosSaida1 !== 0 && (parametros.RADIAL_ACT_POSICAO_SAIDA_1 < (injetor.radialPosSaida1 - (injetor.radialPosSaida1 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_SAIDA_1 > (injetor.radialPosSaida1 + (injetor.radialPosSaida1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida1' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_1 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida1'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_1 + "</span></p></td>";
                                 
                                 (injetor.radialPosEntrada2 !== 0 && (parametros.RADIAL_ACT_POSICAO_ENTRADA_2 < (injetor.radialPosEntrada2 - (injetor.radialPosEntrada2 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_ENTRADA_2 > (injetor.radialPosEntrada2 + (injetor.radialPosEntrada2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada2' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_2 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada2'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_2 + "</span></p></td>";
                                 
                                 (injetor.radialPosSaida2 !== 0 && (parametros.RADIAL_ACT_POSICAO_SAIDA_2 < (injetor.radialPosSaida2 - (injetor.radialPosSaida2 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_SAIDA_2 > (injetor.radialPosSaida2 + (injetor.radialPosSaida2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida2' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_2 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida2'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_2 + "</span></p></td>";
                                 
                                 (injetor.radialPosEntrada3 !== 0 && (parametros.RADIAL_ACT_POSICAO_ENTRADA_3 < (injetor.radialPosEntrada3 - (injetor.radialPosEntrada3 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_ENTRADA_3 > (injetor.radialPosEntrada3 + (injetor.radialPosEntrada3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada3' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_3 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada3'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_3 + "</span></p></td>";
                                 
                                 (injetor.radialPosSaida3 !== 0 && (parametros.RADIAL_ACT_POSICAO_SAIDA_3 < (injetor.radialPosSaida3 - (injetor.radialPosSaida3 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_SAIDA_3 > (injetor.radialPosSaida3 + (injetor.radialPosSaida3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida3' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_3 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida3'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_3 + "</span></p></td>";
   
                                 radial += "</tr>";
   
                                 radial += "<tr><th scope='row' colspan='1'>ACT. TEMPO:</th>";
   
                                 (injetor.radialTempoEntrada1 !== 0 && (parametros.RADIAL_ACT_TEMPO_ENTRADA_1 < (injetor.radialTempoEntrada1 - (injetor.radialTempoEntrada1 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_ENTRADA_1 > (injetor.radialTempoEntrada1 + (injetor.radialTempoEntrada1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada1' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_1 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada1'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_1 + "</span></p></td>";
                                 
                                 (injetor.radialTempoSaida1 !== 0 && (parametros.RADIAL_ACT_TEMPO_SAIDA_1 < (injetor.radialTempoSaida1 - (injetor.radialTempoSaida1 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_SAIDA_1 > (injetor.radialTempoSaida1 + (injetor.radialTempoSaida1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida1' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_1 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida1'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_1 + "</span></p></td>";
                                 
                                 (injetor.radialTempoEntrada2 !== 0 && (parametros.RADIAL_ACT_TEMPO_ENTRADA_2 < (injetor.radialTempoEntrada2 - (injetor.radialTempoEntrada2 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_ENTRADA_2 > (injetor.radialTempoEntrada2 + (injetor.radialTempoEntrada2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada2' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_2 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada2'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_2 + "</span></p></td>";
                                 
                                 (injetor.radialTempoSaida2 !== 0 && (parametros.RADIAL_ACT_TEMPO_SAIDA_2 < (injetor.radialTempoSaida2 - (injetor.radialTempoSaida2 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_SAIDA_2 > (injetor.radialTempoSaida2 + (injetor.radialTempoSaida2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida2' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_2 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida2'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_2 + "</span></p></td>";
                                 
                                 (injetor.radialTempoEntrada3 !== 0 && (parametros.RADIAL_ACT_TEMPO_ENTRADA_3 < (injetor.radialTempoEntrada3 - (injetor.radialTempoEntrada3 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_ENTRADA_3 > (injetor.radialTempoEntrada3 + (injetor.radialTempoEntrada3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada3' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_3 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada3'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_3 + "</span></p></td>";
                                 
                                 (injetor.radialTempoSaida3 !== 0 && (parametros.RADIAL_ACT_TEMPO_SAIDA_3 < (injetor.radialTempoSaida3 - (injetor.radialTempoSaida3 * 0.1)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_SAIDA_3 > (injetor.radialTempoSaida3 + (injetor.radialTempoSaida3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida3' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_3 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida3'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_3 + "</span></p></td>";
   
                                 radial += "</tr>";
   
                                 radial += "<tr><th scope='row' colspan='1'>SCRCOUNT:</th>";
   
                                 (injetor.radialSCREntrada1 !== 0 && (parametros.RADIAL_SCRCOUNT_ENTRADA_1 < (injetor.radialSCREntrada1 - (injetor.radialSCREntrada1 * 0.1)).toFixed(1) || parametros.RADIAL_SCRCOUNT_ENTRADA_1 > (injetor.radialSCREntrada1 + (injetor.radialSCREntrada1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada1' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCREntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_1 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada1'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCREntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_1 + "</span></p></td>";
                                 
                                 (injetor.radialSCRSaida1 !== 0 && (parametros.RADIAL_SCRCOUNT_SAIDA_1 < (injetor.radialSCRSaida1 - (injetor.radialSCRSaida1 * 0.1)).toFixed(1) || parametros.RADIAL_SCRCOUNT_SAIDA_1 > (injetor.radialSCRSaida1 + (injetor.radialSCRSaida1 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida1' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCRSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_1 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida1'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCRSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_1 + "</span></p></td>";
                                 
                                 (injetor.radialSCREntrada2 !== 0 && (parametros.RADIAL_SCRCOUNT_ENTRADA_2 < (injetor.radialSCREntrada2 - (injetor.radialSCREntrada2 * 0.1)).toFixed(1) || parametros.RADIAL_SCRCOUNT_ENTRADA_2 > (injetor.radialSCREntrada2 + (injetor.radialSCREntrada2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada2' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCREntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_2 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada2'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCREntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_2 + "</span></p></td>";
                                 
                                 (injetor.radialSCRSaida2 !== 0 && (parametros.RADIAL_SCRCOUNT_SAIDA_2 < (injetor.radialSCRSaida2 - (injetor.radialSCRSaida2 * 0.1)).toFixed(1) || parametros.RADIAL_SCRCOUNT_SAIDA_2 > (injetor.radialSCRSaida2 + (injetor.radialSCRSaida2 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida2' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCRSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_2 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida2'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCRSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_2 + "</span></p></td>";
                                 
                                 (injetor.radialSCREntrada3 !== 0 && (parametros.RADIAL_SCRCOUNT_ENTRADA_3 < (injetor.radialSCREntrada3 - (injetor.radialSCREntrada3 * 0.1)).toFixed(1) || parametros.RADIAL_SCRCOUNT_ENTRADA_3 > (injetor.radialSCREntrada3 + (injetor.radialSCREntrada3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada3' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCREntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_3 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada3'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCREntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_3 + "</span></p></td>";
                                 
                                 (injetor.radialSCRSaida3 !== 0 && (parametros.RADIAL_SCRCOUNT_SAIDA_3 < (injetor.radialSCRSaida3 - (injetor.radialSCRSaida3 * 0.1)).toFixed(1) || parametros.RADIAL_SCRCOUNT_SAIDA_3 > (injetor.radialSCRSaida3 + (injetor.radialSCRSaida3 * 0.1)).toFixed(1))) 
                                 ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida3' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCRSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_3 + "</span></p></td>"
                                 : radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida3'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCRSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_3 + "</span></p></td>";
   
                                 radial += "</tr>";
   
                                 tableBody = $("#radial tbody");
                                 tableBody.html(radial);
   
                                 // FIM INJETORES
   
                                 // PERIFERICOS

                                 var termopar = "<tr>" +
                                                      "<th colspan='1'>TERMOPAR:</th>" +
                                                      "<td colspan='1'>" +
                                                         "<p id='termoparK'>K</p>" +
                                                      "</td>" +
                                                      "<td colspan='1'>" +
                                                         "<p id='termoparJ'>J</p>" +
                                                      "</td>" +
                                       
                                                      "<th colspan='1'>VOLTAGEM:</th>" +
                                                      "<td colspan='1'>" +
                                                         "<p id='voltagem220'>220</p>" +
                                                      "</td>" +
                                                      "<td colspan='1'>" +
                                                         "<p id='voltagem24'>24</p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   
                                 tableBody = $("#termopar tbody");
                                 tableBody.html(termopar);

                                 if (perifericos.termopar === "K") {
                                    document.getElementById("termoparK").style.fontWeight = "bold";
                                    document.getElementById("termoparK").style.fontStyle = "italic";
                                    document.getElementById("termoparK").style.textDecoration = "underline";
                                 } else {
                                    document.getElementById("termoparJ").style.fontWeight = "bold";
                                    document.getElementById("termoparJ").style.fontStyle = "italic";
                                    document.getElementById("termoparJ").style.textDecoration = "underline";
                                 }
                                 
                                 if (perifericos.voltagem === "220") {
                                    document.getElementById("voltagem220").style.fontWeight = "bold";
                                    document.getElementById("voltagem220").style.fontStyle = "italic";
                                    document.getElementById("voltagem220").style.textDecoration = "underline";
                                 } else {
                                    document.getElementById("voltagem24").style.fontWeight = "bold";
                                    document.getElementById("voltagem24").style.fontStyle = "italic";
                                    document.getElementById("voltagem24").style.textDecoration = "underline";
                                 }
   
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
                                                      
                                                      "<th>VG21</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG21DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG21ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG2</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG2DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG2ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG22</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG22DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG22ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG3</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG3DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG3ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG23</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG23DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG23ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG4</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG4DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG4ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG24</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG24DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG24ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG5</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG5DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG5ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG25</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG25DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG25ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG6</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG6DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG6ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG26</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG26DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG26ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG7</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG7DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG7ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG27</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG27DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG27ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG8</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG8DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG8ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG28</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG28DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG28ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG9</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG9DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG9ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG29</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG29DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG29ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG10</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG10DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG10ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG30</th>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG30DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG30ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG11</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG11DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG11ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG31</th>" +
                                                      "<td" + 
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG31DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td" + 
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG31ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG12</th>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG12DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG12ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG32</th>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG32DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG32ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG13</th>" +
                                                      "<td>" +
                                                         " +<p class='read-only'><span class='cadastrados'>" + perifericos.VG13DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG13ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG33</th>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG33DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG33ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG14</th>" +
                                                      "<td>" +
                                                         " +<p class='read-only'><span class='cadastrados'>" + perifericos.VG14DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG14ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG34</th>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG34DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG34ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG15</th>" +
                                                      "<td>" +
                                                         " +<p class='read-only'><span class='cadastrados'>" + perifericos.VG15DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG15ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG35</th>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG35DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG35ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG16</th>" +
                                                      "<td>" +
                                                         " +<p class='read-only'><span class='cadastrados'>" + perifericos.VG16DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG16ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG36</th>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG36DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG36ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG17</th>" +
                                                      "<td>" +
                                                         " +<p class='read-only'><span class='cadastrados'>" + perifericos.VG17DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG17ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG37</th>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG37DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG37ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG18</th>" +
                                                      "<td>" +
                                                         " +<p class='read-only'><span class='cadastrados'>" + perifericos.VG18DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG18ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG38</th>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG38DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG38ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG19</th>" +
                                                      "<td>" +
                                                         " +<p class='read-only'><span class='cadastrados'>" + perifericos.VG19DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG19ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG39</th>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG39DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG39ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   "<tr>" +
                                                      "<th>VG20</th>" +
                                                      "<td>" +
                                                         " +<p class='read-only'><span class='cadastrados'>" + perifericos.VG20DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td>" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG20ACTTIME + "</span></p>" +
                                                      "</td>" +

                                                      "<th>VG40</th>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG40DLYTIME + "</span></p>" +
                                                      "</td>" +
                                                      "<td" +
                                                         "<p class='read-only'><span class='cadastrados'>" + perifericos.VG40ACTTIME + "</span></p>" +
                                                      "</td>" +
                                                   "</tr>"
                                                   
                                    tableBody = $("#valveGate tbody");
                                    tableBody.html(valveGate);
                                    
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

                                    document.getElementById("cilindro1").addEventListener("click", function () {
                                       plotaGrafico("cilindro1");
                                    }, false);
                                    document.getElementById("cilindro2").addEventListener("click", function () {
                                       plotaGrafico("cilindro2");
                                    }, false);
                                    document.getElementById("cilindro3").addEventListener("click", function () {
                                       plotaGrafico("cilindro3");
                                    }, false);
                                    document.getElementById("cilindro4").addEventListener("click", function () {
                                       plotaGrafico("cilindro4");
                                    }, false);
                                    document.getElementById("cilindro5").addEventListener("click", function () {
                                       plotaGrafico("cilindro5");
                                    }, false);
                                    document.getElementById("cilindro6").addEventListener("click", function () {
                                       plotaGrafico("cilindro6");
                                    }, false);
                                    document.getElementById("cilindro7").addEventListener("click", function () {
                                       plotaGrafico("cilindro7");
                                    }, false);
                                    document.getElementById("posInjecao1").addEventListener("click", function () {
                                       plotaGrafico("posInjecao1");
                                    }, false);
                                    document.getElementById("posInjecao2").addEventListener("click", function () {
                                       plotaGrafico("posInjecao2");
                                    }, false);
                                    document.getElementById("posInjecao3").addEventListener("click", function () {
                                       plotaGrafico("posInjecao3");
                                    }, false);
                                    document.getElementById("posInjecao4").addEventListener("click", function () {
                                       plotaGrafico("posInjecao4");
                                    }, false);
                                    document.getElementById("posInjecao5").addEventListener("click", function () {
                                       plotaGrafico("posInjecao5");
                                    }, false);
                                    document.getElementById("presInjecao1").addEventListener("click", function () {
                                       plotaGrafico("presInjecao1");
                                    }, false);
                                    document.getElementById("presInjecao2").addEventListener("click", function () {
                                       plotaGrafico("presInjecao2");
                                    }, false);
                                    document.getElementById("presInjecao3").addEventListener("click", function () {
                                       plotaGrafico("presInjecao3");
                                    }, false);
                                    document.getElementById("presInjecao4").addEventListener("click", function () {
                                       plotaGrafico("presInjecao4");
                                    }, false);
                                    document.getElementById("presInjecao5").addEventListener("click", function () {
                                       plotaGrafico("presInjecao5");
                                    }, false);
                                    document.getElementById("fluxoInjecao1").addEventListener("click", function () {
                                       plotaGrafico("fluxoInjecao1");
                                    }, false);
                                    document.getElementById("fluxoInjecao2").addEventListener("click", function () {
                                       plotaGrafico("fluxoInjecao2");
                                    }, false);
                                    document.getElementById("fluxoInjecao3").addEventListener("click", function () {
                                       plotaGrafico("fluxoInjecao3");
                                    }, false);
                                    document.getElementById("fluxoInjecao4").addEventListener("click", function () {
                                       plotaGrafico("fluxoInjecao4");
                                    }, false);
                                    document.getElementById("fluxoInjecao5").addEventListener("click", function () {
                                       plotaGrafico("fluxoInjecao5");
                                    }, false);
                                    document.getElementById("tempoDisparo").addEventListener("click", function () {
                                       plotaGrafico("tempoDisparo");
                                    }, false);
                                    document.getElementById("pressaoInj").addEventListener("click", function () {
                                       plotaGrafico("pressaoInj");
                                    }, false);
                                    document.getElementById("presRecalque1").addEventListener("click", function () {
                                       plotaGrafico("presRecalque1");
                                    }, false);
                                    document.getElementById("presRecalque2").addEventListener("click", function () {
                                       plotaGrafico("presRecalque2");
                                    }, false);
                                    document.getElementById("presRecalque3").addEventListener("click", function () {
                                       plotaGrafico("presRecalque3");
                                    }, false);
                                    document.getElementById("presRecalque4").addEventListener("click", function () {
                                       plotaGrafico("presRecalque4");
                                    }, false);
                                    document.getElementById("presRecalque5").addEventListener("click", function () {
                                       plotaGrafico("presRecalque5");
                                    }, false);
                                    document.getElementById("fluxoRecalque1").addEventListener("click", function () {
                                       plotaGrafico("fluxoRecalque1");
                                    }, false);
                                    document.getElementById("fluxoRecalque2").addEventListener("click", function () {
                                       plotaGrafico("fluxoRecalque2");
                                    }, false);
                                    document.getElementById("fluxoRecalque3").addEventListener("click", function () {
                                       plotaGrafico("fluxoRecalque3");
                                    }, false);
                                    document.getElementById("fluxoRecalque4").addEventListener("click", function () {
                                       plotaGrafico("fluxoRecalque4");
                                    }, false);
                                    document.getElementById("fluxoRecalque5").addEventListener("click", function () {
                                       plotaGrafico("fluxoRecalque5");
                                    }, false);
                                    document.getElementById("tempoRecalque1").addEventListener("click", function () {
                                       plotaGrafico("tempoRecalque1");
                                    }, false);
                                    document.getElementById("tempoRecalque2").addEventListener("click", function () {
                                       plotaGrafico("tempoRecalque2");
                                    }, false);
                                    document.getElementById("tempoRecalque3").addEventListener("click", function () {
                                       plotaGrafico("tempoRecalque3");
                                    }, false);
                                    document.getElementById("tempoRecalque4").addEventListener("click", function () {
                                       plotaGrafico("tempoRecalque4");
                                    }, false);
                                    document.getElementById("tempoRecalque5").addEventListener("click", function () {
                                       plotaGrafico("tempoRecalque5");
                                    }, false);
                                    document.getElementById("partDosagem1").addEventListener("click", function () {
                                       plotaGrafico("partDosagem1");
                                    }, false);
                                    document.getElementById("partDosagem2").addEventListener("click", function () {
                                       plotaGrafico("partDosagem2");
                                    }, false);
                                    document.getElementById("partDosagem3").addEventListener("click", function () {
                                       plotaGrafico("partDosagem3");
                                    }, false);
                                    document.getElementById("partDosagem4").addEventListener("click", function () {
                                       plotaGrafico("partDosagem4");
                                    }, false);
                                    document.getElementById("partDosagem5").addEventListener("click", function () {
                                       plotaGrafico("partDosagem5");
                                    }, false);
                                    document.getElementById("presDosagem1").addEventListener("click", function () {
                                       plotaGrafico("presDosagem1");
                                    }, false);
                                    document.getElementById("presDosagem2").addEventListener("click", function () {
                                       plotaGrafico("presDosagem2");
                                    }, false);
                                    document.getElementById("presDosagem3").addEventListener("click", function () {
                                       plotaGrafico("presDosagem3");
                                    }, false);
                                    document.getElementById("presDosagem4").addEventListener("click", function () {
                                       plotaGrafico("presDosagem4");
                                    }, false);
                                    document.getElementById("presDosagem5").addEventListener("click", function () {
                                       plotaGrafico("presDosagem5");
                                    }, false);
                                    document.getElementById("fluxoDosagem1").addEventListener("click", function () {
                                       plotaGrafico("fluxoDosagem1");
                                    }, false);
                                    document.getElementById("fluxoDosagem2").addEventListener("click", function () {
                                       plotaGrafico("fluxoDosagem2");
                                    }, false);
                                    document.getElementById("fluxoDosagem3").addEventListener("click", function () {
                                       plotaGrafico("fluxoDosagem3");
                                    }, false);
                                    document.getElementById("fluxoDosagem4").addEventListener("click", function () {
                                       plotaGrafico("fluxoDosagem4");
                                    }, false);
                                    document.getElementById("fluxoDosagem5").addEventListener("click", function () {
                                       plotaGrafico("fluxoDosagem5");
                                    }, false);
                                    document.getElementById("CPDosagem1").addEventListener("click", function () {
                                       plotaGrafico("CPDosagem1");
                                    }, false);
                                    document.getElementById("CPDosagem2").addEventListener("click", function () {
                                       plotaGrafico("CPDosagem2");
                                    }, false);
                                    document.getElementById("CPDosagem3").addEventListener("click", function () {
                                       plotaGrafico("CPDosagem3");
                                    }, false);
                                    document.getElementById("CPDosagem4").addEventListener("click", function () {
                                       plotaGrafico("CPDosagem4");
                                    }, false);
                                    document.getElementById("CPDosagem5").addEventListener("click", function () {
                                       plotaGrafico("CPDosagem5");
                                    }, false);
                                    document.getElementById("tempoDosagem").addEventListener("click", function () {
                                       plotaGrafico("tempoDosagem");
                                    }, false);
                                    document.getElementById("posFecha1").addEventListener("click", function () {
                                       plotaGrafico("posFecha1");
                                    }, false);
                                    document.getElementById("posFecha2").addEventListener("click", function () {
                                       plotaGrafico("posFecha2");
                                    }, false);
                                    document.getElementById("posFecha3").addEventListener("click", function () {
                                       plotaGrafico("posFecha3");
                                    }, false);
                                    document.getElementById("protMPos").addEventListener("click", function () {
                                       plotaGrafico("protMPos");
                                    }, false);
                                    document.getElementById("AltaPresPos").addEventListener("click", function () {
                                       plotaGrafico("AltaPresPos");
                                    }, false);
                                    document.getElementById("presFecha1").addEventListener("click", function () {
                                       plotaGrafico("presFecha1");
                                    }, false);
                                    document.getElementById("presFecha2").addEventListener("click", function () {
                                       plotaGrafico("presFecha2");
                                    }, false);
                                    document.getElementById("presFecha3").addEventListener("click", function () {
                                       plotaGrafico("presFecha3");
                                    }, false);
                                    document.getElementById("protMPres").addEventListener("click", function () {
                                       plotaGrafico("protMPres");
                                    }, false);
                                    document.getElementById("AltaPresPres").addEventListener("click", function () {
                                       plotaGrafico("AltaPresPres");
                                    }, false);
                                    document.getElementById("fluxoFecha1").addEventListener("click", function () {
                                       plotaGrafico("fluxoFecha1");
                                    }, false);
                                    document.getElementById("fluxoFecha2").addEventListener("click", function () {
                                       plotaGrafico("fluxoFecha2");
                                    }, false);
                                    document.getElementById("fluxoFecha3").addEventListener("click", function () {
                                       plotaGrafico("fluxoFecha3");
                                    }, false);
                                    document.getElementById("protMFluxo").addEventListener("click", function () {
                                       plotaGrafico("protMFluxo");
                                    }, false);
                                    document.getElementById("AltaPresFluxo").addEventListener("click", function () {
                                       plotaGrafico("AltaPresFluxo");
                                    }, false);
                                    document.getElementById("tempoProtMolde").addEventListener("click", function () {
                                       plotaGrafico("tempoProtMolde");
                                    }, false);
                                    document.getElementById("tempoFecha").addEventListener("click", function () {
                                       plotaGrafico("tempoFecha");
                                    }, false);
                                    document.getElementById("posAbertura1").addEventListener("click", function () {
                                       plotaGrafico("posAbertura1");
                                    }, false);
                                    document.getElementById("posAbertura2").addEventListener("click", function () {
                                       plotaGrafico("posAbertura2");
                                    }, false);
                                    document.getElementById("posAbertura3").addEventListener("click", function () {
                                       plotaGrafico("posAbertura3");
                                    }, false);
                                    document.getElementById("posAbertura4").addEventListener("click", function () {
                                       plotaGrafico("posAbertura4");
                                    }, false);
                                    document.getElementById("posAbertura5").addEventListener("click", function () {
                                       plotaGrafico("posAbertura5");
                                    }, false);
                                    document.getElementById("presAbertura1").addEventListener("click", function () {
                                       plotaGrafico("presAbertura1");
                                    }, false);
                                    document.getElementById("presAbertura2").addEventListener("click", function () {
                                       plotaGrafico("presAbertura2");
                                    }, false);
                                    document.getElementById("presAbertura3").addEventListener("click", function () {
                                       plotaGrafico("presAbertura3");
                                    }, false);
                                    document.getElementById("presAbertura4").addEventListener("click", function () {
                                       plotaGrafico("presAbertura4");
                                    }, false);
                                    document.getElementById("presAbertura5").addEventListener("click", function () {
                                       plotaGrafico("presAbertura5");
                                    }, false);
                                    document.getElementById("fluxoAbertura1").addEventListener("click", function () {
                                       plotaGrafico("fluxoAbertura1");
                                    }, false);
                                    document.getElementById("fluxoAbertura2").addEventListener("click", function () {
                                       plotaGrafico("fluxoAbertura2");
                                    }, false);
                                    document.getElementById("fluxoAbertura3").addEventListener("click", function () {
                                       plotaGrafico("fluxoAbertura3");
                                    }, false);
                                    document.getElementById("fluxoAbertura4").addEventListener("click", function () {
                                       plotaGrafico("fluxoAbertura4");
                                    }, false);
                                    document.getElementById("fluxoAbertura5").addEventListener("click", function () {
                                       plotaGrafico("fluxoAbertura5");
                                    }, false);
                                    document.getElementById("resfriamento").addEventListener("click", function () {
                                       plotaGrafico("resfriamento");
                                    }, false);
                                    document.getElementById("tempoAbertura").addEventListener("click", function () {
                                       plotaGrafico("tempoAbertura");
                                    }, false);
                                    document.getElementById("posAvanco1").addEventListener("click", function () {
                                       plotaGrafico("posAvanco1");
                                    }, false);
                                    document.getElementById("posAvanco2").addEventListener("click", function () {
                                       plotaGrafico("posAvanco2");
                                    }, false);
                                    document.getElementById("posAvanco3").addEventListener("click", function () {
                                       plotaGrafico("posAvanco3");
                                    }, false);
                                    document.getElementById("posRecuo1").addEventListener("click", function () {
                                       plotaGrafico("posRecuo1");
                                    }, false);
                                    document.getElementById("posRecuo2").addEventListener("click", function () {
                                       plotaGrafico("posRecuo2");
                                    }, false);
                                    document.getElementById("posRecuo3").addEventListener("click", function () {
                                       plotaGrafico("posRecuo3");
                                    }, false);
                                    document.getElementById("presAvanco1").addEventListener("click", function () {
                                       plotaGrafico("presAvanco1");
                                    }, false);
                                    document.getElementById("presAvanco2").addEventListener("click", function () {
                                       plotaGrafico("presAvanco2");
                                    }, false);
                                    document.getElementById("presAvanco3").addEventListener("click", function () {
                                       plotaGrafico("presAvanco3");
                                    }, false);
                                    document.getElementById("presRecuo1").addEventListener("click", function () {
                                       plotaGrafico("presRecuo1");
                                    }, false);
                                    document.getElementById("presRecuo2").addEventListener("click", function () {
                                       plotaGrafico("presRecuo2");
                                    }, false);
                                    document.getElementById("presRecuo3").addEventListener("click", function () {
                                       plotaGrafico("presRecuo3");
                                    }, false);
                                    document.getElementById("fluxoAvanco1").addEventListener("click", function () {
                                       plotaGrafico("fluxoAvanco1");
                                    }, false);
                                    document.getElementById("fluxoAvanco2").addEventListener("click", function () {
                                       plotaGrafico("fluxoAvanco2");
                                    }, false);
                                    document.getElementById("fluxoAvanco3").addEventListener("click", function () {
                                       plotaGrafico("fluxoAvanco3");
                                    }, false);
                                    document.getElementById("fluxoRecuo1").addEventListener("click", function () {
                                       plotaGrafico("fluxoRecuo1");
                                    }, false);
                                    document.getElementById("fluxoRecuo2").addEventListener("click", function () {
                                       plotaGrafico("fluxoRecuo2");
                                    }, false);
                                    document.getElementById("fluxoRecuo3").addEventListener("click", function () {
                                       plotaGrafico("fluxoRecuo3");
                                    }, false);
                                    document.getElementById("radialPresEntrada1").addEventListener("click", function () {
                                       plotaGrafico("radialPresEntrada1");
                                    }, false);
                                    document.getElementById("radialPresSaida1").addEventListener("click", function () {
                                       plotaGrafico("radialPresSaida1");
                                    }, false);
                                    document.getElementById("radialPresEntrada2").addEventListener("click", function () {
                                       plotaGrafico("radialPresEntrada2");
                                    }, false);
                                    document.getElementById("radialPresSaida2").addEventListener("click", function () {
                                       plotaGrafico("radialPresSaida2");
                                    }, false);
                                    document.getElementById("radialPresEntrada3").addEventListener("click", function () {
                                       plotaGrafico("radialPresEntrada3");
                                    }, false);
                                    document.getElementById("radialPresSaida3").addEventListener("click", function () {
                                       plotaGrafico("radialPresSaida3");
                                    }, false);
                                    document.getElementById("radialFluxoEntrada1").addEventListener("click", function () {
                                       plotaGrafico("radialFluxoEntrada1");
                                    }, false);
                                    document.getElementById("radialFluxoSaida1").addEventListener("click", function () {
                                       plotaGrafico("radialFluxoSaida1");
                                    }, false);
                                    document.getElementById("radialFluxoEntrada2").addEventListener("click", function () {
                                       plotaGrafico("radialFluxoEntrada2");
                                    }, false);
                                    document.getElementById("radialFluxoSaida2").addEventListener("click", function () {
                                       plotaGrafico("radialFluxoSaida2");
                                    }, false);
                                    document.getElementById("radialFluxoEntrada3").addEventListener("click", function () {
                                       plotaGrafico("radialFluxoEntrada3");
                                    }, false);
                                    document.getElementById("radialFluxoSaida3").addEventListener("click", function () {
                                       plotaGrafico("radialFluxoSaida3");
                                    }, false);
                                    document.getElementById("radialPosEntrada1").addEventListener("click", function () {
                                       plotaGrafico("radialPosEntrada1");
                                    }, false);
                                    document.getElementById("radialPosSaida1").addEventListener("click", function () {
                                       plotaGrafico("radialPosSaida1");
                                    }, false);
                                    document.getElementById("radialPosEntrada2").addEventListener("click", function () {
                                       plotaGrafico("radialPosEntrada2");
                                    }, false);
                                    document.getElementById("radialPosSaida2").addEventListener("click", function () {
                                       plotaGrafico("radialPosSaida2");
                                    }, false);
                                    document.getElementById("radialPosEntrada3").addEventListener("click", function () {
                                       plotaGrafico("radialPosEntrada3");
                                    }, false);
                                    document.getElementById("radialPosSaida3").addEventListener("click", function () {
                                       plotaGrafico("radialPosSaida3");
                                    }, false);
                                    document.getElementById("radialTempoEntrada1").addEventListener("click", function () {
                                       plotaGrafico("radialTempoEntrada1");
                                    }, false);
                                    document.getElementById("radialTempoSaida1").addEventListener("click", function () {
                                       plotaGrafico("radialTempoSaida1");
                                    }, false);
                                    document.getElementById("radialTempoEntrada2").addEventListener("click", function () {
                                       plotaGrafico("radialTempoEntrada2");
                                    }, false);
                                    document.getElementById("radialTempoSaida2").addEventListener("click", function () {
                                       plotaGrafico("radialTempoSaida2");
                                    }, false);
                                    document.getElementById("radialTempoEntrada3").addEventListener("click", function () {
                                       plotaGrafico("radialTempoEntrada3");
                                    }, false);
                                    document.getElementById("radialTempoSaida3").addEventListener("click", function () {
                                       plotaGrafico("radialTempoSaida3");
                                    }, false);
                                    document.getElementById("radialSCREntrada1").addEventListener("click", function () {
                                       plotaGrafico("radialSCREntrada1");
                                    }, false);
                                    document.getElementById("radialSCRSaida1").addEventListener("click", function () {
                                       plotaGrafico("radialSCRSaida1");
                                    }, false);
                                    document.getElementById("radialSCREntrada2").addEventListener("click", function () {
                                       plotaGrafico("radialSCREntrada2");
                                    }, false);
                                    document.getElementById("radialSCRSaida2").addEventListener("click", function () {
                                       plotaGrafico("radialSCRSaida2");
                                    }, false);
                                    document.getElementById("radialSCREntrada3").addEventListener("click", function () {
                                       plotaGrafico("radialSCREntrada3");
                                    }, false);
                                    document.getElementById("radialSCRSaida3").addEventListener("click", function () {
                                       plotaGrafico("radialSCRSaida3");
                                    }, false);
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

// GRAFICO PLOTLY
function plotaGrafico(area) {
   var dados = [];
   
   $.ajax({
      url: '/parametrosReais/' + $("#maquinas").val(),
      method: 'get',
      dataType: 'json',
      success: function (parametrosMaquina) {
         console.log("Entrou no parametrosReais")
         console.log(parametrosMaquina);
         var center;
         var limite_;
         var range_;
         
         if (area === "cilindro1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPERATURA_ZONA_1 - (nome.TEMPERATURA_ZONA_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.TEMPERATURA_ZONA_1 + (nome.TEMPERATURA_ZONA_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPERATURA_ZONA_1)
            })
         }
         if (area === "cilindro2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPERATURA_ZONA_2 - (nome.TEMPERATURA_ZONA_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.TEMPERATURA_ZONA_2 + (nome.TEMPERATURA_ZONA_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPERATURA_ZONA_2)
            })
         }
         if (area === "cilindro3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPERATURA_ZONA_3 - (nome.TEMPERATURA_ZONA_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.TEMPERATURA_ZONA_3 + (nome.TEMPERATURA_ZONA_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPERATURA_ZONA_3)
            })
         }
         if (area === "cilindro4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPERATURA_ZONA_4 - (nome.TEMPERATURA_ZONA_4 * 0.1)).toFixed(1));
               var max = parseInt((nome.TEMPERATURA_ZONA_4 + (nome.TEMPERATURA_ZONA_4 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPERATURA_ZONA_4)
            })
         }
         if (area === "cilindro5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPERATURA_ZONA_5 - (nome.TEMPERATURA_ZONA_5 * 0.1)).toFixed(1));
               var max = parseInt((nome.TEMPERATURA_ZONA_5 + (nome.TEMPERATURA_ZONA_5 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPERATURA_ZONA_5)
            })
         }
         if (area === "cilindro6") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPERATURA_ZONA_6 - (nome.TEMPERATURA_ZONA_6 * 0.1)).toFixed(1));
               var max = parseInt((nome.TEMPERATURA_ZONA_6 + (nome.TEMPERATURA_ZONA_6 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPERATURA_ZONA_6)
            })
         }
         if (area === "cilindro7") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPERATURA_ZONA_7 - (nome.TEMPERATURA_ZONA_7 * 0.1)).toFixed(1));
               var max = parseInt((nome.TEMPERATURA_ZONA_7 + (nome.TEMPERATURA_ZONA_7 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPERATURA_ZONA_7)
            })
         }
         if (area === "posInjecao1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_POSICAO_1 - (nome.INJECAO_POSICAO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_POSICAO_1 + (nome.INJECAO_POSICAO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_POSICAO_1)
            })
         }
         if (area === "posInjecao2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_POSICAO_2 - (nome.INJECAO_POSICAO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_POSICAO_2 + (nome.INJECAO_POSICAO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_POSICAO_2)
            })
         }
         if (area === "posInjecao3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_POSICAO_3 - (nome.INJECAO_POSICAO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_POSICAO_3 + (nome.INJECAO_POSICAO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_POSICAO_3)
            })
         }
         if (area === "posInjecao4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_POSICAO_4 - (nome.INJECAO_POSICAO_4 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_POSICAO_4 + (nome.INJECAO_POSICAO_4 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_POSICAO_4)
            })
         }
         if (area === "posInjecao5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_POSICAO_5 - (nome.INJECAO_POSICAO_5 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_POSICAO_5 + (nome.INJECAO_POSICAO_5 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_POSICAO_5)
            })
         }
         if (area === "presInjecao1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_PRESSAO_1 - (nome.INJECAO_PRESSAO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_PRESSAO_1 + (nome.INJECAO_PRESSAO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_PRESSAO_1)
            })
         }
         if (area === "presInjecao2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_PRESSAO_2 - (nome.INJECAO_PRESSAO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_PRESSAO_2 + (nome.INJECAO_PRESSAO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_PRESSAO_2)
            })
         }
         if (area === "presInjecao3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_PRESSAO_3 - (nome.INJECAO_PRESSAO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_PRESSAO_3 + (nome.INJECAO_PRESSAO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_PRESSAO_3)
            })
         }
         if (area === "presInjecao4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_PRESSAO_4 - (nome.INJECAO_PRESSAO_4 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_PRESSAO_4 + (nome.INJECAO_PRESSAO_4 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_PRESSAO_4)
            })
         }
         if (area === "presInjecao5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_PRESSAO_5 - (nome.INJECAO_PRESSAO_5 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_PRESSAO_5 + (nome.INJECAO_PRESSAO_5 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_PRESSAO_5)
            })
         }
         if (area === "fluxoInjecao1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_FLUXO_1 - (nome.INJECAO_FLUXO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_FLUXO_1 + (nome.INJECAO_FLUXO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_FLUXO_1)
            })
         }
         if (area === "fluxoInjecao2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_FLUXO_2 - (nome.INJECAO_FLUXO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_FLUXO_2 + (nome.INJECAO_FLUXO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_FLUXO_2)
            })
         }
         if (area === "fluxoInjecao3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_FLUXO_3 - (nome.INJECAO_FLUXO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_FLUXO_3 + (nome.INJECAO_FLUXO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_FLUXO_3)
            })
         }
         if (area === "fluxoInjecao4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_FLUXO_4 - (nome.INJECAO_FLUXO_4 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_FLUXO_4 + (nome.INJECAO_FLUXO_4 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_FLUXO_4)
            })
         }
         if (area === "fluxoInjecao5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_FLUXO_5 - (nome.INJECAO_FLUXO_5 * 0.1)).toFixed(1));
               var max = parseInt((nome.INJECAO_FLUXO_5 + (nome.INJECAO_FLUXO_5 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_FLUXO_5)
            })
         }
         if (area === "tempoDisparo") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPO_DISPARO - (nome.TEMPO_DISPARO * 0.1)).toFixed(1));
               var max = parseInt((nome.TEMPO_DISPARO + (nome.TEMPO_DISPARO * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPO_DISPARO)
            })
         }
         if (area === "pressaoInj") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPO_INJECAO - (nome.TEMPO_INJECAO * 0.1)).toFixed(1));
               var max = parseInt((nome.TEMPO_INJECAO + (nome.TEMPO_INJECAO * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPO_INJECAO)
            })
         }
         if (area === "presRecalque1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_PRESSAO_1 - (nome.RECALQUE_PRESSAO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_PRESSAO_1 + (nome.RECALQUE_PRESSAO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_PRESSAO_1)
            })
         }
         if (area === "presRecalque2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_PRESSAO_2 - (nome.RECALQUE_PRESSAO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_PRESSAO_2 + (nome.RECALQUE_PRESSAO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_PRESSAO_2)
            })
         }
         if (area === "presRecalque3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_PRESSAO_3 - (nome.RECALQUE_PRESSAO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_PRESSAO_3 + (nome.RECALQUE_PRESSAO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_PRESSAO_3)
            })
         }
         if (area === "presRecalque4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_PRESSAO_4 - (nome.RECALQUE_PRESSAO_4 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_PRESSAO_4 + (nome.RECALQUE_PRESSAO_4 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_PRESSAO_4)
            })
         }
         if (area === "presRecalque5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_PRESSAO_5 - (nome.RECALQUE_PRESSAO_5 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_PRESSAO_5 + (nome.RECALQUE_PRESSAO_5 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_PRESSAO_5)
            })
         }
         if (area === "fluxoRecalque1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_FLUXO_1 - (nome.RECALQUE_FLUXO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_FLUXO_1 + (nome.RECALQUE_FLUXO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_FLUXO_1)
            })
         }
         if (area === "fluxoRecalque2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_FLUXO_2 - (nome.RECALQUE_FLUXO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_FLUXO_2 + (nome.RECALQUE_FLUXO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_FLUXO_2)
            })
         }
         if (area === "fluxoRecalque3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_FLUXO_3 - (nome.RECALQUE_FLUXO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_FLUXO_3 + (nome.RECALQUE_FLUXO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_FLUXO_3)
            })
         }
         if (area === "fluxoRecalque4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_FLUXO_4 - (nome.RECALQUE_FLUXO_4 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_FLUXO_4 + (nome.RECALQUE_FLUXO_4 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_FLUXO_4)
            })
         }
         if (area === "fluxoRecalque5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_FLUXO_5 - (nome.RECALQUE_FLUXO_5 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_FLUXO_5 + (nome.RECALQUE_FLUXO_5 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_FLUXO_5)
            })
         }
         if (area === "tempoRecalque1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_TEMPO_1 - (nome.RECALQUE_TEMPO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_TEMPO_1 + (nome.RECALQUE_TEMPO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_TEMPO_1)
            })
         }
         if (area === "tempoRecalque2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_TEMPO_2 - (nome.RECALQUE_TEMPO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_TEMPO_2 + (nome.RECALQUE_TEMPO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_TEMPO_2)
            })
         }
         if (area === "tempoRecalque3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_TEMPO_3 - (nome.RECALQUE_TEMPO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_TEMPO_3 + (nome.RECALQUE_TEMPO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_TEMPO_3)
            })
         }
         if (area === "tempoRecalque4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_TEMPO_4 - (nome.RECALQUE_TEMPO_4 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_TEMPO_4 + (nome.RECALQUE_TEMPO_4 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_TEMPO_4)
            })
         }
         if (area === "tempoRecalque5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_TEMPO_5 - (nome.RECALQUE_TEMPO_5 * 0.1)).toFixed(1));
               var max = parseInt((nome.RECALQUE_TEMPO_5 + (nome.RECALQUE_TEMPO_5 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_TEMPO_5)
            })
         }
         if (area === "partDosagem1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PARTIDA_1 - (nome.DOSAGEM_PARTIDA_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PARTIDA_1 + (nome.DOSAGEM_PARTIDA_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PARTIDA_1)
            })
         }
         if (area === "partDosagem2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PARTIDA_2 - (nome.DOSAGEM_PARTIDA_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PARTIDA_2 + (nome.DOSAGEM_PARTIDA_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PARTIDA_2)
            })
         }
         if (area === "partDosagem3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PARTIDA_3 - (nome.DOSAGEM_PARTIDA_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PARTIDA_3 + (nome.DOSAGEM_PARTIDA_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PARTIDA_3)
            })
         }
         if (area === "partDosagem4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PARTIDA_4 - (nome.DOSAGEM_PARTIDA_4 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PARTIDA_4 + (nome.DOSAGEM_PARTIDA_4 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PARTIDA_4)
            })
         }
         if (area === "partDosagem5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PARTIDA_5 - (nome.DOSAGEM_PARTIDA_5 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PARTIDA_5 + (nome.DOSAGEM_PARTIDA_5 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PARTIDA_5)
            })
         }
         if (area === "presDosagem1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PRESSAO_1 - (nome.DOSAGEM_PRESSAO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PRESSAO_1 + (nome.DOSAGEM_PRESSAO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PRESSAO_1)
            })
         }
         if (area === "presDosagem2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PRESSAO_2 - (nome.DOSAGEM_PRESSAO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PRESSAO_2 + (nome.DOSAGEM_PRESSAO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PRESSAO_2)
            })
         }
         if (area === "presDosagem3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PRESSAO_3 - (nome.DOSAGEM_PRESSAO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PRESSAO_3 + (nome.DOSAGEM_PRESSAO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PRESSAO_3)
            })
         }
         if (area === "presDosagem4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PRESSAO_4 - (nome.DOSAGEM_PRESSAO_4 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PRESSAO_4 + (nome.DOSAGEM_PRESSAO_4 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PRESSAO_4)
            })
         }
         if (area === "presDosagem5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PRESSAO_5 - (nome.DOSAGEM_PRESSAO_5 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PRESSAO_5 + (nome.DOSAGEM_PRESSAO_5 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PRESSAO_5)
            })
         }
         if (area === "fluxoDosagem1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_FLUXO_1 - (nome.DOSAGEM_FLUXO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_FLUXO_1 + (nome.DOSAGEM_FLUXO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_FLUXO_1)
            })
         }
         if (area === "fluxoDosagem2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_FLUXO_2 - (nome.DOSAGEM_FLUXO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_FLUXO_2 + (nome.DOSAGEM_FLUXO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_FLUXO_2)
            })
         }
         if (area === "fluxoDosagem3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_FLUXO_3 - (nome.DOSAGEM_FLUXO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_FLUXO_3 + (nome.DOSAGEM_FLUXO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_FLUXO_3)
            })
         }
         if (area === "fluxoDosagem4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_FLUXO_4 - (nome.DOSAGEM_FLUXO_4 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_FLUXO_4 + (nome.DOSAGEM_FLUXO_4 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_FLUXO_4)
            })
         }
         if (area === "fluxoDosagem5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_FLUXO_5 - (nome.DOSAGEM_FLUXO_5 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_FLUXO_5 + (nome.DOSAGEM_FLUXO_5 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_FLUXO_5)
            })
         }
         if (area === "CPDosagem1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_CONTRAPRESSAO_1 - (nome.DOSAGEM_CONTRAPRESSAO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_CONTRAPRESSAO_1 + (nome.DOSAGEM_CONTRAPRESSAO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_CONTRAPRESSAO_1)
            })
         }
         if (area === "CPDosagem2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_CONTRAPRESSAO_2 - (nome.DOSAGEM_CONTRAPRESSAO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_CONTRAPRESSAO_2 + (nome.DOSAGEM_CONTRAPRESSAO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_CONTRAPRESSAO_2)
            })
         }
         if (area === "CPDosagem3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_CONTRAPRESSAO_3 - (nome.DOSAGEM_CONTRAPRESSAO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_CONTRAPRESSAO_3 + (nome.DOSAGEM_CONTRAPRESSAO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_CONTRAPRESSAO_3)
            })
         }
         if (area === "CPDosagem4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_CONTRAPRESSAO_4 - (nome.DOSAGEM_CONTRAPRESSAO_4 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_CONTRAPRESSAO_4 + (nome.DOSAGEM_CONTRAPRESSAO_4 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_CONTRAPRESSAO_4)
            })
         }
         if (area === "CPDosagem5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_CONTRAPRESSAO_5 - (nome.DOSAGEM_CONTRAPRESSAO_5 * 0.1)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_CONTRAPRESSAO_5 + (nome.DOSAGEM_CONTRAPRESSAO_5 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_CONTRAPRESSAO_5)
            })
         }
         if (area === "tempoDosagem") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPO_DOSAGEM - (nome.TEMPO_DOSAGEM * 0.1)).toFixed(1));
               var max = parseInt((nome.TEMPO_DOSAGEM + (nome.TEMPO_DOSAGEM * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPO_DOSAGEM)
            })
         }
         if (area === "posFecha1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_POSICAO_1 - (nome.FECHAMENTO_POSICAO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_POSICAO_1 + (nome.FECHAMENTO_POSICAO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_POSICAO_1)
            })
         }
         if (area === "posFecha2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_POSICAO_2 - (nome.FECHAMENTO_POSICAO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_POSICAO_2 + (nome.FECHAMENTO_POSICAO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_POSICAO_2)
            })
         }
         if (area === "posFecha3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_POSICAO_3 - (nome.FECHAMENTO_POSICAO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_POSICAO_3 + (nome.FECHAMENTO_POSICAO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_POSICAO_3)
            })
         }
         if (area === "protMPos") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_POSICAO_PROTECAO_MOLDE - (nome.FECHAMENTO_POSICAO_PROTECAO_MOLDE * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_POSICAO_PROTECAO_MOLDE + (nome.FECHAMENTO_POSICAO_PROTECAO_MOLDE * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_POSICAO_PROTECAO_MOLDE)
            })
         }
         if (area === "AltaPresPos") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_POSICAO_ALTA_PRESSAO - (nome.FECHAMENTO_POSICAO_ALTA_PRESSAO * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_POSICAO_ALTA_PRESSAO + (nome.FECHAMENTO_POSICAO_ALTA_PRESSAO * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_POSICAO_ALTA_PRESSAO)
            })
         }
         if (area === "presFecha1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_PRESSAO_1 - (nome.FECHAMENTO_PRESSAO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_PRESSAO_1 + (nome.FECHAMENTO_PRESSAO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_PRESSAO_1)
            })
         }
         if (area === "presFecha2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_PRESSAO_2 - (nome.FECHAMENTO_PRESSAO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_PRESSAO_2 + (nome.FECHAMENTO_PRESSAO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_PRESSAO_2)
            })
         }
         if (area === "presFecha3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_PRESSAO_3 - (nome.FECHAMENTO_PRESSAO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_PRESSAO_3 + (nome.FECHAMENTO_PRESSAO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_PRESSAO_3)
            })
         }
         if (area === "protMPres") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_PRESSAO_PROTECAO_MOLDE - (nome.FECHAMENTO_PRESSAO_PROTECAO_MOLDE * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_PRESSAO_PROTECAO_MOLDE + (nome.FECHAMENTO_PRESSAO_PROTECAO_MOLDE * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_PRESSAO_PROTECAO_MOLDE)
            })
         }
         if (area === "AltaPresPres") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_PRESSAO_ALTA_PRESSAO - (nome.FECHAMENTO_PRESSAO_ALTA_PRESSAO * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_PRESSAO_ALTA_PRESSAO + (nome.FECHAMENTO_PRESSAO_ALTA_PRESSAO * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_PRESSAO_ALTA_PRESSAO)
            })
         }
         if (area === "fluxoFecha1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_FLUXO_1 - (nome.FECHAMENTO_FLUXO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_FLUXO_1 + (nome.FECHAMENTO_FLUXO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_FLUXO_1)
            })
         }
         if (area === "fluxoFecha2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_FLUXO_2 - (nome.FECHAMENTO_FLUXO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_FLUXO_2 + (nome.FECHAMENTO_FLUXO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_FLUXO_2)
            })
         }
         if (area === "fluxoFecha3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_FLUXO_3 - (nome.FECHAMENTO_FLUXO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_FLUXO_3 + (nome.FECHAMENTO_FLUXO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_FLUXO_3)
            })
         }
         if (area === "protMFluxo") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_FLUXO_PROTECAO_MOLDE - (nome.FECHAMENTO_FLUXO_PROTECAO_MOLDE * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_FLUXO_PROTECAO_MOLDE + (nome.FECHAMENTO_FLUXO_PROTECAO_MOLDE * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_FLUXO_PROTECAO_MOLDE)
            })
         }
         if (area === "AltaPresFluxo") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_FLUXO_ALTA_PRESSAO - (nome.FECHAMENTO_FLUXO_ALTA_PRESSAO * 0.1)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_FLUXO_ALTA_PRESSAO + (nome.FECHAMENTO_FLUXO_ALTA_PRESSAO * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_FLUXO_ALTA_PRESSAO)
            })
         }
         if (area === "tempoProtMolde") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPO_PROTECAO_MOLDE - (nome.TEMPO_PROTECAO_MOLDE * 0.1)).toFixed(1));
               var max = parseInt((nome.TEMPO_PROTECAO_MOLDE + (nome.TEMPO_PROTECAO_MOLDE * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPO_PROTECAO_MOLDE)
            })
         }
         if (area === "tempoFecha") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPO_FECHAMENTO - (nome.TEMPO_FECHAMENTO * 0.1)).toFixed(1));
               var max = parseInt((nome.TEMPO_FECHAMENTO + (nome.TEMPO_FECHAMENTO * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPO_FECHAMENTO)
            })
         }
         if (area === "posAbertura1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_POSICAO_1 - (nome.ABERTURA_POSICAO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_POSICAO_1 + (nome.ABERTURA_POSICAO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_POSICAO_1)
            })
         }
         if (area === "posAbertura2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_POSICAO_2 - (nome.ABERTURA_POSICAO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_POSICAO_2 + (nome.ABERTURA_POSICAO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_POSICAO_2)
            })
         }
         if (area === "posAbertura3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_POSICAO_3 - (nome.ABERTURA_POSICAO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_POSICAO_3 + (nome.ABERTURA_POSICAO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_POSICAO_3)
            })
         }
         if (area === "posAbertura4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_POSICAO_4 - (nome.ABERTURA_POSICAO_4 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_POSICAO_4 + (nome.ABERTURA_POSICAO_4 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_POSICAO_4)
            })
         }
         if (area === "posAbertura5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_POSICAO_5 - (nome.ABERTURA_POSICAO_5 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_POSICAO_5 + (nome.ABERTURA_POSICAO_5 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_POSICAO_5)
            })
         }
         if (area === "presAbertura1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_PRESSAO_1 - (nome.ABERTURA_PRESSAO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_PRESSAO_1 + (nome.ABERTURA_PRESSAO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_PRESSAO_1)
            })
         }
         if (area === "presAbertura2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_PRESSAO_2 - (nome.ABERTURA_PRESSAO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_PRESSAO_2 + (nome.ABERTURA_PRESSAO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_PRESSAO_2)
            })
         }
         if (area === "presAbertura3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_PRESSAO_3 - (nome.ABERTURA_PRESSAO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_PRESSAO_3 + (nome.ABERTURA_PRESSAO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_PRESSAO_3)
            })
         }
         if (area === "presAbertura4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_PRESSAO_4 - (nome.ABERTURA_PRESSAO_4 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_PRESSAO_4 + (nome.ABERTURA_PRESSAO_4 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_PRESSAO_4)
            })
         }
         if (area === "presAbertura5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_PRESSAO_5 - (nome.ABERTURA_PRESSAO_5 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_PRESSAO_5 + (nome.ABERTURA_PRESSAO_5 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_PRESSAO_5)
            })
         }
         if (area === "fluxoAbertura1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_FLUXO_1 - (nome.ABERTURA_FLUXO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_FLUXO_1 + (nome.ABERTURA_FLUXO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_FLUXO_1)
            })
         }
         if (area === "fluxoAbertura2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_FLUXO_2 - (nome.ABERTURA_FLUXO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_FLUXO_2 + (nome.ABERTURA_FLUXO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_FLUXO_2)
            })
         }
         if (area === "fluxoAbertura3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_FLUXO_3 - (nome.ABERTURA_FLUXO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_FLUXO_3 + (nome.ABERTURA_FLUXO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_FLUXO_3)
            })
         }
         if (area === "fluxoAbertura4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_FLUXO_4 - (nome.ABERTURA_FLUXO_4 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_FLUXO_4 + (nome.ABERTURA_FLUXO_4 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_FLUXO_4)
            })
         }
         if (area === "fluxoAbertura5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_FLUXO_5 - (nome.ABERTURA_FLUXO_5 * 0.1)).toFixed(1));
               var max = parseInt((nome.ABERTURA_FLUXO_5 + (nome.ABERTURA_FLUXO_5 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_FLUXO_5)
            })
         }
         if (area === "resfriamento") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPO_RESFRIAMENT0 - (nome.TEMPO_RESFRIAMENT0 * 0.1)).toFixed(1));
               var max = parseInt((nome.TEMPO_RESFRIAMENT0 + (nome.TEMPO_RESFRIAMENT0 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPO_RESFRIAMENT0)
            })
         }
         if (area === "tempoAbertura") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPO_ABERTURA - (nome.TEMPO_ABERTURA * 0.1)).toFixed(1));
               var max = parseInt((nome.TEMPO_ABERTURA + (nome.TEMPO_ABERTURA * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPO_ABERTURA)
            })
         }
         if (area === "posAvanco1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_POSICAO_AVANCO_1 - (nome.EXTRACAO_POSICAO_AVANCO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_POSICAO_AVANCO_1 + (nome.EXTRACAO_POSICAO_AVANCO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_POSICAO_AVANCO_1)
            })
         }
         if (area === "posAvanco2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_POSICAO_AVANCO_2 - (nome.EXTRACAO_POSICAO_AVANCO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_POSICAO_AVANCO_2 + (nome.EXTRACAO_POSICAO_AVANCO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_POSICAO_AVANCO_2)
            })
         }
         if (area === "posAvanco3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_POSICAO_AVANCO_3 - (nome.EXTRACAO_POSICAO_AVANCO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_POSICAO_AVANCO_3 + (nome.EXTRACAO_POSICAO_AVANCO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_POSICAO_AVANCO_3)
            })
         }
         if (area === "posRecuo1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_POSICAO_RECUO_3 - (nome.EXTRACAO_POSICAO_RECUO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_POSICAO_RECUO_3 + (nome.EXTRACAO_POSICAO_RECUO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_POSICAO_RECUO_3)
            })
         }
         if (area === "posRecuo2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_POSICAO_RECUO_2 - (nome.EXTRACAO_POSICAO_RECUO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_POSICAO_RECUO_2 + (nome.EXTRACAO_POSICAO_RECUO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_POSICAO_RECUO_2)
            })
         }
         if (area === "posRecuo3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_POSICAO_RECUO_1 - (nome.EXTRACAO_POSICAO_RECUO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_POSICAO_RECUO_1 + (nome.EXTRACAO_POSICAO_RECUO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_POSICAO_RECUO_1)
            })
         }
         if (area === "presAvanco1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_PRESSAO_AVANCO_1 - (nome.EXTRACAO_PRESSAO_AVANCO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_PRESSAO_AVANCO_1 + (nome.EXTRACAO_PRESSAO_AVANCO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_PRESSAO_AVANCO_1)
            })
         }
         if (area === "presAvanco2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_PRESSAO_AVANCO_2 - (nome.EXTRACAO_PRESSAO_AVANCO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_PRESSAO_AVANCO_2 + (nome.EXTRACAO_PRESSAO_AVANCO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_PRESSAO_AVANCO_2)
            })
         }
         if (area === "presAvanco3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_PRESSAO_AVANCO_3 - (nome.EXTRACAO_PRESSAO_AVANCO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_PRESSAO_AVANCO_3 + (nome.EXTRACAO_PRESSAO_AVANCO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_PRESSAO_AVANCO_3)
            })
         }
         if (area === "presRecuo1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_PRESSAO_RECUO_3 - (nome.EXTRACAO_PRESSAO_RECUO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_PRESSAO_RECUO_3 + (nome.EXTRACAO_PRESSAO_RECUO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_PRESSAO_RECUO_3)
            })
         }
         if (area === "presRecuo2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_PRESSAO_RECUO_2 - (nome.EXTRACAO_PRESSAO_RECUO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_PRESSAO_RECUO_2 + (nome.EXTRACAO_PRESSAO_RECUO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_PRESSAO_RECUO_2)
            })
         }
         if (area === "presRecuo3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_PRESSAO_RECUO_1 - (nome.EXTRACAO_PRESSAO_RECUO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_PRESSAO_RECUO_1 + (nome.EXTRACAO_PRESSAO_RECUO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_PRESSAO_RECUO_1)
            })
         }
         if (area === "fluxoAvanco1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_FLUXO_AVANCO_1 - (nome.EXTRACAO_FLUXO_AVANCO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_FLUXO_AVANCO_1 + (nome.EXTRACAO_FLUXO_AVANCO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_FLUXO_AVANCO_1)
            })
         }
         if (area === "fluxoAvanco2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_FLUXO_AVANCO_2 - (nome.EXTRACAO_FLUXO_AVANCO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_FLUXO_AVANCO_2 + (nome.EXTRACAO_FLUXO_AVANCO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_FLUXO_AVANCO_2)
            })
         }
         if (area === "fluxoAvanco3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_FLUXO_AVANCO_3 - (nome.EXTRACAO_FLUXO_AVANCO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_FLUXO_AVANCO_3 + (nome.EXTRACAO_FLUXO_AVANCO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_FLUXO_AVANCO_3)
            })
         }
         if (area === "fluxoRecuo1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_FLUXO_RECUO_3 - (nome.EXTRACAO_FLUXO_RECUO_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_FLUXO_RECUO_3 + (nome.EXTRACAO_FLUXO_RECUO_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_FLUXO_RECUO_3)
            })
         }
         if (area === "fluxoRecuo2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_FLUXO_RECUO_2 - (nome.EXTRACAO_FLUXO_RECUO_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_FLUXO_RECUO_2 + (nome.EXTRACAO_FLUXO_RECUO_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_FLUXO_RECUO_2)
            })
         }
         if (area === "fluxoRecuo3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_FLUXO_RECUO_1 - (nome.EXTRACAO_FLUXO_RECUO_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_FLUXO_RECUO_1 + (nome.EXTRACAO_FLUXO_RECUO_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_FLUXO_RECUO_1)
            })
         }
         if (area === "radialPresEntrada1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_PRESSAO_ENTRADA_1 - (nome.RADIAL_PRESSAO_ENTRADA_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_PRESSAO_ENTRADA_1 + (nome.RADIAL_PRESSAO_ENTRADA_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_PRESSAO_ENTRADA_1)
            })
         }
         if (area === "radialPresSaida1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_PRESSAO_SAIDA_1 - (nome.RADIAL_PRESSAO_SAIDA_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_PRESSAO_SAIDA_1 + (nome.RADIAL_PRESSAO_SAIDA_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_PRESSAO_SAIDA_1)
            })
         }
         if (area === "radialPresEntrada2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_PRESSAO_ENTRADA_2 - (nome.RADIAL_PRESSAO_ENTRADA_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_PRESSAO_ENTRADA_2 + (nome.RADIAL_PRESSAO_ENTRADA_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_PRESSAO_ENTRADA_2)
            })
         }
         if (area === "radialPresSaida2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_PRESSAO_SAIDA_2 - (nome.RADIAL_PRESSAO_SAIDA_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_PRESSAO_SAIDA_2 + (nome.RADIAL_PRESSAO_SAIDA_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_PRESSAO_SAIDA_2)
            })
         }
         if (area === "radialPresEntrada3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_PRESSAO_ENTRADA_3 - (nome.RADIAL_PRESSAO_ENTRADA_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_PRESSAO_ENTRADA_3 + (nome.RADIAL_PRESSAO_ENTRADA_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_PRESSAO_ENTRADA_3)
            })
         }
         if (area === "radialPresSaida3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_PRESSAO_SAIDA_3 - (nome.RADIAL_PRESSAO_SAIDA_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_PRESSAO_SAIDA_3 + (nome.RADIAL_PRESSAO_SAIDA_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_PRESSAO_SAIDA_3)
            })
         }
         if (area === "radialFluxoEntrada1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_FLUXO_ENTRADA_1 - (nome.RADIAL_FLUXO_ENTRADA_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_FLUXO_ENTRADA_1 + (nome.RADIAL_FLUXO_ENTRADA_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_FLUXO_ENTRADA_1)
            })
         }
         if (area === "radialFluxoSaida1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_FLUXO_SAIDA_1 - (nome.RADIAL_FLUXO_SAIDA_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_FLUXO_SAIDA_1 + (nome.RADIAL_FLUXO_SAIDA_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_FLUXO_SAIDA_1)
            })
         }
         if (area === "radialFluxoEntrada2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_FLUXO_ENTRADA_2 - (nome.RADIAL_FLUXO_ENTRADA_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_FLUXO_ENTRADA_2 + (nome.RADIAL_FLUXO_ENTRADA_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_FLUXO_ENTRADA_2)
            })
         }
         if (area === "radialFluxoSaida2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_FLUXO_SAIDA_2 - (nome.RADIAL_FLUXO_SAIDA_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_FLUXO_SAIDA_2 + (nome.RADIAL_FLUXO_SAIDA_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_FLUXO_SAIDA_2)
            })
         }
         if (area === "radialFluxoEntrada3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_FLUXO_ENTRADA_3 - (nome.RADIAL_FLUXO_ENTRADA_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_FLUXO_ENTRADA_3 + (nome.RADIAL_FLUXO_ENTRADA_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_FLUXO_ENTRADA_3)
            })
         }
         if (area === "radialFluxoSaida3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_FLUXO_SAIDA_3 - (nome.RADIAL_FLUXO_SAIDA_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_FLUXO_SAIDA_3 + (nome.RADIAL_FLUXO_SAIDA_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_FLUXO_SAIDA_3)
            })
         }
         if (area === "radialPosEntrada1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_POSICAO_ENTRADA_1 - (nome.RADIAL_ACT_POSICAO_ENTRADA_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_POSICAO_ENTRADA_1 + (nome.RADIAL_ACT_POSICAO_ENTRADA_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_POSICAO_ENTRADA_1)
            })
         }
         if (area === "radialPosSaida1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_POSICAO_SAIDA_1 - (nome.RADIAL_ACT_POSICAO_SAIDA_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_POSICAO_SAIDA_1 + (nome.RADIAL_ACT_POSICAO_SAIDA_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_POSICAO_SAIDA_1)
            })
         }
         if (area === "radialPosEntrada2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_POSICAO_ENTRADA_2 - (nome.RADIAL_ACT_POSICAO_ENTRADA_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_POSICAO_ENTRADA_2 + (nome.RADIAL_ACT_POSICAO_ENTRADA_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_POSICAO_ENTRADA_2)
            })
         }
         if (area === "radialPosSaida2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_POSICAO_SAIDA_2 - (nome.RADIAL_ACT_POSICAO_SAIDA_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_POSICAO_SAIDA_2 + (nome.RADIAL_ACT_POSICAO_SAIDA_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_POSICAO_SAIDA_2)
            })
         }
         if (area === "radialPosEntrada3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_POSICAO_ENTRADA_3 - (nome.RADIAL_ACT_POSICAO_ENTRADA_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_POSICAO_ENTRADA_3 + (nome.RADIAL_ACT_POSICAO_ENTRADA_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_POSICAO_ENTRADA_3)
            })
         }
         if (area === "radialPosSaida3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_POSICAO_SAIDA_3 - (nome.RADIAL_ACT_POSICAO_SAIDA_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_POSICAO_SAIDA_3 + (nome.RADIAL_ACT_POSICAO_SAIDA_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_POSICAO_SAIDA_3)
            })
         }
         if (area === "radialTempoEntrada1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_TEMPO_ENTRADA_1 - (nome.RADIAL_ACT_TEMPO_ENTRADA_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_TEMPO_ENTRADA_1 + (nome.RADIAL_ACT_TEMPO_ENTRADA_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_TEMPO_ENTRADA_1)
            })
         }
         if (area === "radialTempoSaida1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_TEMPO_SAIDA_1 - (nome.RADIAL_ACT_TEMPO_SAIDA_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_TEMPO_SAIDA_1 + (nome.RADIAL_ACT_TEMPO_SAIDA_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_TEMPO_SAIDA_1)
            })
         }
         if (area === "radialTempoEntrada2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_TEMPO_ENTRADA_2 - (nome.RADIAL_ACT_TEMPO_ENTRADA_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_TEMPO_ENTRADA_2 + (nome.RADIAL_ACT_TEMPO_ENTRADA_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_TEMPO_ENTRADA_2)
            })
         }
         if (area === "radialTempoSaida2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_TEMPO_SAIDA_2 - (nome.RADIAL_ACT_TEMPO_SAIDA_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_TEMPO_SAIDA_2 + (nome.RADIAL_ACT_TEMPO_SAIDA_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_TEMPO_SAIDA_2)
            })
         }
         if (area === "radialTempoEntrada3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_TEMPO_ENTRADA_3 - (nome.RADIAL_ACT_TEMPO_ENTRADA_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_TEMPO_ENTRADA_3 + (nome.RADIAL_ACT_TEMPO_ENTRADA_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_TEMPO_ENTRADA_3)
            })
         }
         if (area === "radialTempoSaida3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_TEMPO_SAIDA_3 - (nome.RADIAL_ACT_TEMPO_SAIDA_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_TEMPO_SAIDA_3 + (nome.RADIAL_ACT_TEMPO_SAIDA_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_TEMPO_SAIDA_3)
            })
         }
         if (area === "radialSCREntrada1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_SCRCOUNT_ENTRADA_1 - (nome.RADIAL_SCRCOUNT_ENTRADA_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_SCRCOUNT_ENTRADA_1 + (nome.RADIAL_SCRCOUNT_ENTRADA_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_SCRCOUNT_ENTRADA_1)
            })
         }
         if (area === "radialSCRSaida1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_SCRCOUNT_SAIDA_1 - (nome.RADIAL_SCRCOUNT_SAIDA_1 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_SCRCOUNT_SAIDA_1 + (nome.RADIAL_SCRCOUNT_SAIDA_1 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_SCRCOUNT_SAIDA_1)
            })
         }
         if (area === "radialSCREntrada2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_SCRCOUNT_ENTRADA_2 - (nome.RADIAL_SCRCOUNT_ENTRADA_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_SCRCOUNT_ENTRADA_2 + (nome.RADIAL_SCRCOUNT_ENTRADA_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_SCRCOUNT_ENTRADA_2)
            })
         }
         if (area === "radialSCRSaida2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_SCRCOUNT_SAIDA_2 - (nome.RADIAL_SCRCOUNT_SAIDA_2 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_SCRCOUNT_SAIDA_2 + (nome.RADIAL_SCRCOUNT_SAIDA_2 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_SCRCOUNT_SAIDA_2)
            })
         }
         if (area === "radialSCREntrada3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_SCRCOUNT_ENTRADA_3 - (nome.RADIAL_SCRCOUNT_ENTRADA_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_SCRCOUNT_ENTRADA_3 + (nome.RADIAL_SCRCOUNT_ENTRADA_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_SCRCOUNT_ENTRADA_3)
            })
         }
         if (area === "radialSCRSaida3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_SCRCOUNT_SAIDA_3 - (nome.RADIAL_SCRCOUNT_SAIDA_3 * 0.1)).toFixed(1));
               var max = parseInt((nome.RADIAL_SCRCOUNT_SAIDA_3 + (nome.RADIAL_SCRCOUNT_SAIDA_3 * 0.1)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_SCRCOUNT_SAIDA_3)
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

         var CL = {
            type: 'scatter',
            x: [0.5, 30, null, 0.5, 30],
            y: limite_,
            mode: 'lines',
            name: 'Min/Max',
            showlegend: true,
            line: {
               color: 'red',
               width: 2,
               dash: 'dash'
            }
         }

         var Centre = {
            type: 'scatter',
            x: [0.5, 30],
            y: center,
            mode: 'lines',
            name: 'Center',
            showlegend: true,
            line: {
               color: 'grey',
               width: 2
            }
         }

         var data = [Data,CL,Centre]

         var layout = {
            title: "Basic SPC Chart",
            xaxis: {
              zeroline: false
            },
            yaxis: {
              range: range_,
              zeroline: false
            }
          }

         Plotly.newPlot('plotly', data, layout);
      }
   });
}