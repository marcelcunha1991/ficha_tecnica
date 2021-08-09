$("#editRevisao").hide();
$("#parametrosRevisao").hide();
$("#injet").hide();

var today = new Date();

var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

console.log('today: ' + today);

function getDate() {
   $("#data").val()
   today = $("#data").val();

   console.log('data escolhida: ' + today);

}

var MAQUINA_PARADA = "0";
var MAQUINA_TRABALHANDO = "1";
var MAQUINA_SEM_CONEXAO = "2";
var cdmolde = "0"; //variaveis globais
var dsproduto = "";
var valorProduto = "0";

//futuramente concatenar com o codigo injet da maquina
function chamadaInjet() {
   $("#injet").show();
   var stfuncionamento;
   var aguardandomolde;
   var cdestrutura;
   var cdproduto;
   var cdparada;
   var dsparada;
   var html = "";
   var opt = "";
   const trabalhandoColor = "success";
   const paradaColor = "danger";
   const semConexaoColor = "secondary";
   const aguardandoMoldeColor = "primary";
   var backgroundColor;
   var isSelect = false;

   $.ajax({
      url: '/maquinaById/' + $("#maquina").val(),
      method: 'get',
      dataType: 'json',
      success: function (codinjet) {

         $.ajax({
            url: '/getInjetData/' + codinjet.codigo,
            method: 'get',
            dataType: 'json',
            success: function (injet) {
               // console.log(injet)

               if (injet.length !== 0) {
                  injet[0].forEach(element => {
                     if (element.metadata.colName === "cdmolde") {
                        cdmolde = element.value;
                     }
                     if (element.metadata.colName === "cdestrutura") {
                        cdestrutura = element.value;
                        
                     }
                     if (element.metadata.colName === "cdproduto") {
                        cdproduto = element.value;
                        
                     }
                     if (element.metadata.colName === "dsproduto") {
                        dsproduto = element.value;
                        
                     }
                     if (element.metadata.colName === "stfuncionamento") {
                        stfuncionamento = element.value;
                        
                     }
                     if (element.metadata.colName === "aguardandomolde") {
                        aguardandomolde = element.value;
                        
                     }
                     if (element.metadata.colName === "cdparada") {
                        cdparada = element.value;
                        
                     }
                     if (element.metadata.colName === "dsparada") {
                        dsparada = element.value;
                        
                     }
                  });
         
                  //condição para o status da máquina
                  if(stfuncionamento === MAQUINA_SEM_CONEXAO) {
                     stfuncionamento = 'MÁQUINA SEM CONEXÃO';
                     backgroundColor = semConexaoColor;
         
                  } else if(aguardandomolde === 1){
                     stfuncionamento = 'MÁQUINA SEM OP/AGUARDANDO MOLDE';
                     backgroundColor = aguardandoMoldeColor;
         
                  } else if(stfuncionamento === MAQUINA_PARADA){
                     stfuncionamento = 'MÁQUINA PARADA';
                     backgroundColor = paradaColor;
                     
                  } else {
                     stfuncionamento = 'MÁQUINA TRABALHANDO';
                     backgroundColor = trabalhandoColor;
                     
                  }
                  //condição para molde
                  if(cdmolde === null) {
                     cdmolde = "";
         
                     if (cdmolde === "") {
                        $("#parametrosRevisao").hide();
                     }
                  }
                  //condição para molde
                  if(cdestrutura === null) {
                     cdestrutura = "";
                  }
                  //condição para produto
                  if(dsproduto === null) {
                     dsproduto = "";
                  }
                  //condição para maquina parada
                  if(cdparada === null) {
                     cdparada = "";
                  }
                  if(dsparada === null) {
                     dsparada = "";
                  }
         
                  //montando HTML
                  if (stfuncionamento === 'MÁQUINA PARADA') {
                     html += "<div class='d-flex mb-4 mt-2'>"
                     // + "<div class='mr-2' style='border-radius: 50%; width: 30px; height: 30px; background-color:" + backgroundColor + "'></div>"
         
                     + "<span id='status' class='mr-4 btn btn-" + backgroundColor + "'>" + stfuncionamento + "</span>"
                     + "<h5 class='mr-2 align-self-center'>Código Parada:</h5>"
                     + "<span id='cdParada' class='mr-4 align-self-center injetStatus'>" + cdparada + "</span>"
                     + "<h5 class='mr-2 align-self-center'>Descrição:</h5>"
                     + "<span id='dsParada' class='align-self-center injetStatus'>" + dsparada + "</span>"
                     + "</div>"
         
                  } else {
                     html += "<div class='d-flex mb-4'>"
                     + "<span id='status' class='mr-4 btn btn-" + backgroundColor + "'>" + stfuncionamento + "</span>"
                     + "</div>"
                  }
                  
                  //MONTANDO HTML COM CONDIÇÃO PARA MAIS DE UM PRODUTO
                  if (injet.length > 1 && cdmolde !== "") {
                     html += "<div class='d-flex'>"
                     + "<h5 class='mr-2'>Molde:</h5>"
                     + "<span id='molde' class='mr-4 injetStatus'>" + cdmolde + "/" + cdestrutura + "</span>"
                     + "<h5 class='mr-2'>Produto:</h5>"
                     + "<select id='produtos' class='form-control' style='width: fit-content'>"
                     + "</select>"
                     + "</div>"
         
                     for (let i = 0; i < injet.length; i++) {
                        const element = injet[i];
                        opt += "<option value='" + element[3].value + "'>" + element[3].value + "</option>"
                     }      
                     
                     isSelect = true;
         
                  } else if(cdmolde !== ""){
                     html += "<div class='d-flex'>"
                     + "<h5 class='mr-2'>Molde:</h5>"
                     + "<span id='molde' class='mr-4 align-self-center injetStatus'>" + cdmolde + "/" + cdestrutura + "</span>"
                     + "<h5 class='mr-2'>Produto:</h5>"
                     + "<span id='produto' class='align-self-center injetStatus'>" + dsproduto + "</span>"
                     + "</div>"

                     isSelect = false;
                  }
         
                  section = $("#dadosInjet");
                  section.html(html);
                  $('#produtos').html(opt);

                  if (isSelect === false) {
                     valorProduto = $("#produto").text();
                     
                  } else {
                     valorProduto = $("#produtos").val();
                     
                  }

               } else {
                  var texto = "<h5 style='text-align: center'>Dados injet não encontrado.</h5>"
                  section = $("#dadosInjet");
                  section.html(texto);
               }
               
            }
         })
     
      }
   })
}

$('#produtos').change(function () {
   valorProduto = $("#produtos").val();
   
});

var tolCilindro;
var tolInjecao;
var tolRecalque;
var tolDosagem;
var tolDescompressao;
var tolFechamento;
var tolAbertura;
var tolExtracao;
var tolRadial;
var tolCamara;
var tolValve;
var tolRefrigeracao;
var tolVapor;

var compara = true;

function form_submit() {
   
   $.ajax({
      url: '/authenticateEditRevisao/' + $("#email").val() + '/' + $("#password").val(),
      method: 'get',
      dataType: 'json',
      success: function (success) {
         if (success.error === "user not found") {
            showalert();
            
         } else {
            $('#loginModal').modal('hide');
            $("#editRevisao").show();
            $("#visualização").hide();
            $("#parametrosRevisao").hide();
            $("#editButton").hide();
            $("#options").hide();
            $("#tecnicoEdit").val(success.nome);
         }
      }
   })
}

function showalert() {

   $('#titulo').before('<div id="alertdiv" class="alert alert-warning"><a class="close" data-dismiss="alert">×</a><span>Usuário ou senha incorreta.</span></div>');

   setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs


     $("#alertdiv").fadeOut();

   }, 5000);
}

function editarRevisao() {
   $("#editRevisao").show();
   $("#visualização").hide();
   $("#parametrosRevisao").hide();
}

$.ajax({
   url: '/maquinaById/' + $("#maquina").val(),
   method: 'get',
   dataType: 'json',
   success: function (maquina_) {    

      // PREENCHE HEADER
      $.ajax({
         url: '/fichasUltimo/maquina/' + $("#maquina").val() + '/' + today,
         method: 'get',
         dataType: 'json',
         success: function (parametros) {

            $.ajax({
               url: '/ficha/getFichaPastoreInjetoresRevisao/' + parametros.mac + "/" + $("#revisao").val() + '/' + cdmolde + '/' + valorProduto,
               method: 'get',
               dataType: 'json',
               success: function (injetor) {
                  // console.log(injetor)

                  if (injetor !== false) {
                     $.ajax({
                        url: '/ficha/getFichaPastorePerifericosRevisao/' + parametros.mac + "/" + $("#revisao").val(),
                        method: 'get',
                        dataType: 'json',
                        success: function(perifericos) {
                           var headerCilindro = "";
   
                           if(injetor.tolCilindro === 0.1) {
                              tolCilindro = injetor.tolCilindro;
                              headerCilindro = "<th>TOL &#177; 10%</th>"
   
                           } else {
                              tolCilindro = injetor.tolCilindro;
                              headerCilindro = "<th>TOL &#177; 5%</th>"
                           }
                           
                           tableHead = $("#cilindro thead #headCilindro");
                           tableHead.append(headerCilindro);
   
                           var headerInjecao = "";
   
                           if(injetor.tolInjecao === 0.1) {
                              tolInjecao = injetor.tolInjecao;
                              headerInjecao = "<th>TOL &#177; 10%</th>"
                           
                           } else {
                              tolInjecao = injetor.tolInjecao;
                              headerInjecao = "<th>TOL &#177; 5%</th>"
                           }
                           
                           tableHead = $("#injecao thead #headInjecao");
                           tableHead.append(headerInjecao);
   
                           var headerRecalque = "";
   
                           if(injetor.tolRecalque === 0.1) {
                              tolRecalque = injetor.tolRecalque;
                              headerRecalque = "<th>TOL &#177; 10%</th>"
                           
                           } else {
                              tolRecalque = injetor.tolRecalque;
                              headerRecalque = "<th>TOL &#177; 5%</th>"
                           }
                           
                           tableHead = $("#recalque thead #headRecalque");
                           tableHead.append(headerRecalque);
                           
                           var headerDosagem = "";
   
                           if(injetor.tolDosagem === 0.1) {
                              tolDosagem = injetor.tolDosagem;
                              headerDosagem = "<th>TOL &#177; 10%</th>"
                           
                           } else {
                              tolDosagem = injetor.tolDosagem;
                              headerDosagem = "<th>TOL &#177; 5%</th>"
                           }
                           
                           tableHead = $("#dosagem thead #headDosagem");
                           tableHead.append(headerDosagem);
   
                           var headerDescompressao = "";
   
                           if(injetor.tolDescompressao === 0.1) {
                              tolDescompressao = injetor.tolDescompressao;
                              headerDescompressao = "<th>TOL &#177; 10%</th>"
                           
                           } else {
                              tolDescompressao = injetor.tolDescompressao;
                              headerDescompressao = "<th>TOL &#177; 5%</th>"
                           }
                           
                           tableHead = $("#descompressao thead #headDescompressao");
                           tableHead.append(headerDescompressao);
   
                           var headerFechamento = "";
   
                           if(injetor.tolFechamento === 0.1) {
                              tolFechamento = injetor.tolFechamento;
                              headerFechamento = "<th>TOL &#177; 10%</th>"
                           
                           } else {
                              tolFechamento = injetor.tolFechamento;
                              headerFechamento = "<th>TOL &#177; 5%</th>"
                           }
                           
                           tableHead = $("#fechamento thead #headFechamento");
                           tableHead.append(headerFechamento);
   
                           var headerAbertura = "";
   
                           if(injetor.tolAbertura === 0.1) {
                              tolAbertura = injetor.tolAbertura;
                              headerAbertura = "<th>TOL &#177; 10%</th>"
                           
                           } else {
                              tolAbertura = injetor.tolAbertura;
                              headerAbertura = "<th>TOL &#177; 5%</th>"
                           }
                           
                           tableHead = $("#abertura thead #headAbertura");
                           tableHead.append(headerAbertura);
   
                           var headerExtracao = "";
   
                           if(injetor.tolExtracao === 0.1) {
                              tolExtracao = injetor.tolExtracao;
                              headerExtracao = "<th>TOL &#177; 10%</th>"
                           
                           } else {
                              tolExtracao = injetor.tolExtracao;
                              headerExtracao = "<th>TOL &#177; 5%</th>"
                           }
                           
                           tableHead = $("#extracao thead #headExtracao");
                           tableHead.append(headerExtracao);
   
                           var headerRadial = "";
   
                           if(injetor.tolRadial === 0.1) {
                              tolRadial = injetor.tolRadial;
                              headerRadial = "<th>TOL &#177; 10%</th>"
                           
                           } else {
                              tolRadial = injetor.tolRadial;
                              headerRadial = "<th>TOL &#177; 5%</th>"
                           }
                           
                           tableHead = $("#radial thead #headRadial");
                           tableHead.append(headerRadial);
   
                           var headerCamara = "";
   
                           if(perifericos.tolCamara === 0.1) {
                              tolCamara = perifericos.tolCamara;
                              headerCamara = "<th>TOL &#177; 10%</th>"
                           
                           } else {
                              tolCamara = perifericos.tolCamara;
                              headerCamara = "<th>TOL &#177; 5°C</th>"
                           }
                           
                           tableHead = $("#camaraQuente thead #headCamara");
                           tableHead.append(headerCamara);
   
                           var headerValve = "";
   
                           if(perifericos.tolValve === 0.1) {
                              tolValve = perifericos.tolValve;
                              headerValve = "<th>TOL &#177; 10%</th>"
                           
                           } else {
                              tolValve = perifericos.tolValve;
                              headerValve = "<th>TOL &#177; 5%</th>"
                           }
                           
                           tableHead = $("#valveGate thead #headValve");
                           tableHead.append(headerValve);
   
                           var headerRefrigeracao = "";
   
                           if(perifericos.tolRefrigeracao === 0.1) {
                              tolRefrigeracao = perifericos.tolRefrigeracao;
                              headerRefrigeracao = "<th>TOL &#177; 10%</th>"
                           
                           } else {
                              tolRefrigeracao = perifericos.tolRefrigeracao;
                              headerRefrigeracao = "<th>TOL &#177; 5%</th>"
                           }
                           
                           tableHead = $("#refrigeracao thead #headRefrigeracao");
                           tableHead.append(headerRefrigeracao);
   
                           var headerVapor = "";
   
                           if(perifericos.tolVapor === 0.1) {
                              tolVapor = perifericos.tolVapor;
                              headerVapor = "<th>TOL &#177; 10%</th>"
                           
                           } else {
                              tolVapor = perifericos.tolVapor;
                              headerVapor = "<th>TOL &#177; 5%</th>"
                           }
                           
                           tableHead = $("#vapor thead #headVapor");
                           tableHead.append(headerVapor);
                        }
                     })
                  }

               }
            })
         }
      })
   }
})

function comparar() {
   if (compara === true) {
      chamadaInjet()
      $("#editButton").hide();

      $("#editRevisao").hide();
      $("#visualização").hide();
      $("#parametrosRevisao").show();
      $("#options").show();

      $("#comparaButton").html("Voltar Revisão");
      compara = false;

   } else {
      $("#injet").hide();
      $("#editButton").show();

      $("#editRevisao").hide();
      $("#visualização").show();
      $("#parametrosRevisao").hide();

      $("#comparaButton").html("Comparar Valores");
      compara = true;
   }
            
   setInterval(function () {

      $.ajax({
         url: '/maquinaById/' + $("#maquina").val(),
         method: 'get',
         dataType: 'json',
         success: function (maquina_) {    
            // console.log(maquina_)
      
            // PREENCHE TABELA DE FICHA TECNICA
            $.ajax({
               url: '/fichasUltimo/maquina/' + $("#maquina").val() + '/' + today,
               method: 'get',
               dataType: 'json',
               success: function (parametros) {
      
                  // console.log(parametros)

      
                  $.ajax({
                     url: '/ficha/getFichaPastoreInjetoresRevisao/' + parametros.mac + "/" + $("#revisao").val() + '/' + cdmolde + '/' + valorProduto,
                     method: 'get',
                     dataType: 'json',
                     success: function (injetor) {
                        // console.log(injetor)

                        if (injetor !== false) {
                           $.ajax({
                              url: '/ficha/getFichaPastorePerifericosRevisao/' + parametros.mac + "/" + $("#revisao").val(),
                              method: 'get',
                              dataType: 'json',
                              success: function(perifericos) {
                                 // console.log(perifericos)
   
                                 $.ajax({
                                    url: '/AutomacaoFabrica/temperaturaReal',
                                    method: 'get',
                                    dataType: 'json',
                                    success: function (temperatura) {
                                       // console.log(temperatura);
   
                                       $.ajax({
                                          url: '/AutomacaoFabrica/temperaturaCamara',
                                          method: 'get',
                                          dataType: 'json',
                                          success: function(camara) {
                                            //  console.log(camara)
   
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
   
                                             (injetor.cilindro1 !== 0 && (parametros.TEMPERATURA_ZONA_1 < (injetor.cilindro1 - (injetor.cilindro1 * injetor.tolCilindro)).toFixed(1) || parametros.TEMPERATURA_ZONA_1 > (injetor.cilindro1 + (injetor.cilindro1 * injetor.tolCilindro)).toFixed(1))) 
                                             ? cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro1 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_1 + "</span></p></td>"
                                             : cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.cilindro1 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_1 + "</span></p></td>";
                                                                           
                                             (injetor.cilindro2 !== 0 && (parametros.TEMPERATURA_ZONA_2 < (injetor.cilindro2 - (injetor.cilindro2 * injetor.tolCilindro)).toFixed(1) || parametros.TEMPERATURA_ZONA_2 > (injetor.cilindro2 + (injetor.cilindro2 * injetor.tolCilindro)).toFixed(1)))
                                             ? cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro2 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_2 + "</span></p></td>"
                                             : cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.cilindro2 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_2 + "</span></p></td>";
                                             
                                             (injetor.cilindro3 !== 0 && (parametros.TEMPERATURA_ZONA_3 < (injetor.cilindro3 - (injetor.cilindro3 * injetor.tolCilindro)).toFixed(1) || parametros.TEMPERATURA_ZONA_3 > (injetor.cilindro3 + (injetor.cilindro3 * injetor.tolCilindro)).toFixed(1)))
                                             ? cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro3 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_3 + "</span></p></td>"
                                             : cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.cilindro3 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_3 + "</span></p></td>";
   
                                             (injetor.cilindro4 !== 0 && (parametros.TEMPERATURA_ZONA_4 < (injetor.cilindro4 - (injetor.cilindro4 * injetor.tolCilindro)).toFixed(1) || parametros.TEMPERATURA_ZONA_4 > (injetor.cilindro4 + (injetor.cilindro4 * injetor.tolCilindro)).toFixed(1)))
                                             ? cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro4Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro4 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_4 + "</span></p></td>"
                                             : cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro4Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.cilindro4 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_4 + "</span></p></td>";
                                          
                                             (injetor.cilindro5 !== 0 && (parametros.TEMPERATURA_ZONA_5 < (injetor.cilindro5 - (injetor.cilindro5 * injetor.tolCilindro)).toFixed(1) || parametros.TEMPERATURA_ZONA_5 > (injetor.cilindro5 + (injetor.cilindro5 * injetor.tolCilindro)).toFixed(1)))
                                             ? cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro5Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro5 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_5 + "</span></p></td>"
                                             : cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro5Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.cilindro5 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_5 + "</span></p></td>";
   
                                             (injetor.cilindro6 !== 0 && (parametros.TEMPERATURA_ZONA_6 < (injetor.cilindro6 - (injetor.cilindro6 * injetor.tolCilindro)).toFixed(1) || parametros.TEMPERATURA_ZONA_6 > (injetor.cilindro6 + (injetor.cilindro6 * injetor.tolCilindro)).toFixed(1)))
                                             ? cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro6Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro6 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_6 + "</span></p></td>"
                                             : cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro6Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.cilindro6 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_6 + "</span></p></td>";
   
                                             (injetor.cilindro7 !== 0 && (parametros.TEMPERATURA_ZONA_7 < (injetor.cilindro7 - (injetor.cilindro7 * injetor.tolCilindro)).toFixed(1) || parametros.TEMPERATURA_ZONA_7 > (injetor.cilindro7 + (injetor.cilindro7 * injetor.tolCilindro)).toFixed(1)))
                                             ? cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro7Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.cilindro7 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_7 + "</span></p></td>"
                                             : cilindro += "<td data-toggle='modal' data-target='#myModal' id='cilindro7Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.cilindro7 + "</span> - <span class='reais'>" + parametros.TEMPERATURA_ZONA_7 + "</span></p></td>";
   
                                             tableBody = $("#cilindro tbody");
                                             tableBody.html(cilindro);
   
                                             var injecao = "<tr>" + 
                                                               "<th scope='row'>POSIÇÃO</th>" + 
                                                               "<td colspan='1'><p class='read-only'><span class='cadastrados'>" + injetor.posComut + "</span></p></td>";
   
                                             // injecao += "<td colspan='1'><p class='read-only'><span class='cadastrados'>" + injetor.posComut + "</span></p></td>"
   
                                             (injetor.posInjecao1 !== 0 && (parametros.INJECAO_POSICAO_5 < (injetor.posInjecao1 - (injetor.posInjecao1 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_POSICAO_5 > (injetor.posInjecao1 + (injetor.posInjecao1 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_5 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_5 + "</span></p></td>";
                                             
                                             (injetor.posInjecao2 !== 0 && (parametros.INJECAO_POSICAO_4 < (injetor.posInjecao2 - (injetor.posInjecao2 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_POSICAO_4 > (injetor.posInjecao2 + (injetor.posInjecao2 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_4 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_4 + "</span></p></td>";
   
                                             (injetor.posInjecao3 !== 0 && (parametros.INJECAO_POSICAO_3 < (injetor.posInjecao3 - (injetor.posInjecao3 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_POSICAO_3 > (injetor.posInjecao3 + (injetor.posInjecao3 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_3 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_3 + "</span></p></td>";
   
                                             (injetor.posInjecao4 !== 0 && (parametros.INJECAO_POSICAO_2 < (injetor.posInjecao4 - (injetor.posInjecao4 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_POSICAO_2 > (injetor.posInjecao4 + (injetor.posInjecao4 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao4Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_2 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao4Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_2 + "</span></p></td>";
   
                                             (injetor.posInjecao5 !== 0 && (parametros.INJECAO_POSICAO_1 < (injetor.posInjecao5 - (injetor.posInjecao5 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_POSICAO_1 > (injetor.posInjecao5 + (injetor.posInjecao5 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao5Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_1 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='posInjecao5Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_POSICAO_1 + "</span></p></td>";
   
                                             injecao += "</tr>";
   
                                             injecao += "<tr>" + 
                                                            "<th scope='row'>PRESSÃO</th>" + 
                                                            "<td colspan='1'><p class='read-only'><span class='cadastrados'>" + injetor.presComut + "</span></p></td>";
                                             
                                             (injetor.presInjecao1 !== 0 && (parametros.INJECAO_PRESSAO_5 < (injetor.presInjecao1 - (injetor.presInjecao1 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_PRESSAO_5 > (injetor.presInjecao1 + (injetor.presInjecao1 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_5 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_5 + "</span></p></td>";
                                             
                                             (injetor.presInjecao2 !== 0 && (parametros.INJECAO_PRESSAO_4 < (injetor.presInjecao2 - (injetor.presInjecao2 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_PRESSAO_4 > (injetor.presInjecao2 + (injetor.presInjecao2 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_4 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_4 + "</span></p></td>";
   
                                             (injetor.presInjecao3 !== 0 && (parametros.INJECAO_PRESSAO_3 < (injetor.presInjecao3 - (injetor.presInjecao3 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_PRESSAO_3 > (injetor.presInjecao3 + (injetor.presInjecao3 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_3 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_3 + "</span></p></td>";
   
                                             (injetor.presInjecao4 !== 0 && (parametros.INJECAO_PRESSAO_2 < (injetor.presInjecao4 - (injetor.presInjecao4 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_PRESSAO_2 > (injetor.presInjecao4 + (injetor.presInjecao4 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao4Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_2 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao4Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_2 + "</span></p></td>";
                                             
                                             (injetor.presInjecao5 !== 0 && (parametros.INJECAO_PRESSAO_1 < (injetor.presInjecao5 - (injetor.presInjecao5 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_PRESSAO_1 > (injetor.presInjecao5 + (injetor.presInjecao5 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao5Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_1 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='presInjecao5Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_PRESSAO_1 + "</span></p></td>";
   
                                             injecao += "</tr>";
   
                                             injecao += "<tr><th scope='row' colspan='2'>FLUXO</th>";
                                             
                                             (injetor.fluxoInjecao1 !== 0 && (parametros.INJECAO_FLUXO_5 < (injetor.fluxoInjecao1 - (injetor.fluxoInjecao1 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_FLUXO_5 > (injetor.fluxoInjecao1 + (injetor.fluxoInjecao1 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_5 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao1 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_5 + "</span></p></td>";
                                             
                                             (injetor.fluxoInjecao2 !== 0 && (parametros.INJECAO_FLUXO_4 < (injetor.fluxoInjecao2 - (injetor.fluxoInjecao2 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_FLUXO_4 > (injetor.fluxoInjecao2 + (injetor.fluxoInjecao2 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_4 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao2 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_4 + "</span></p></td>";
   
                                             (injetor.fluxoInjecao3 !== 0 && (parametros.INJECAO_FLUXO_3 < (injetor.fluxoInjecao3 - (injetor.fluxoInjecao3 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_FLUXO_3 > (injetor.fluxoInjecao3 + (injetor.fluxoInjecao3 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_3 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao3 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_3 + "</span></p></td>";
   
                                             (injetor.fluxoInjecao4 !== 0 && (parametros.INJECAO_FLUXO_2 < (injetor.fluxoInjecao4 - (injetor.fluxoInjecao4 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_FLUXO_2 > (injetor.fluxoInjecao4 + (injetor.fluxoInjecao4 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao4Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_2 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao4Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao4 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_2 + "</span></p></td>";
                                             
                                             (injetor.fluxoInjecao5 !== 0 && (parametros.INJECAO_FLUXO_1 < (injetor.fluxoInjecao5 - (injetor.fluxoInjecao5 * injetor.tolInjecao)).toFixed(1) || parametros.INJECAO_FLUXO_1 > (injetor.fluxoInjecao5 + (injetor.fluxoInjecao5 * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao5Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_1 + "</span></p></td>"
                                             : injecao += "<td data-toggle='modal' data-target='#myModal' id='fluxoInjecao5Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoInjecao5 + "</span> - <span class='reais'>" + parametros.INJECAO_FLUXO_1 + "</span></p></td>";
   
                                             injecao += "</tr>";
   
                                             var injecaoFoot = "<tr><th colspan='2'>TEMPO DISPARO:</th>";                              
   
                                             (injetor.tempoDisparo !== 0 && (parametros.TEMPO_DISPARO < (injetor.tempoDisparo - (injetor.tempoDisparo * injetor.tolInjecao)).toFixed(1) || parametros.TEMPO_DISPARO > (injetor.tempoDisparo + (injetor.tempoDisparo * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecaoFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoDisparoParams' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoDisparo + "</span> - <span class='reais'>" + parametros.TEMPO_DISPARO + "</span></p></td>"
                                             : injecaoFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoDisparoParams'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoDisparo + "</span> - <span class='reais'>" + parametros.TEMPO_DISPARO + "</span></p></td>";
                                             
                                             injecaoFoot += "<th colspan='3'>TEMPO DE PRESSÃO INJEÇÃO:</th>";
   
                                             (injetor.pressaoInj !== 0 && (parametros.TEMPO_INJECAO < (injetor.pressaoInj - (injetor.pressaoInj * injetor.tolInjecao)).toFixed(1) || parametros.TEMPO_INJECAO > (injetor.pressaoInj + (injetor.pressaoInj * injetor.tolInjecao)).toFixed(1))) 
                                             ? injecaoFoot += "<td data-toggle='modal' data-target='#myModal' id='pressaoInjParams' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.pressaoInj + "</span> - <span class='reais'>" + parametros.TEMPO_INJECAO + "</span></p></td>"
                                             : injecaoFoot += "<td data-toggle='modal' data-target='#myModal' id='pressaoInjParams'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.pressaoInj + "</span> - <span class='reais'>" + parametros.TEMPO_INJECAO + "</span></p></td>";
   
                                             injecaoFoot += "</tr>";
   
                                             tableBody = $("#injecao tbody");
                                             tableBody.html(injecao);
                                             
                                             tableFoot = $("#injecaoFoot");
                                             tableFoot.html(injecaoFoot);
   
                                             var recalque = "<tr><th scope='row' colspan='2'>PRESSÃO</th>";
   
                                             (injetor.presRecalque1 !== 0 && (parametros.RECALQUE_PRESSAO_5 < (injetor.presRecalque1 - (injetor.presRecalque1 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_PRESSAO_5 > (injetor.presRecalque1 + (injetor.presRecalque1 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_5 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_5 + "</span></p></td>";
                                             
                                             (injetor.presRecalque2 !== 0 && (parametros.RECALQUE_PRESSAO_4 < (injetor.presRecalque2 - (injetor.presRecalque2 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_PRESSAO_4 > (injetor.presRecalque2 + (injetor.presRecalque2 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_4 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_4 + "</span></p></td>";
                                             
                                             (injetor.presRecalque3 !== 0 && (parametros.RECALQUE_PRESSAO_3 < (injetor.presRecalque3 - (injetor.presRecalque3 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_PRESSAO_3 > (injetor.presRecalque3 + (injetor.presRecalque3 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_3 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_3 + "</span></p></td>";
                                             
                                             (injetor.presRecalque4 !== 0 && (parametros.RECALQUE_PRESSAO_2 < (injetor.presRecalque4 - (injetor.presRecalque4 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_PRESSAO_2 > (injetor.presRecalque4 + (injetor.presRecalque4 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque4Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_2 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque4Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_2 + "</span></p></td>";
                                             
                                             (injetor.presRecalque5 !== 0 && (parametros.RECALQUE_PRESSAO_1 < (injetor.presRecalque5 - (injetor.presRecalque5 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_PRESSAO_1 > (injetor.presRecalque5 + (injetor.presRecalque5 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque5Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_1 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='presRecalque5Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_PRESSAO_1 + "</span></p></td>";
   
                                             recalque += "</tr>";
   
                                             recalque += "<tr><th scope='row' colspan='2'>FLUXO</th>";
   
                                             (injetor.fluxoRecalque1 !== 0 && (parametros.RECALQUE_FLUXO_5 < (injetor.fluxoRecalque1 - (injetor.fluxoRecalque1 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_FLUXO_5 > (injetor.fluxoRecalque1 + (injetor.fluxoRecalque1 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_5 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_5 + "</span></p></td>";
                                             
                                             (injetor.fluxoRecalque2 !== 0 && (parametros.RECALQUE_FLUXO_4 < (injetor.fluxoRecalque2 - (injetor.fluxoRecalque2 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_FLUXO_4 > (injetor.fluxoRecalque2 + (injetor.fluxoRecalque2 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_4 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_4 + "</span></p></td>";
                                             
                                             (injetor.fluxoRecalque3 !== 0 && (parametros.RECALQUE_FLUXO_3 < (injetor.fluxoRecalque3 - (injetor.fluxoRecalque3 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_FLUXO_3 > (injetor.fluxoRecalque3 + (injetor.fluxoRecalque3 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_3 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_3 + "</span></p></td>";
                                             
                                             (injetor.fluxoRecalque4 !== 0 && (parametros.RECALQUE_FLUXO_2 < (injetor.fluxoRecalque4 - (injetor.fluxoRecalque4 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_FLUXO_2 > (injetor.fluxoRecalque4 + (injetor.fluxoRecalque4 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque4Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_2 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque4Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_2 + "</span></p></td>";
                                             
                                             (injetor.fluxoRecalque5 !== 0 && (parametros.RECALQUE_FLUXO_1 < (injetor.fluxoRecalque5 - (injetor.fluxoRecalque5 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_FLUXO_1 > (injetor.fluxoRecalque5 + (injetor.fluxoRecalque5 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque5Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_1 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecalque5Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_FLUXO_1 + "</span></p></td>";
   
                                             recalque += "</tr>";
   
                                             recalque += "<tr><th scope='row' colspan='2'>TEMPO</th>";
   
                                             (injetor.tempoRecalque1 !== 0 && (parametros.RECALQUE_TEMPO_5 < (injetor.tempoRecalque1 - (injetor.tempoRecalque1 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_TEMPO_5 > (injetor.tempoRecalque1 + (injetor.tempoRecalque1 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_5 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque1 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_5 + "</span></p></td>";
                                             
                                             (injetor.tempoRecalque2 !== 0 && (parametros.RECALQUE_TEMPO_4 < (injetor.tempoRecalque2 - (injetor.tempoRecalque2 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_TEMPO_4 > (injetor.tempoRecalque2 + (injetor.tempoRecalque2 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_4 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque2 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_4 + "</span></p></td>";
                                             
                                             (injetor.tempoRecalque3 !== 0 && (parametros.RECALQUE_TEMPO_3 < (injetor.tempoRecalque3 - (injetor.tempoRecalque3 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_TEMPO_3 > (injetor.tempoRecalque3 + (injetor.tempoRecalque3 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_3 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque3 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_3 + "</span></p></td>";
                                             
                                             (injetor.tempoRecalque4 !== 0 && (parametros.RECALQUE_TEMPO_2 < (injetor.tempoRecalque4 - (injetor.tempoRecalque4 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_TEMPO_2 > (injetor.tempoRecalque4 + (injetor.tempoRecalque4 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque4Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_2 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque4Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque4 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_2 + "</span></p></td>";
                                             
                                             (injetor.tempoRecalque5 !== 0 && (parametros.RECALQUE_TEMPO_1 < (injetor.tempoRecalque5 - (injetor.tempoRecalque5 * injetor.tolRecalque)).toFixed(1) || parametros.RECALQUE_TEMPO_1 > (injetor.tempoRecalque5 + (injetor.tempoRecalque5 * injetor.tolRecalque)).toFixed(1))) 
                                             ? recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque5Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_1 + "</span></p></td>"
                                             : recalque += "<td data-toggle='modal' data-target='#myModal' id='tempoRecalque5Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoRecalque5 + "</span> - <span class='reais'>" + parametros.RECALQUE_TEMPO_1 + "</span></p></td>";
   
                                             recalque += "</tr>";
                                             
                                             tableBody = $("#recalque tbody");
                                             tableBody.html(recalque);
   
                                             var dosagem = "<tr><th scope='row' colspan='2'>PARTIDA</th>";
   
                                             (injetor.partDosagem1 !== 0 && (parametros.DOSAGEM_PARTIDA_1 < (injetor.partDosagem1 - (injetor.partDosagem1 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_PARTIDA_1 > (injetor.partDosagem1 + (injetor.partDosagem1 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_1 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.partDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_1 + "</span></p></td>";
                                             
                                             (injetor.partDosagem2 !== 0 && (parametros.DOSAGEM_PARTIDA_2 < (injetor.partDosagem2 - (injetor.partDosagem2 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_PARTIDA_2 > (injetor.partDosagem2 + (injetor.partDosagem2 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_2 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.partDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_2 + "</span></p></td>";
                                             
                                             (injetor.partDosagem3 !== 0 && (parametros.DOSAGEM_PARTIDA_3 < (injetor.partDosagem3 - (injetor.partDosagem3 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_PARTIDA_3 > (injetor.partDosagem3 + (injetor.partDosagem3 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_3 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.partDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_3 + "</span></p></td>";
                                             
                                             (injetor.partDosagem4 !== 0 && (parametros.DOSAGEM_PARTIDA_4 < (injetor.partDosagem4 - (injetor.partDosagem4 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_PARTIDA_4 > (injetor.partDosagem4 + (injetor.partDosagem4 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem4Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_4 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem4Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.partDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_4 + "</span></p></td>";
                                             
                                             (injetor.partDosagem5 !== 0 && (parametros.DOSAGEM_PARTIDA_5 < (injetor.partDosagem5 - (injetor.partDosagem5 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_PARTIDA_5 > (injetor.partDosagem5 + (injetor.partDosagem5 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem5Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.partDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_5 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='partDosagem5Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.partDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PARTIDA_5 + "</span></p></td>";
   
                                             dosagem += "</tr>";
   
                                             dosagem += "<tr><th scope='row' colspan='2'>PRESSÃO</th>";
   
                                             (injetor.presDosagem1 !== 0 && (parametros.DOSAGEM_PRESSAO_1 < (injetor.presDosagem1 - (injetor.presDosagem1 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_PRESSAO_1 > (injetor.presDosagem1 + (injetor.presDosagem1 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_1 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_1 + "</span></p></td>";
                                             
                                             (injetor.presDosagem2 !== 0 && (parametros.DOSAGEM_PRESSAO_2 < (injetor.presDosagem2 - (injetor.presDosagem2 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_PRESSAO_2 > (injetor.presDosagem2 + (injetor.presDosagem2 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_2 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_2 + "</span></p></td>";
                                             
                                             (injetor.presDosagem3 !== 0 && (parametros.DOSAGEM_PRESSAO_3 < (injetor.presDosagem3 - (injetor.presDosagem3 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_PRESSAO_3 > (injetor.presDosagem3 + (injetor.presDosagem3 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_3 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_3 + "</span></p></td>";
                                             
                                             (injetor.presDosagem4 !== 0 && (parametros.DOSAGEM_PRESSAO_4 < (injetor.presDosagem4 - (injetor.presDosagem4 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_PRESSAO_4 > (injetor.presDosagem4 + (injetor.presDosagem4 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem4Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_4 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem4Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_4 + "</span></p></td>";
                                             
                                             (injetor.presDosagem5 !== 0 && (parametros.DOSAGEM_PRESSAO_5 < (injetor.presDosagem5 - (injetor.presDosagem5 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_PRESSAO_5 > (injetor.presDosagem5 + (injetor.presDosagem5 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem5Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_5 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='presDosagem5Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_PRESSAO_5 + "</span></p></td>";
   
                                             dosagem += "</tr>";
   
                                             dosagem += "<tr><th scope='row' colspan='2'>FLUXO</th>";
   
                                             (injetor.fluxoDosagem1 !== 0 && (parametros.DOSAGEM_FLUXO_1 < (injetor.fluxoDosagem1 - (injetor.fluxoDosagem1 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_FLUXO_1 > (injetor.fluxoDosagem1 + (injetor.fluxoDosagem1 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_1 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_1 + "</span></p></td>";
                                             
                                             (injetor.fluxoDosagem2 !== 0 && (parametros.DOSAGEM_FLUXO_2 < (injetor.fluxoDosagem2 - (injetor.fluxoDosagem2 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_FLUXO_2 > (injetor.fluxoDosagem2 + (injetor.fluxoDosagem2 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_2 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_2 + "</span></p></td>";
                                             
                                             (injetor.fluxoDosagem3 !== 0 && (parametros.DOSAGEM_FLUXO_3 < (injetor.fluxoDosagem3 - (injetor.fluxoDosagem3 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_FLUXO_3 > (injetor.fluxoDosagem3 + (injetor.fluxoDosagem3 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_3 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_3 + "</span></p></td>";
                                             
                                             (injetor.fluxoDosagem4 !== 0 && (parametros.DOSAGEM_FLUXO_4 < (injetor.fluxoDosagem4 - (injetor.fluxoDosagem4 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_FLUXO_4 > (injetor.fluxoDosagem4 + (injetor.fluxoDosagem4 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem4Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_4 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem4Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_4 + "</span></p></td>";
                                             
                                             (injetor.fluxoDosagem5 !== 0 && (parametros.DOSAGEM_FLUXO_5 < (injetor.fluxoDosagem5 - (injetor.fluxoDosagem5 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_FLUXO_5 > (injetor.fluxoDosagem5 + (injetor.fluxoDosagem5 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem5Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_5 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='fluxoDosagem5Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_FLUXO_5 + "</span></p></td>";
   
                                             dosagem += "</tr>";
   
                                             dosagem += "<tr><th scope='row' colspan='2'>CONTRAPRESSÃO</th>";
   
                                             (injetor.CPDosagem1 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_1 < (injetor.CPDosagem1 - (injetor.CPDosagem1 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_1 > (injetor.CPDosagem1 + (injetor.CPDosagem1 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_1 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.CPDosagem1 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_1 + "</span></p></td>";
                                             
                                             (injetor.CPDosagem2 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_2 < (injetor.CPDosagem2 - (injetor.CPDosagem2 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_2 > (injetor.CPDosagem2 + (injetor.CPDosagem2 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_2 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.CPDosagem2 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_2 + "</span></p></td>";
                                             
                                             (injetor.CPDosagem3 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_3 < (injetor.CPDosagem3 - (injetor.CPDosagem3 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_3 > (injetor.CPDosagem3 + (injetor.CPDosagem3 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_3 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.CPDosagem3 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_3 + "</span></p></td>";
                                             
                                             (injetor.CPDosagem4 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_4 < (injetor.CPDosagem4 - (injetor.CPDosagem4 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_4 > (injetor.CPDosagem4 + (injetor.CPDosagem4 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem4Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_4 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem4Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.CPDosagem4 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_4 + "</span></p></td>";
                                             
                                             (injetor.CPDosagem5 !== 0 && (parametros.DOSAGEM_CONTRAPRESSAO_5 < (injetor.CPDosagem5 - (injetor.CPDosagem5 * injetor.tolDosagem)).toFixed(1) || parametros.DOSAGEM_CONTRAPRESSAO_5 > (injetor.CPDosagem5 + (injetor.CPDosagem5 * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem5Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.CPDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_5 + "</span></p></td>"
                                             : dosagem += "<td data-toggle='modal' data-target='#myModal' id='CPDosagem5Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.CPDosagem5 + "</span> - <span class='reais'>" + parametros.DOSAGEM_CONTRAPRESSAO_5 + "</span></p></td>";
   
                                             dosagem += "</tr>";
                                             
                                             var dosagemFoot = "<tr><th colspan='2'>TEMPO:</th>";                              
   
                                             (injetor.tempoDosagem !== 0 && (parametros.TEMPO_DOSAGEM < (injetor.tempoDosagem - (injetor.tempoDosagem * injetor.tolDosagem)).toFixed(1) || parametros.TEMPO_DOSAGEM > (injetor.tempoDosagem + (injetor.tempoDosagem * injetor.tolDosagem)).toFixed(1))) 
                                             ? dosagemFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoDosagemParams' colspan='5' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoDosagem + "</span> - <span class='reais'>" + parametros.TEMPO_DOSAGEM + "</span></p></td>"
                                             : dosagemFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoDosagemParams' colspan='5'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoDosagem + "</span> - <span class='reais'>" + parametros.TEMPO_DOSAGEM + "</span></p></td>";
                                             
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
   
                                             (injetor.posFecha1 !== 0 && (parametros.FECHAMENTO_POSICAO_1 < (injetor.posFecha1 - (injetor.posFecha1 * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_POSICAO_1 > (injetor.posFecha1 + (injetor.posFecha1 * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='posFecha1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_1 + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='posFecha1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_1 + "</span></p></td>";
                                             
                                             (injetor.posFecha2 !== 0 && (parametros.FECHAMENTO_POSICAO_2 < (injetor.posFecha2 - (injetor.posFecha2 * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_POSICAO_2 > (injetor.posFecha2 + (injetor.posFecha2 * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='posFecha2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_2 + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='posFecha2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_2 + "</span></p></td>";
                                             
                                             (injetor.posFecha3 !== 0 && (parametros.FECHAMENTO_POSICAO_3 < (injetor.posFecha3 - (injetor.posFecha3 * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_POSICAO_3 > (injetor.posFecha3 + (injetor.posFecha3 * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='posFecha3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_3 + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='posFecha3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_3 + "</span></p></td>";
                                             
                                             (injetor.protMPos !== 0 && (parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE < (injetor.protMPos - (injetor.protMPos * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE > (injetor.protMPos + (injetor.protMPos * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='protMPosParams' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.protMPos + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='protMPosParams'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.protMPos + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_PROTECAO_MOLDE + "</span></p></td>";
                                             
                                             (injetor.AltaPresPos !== 0 && (parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO < (injetor.AltaPresPos - (injetor.AltaPresPos * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO > (injetor.AltaPresPos + (injetor.AltaPresPos * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='AltaPresPosParams' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.AltaPresPos + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='AltaPresPosParams'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.AltaPresPos + "</span> - <span class='reais'>" + parametros.FECHAMENTO_POSICAO_ALTA_PRESSAO + "</span></p></td>";
   
                                             fechamento += "</tr>";
   
                                             fechamento += "<tr><th scope='row' colspan='2'>PRESSÃO</th>";
   
                                             (injetor.presFecha1 !== 0 && (parametros.FECHAMENTO_PRESSAO_1 < (injetor.presFecha1 - (injetor.presFecha1 * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_1 > (injetor.presFecha1 + (injetor.presFecha1 * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='presFecha1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_1 + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='presFecha1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_1 + "</span></p></td>";
                                             
                                             (injetor.presFecha2 !== 0 && (parametros.FECHAMENTO_PRESSAO_2 < (injetor.presFecha2 - (injetor.presFecha2 * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_2 > (injetor.presFecha2 + (injetor.presFecha2 * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='presFecha2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_2 + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='presFecha2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_2 + "</span></p></td>";
                                             
                                             (injetor.presFecha3 !== 0 && (parametros.FECHAMENTO_PRESSAO_3 < (injetor.presFecha3 - (injetor.presFecha3 * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_3 > (injetor.presFecha3 + (injetor.presFecha3 * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='presFecha3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_3 + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='presFecha3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_3 + "</span></p></td>";
                                             
                                             (injetor.protMPres !== 0 && (parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE < (injetor.protMPres - (injetor.protMPres * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE > (injetor.protMPres + (injetor.protMPres * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='protMPresParams' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.protMPres + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='protMPresParams'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.protMPres + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_PROTECAO_MOLDE + "</span></p></td>";
                                             
                                             (injetor.AltaPresPres !== 0 && (parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO < (injetor.AltaPresPres - (injetor.AltaPresPres * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO > (injetor.AltaPresPres + (injetor.AltaPresPres * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='AltaPresPresParams' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.AltaPresPres + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='AltaPresPresParams'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.AltaPresPres + "</span> - <span class='reais'>" + parametros.FECHAMENTO_PRESSAO_ALTA_PRESSAO + "</span></p></td>";
   
                                             fechamento += "</tr>";
   
                                             fechamento += "<tr><th scope='row' colspan='2'>FLUXO</th>";
   
                                             (injetor.fluxoFecha1 !== 0 && (parametros.FECHAMENTO_FLUXO_1 < (injetor.fluxoFecha1 - (injetor.fluxoFecha1 * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_FLUXO_1 > (injetor.fluxoFecha1 + (injetor.fluxoFecha1 * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='fluxoFecha1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_1 + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='fluxoFecha1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoFecha1 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_1 + "</span></p></td>";
                                             
                                             (injetor.fluxoFecha2 !== 0 && (parametros.FECHAMENTO_FLUXO_2 < (injetor.fluxoFecha2 - (injetor.fluxoFecha2 * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_FLUXO_2 > (injetor.fluxoFecha2 + (injetor.fluxoFecha2 * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='fluxoFecha2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_2 + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='fluxoFecha2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoFecha2 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_2 + "</span></p></td>";
                                             
                                             (injetor.fluxoFecha3 !== 0 && (parametros.FECHAMENTO_FLUXO_3 < (injetor.fluxoFecha3 - (injetor.fluxoFecha3 * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_FLUXO_3 > (injetor.fluxoFecha3 + (injetor.fluxoFecha3 * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='fluxoFecha3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_3 + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='fluxoFecha3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoFecha3 + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_3 + "</span></p></td>";
                                             
                                             (injetor.protMFluxo !== 0 && (parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE < (injetor.protMFluxo - (injetor.protMFluxo * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE > (injetor.protMFluxo + (injetor.protMFluxo * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='protMFluxoParams' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.protMFluxo + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='protMFluxoParams'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.protMFluxo + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_PROTECAO_MOLDE + "</span></p></td>";
                                             
                                             (injetor.AltaPresFluxo !== 0 && (parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO < (injetor.AltaPresFluxo - (injetor.AltaPresFluxo * injetor.tolFechamento)).toFixed(1) || parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO > (injetor.AltaPresFluxo + (injetor.AltaPresFluxo * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamento += "<td data-toggle='modal' data-target='#myModal' id='AltaPresFluxoParams' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.AltaPresFluxo + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO + "</span></p></td>"
                                             : fechamento += "<td data-toggle='modal' data-target='#myModal' id='AltaPresFluxoParams'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.AltaPresFluxo + "</span> - <span class='reais'>" + parametros.FECHAMENTO_FLUXO_ALTA_PRESSAO + "</span></p></td>";
   
                                             fechamento += "</tr>";
   
                                             var fechamentoFoot = "<tr><th colspan='3'>TEMPO PROTEÇÃO DE MOLDE:</th>";                              
   
                                             (injetor.tempoProtMolde !== 0 && (parametros.TEMPO_PROTECAO_MOLDE < (injetor.tempoProtMolde - (injetor.tempoProtMolde * injetor.tolFechamento)).toFixed(1) || parametros.TEMPO_PROTECAO_MOLDE > (injetor.tempoProtMolde + (injetor.tempoProtMolde * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamentoFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoProtMoldeParams' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoProtMolde + "</span> - <span class='reais'>" + parametros.TEMPO_PROTECAO_MOLDE + "</span></p></td>"
                                             : fechamentoFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoProtMoldeParams'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoProtMolde + "</span> - <span class='reais'>" + parametros.TEMPO_PROTECAO_MOLDE + "</span></p></td>";
                                             
                                             fechamentoFoot += "<th colspan='2'>TEMPO FECHAMENTO:</th>";
   
                                             (injetor.tempoFecha !== 0 && (parametros.TEMPO_FECHAMENTO < (injetor.tempoFecha - (injetor.tempoFecha * injetor.tolFechamento)).toFixed(1) || parametros.TEMPO_FECHAMENTO > (injetor.tempoFecha + (injetor.tempoFecha * injetor.tolFechamento)).toFixed(1))) 
                                             ? fechamentoFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoFechaParams' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoFecha + "</span> - <span class='reais'>" + parametros.TEMPO_FECHAMENTO + "</span></p></td>"
                                             : fechamentoFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoFechaParams'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoFecha + "</span> - <span class='reais'>" + parametros.TEMPO_FECHAMENTO + "</span></p></td>";
   
                                             fechamentoFoot += "</tr>";
   
                                             tableBody = $("#fechamento tbody");
                                             tableBody.html(fechamento);
                                             
                                             tableFoot = $("#fechamentoFoot");
                                             tableFoot.html(fechamentoFoot);
   
                                             var abertura = "<tr><th scope='row' colspan='2'>POSIÇÃO</th>";
   
                                             (injetor.posAbertura1 !== 0 && (parametros.ABERTURA_POSICAO_5 < (injetor.posAbertura1 - (injetor.posAbertura1 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_POSICAO_5 > (injetor.posAbertura1 + (injetor.posAbertura1 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_5 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_5 + "</span></p></td>";
                                             
                                             (injetor.posAbertura2 !== 0 && (parametros.ABERTURA_POSICAO_4 < (injetor.posAbertura2 - (injetor.posAbertura2 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_POSICAO_4 > (injetor.posAbertura2 + (injetor.posAbertura2 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_4 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_4 + "</span></p></td>";
                                             
                                             (injetor.posAbertura3 !== 0 && (parametros.ABERTURA_POSICAO_3 < (injetor.posAbertura3 - (injetor.posAbertura3 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_POSICAO_3 > (injetor.posAbertura3 + (injetor.posAbertura3 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_3 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_3 + "</span></p></td>";
                                             
                                             (injetor.posAbertura4 !== 0 && (parametros.ABERTURA_POSICAO_2 < (injetor.posAbertura4 - (injetor.posAbertura4 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_POSICAO_2 > (injetor.posAbertura4 + (injetor.posAbertura4 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura4Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_2 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura4Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_2 + "</span></p></td>";
                                             
                                             (injetor.posAbertura5 !== 0 && (parametros.ABERTURA_POSICAO_1 < (injetor.posAbertura5 - (injetor.posAbertura5 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_POSICAO_1 > (injetor.posAbertura5 + (injetor.posAbertura5 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura5Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_1 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='posAbertura5Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_POSICAO_1 + "</span></p></td>";
   
                                             abertura += "</tr>";
   
                                             abertura += "<tr><th scope='row' colspan='2'>PRESSÃO</th>";
   
                                             (injetor.presAbertura1 !== 0 && (parametros.ABERTURA_PRESSAO_5 < (injetor.presAbertura1 - (injetor.presAbertura1 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_PRESSAO_5 > (injetor.presAbertura1 + (injetor.presAbertura1 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_5 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_5 + "</span></p></td>";
                                             
                                             (injetor.presAbertura2 !== 0 && (parametros.ABERTURA_PRESSAO_4 < (injetor.presAbertura2 - (injetor.presAbertura2 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_PRESSAO_4 > (injetor.presAbertura2 + (injetor.presAbertura2 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_4 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_4 + "</span></p></td>";
                                             
                                             (injetor.presAbertura3 !== 0 && (parametros.ABERTURA_PRESSAO_3 < (injetor.presAbertura3 - (injetor.presAbertura3 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_PRESSAO_3 > (injetor.presAbertura3 + (injetor.presAbertura3 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_3 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_3 + "</span></p></td>";
                                             
                                             (injetor.presAbertura4 !== 0 && (parametros.ABERTURA_PRESSAO_2 < (injetor.presAbertura4 - (injetor.presAbertura4 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_PRESSAO_2 > (injetor.presAbertura4 + (injetor.presAbertura4 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura4Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_2 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura4Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_2 + "</span></p></td>";
                                             
                                             (injetor.presAbertura5 !== 0 && (parametros.ABERTURA_PRESSAO_1 < (injetor.presAbertura5 - (injetor.presAbertura5 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_PRESSAO_1 > (injetor.presAbertura5 + (injetor.presAbertura5 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura5Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_1 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='presAbertura5Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_PRESSAO_1 + "</span></p></td>";
   
                                             abertura += "</tr>";
   
                                             abertura += "<tr><th scope='row' colspan='2'>FLUXO</th>";
   
                                             (injetor.fluxoAbertura1 !== 0 && (parametros.ABERTURA_FLUXO_5 < (injetor.fluxoAbertura1 - (injetor.fluxoAbertura1 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_FLUXO_5 > (injetor.fluxoAbertura1 + (injetor.fluxoAbertura1 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_5 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura1 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_5 + "</span></p></td>";
                                             
                                             (injetor.fluxoAbertura2 !== 0 && (parametros.ABERTURA_FLUXO_4 < (injetor.fluxoAbertura2 - (injetor.fluxoAbertura2 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_FLUXO_4 > (injetor.fluxoAbertura2 + (injetor.fluxoAbertura2 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_4 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura2 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_4 + "</span></p></td>";
                                             
                                             (injetor.fluxoAbertura3 !== 0 && (parametros.ABERTURA_FLUXO_3 < (injetor.fluxoAbertura3 - (injetor.fluxoAbertura3 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_FLUXO_3 > (injetor.fluxoAbertura3 + (injetor.fluxoAbertura3 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_3 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura3 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_3 + "</span></p></td>";
                                             
                                             (injetor.fluxoAbertura4 !== 0 && (parametros.ABERTURA_FLUXO_2 < (injetor.fluxoAbertura4 - (injetor.fluxoAbertura4 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_FLUXO_2 > (injetor.fluxoAbertura4 + (injetor.fluxoAbertura4 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura4Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_2 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura4Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura4 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_2 + "</span></p></td>";
                                             
                                             (injetor.fluxoAbertura5 !== 0 && (parametros.ABERTURA_FLUXO_1 < (injetor.fluxoAbertura5 - (injetor.fluxoAbertura5 * injetor.tolAbertura)).toFixed(1) || parametros.ABERTURA_FLUXO_1 > (injetor.fluxoAbertura5 + (injetor.fluxoAbertura5 * injetor.tolAbertura)).toFixed(1))) 
                                             ? abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura5Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_1 + "</span></p></td>"
                                             : abertura += "<td data-toggle='modal' data-target='#myModal' id='fluxoAbertura5Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAbertura5 + "</span> - <span class='reais'>" + parametros.ABERTURA_FLUXO_1 + "</span></p></td>";
   
                                             abertura += "</tr>";
   
                                             var aberturaFoot = "<tr><th colspan='3'>RESFRIAMENTO:</th>";                              
   
                                             (injetor.resfriamento !== 0 && (parametros.TEMPO_RESFRIAMENT0 < (injetor.resfriamento - (injetor.resfriamento * injetor.tolAbertura)).toFixed(1) || parametros.TEMPO_RESFRIAMENT0 > (injetor.resfriamento + (injetor.resfriamento * injetor.tolAbertura)).toFixed(1))) 
                                             ? aberturaFoot += "<td data-toggle='modal' data-target='#myModal' id='resfriamentoParams' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.resfriamento + "</span> - <span class='reais'>" + parametros.TEMPO_RESFRIAMENT0 + "</span></p></td>"
                                             : aberturaFoot += "<td data-toggle='modal' data-target='#myModal' id='resfriamentoParams'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.resfriamento + "</span> - <span class='reais'>" + parametros.TEMPO_RESFRIAMENT0 + "</span></p></td>";
                                             
                                             aberturaFoot += "<th colspan='2'>TEMPO ABERTURA:</th>";
   
                                             (injetor.tempoAbertura !== 0 && (parametros.TEMPO_ABERTURA < (injetor.tempoAbertura - (injetor.tempoAbertura * injetor.tolAbertura)).toFixed(1) || parametros.TEMPO_ABERTURA > (injetor.tempoAbertura + (injetor.tempoAbertura * injetor.tolAbertura)).toFixed(1))) 
                                             ? aberturaFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoAberturaParams' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.tempoAbertura + "</span> - <span class='reais'>" + parametros.TEMPO_ABERTURA + "</span></p></td>"
                                             : aberturaFoot += "<td data-toggle='modal' data-target='#myModal' id='tempoAberturaParams'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.tempoAbertura + "</span> - <span class='reais'>" + parametros.TEMPO_ABERTURA + "</span></p></td>";
   
                                             aberturaFoot += "</tr>";
                                             
                                             tableFoot = $("#aberturaFoot");
                                             tableFoot.html(aberturaFoot);
                                             
                                             tableBody = $("#abertura tbody");
                                             tableBody.html(abertura);
   
                                             var extracao = "<tr><th scope='row' colspan='1'>POSIÇÃO</th>";
   
                                             (injetor.posAvanco1 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_1 < (injetor.posAvanco1 - (injetor.posAvanco1 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_1 > (injetor.posAvanco1 + (injetor.posAvanco1 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='posAvanco1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_1 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='posAvanco1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_1 + "</span></p></td>";
                                             
                                             (injetor.posAvanco2 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_2 < (injetor.posAvanco2 - (injetor.posAvanco2 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_2 > (injetor.posAvanco2 + (injetor.posAvanco2 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='posAvanco2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_2 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='posAvanco2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_2 + "</span></p></td>";
                                             
                                             (injetor.posAvanco3 !== 0 && (parametros.EXTRACAO_POSICAO_AVANCO_3 < (injetor.posAvanco3 - (injetor.posAvanco3 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_POSICAO_AVANCO_3 > (injetor.posAvanco3 + (injetor.posAvanco3 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='posAvanco3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_3 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='posAvanco3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_AVANCO_3 + "</span></p></td>";
                                             
                                             (injetor.posRecuo1 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_3 < (injetor.posRecuo1 - (injetor.posRecuo1 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_3 > (injetor.posRecuo1 + (injetor.posRecuo1 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='posRecuo1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_3 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='posRecuo1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_3 + "</span></p></td>";
                                             
                                             (injetor.posRecuo2 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_2 < (injetor.posRecuo2 - (injetor.posRecuo2 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_2 > (injetor.posRecuo2 + (injetor.posRecuo2 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='posRecuo2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_2 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='posRecuo2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_2 + "</span></p></td>";
                                             
                                             (injetor.posRecuo3 !== 0 && (parametros.EXTRACAO_POSICAO_RECUO_1 < (injetor.posRecuo3 - (injetor.posRecuo3 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_POSICAO_RECUO_1 > (injetor.posRecuo3 + (injetor.posRecuo3 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='posRecuo3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.posRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_1 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='posRecuo3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.posRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_POSICAO_RECUO_1 + "</span></p></td>";
   
                                             extracao += "</tr>";
   
                                             extracao += "<tr><th scope='row' colspan='1'>PRESSÃO</th>";
   
                                             (injetor.presAvanco1 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_1 < (injetor.presAvanco1 - (injetor.presAvanco1 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_1 > (injetor.presAvanco1 + (injetor.presAvanco1 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='presAvanco1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_1 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='presAvanco1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_1 + "</span></p></td>";
                                             
                                             (injetor.presAvanco2 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_2 < (injetor.presAvanco2 - (injetor.presAvanco2 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_2 > (injetor.presAvanco2 + (injetor.presAvanco2 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='presAvanco2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_2 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='presAvanco2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_2 + "</span></p></td>";
                                             
                                             (injetor.presAvanco3 !== 0 && (parametros.EXTRACAO_PRESSAO_AVANCO_3 < (injetor.presAvanco3 - (injetor.presAvanco3 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_PRESSAO_AVANCO_3 > (injetor.presAvanco3 + (injetor.presAvanco3 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='presAvanco3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_3 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='presAvanco3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_AVANCO_3 + "</span></p></td>";
                                             
                                             (injetor.presRecuo1 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_3 < (injetor.presRecuo1 - (injetor.presRecuo1 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_3 > (injetor.presRecuo1 + (injetor.presRecuo1 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='presRecuo1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_3 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='presRecuo1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_3 + "</span></p></td>";
                                             
                                             (injetor.presRecuo2 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_2 < (injetor.presRecuo2 - (injetor.presRecuo2 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_2 > (injetor.presRecuo2 + (injetor.presRecuo2 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='presRecuo2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_2 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='presRecuo2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_2 + "</span></p></td>";
                                             
                                             (injetor.presRecuo3 !== 0 && (parametros.EXTRACAO_PRESSAO_RECUO_1 < (injetor.presRecuo3 - (injetor.presRecuo3 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_PRESSAO_RECUO_1 > (injetor.presRecuo3 + (injetor.presRecuo3 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='presRecuo3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.presRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_1 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='presRecuo3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.presRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_PRESSAO_RECUO_1 + "</span></p></td>";
   
                                             extracao += "</tr>";
   
                                             extracao += "<tr><th scope='row' colspan='1'>FLUXO</th>";
   
                                             (injetor.fluxoAvanco1 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_1 < (injetor.fluxoAvanco1 - (injetor.fluxoAvanco1 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_1 > (injetor.fluxoAvanco1 + (injetor.fluxoAvanco1 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoAvanco1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_1 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoAvanco1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAvanco1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_1 + "</span></p></td>";
                                             
                                             (injetor.fluxoAvanco2 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_2 < (injetor.fluxoAvanco2 - (injetor.fluxoAvanco2 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_2 > (injetor.fluxoAvanco2 + (injetor.fluxoAvanco2 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoAvanco2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_2 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoAvanco2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAvanco2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_2 + "</span></p></td>";
                                             
                                             (injetor.fluxoAvanco3 !== 0 && (parametros.EXTRACAO_FLUXO_AVANCO_3 < (injetor.fluxoAvanco3 - (injetor.fluxoAvanco3 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_FLUXO_AVANCO_3 > (injetor.fluxoAvanco3 + (injetor.fluxoAvanco3 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoAvanco3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_3 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoAvanco3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoAvanco3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_AVANCO_3 + "</span></p></td>";
                                             
                                             (injetor.fluxoRecuo1 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_3 < (injetor.fluxoRecuo1 - (injetor.fluxoRecuo1 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_3 > (injetor.fluxoRecuo1 + (injetor.fluxoRecuo1 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecuo1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_3 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecuo1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecuo1 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_3 + "</span></p></td>";
                                             
                                             (injetor.fluxoRecuo2 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_2 < (injetor.fluxoRecuo2 - (injetor.fluxoRecuo2 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_2 > (injetor.fluxoRecuo2 + (injetor.fluxoRecuo2 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecuo2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_2 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecuo2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecuo2 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_2 + "</span></p></td>";
                                             
                                             (injetor.fluxoRecuo3 !== 0 && (parametros.EXTRACAO_FLUXO_RECUO_1 < (injetor.fluxoRecuo3 - (injetor.fluxoRecuo3 * injetor.tolExtracao)).toFixed(1) || parametros.EXTRACAO_FLUXO_RECUO_1 > (injetor.fluxoRecuo3 + (injetor.fluxoRecuo3 * injetor.tolExtracao)).toFixed(1))) 
                                             ? extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecuo3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.fluxoRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_1 + "</span></p></td>"
                                             : extracao += "<td data-toggle='modal' data-target='#myModal' id='fluxoRecuo3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.fluxoRecuo3 + "</span> - <span class='reais'>" + parametros.EXTRACAO_FLUXO_RECUO_1 + "</span></p></td>";
   
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
                                                               "<th colspan='1'>" + injetor.radialTypeEntrada1 + "</th>" +
                                                               "<th colspan='1'>" + injetor.radialTypeSaida1 + "</th>" +
                                                               "<th colspan='1'>" + injetor.radialTypeEntrada2 + "</th>" +
                                                               "<th colspan='1'>" + injetor.radialTypeSaida2 + "</th>" +
                                                               "<th colspan='1'>" + injetor.radialTypeEntrada3 + "</th>" +
                                                               "<th colspan='1'>" + injetor.radialTypeSaida3 + "</th>" +
                                                            "</tr>"
   
                                                radial += "<tr><th scope='row' colspan='1'>PRESSÃO:</th>";
   
                                                if (injetor.radialPresEntrada1 !== 0) {
   
                                                   (injetor.radialPresEntrada1 !== 0 && (parametros.RADIAL_PRESSAO_ENTRADA_1 < (injetor.radialPresEntrada1 - (injetor.radialPresEntrada1 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_PRESSAO_ENTRADA_1 > (injetor.radialPresEntrada1 + (injetor.radialPresEntrada1 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_1 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_1 + "</span></p></td>";
   
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresEntrada1 + "</span></p></td>";
                                                }
   
                                                if (injetor.radialPresSaida1 !== 0) {
   
                                                   (injetor.radialPresSaida1 !== 0 && (parametros.RADIAL_PRESSAO_SAIDA_1 < (injetor.radialPresSaida1 - (injetor.radialPresSaida1 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_PRESSAO_SAIDA_1 > (injetor.radialPresSaida1 + (injetor.radialPresSaida1 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida1Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_1 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_1 + "</span></p></td>";
   
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida1Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresSaida1 + "</span></p></td>";
                                                }
   
                                                if (injetor.radialPresEntrada2 !== 0) {
   
                                                   (injetor.radialPresEntrada2 !== 0 && (parametros.RADIAL_PRESSAO_ENTRADA_2 < (injetor.radialPresEntrada2 - (injetor.radialPresEntrada2 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_PRESSAO_ENTRADA_2 > (injetor.radialPresEntrada2 + (injetor.radialPresEntrada2 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_2 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_2 + "</span></p></td>";
   
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresEntrada2 + "</span></p></td>";
                                                }
   
                                                if (injetor.radialPresSaida2 !== 0) {
   
                                                   (injetor.radialPresSaida2 !== 0 && (parametros.RADIAL_PRESSAO_SAIDA_2 < (injetor.radialPresSaida2 - (injetor.radialPresSaida2 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_PRESSAO_SAIDA_2 > (injetor.radialPresSaida2 + (injetor.radialPresSaida2 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida2Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_2 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_2 + "</span></p></td>";
   
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida2Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresSaida2 + "</span></p></td>";
                                                }
   
                                                if (injetor.radialPresEntrada3 !== 0) {
   
                                                   (injetor.radialPresEntrada3 !== 0 && (parametros.RADIAL_PRESSAO_ENTRADA_3 < (injetor.radialPresEntrada3 - (injetor.radialPresEntrada3 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_PRESSAO_ENTRADA_3 > (injetor.radialPresEntrada3 + (injetor.radialPresEntrada3 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_3 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_ENTRADA_3 + "</span></p></td>";
   
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresEntrada3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresEntrada3 + "</span></p></td>";
                                                }
   
                                                if (injetor.radialPresSaida3 !== 0) {
   
                                                   (injetor.radialPresSaida3 !== 0 && (parametros.RADIAL_PRESSAO_SAIDA_3 < (injetor.radialPresSaida3 - (injetor.radialPresSaida3 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_PRESSAO_SAIDA_3 > (injetor.radialPresSaida3 + (injetor.radialPresSaida3 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida3Params' class='outOfRange'><p title='Clique para o gráfico' class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPresSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_3 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_PRESSAO_SAIDA_3 + "</span></p></td>";
   
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialPresSaida3Params'><p title='Clique para o gráfico' class='read-only'><span class='cadastrados'> " + injetor.radialPresSaida3 + "</span></p></td>";
                                                }
   
                                                radial += "</tr>";
   
                                                radial += "<tr><th scope='row' colspan='1'>FLUXO:</th>";
   
                                                if (injetor.radialFluxoEntrada1 !== 0) {
   
                                                   (injetor.radialFluxoEntrada1 !== 0 && (parametros.RADIAL_FLUXO_ENTRADA_1 < (injetor.radialFluxoEntrada1 - (injetor.radialFluxoEntrada1 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_FLUXO_ENTRADA_1 > (injetor.radialFluxoEntrada1 + (injetor.radialFluxoEntrada1 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada1Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_1 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_1 + "</span></p></td>";
   
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoEntrada1 + "</span></p></td>";
                                                   
                                                }
   
                                                if (injetor.radialFluxoSaida1 !== 0) {
   
                                                   (injetor.radialFluxoSaida1 !== 0 && (parametros.RADIAL_FLUXO_SAIDA_1 < (injetor.radialFluxoSaida1 - (injetor.radialFluxoSaida1 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_FLUXO_SAIDA_1 > (injetor.radialFluxoSaida1 + (injetor.radialFluxoSaida1 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida1Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_1 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_1 + "</span></p></td>";
   
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoSaida1 + "</span></p></td>";
                                                   
                                                }
   
                                                if (injetor.radialFluxoEntrada2 !== 0) {
   
                                                   (injetor.radialFluxoEntrada2 !== 0 && (parametros.RADIAL_FLUXO_ENTRADA_2 < (injetor.radialFluxoEntrada2 - (injetor.radialFluxoEntrada2 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_FLUXO_ENTRADA_2 > (injetor.radialFluxoEntrada2 + (injetor.radialFluxoEntrada2 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada2Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_2 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_2 + "</span></p></td>";
                                                   
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoEntrada2 + "</span></p></td>";
                                                   
                                                }
   
                                                if (injetor.radialFluxoSaida2 !== 0) {
   
                                                   (injetor.radialFluxoSaida2 !== 0 && (parametros.RADIAL_FLUXO_SAIDA_2 < (injetor.radialFluxoSaida2 - (injetor.radialFluxoSaida2 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_FLUXO_SAIDA_2 > (injetor.radialFluxoSaida2 + (injetor.radialFluxoSaida2 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida2Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_2 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_2 + "</span></p></td>";
                                                      
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoSaida2 + "</span></p></td>";
                                                   
                                                }
   
                                                if (injetor.radialFluxoEntrada3 !== 0) {
   
                                                   (injetor.radialFluxoEntrada3 !== 0 && (parametros.RADIAL_FLUXO_ENTRADA_3 < (injetor.radialFluxoEntrada3 - (injetor.radialFluxoEntrada3 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_FLUXO_ENTRADA_3 > (injetor.radialFluxoEntrada3 + (injetor.radialFluxoEntrada3 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada3Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_3 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_ENTRADA_3 + "</span></p></td>";
                                                         
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoEntrada3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoEntrada3 + "</span></p></td>";
                                                   
                                                }
   
                                                if (injetor.radialFluxoSaida3 !== 0) {
   
                                                   (injetor.radialFluxoSaida3 !== 0 && (parametros.RADIAL_FLUXO_SAIDA_3 < (injetor.radialFluxoSaida3 - (injetor.radialFluxoSaida3 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_FLUXO_SAIDA_3 > (injetor.radialFluxoSaida3 + (injetor.radialFluxoSaida3 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida3Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialFluxoSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_3 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_FLUXO_SAIDA_3 + "</span></p></td>";
                                                            
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialFluxoSaida3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialFluxoSaida3 + "</span></p></td>";
                                                   
                                                }
   
                                                radial += "</tr>";
   
                                                radial += "<tr><th scope='row' colspan='1'>ACT. POSIÇÃO:</th>";
   
                                                if (injetor.radialPosEntrada1 !== 0) {
   
                                                   (injetor.radialPosEntrada1 !== 0 && (parametros.RADIAL_ACT_POSICAO_ENTRADA_1 < (injetor.radialPosEntrada1 - (injetor.radialPosEntrada1 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_ENTRADA_1 > (injetor.radialPosEntrada1 + (injetor.radialPosEntrada1 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada1Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_1 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_1 + "</span></p></td>";
                                                
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosEntrada1 + "</span></p></td>";
                                                   
                                                }
                                                
                                                if (injetor.radialPosSaida1 !== 0) {
                                                
                                                   (injetor.radialPosSaida1 !== 0 && (parametros.RADIAL_ACT_POSICAO_SAIDA_1 < (injetor.radialPosSaida1 - (injetor.radialPosSaida1 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_SAIDA_1 > (injetor.radialPosSaida1 + (injetor.radialPosSaida1 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida1Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_1 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_1 + "</span></p></td>";
                                                   
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosSaida1 + "</span></p></td>";
                                                   
                                                }
                                                
                                                if (injetor.radialPosEntrada2 !== 0) {
                                                
                                                   (injetor.radialPosEntrada2 !== 0 && (parametros.RADIAL_ACT_POSICAO_ENTRADA_2 < (injetor.radialPosEntrada2 - (injetor.radialPosEntrada2 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_ENTRADA_2 > (injetor.radialPosEntrada2 + (injetor.radialPosEntrada2 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada2Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_2 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_2 + "</span></p></td>";
                                                      
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosEntrada2 + "</span></p></td>";
                                                   
                                                }
                                                
                                                if (injetor.radialPosSaida2 !== 0) {
                                                
                                                   (injetor.radialPosSaida2 !== 0 && (parametros.RADIAL_ACT_POSICAO_SAIDA_2 < (injetor.radialPosSaida2 - (injetor.radialPosSaida2 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_SAIDA_2 > (injetor.radialPosSaida2 + (injetor.radialPosSaida2 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida2Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_2 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_2 + "</span></p></td>";
                                                         
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosSaida2 + "</span></p></td>";
                                                   
                                                }
                                                
                                                if (injetor.radialPosEntrada3 !== 0) {
                                                
                                                   (injetor.radialPosEntrada3 !== 0 && (parametros.RADIAL_ACT_POSICAO_ENTRADA_3 < (injetor.radialPosEntrada3 - (injetor.radialPosEntrada3 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_ENTRADA_3 > (injetor.radialPosEntrada3 + (injetor.radialPosEntrada3 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada3Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_3 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_ENTRADA_3 + "</span></p></td>";
                                                            
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosEntrada3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosEntrada3 + "</span></p></td>";
                                                   
                                                }
                                                
                                                if (injetor.radialPosSaida3 !== 0) {
                                                
                                                   (injetor.radialPosSaida3 !== 0 && (parametros.RADIAL_ACT_POSICAO_SAIDA_3 < (injetor.radialPosSaida3 - (injetor.radialPosSaida3 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_ACT_POSICAO_SAIDA_3 > (injetor.radialPosSaida3 + (injetor.radialPosSaida3 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida3Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialPosSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_3 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_POSICAO_SAIDA_3 + "</span></p></td>";
                                                               
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialPosSaida3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialPosSaida3 + "</span></p></td>";
                                                   
                                                }
                                                
                                                radial += "</tr>";
                                                
                                                radial += "<tr><th scope='row' colspan='1'>ACT. TEMPO:</th>";
                                                
   
                                                if (injetor.radialTempoEntrada1 !== 0) {
   
                                                   (injetor.radialTempoEntrada1 !== 0 && (parametros.RADIAL_ACT_TEMPO_ENTRADA_1 < (injetor.radialTempoEntrada1 - (injetor.radialTempoEntrada1 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_ENTRADA_1 > (injetor.radialTempoEntrada1 + (injetor.radialTempoEntrada1 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada1Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_1 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoEntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_1 + "</span></p></td>";
                                                
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoEntrada1 + "</span></p></td>";
                                                   
                                                }
                                                
                                                if (injetor.radialTempoSaida1 !== 0) {
                                                
                                                   (injetor.radialTempoSaida1 !== 0 && (parametros.RADIAL_ACT_TEMPO_SAIDA_1 < (injetor.radialTempoSaida1 - (injetor.radialTempoSaida1 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_SAIDA_1 > (injetor.radialTempoSaida1 + (injetor.radialTempoSaida1 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida1Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_1 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_1 + "</span></p></td>";
                                                   
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoSaida1 + "</span></p></td>";
                                                   
                                                }
                                                
                                                if (injetor.radialTempoEntrada2 !== 0) {
                                                
                                                   (injetor.radialTempoEntrada2 !== 0 && (parametros.RADIAL_ACT_TEMPO_ENTRADA_2 < (injetor.radialTempoEntrada2 - (injetor.radialTempoEntrada2 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_ENTRADA_2 > (injetor.radialTempoEntrada2 + (injetor.radialTempoEntrada2 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada2Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_2 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoEntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_2 + "</span></p></td>";
                                                      
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoEntrada2 + "</span></p></td>";
                                                   
                                                }
                                                
                                                if (injetor.radialTempoSaida2 !== 0) {
                                                
                                                   (injetor.radialTempoSaida2 !== 0 && (parametros.RADIAL_ACT_TEMPO_SAIDA_2 < (injetor.radialTempoSaida2 - (injetor.radialTempoSaida2 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_SAIDA_2 > (injetor.radialTempoSaida2 + (injetor.radialTempoSaida2 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida2Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_2 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_2 + "</span></p></td>";
                                                         
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoSaida2 + "</span></p></td>";
                                                   
                                                }
                                                
                                                if (injetor.radialTempoEntrada3 !== 0) {
                                                
                                                   (injetor.radialTempoEntrada3 !== 0 && (parametros.RADIAL_ACT_TEMPO_ENTRADA_3 < (injetor.radialTempoEntrada3 - (injetor.radialTempoEntrada3 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_ENTRADA_3 > (injetor.radialTempoEntrada3 + (injetor.radialTempoEntrada3 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada3Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_3 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoEntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_ENTRADA_3 + "</span></p></td>";
                                                            
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoEntrada3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoEntrada3 + "</span></p></td>";
                                                   
                                                }
                                                
                                                if (injetor.radialTempoSaida3 !== 0) {
                                                
                                                   (injetor.radialTempoSaida3 !== 0 && (parametros.RADIAL_ACT_TEMPO_SAIDA_3 < (injetor.radialTempoSaida3 - (injetor.radialTempoSaida3 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_ACT_TEMPO_SAIDA_3 > (injetor.radialTempoSaida3 + (injetor.radialTempoSaida3 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida3Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialTempoSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_3 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_ACT_TEMPO_SAIDA_3 + "</span></p></td>";
                                                               
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialTempoSaida3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialTempoSaida3 + "</span></p></td>";
                                                   
                                                }
                                                
                                                radial += "</tr>";
                                                
                                                radial += "<tr><th scope='row' colspan='1'>SCRCOUNT:</th>";
   
                                                if (injetor.radialSCREntrada1 !== 0) {
   
                                                   (injetor.radialSCREntrada1 !== 0 && (parametros.RADIAL_SCRCOUNT_ENTRADA_1 < (injetor.radialSCREntrada1 - (injetor.radialSCREntrada1 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_SCRCOUNT_ENTRADA_1 > (injetor.radialSCREntrada1 + (injetor.radialSCREntrada1 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada1Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCREntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_1 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCREntrada1 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_1 + "</span></p></td>";
                                                      
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCREntrada1 + "</span></p></td>";
                                                   
                                                }
   
                                                if (injetor.radialSCRSaida1 !== 0) {
   
                                                   (injetor.radialSCRSaida1 !== 0 && (parametros.RADIAL_SCRCOUNT_SAIDA_1 < (injetor.radialSCRSaida1 - (injetor.radialSCRSaida1 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_SCRCOUNT_SAIDA_1 > (injetor.radialSCRSaida1 + (injetor.radialSCRSaida1 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida1Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCRSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_1 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCRSaida1 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_1 + "</span></p></td>";
                                                         
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida1Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCRSaida1 + "</span></p></td>";
                                                   
                                                }
   
                                                if (injetor.radialSCREntrada2 !== 0) {
   
                                                   (injetor.radialSCREntrada2 !== 0 && (parametros.RADIAL_SCRCOUNT_ENTRADA_2 < (injetor.radialSCREntrada2 - (injetor.radialSCREntrada2 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_SCRCOUNT_ENTRADA_2 > (injetor.radialSCREntrada2 + (injetor.radialSCREntrada2 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada2Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCREntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_2 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCREntrada2 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_2 + "</span></p></td>";
                                                            
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCREntrada2 + "</span></p></td>";
                                                   
                                                }
   
                                                if (injetor.radialSCRSaida2 !== 0) {
   
                                                   (injetor.radialSCRSaida2 !== 0 && (parametros.RADIAL_SCRCOUNT_SAIDA_2 < (injetor.radialSCRSaida2 - (injetor.radialSCRSaida2 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_SCRCOUNT_SAIDA_2 > (injetor.radialSCRSaida2 + (injetor.radialSCRSaida2 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida2Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCRSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_2 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCRSaida2 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_2 + "</span></p></td>";
                                                               
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida2Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCRSaida2 + "</span></p></td>";
                                                   
                                                }
   
                                                if (injetor.radialSCREntrada3 !== 0) {
   
                                                   (injetor.radialSCREntrada3 !== 0 && (parametros.RADIAL_SCRCOUNT_ENTRADA_3 < (injetor.radialSCREntrada3 - (injetor.radialSCREntrada3 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_SCRCOUNT_ENTRADA_3 > (injetor.radialSCREntrada3 + (injetor.radialSCREntrada3 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada3Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCREntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_3 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCREntrada3 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_ENTRADA_3 + "</span></p></td>";
                                                                  
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCREntrada3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCREntrada3 + "</span></p></td>";
                                                   
                                                }
   
                                                if (injetor.radialSCRSaida3 !== 0) {
   
                                                   (injetor.radialSCRSaida3 !== 0 && (parametros.RADIAL_SCRCOUNT_SAIDA_3 < (injetor.radialSCRSaida3 - (injetor.radialSCRSaida3 * injetor.tolRadial)).toFixed(1) || parametros.RADIAL_SCRCOUNT_SAIDA_3 > (injetor.radialSCRSaida3 + (injetor.radialSCRSaida3 * injetor.tolRadial)).toFixed(1))) 
                                                   ? radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida3Params' class='outOfRange'><p class='read-only outOfRange'><span class='cadastrados'> " + injetor.radialSCRSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_3 + "</span></p></td>"
                                                   : radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCRSaida3 + "</span> - <span class='reais'>" + parametros.RADIAL_SCRCOUNT_SAIDA_3 + "</span></p></td>";                  
                                                } else {
                                                   radial += "<td data-toggle='modal' data-target='#myModal' id='radialSCRSaida3Params'><p class='read-only'><span class='cadastrados'> " + injetor.radialSCRSaida3 + "</span></p></td>";
                                                   
                                                }
                                                radial += "</tr>";
   
                                                tableBody = $("#radial tbody");
                                                tableBody.html(radial);
   
                                             // FIM INJETORES
   
                                             // PERIFERICOS
   
                                             var termopar = "<tr>" +
                                                               "<th colspan='1'>TERMOPAR:</th>" +
                                                               "<td colspan='1'>" +
                                                                  "<p id='termoparKParams'>K</p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<p id='termoparJParams'>J</p>" +
                                                               "</td>" +
                                                            "</tr>"
                                                               
                                             tableBody = $("#termopar tbody");
                                             tableBody.html(termopar);
   
                                             if (perifericos.termopar === "K") {
                                                document.getElementById("termoparKParams").style.fontWeight = "bold";
                                                document.getElementById("termoparKParams").style.fontStyle = "italic";
                                                document.getElementById("termoparKParams").style.textDecoration = "underline";
                                             } else {
                                                document.getElementById("termoparJParams").style.fontWeight = "bold";
                                                document.getElementById("termoparJParams").style.fontStyle = "italic";
                                                document.getElementById("termoparJParams").style.textDecoration = "underline";
                                             }
   
                                             var camara = "<tr>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>1</label>" +
                                                
                                                                  ((perifericos.camara1 !== 0 && camara[71][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara1 + "</span> - <span class='reais'>" + camara[71][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara1 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara1 + "</span> - <span class='reais'>" + camara[71][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>2</label>" +
                                                
                                                                  ((perifericos.camara2 !== 0 && camara[70][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara2 + "</span> - <span class='reais'>" + camara[70][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara2 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara2 + "</span> - <span class='reais'>" + camara[70][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>3</label>" +
                                                
                                                                  ((perifericos.camara3 !== 0 && camara[69][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara3 + "</span> - <span class='reais'>" + camara[69][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara3 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara3 + "</span> - <span class='reais'>" + camara[69][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>4</label>" +
                                                
                                                                  ((perifericos.camara4 !== 0 && camara[68][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara4 + "</span> - <span class='reais'>" + camara[68][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara4 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara4 + "</span> - <span class='reais'>" + camara[68][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>5</label>" +
                                                
                                                                  ((perifericos.camara5 !== 0 && camara[67][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara5 + "</span> - <span class='reais'>" + camara[67][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara5 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara5 + "</span> - <span class='reais'>" + camara[67][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>6</label>" +
                                                
                                                                  ((perifericos.camara6 !== 0 && camara[66][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara6 + "</span> - <span class='reais'>" + camara[66][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara6 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara6 + "</span> - <span class='reais'>" + camara[66][0].value + "</span></p>" +
                                                               "</td>" +
                                                            "</tr>" +
                                                            "<tr>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>7</label>" +
                                                
                                                                  ((perifericos.camara7 !== 0 && camara[65][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara7 + "</span> - <span class='reais'>" + camara[65][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara7 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara7 + "</span> - <span class='reais'>" + camara[65][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>8</label>" +
                                                
                                                                  ((perifericos.camara8 !== 0 && camara[64][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara8 + "</span> - <span class='reais'>" + camara[64][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara8 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara8 + "</span> - <span class='reais'>" + camara[64][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>9</label>" +
                                                
                                                                  ((perifericos.camara9 !== 0 && camara[63][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara9 + "</span> - <span class='reais'>" + camara[63][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara9 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara9 + "</span> - <span class='reais'>" + camara[63][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>10</label>" +
                                                
                                                                  ((perifericos.camara10 !== 0 && camara[62][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara10 + "</span> - <span class='reais'>" + camara[62][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara10 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara10 + "</span> - <span class='reais'>" + camara[62][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>11</label>" +
                                                
                                                                  ((perifericos.camara11 !== 0 && camara[61][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara11 + "</span> - <span class='reais'>" + camara[61][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara11 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara11 + "</span> - <span class='reais'>" + camara[61][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>12</label>" +
                                                
                                                                  ((perifericos.camara12 !== 0 && camara[60][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara12 + "</span> - <span class='reais'>" + camara[60][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara12 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara12 + "</span> - <span class='reais'>" + camara[60][0].value + "</span></p>" +
                                                               "</td>" +
                                                            "</tr>" +
                                                            "<tr>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>13</label>" +
                                                
                                                                  ((perifericos.camara13 !== 0 && camara[59][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara13 + "</span> - <span class='reais'>" + camara[59][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara13 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara13 + "</span> - <span class='reais'>" + camara[59][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>14</label>" +
                                                
                                                                  ((perifericos.camara14 !== 0 && camara[58][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara14 + "</span> - <span class='reais'>" + camara[58][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara14 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara14 + "</span> - <span class='reais'>" + camara[58][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>15</label>" +
                                                
                                                                  ((perifericos.camara15 !== 0 && camara[57][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara15 + "</span> - <span class='reais'>" + camara[57][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara15 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara15 + "</span> - <span class='reais'>" + camara[57][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>16</label>" +
                                                
                                                                  ((perifericos.camara16 !== 0 && camara[56][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara16 + "</span> - <span class='reais'>" + camara[56][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara16 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara16 + "</span> - <span class='reais'>" + camara[56][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>17</label>" +
                                                
                                                                  ((perifericos.camara17 !== 0 && camara[55][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara17 + "</span> - <span class='reais'>" + camara[55][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara17 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara17 + "</span> - <span class='reais'>" + camara[55][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>18</label>" +
                                                
                                                                  ((perifericos.camara18 !== 0 && camara[54][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara18 + "</span> - <span class='reais'>" + camara[54][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara18 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara18 + "</span> - <span class='reais'>" + camara[54][0].value + "</span></p>" +
                                                               "</td>" +
                                                            "</tr>" +
                                                            "<tr>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>19</label>" +
                                                
                                                                  ((perifericos.camara19 !== 0 && camara[53][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara19 + "</span> - <span class='reais'>" + camara[53][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara19 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara19 + "</span> - <span class='reais'>" + camara[53][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>20</label>" +
                                                
                                                                  ((perifericos.camara20 !== 0 && camara[52][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara20 + "</span> - <span class='reais'>" + camara[52][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara20 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara20 + "</span> - <span class='reais'>" + camara[52][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>21</label>" +
                                                
                                                                  ((perifericos.camara21 !== 0 && camara[51][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara21 + "</span> - <span class='reais'>" + camara[51][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara21 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara21 + "</span> - <span class='reais'>" + camara[51][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>22</label>" +
                                                
                                                                  ((perifericos.camara22 !== 0 && camara[50][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara22 + "</span> - <span class='reais'>" + camara[50][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara22 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara22 + "</span> - <span class='reais'>" + camara[50][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>23</label>" +
                                                
                                                                  ((perifericos.camara23 !== 0 && camara[49][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara23 + "</span> - <span class='reais'>" + camara[49][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara23 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara23 + "</span> - <span class='reais'>" + camara[49][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>24</label>" +
                                                
                                                                  ((perifericos.camara24 !== 0 && camara[48][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara24 + "</span> - <span class='reais'>" + camara[48][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara24 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara24 + "</span> - <span class='reais'>" + camara[48][0].value + "</span></p>" +
                                                               "</td>" +
                                                            "</tr>" +
                                                            "<tr>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>25</label>" +
                                                
                                                                  ((perifericos.camara25 !== 0 && camara[47][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara25 + "</span> - <span class='reais'>" + camara[47][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara25 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara25 + "</span> - <span class='reais'>" + camara[47][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>26</label>" +
                                                
                                                                  ((perifericos.camara26 !== 0 && camara[46][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara26 + "</span> - <span class='reais'>" + camara[46][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara26 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara26 + "</span> - <span class='reais'>" + camara[46][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>27</label>" +
                                                
                                                                  ((perifericos.camara27 !== 0 && camara[45][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara27 + "</span> - <span class='reais'>" + camara[45][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara27 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara27 + "</span> - <span class='reais'>" + camara[45][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>28</label>" +
                                                
                                                                  ((perifericos.camara28 !== 0 && camara[44][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara28 + "</span> - <span class='reais'>" + camara[44][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara28 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara28 + "</span> - <span class='reais'>" + camara[44][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>29</label>" +
                                                
                                                                  ((perifericos.camara29 !== 0 && camara[43][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara29 + "</span> - <span class='reais'>" + camara[43][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara29 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara29 + "</span> - <span class='reais'>" + camara[43][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>30</label>" +
                                                
                                                                  ((perifericos.camara30 !== 0 && camara[42][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara30 + "</span> - <span class='reais'>" + camara[42][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara30 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara30 + "</span> - <span class='reais'>" + camara[42][0].value + "</span></p>" +
                                                               "</td>" +
                                                            "</tr>" +
                                                            "<tr>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>31</label>" +
                                                
                                                                  ((perifericos.camara31 !== 0 && camara[41][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara31 + "</span> - <span class='reais'>" + camara[41][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara31 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara31 + "</span> - <span class='reais'>" + camara[41][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>32</label>" +
                                                
                                                                  ((perifericos.camara32 !== 0 && camara[40][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara32 + "</span> - <span class='reais'>" + camara[40][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara32 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara32 + "</span> - <span class='reais'>" + camara[40][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>33</label>" +
                                                
                                                                  ((perifericos.camara33 !== 0 && camara[39][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara33 + "</span> - <span class='reais'>" + camara[39][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara33 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara33 + "</span> - <span class='reais'>" + camara[39][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>34</label>" +
                                                
                                                                  ((perifericos.camara34 !== 0 && camara[38][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara34 + "</span> - <span class='reais'>" + camara[38][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara34 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara34 + "</span> - <span class='reais'>" + camara[38][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>35</label>" +
                                                
                                                                  ((perifericos.camara35 !== 0 && camara[37][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara35 + "</span> - <span class='reais'>" + camara[37][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara35 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara35 + "</span> - <span class='reais'>" + camara[37][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>36</label>" +
                                                
                                                                  ((perifericos.camara36 !== 0 && camara[36][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara36 + "</span> - <span class='reais'>" + camara[36][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara36 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara36 + "</span> - <span class='reais'>" + camara[36][0].value + "</span></p>" +
                                                               "</td>" +
                                                            "</tr>" +
                                                            "<tr>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>37</label>" +
                                                
                                                                  ((perifericos.camara37 !== 0 && camara[35][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara37 + "</span> - <span class='reais'>" + camara[35][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara37 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara37 + "</span> - <span class='reais'>" + camara[35][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>38</label>" +
                                                
                                                                  ((perifericos.camara38 !== 0 && camara[34][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara38 + "</span> - <span class='reais'>" + camara[34][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara38 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara38 + "</span> - <span class='reais'>" + camara[34][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>39</label>" +
                                                
                                                                  ((perifericos.camara39 !== 0 && camara[33][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara39 + "</span> - <span class='reais'>" + camara[33][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara39 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara39 + "</span> - <span class='reais'>" + camara[33][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>40</label>" +
                                                
                                                                  ((perifericos.camara40 !== 0 && camara[32][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara40 + "</span> - <span class='reais'>" + camara[32][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara40 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara40 + "</span> - <span class='reais'>" + camara[32][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>41</label>" +
                                                
                                                                  ((perifericos.camara41 !== 0 && camara[31][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara41 + "</span> - <span class='reais'>" + camara[31][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara41 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara41 + "</span> - <span class='reais'>" + camara[31][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>42</label>" +
                                                
                                                                  ((perifericos.camara42 !== 0 && camara[30][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara42 + "</span> - <span class='reais'>" + camara[30][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara42 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara42 + "</span> - <span class='reais'>" + camara[30][0].value + "</span></p>" +
                                                               "</td>" +
                                                            "</tr>" +
                                                            "<tr>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>43</label>" +
                                                
                                                                  ((perifericos.camara43 !== 0 && camara[29][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara43 + "</span> - <span class='reais'>" + camara[29][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara43 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara43 + "</span> - <span class='reais'>" + camara[29][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>44</label>" +
                                                
                                                                  ((perifericos.camara44 !== 0 && camara[28][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara44 + "</span> - <span class='reais'>" + camara[28][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara44 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara44 + "</span> - <span class='reais'>" + camara[28][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>45</label>" +
                                                
                                                                  ((perifericos.camara45 !== 0 && camara[27][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara45 + "</span> - <span class='reais'>" + camara[27][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara45 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara45 + "</span> - <span class='reais'>" + camara[27][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>46</label>" +
                                                
                                                                  ((perifericos.camara46 !== 0 && camara[26][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara46 + "</span> - <span class='reais'>" + camara[26][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara46 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara46 + "</span> - <span class='reais'>" + camara[26][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>47</label>" +
                                                
                                                                  ((perifericos.camara47 !== 0 && camara[25][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara47 + "</span> - <span class='reais'>" + camara[25][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara47 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara47 + "</span> - <span class='reais'>" + camara[25][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>48</label>" +
                                                
                                                                  ((perifericos.camara48 !== 0 && camara[24][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara48 + "</span> - <span class='reais'>" + camara[24][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara48 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara48 + "</span> - <span class='reais'>" + camara[24][0].value + "</span></p>" +
                                                               "</td>" +
                                                            "</tr>" +
                                                            "<tr>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>49</label>" +
                                                
                                                                  ((perifericos.camara49 !== 0 && camara[23][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara49 + "</span> - <span class='reais'>" + camara[23][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara49 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara49 + "</span> - <span class='reais'>" + camara[23][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>50</label>" +
                                                
                                                                  ((perifericos.camara50 !== 0 && camara[22][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara50 + "</span> - <span class='reais'>" + camara[22][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara50 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara50 + "</span> - <span class='reais'>" + camara[22][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>51</label>" +
                                                
                                                                  ((perifericos.camara51 !== 0 && camara[21][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara51 + "</span> - <span class='reais'>" + camara[21][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara51 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara51 + "</span> - <span class='reais'>" + camara[21][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>52</label>" +
                                                
                                                                  ((perifericos.camara52 !== 0 && camara[20][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara52 + "</span> - <span class='reais'>" + camara[20][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara52 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara52 + "</span> - <span class='reais'>" + camara[20][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>53</label>" +
                                                
                                                                  ((perifericos.camara53 !== 0 && camara[19][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara53 + "</span> - <span class='reais'>" + camara[19][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara53 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara53 + "</span> - <span class='reais'>" + camara[19][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>54</label>" +
                                                
                                                                  ((perifericos.camara54 !== 0 && camara[18][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara54 + "</span> - <span class='reais'>" + camara[18][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara54 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara54 + "</span> - <span class='reais'>" + camara[18][0].value + "</span></p>" +
                                                               "</td>" +
                                                            "</tr>" +
                                                            "<tr>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>55</label>" +
                                                
                                                                  ((perifericos.camara55 !== 0 && camara[17][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara55 + "</span> - <span class='reais'>" + camara[17][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara55 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara55 + "</span> - <span class='reais'>" + camara[17][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>56</label>" +
                                                
                                                                  ((perifericos.camara56 !== 0 && camara[16][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara56 + "</span> - <span class='reais'>" + camara[16][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara56 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara56 + "</span> - <span class='reais'>" + camara[16][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>57</label>" +
                                                
                                                                  ((perifericos.camara57 !== 0 && camara[15][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara57 + "</span> - <span class='reais'>" + camara[15][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara57 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara57 + "</span> - <span class='reais'>" + camara[15][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>58</label>" +
                                                
                                                                  ((perifericos.camara58 !== 0 && camara[14][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara58 + "</span> - <span class='reais'>" + camara[14][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara58 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara58 + "</span> - <span class='reais'>" + camara[14][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>59</label>" +
                                                
                                                                  ((perifericos.camara59 !== 0 && camara[13][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara59 + "</span> - <span class='reais'>" + camara[13][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara59 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara59 + "</span> - <span class='reais'>" + camara[13][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>60</label>" +
                                                
                                                                  ((perifericos.camara60 !== 0 && camara[12][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara60 + "</span> - <span class='reais'>" + camara[12][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara60 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara60 + "</span> - <span class='reais'>" + camara[12][0].value + "</span></p>" +
                                                               "</td>" +
                                                            "</tr>" +
                                                            "<tr>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>61</label>" +
                                                
                                                                  ((perifericos.camara61 !== 0 && camara[11][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara61 + "</span> - <span class='reais'>" + camara[11][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara61 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara61 + "</span> - <span class='reais'>" + camara[11][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>62</label>" +
                                                
                                                                  ((perifericos.camara62 !== 0 && camara[10][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara62 + "</span> - <span class='reais'>" + camara[10][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara62 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara62 + "</span> - <span class='reais'>" + camara[10][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>63</label>" +
                                                
                                                                  ((perifericos.camara63 !== 0 && camara[9][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara63 + "</span> - <span class='reais'>" + camara[9][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara63 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara63 + "</span> - <span class='reais'>" + camara[9][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>64</label>" +
                                                
                                                                  ((perifericos.camara64 !== 0 && camara[8][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara64 + "</span> - <span class='reais'>" + camara[8][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara64 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara64 + "</span> - <span class='reais'>" + camara[8][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>65</label>" +
                                                
                                                                  ((perifericos.camara65 !== 0 && camara[7][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara65 + "</span> - <span class='reais'>" + camara[7][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara65 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara65 + "</span> - <span class='reais'>" + camara[7][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>66</label>" +
                                                
                                                                  ((perifericos.camara66 !== 0 && camara[6][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara66 + "</span> - <span class='reais'>" + camara[6][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara66 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara66 + "</span> - <span class='reais'>" + camara[6][0].value + "</span></p>" +
                                                               "</td>" +
                                                            "</tr>" +
                                                            "<tr>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>67</label>" +
                                                
                                                                  ((perifericos.camara67 !== 0 && camara[5][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara67 + "</span> - <span class='reais'>" + camara[5][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara67 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara67 + "</span> - <span class='reais'>" + camara[5][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>68</label>" +
                                                
                                                                  ((perifericos.camara68 !== 0 && camara[4][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara68 + "</span> - <span class='reais'>" + camara[4][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara68 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara68 + "</span> - <span class='reais'>" + camara[4][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>69</label>" +
   
                                                                  ((perifericos.camara69 !== 0 && camara[3][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara69 + "</span> - <span class='reais'>" + camara[3][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara69 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara69 + "</span> - <span class='reais'>" + camara[3][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>70</label>" +
   
                                                                  ((perifericos.camara70 !== 0 && camara[2][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara70 + "</span> - <span class='reais'>" + camara[2][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara70 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara70 + "</span> - <span class='reais'>" + camara[2][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>71</label>" +
   
                                                                  ((perifericos.camara71 !== 0 && camara[1][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara71 + "</span> - <span class='reais'>" + camara[1][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara71 + "</span></p>") +
   
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara71 + "</span> - <span class='reais'>" + camara[1][0].value + "</span></p>" +
                                                               "</td>" +
                                                               "<td colspan='1'>" +
                                                                  "<label id='labelCamara' class='d-flex'>72</label>" +
   
                                                                  ((perifericos.camara72 !== 0 && camara[0][0].value < 1000)
                                                                  ? "<p class='read-only'><span class='cadastrados'>" + perifericos.camara72 + "</span> - <span class='reais'>" + camara[0][0].value + "</span></p>"
                                                                  : "<p class='read-only'><span class='cadastrados'>" + perifericos.camara72 + "</span></p>") +
                                                               //    "<p class='read-only'><span class='cadastrados'>" + perifericos.camara72 + "</span> - <span class='reais'>" + camara[0][0].value + "</span></p>" +
                                                               
                                                               "</td>" +
                                                            "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>73</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara73 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>74</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara74 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>75</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara75 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>76</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara76 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>77</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara77 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>78</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara78 + "</span></p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>79</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara79 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>80</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara80 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>81</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara81 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>82</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara82 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>83</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara83 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>84</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara84 + "</span></p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>85</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara85 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>86</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara86 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>87</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara87 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>88</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara88 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>89</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara89 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>90</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara90 + "</span></p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>91</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara91 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>92</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara92 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>93</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara93 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>94</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara94 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>95</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara95 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>96</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara96 + "</span></p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>97</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara97 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>98</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara98 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>99</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara99 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>100</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara100 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>101</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara101 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>102</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara102 + "</span></p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>103</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara103 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>104</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara104 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>105</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara105 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>106</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara106 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>107</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara107 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>108</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara108 + "</span></p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>109</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara109 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>110</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara110 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>111</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara111 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>112</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara112 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>113</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara113 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>114</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara114 + "</span></p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>115</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara115 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>116</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara116 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>117</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara117 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>118</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara118 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>119</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara119 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>120</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara120 + "</span></p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>121</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara121 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>122</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara122 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>123</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara123 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>124</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara124 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>125</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara125 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>126</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara126 + "</span></p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>127</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara127 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>128</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara128 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>129</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara129 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<label id='labelCamara' class='d-flex'>130</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.camara130 + "</span></p>" +
                                                                  "</td>" +
                                                            "</tr>"
   
                                                tableBody = $("#camaraQuente tbody");
                                                tableBody.html(camara);
   
                                                var voltagem = "<tr>" +
                                                                  "<th colspan='1'>VOLTAGEM:</th>" +
                                                                  "<td colspan='1'>" +
                                                                     "<p id='voltagem220Params'>220</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='1'>" +
                                                                     "<p id='voltagem24Params'>24</p>" +
                                                                  "</td>" +
                                                               "</tr>"
                                                                     
                                                tableBody = $("#voltagem tbody");
                                                tableBody.html(voltagem);
   
                                                if (perifericos.voltagem === "220") {
                                                   document.getElementById("voltagem220Params").style.fontWeight = "bold";
                                                   document.getElementById("voltagem220Params").style.fontStyle = "italic";
                                                   document.getElementById("voltagem220Params").style.textDecoration = "underline";
                                                } else {
                                                   document.getElementById("voltagem24Params").style.fontWeight = "bold";
                                                   document.getElementById("voltagem24Params").style.fontStyle = "italic";
                                                   document.getElementById("voltagem24Params").style.textDecoration = "underline";
                                                }
   
                                                var valveGate ="<tr>" +
                                                                  "<th colspan='1'>BICO</th>" +
                                                                  "<th colspan='3'>DLY TIME</th>" +
                                                                  "<th colspan='3'>ACT TIME</th>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG1</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG1DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG1ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG2</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG2DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG2ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG3</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG3DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG3ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG4</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG4DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG4ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG5</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG5DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG5ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG6</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG6DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG6ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG7</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG7DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG7ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG8</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG8DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG8ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='7' style='height: 40px;'>" +
                                                                     "<p class='read-only' style='width: 100%;'></p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG9</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG9DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG9ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG10</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG10DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG10ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG11</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG11DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG11ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG12</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG12DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG12ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG13</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG13DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG13ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG14</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG14DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG14ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG15</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG15DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG15ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG16</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG16DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG16ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='7' style='height: 40px;'>" +
                                                                     "<p class='read-only' style='width: 100%;'></p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG17</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG17DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG17ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG18</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG18DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG18ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG19</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG19DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG19ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG20</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG20DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG20ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG21</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG21DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG21ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG22</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG22DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG22ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG23</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG23DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG23ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG24</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG24DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG24ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='7' style='height: 40px;'>" +
                                                                     "<p class='read-only' style='width: 100%;'></p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG25</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG25DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG25ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG26</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG26DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG26ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG27</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG27DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG27ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG28</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG28DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG28ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG29</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG29DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG29ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG30</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG30DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG30ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG31</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG31DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG31ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG32</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG32DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG32ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='7' style='height: 40px;'>" +
                                                                     "<p class='read-only' style='width: 100%;'></p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG33</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG33DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG33ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG34</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG34DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG34ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG35</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG35DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG35ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG36</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG36DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG36ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG37</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG37DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG37ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG38</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG38DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG38ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG39</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG39DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG39ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<th>VG40</th>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG40DLYTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.VG40ACTTIME + "</span>" + "</p>" +
                                                                  "</td>" +
                                                               "</tr>"
                                                               
                                                tableBody = $("#valveGate tbody");
                                                tableBody.html(valveGate);
                                                
                                                var refrigeracao = "<tr>" +
                                                                     "<th colspan='3' style='text-align: center;'>LADO FIXO</th>" +
                                                                     "<th colspan='3' style='text-align: center;'>LADO MÓVEL</th>" +
                                                                  "</tr>" +
                                                                  "<tr>" +
                                                                     "<td>" +
                                                                        "<input class='read-only' readonly style='width: 100%' id='rmladofixo1' name='rmladofixo1' value='" + perifericos.refrLadoFixo1 + "'>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='GeladaFixo1Params'>Água Gelada</p>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='FriaFixo1Params'>Água Fria</p>" +
                                                                     "</td>"+
                                                                     "<td>" +
                                                                        "<input class='read-only' readonly style='width: 100%' id='rmladomovel1' name='rmladomovel1' value='" + perifericos.refrLadoMovel1 + "'>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='GeladaMovel1Params'>Água Gelada</p>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='FriaMovel1Params'>Água Fria</p>" +
                                                                     "</td>" +
                                                                  "</tr>" +
                                                                  "<tr>" +
                                                                     "<td>" +
                                                                        "<input class='read-only' readonly style='width: 100%' id='rmladofixo2' name='rmladofixo2' value='" + perifericos.refrLadoFixo2 + "'>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='GeladaFixo2Params'>Água Gelada</p>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='FriaFixo2Params'>Água Fria</p>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<input class='read-only' readonly style='width: 100%' id='rmladomovel2' name='rmladomovel2' value='" + perifericos.refrLadoMovel2 + "'>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='GeladaMovel2Params'>Água Gelada</p>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='FriaMovel2Params'>Água Fria</p>" +
                                                                     "</td>" +
                                                                  "</tr>" +
                                                                  "<tr>" +
                                                                     "<td>" +
                                                                        "<input class='read-only' readonly style='width: 100%' id='rmladofixo3' name='rmladofixo3' value='" + perifericos.refrLadoFixo3 + "'>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='GeladaFixo3Params'>Água Gelada</p>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='FriaFixo3Params'>Água Fria</p>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<input class='read-only' readonly style='width: 100%' id='rmladomovel3' name='rmladomovel3' value='" + perifericos.refrLadoMovel3 + "'>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='GeladaMovel3Params'>Água Gelada</p>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='FriaMovel3Params'>Água Fria</p>" +
                                                                     "</td>" +
                                                                  "</tr>" +
                                                                  "<tr>" +
                                                                     "<td>" +
                                                                        "<input class='read-only' readonly style='width: 100%' id='rmladofixo4' name='rmladofixo4' value='" + perifericos.refrLadoFixo4 + "'>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='GeladaFixo4Params'>Água Gelada</p>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='FriaFixo4Params'>Água Fria</p>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<input class='read-only' readonly style='width: 100%' id='rmladomovel4' name='rmladomovel4' value='" + perifericos.refrLadoMovel4 + "'>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='GeladaMovel4Params'>Água Gelada</p>" +
                                                                     "</td>" +
                                                                     "<td>" +
                                                                        "<p id='FriaMovel4Params'>Água Fria</p>" +
                                                                     "</td>" +
                                                                  "</tr>"
   
                                                tableBody = $("#refrigeracao tbody");
                                                tableBody.html(refrigeracao);
                                                
                                                var vapor = "<tr>" +
                                                                  "<td colspan='2'>" +
                                                                     "<label id='labelVapor' class='d-flex'>Temperatura</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.vaporLadoFixo1 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     // "<p class='cadastrados' style='font-weight: 500' id='aguaF1Fixo'>Água Industrial F1</p>" +
                                                                     "<p style='font-weight: bold' id='aguaF1Fixo'>Água Industrial F1</p>" +
                                                                  "</td>" +
                                                
                                                                  "<td colspan='2'>" +
                                                                     "<label id='labelVapor' class='d-flex'>Temperatura</label>" +
                                                                     "<p class='read-only'><span class='reais'>" + temperatura[0][0].value.toFixed(2) + "</span></p>" +
                                                                  "</td>" +
                                                                  // "<td colspan='1'>" +
                                                                  //    "<p class='reais' style='font-weight: 500' id='aguaF1Movel'>Água Industrial F1</p>" +
                                                                  // "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='2'>" +
                                                                     "<label id='labelVapor' class='d-flex'>Temperatura</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.vaporLadoFixo2 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     // "<p class='cadastrados' style='font-weight: 500' id='aguaF2Fixo'>Água Industrial F2</p>" +
                                                                     "<p style='font-weight: bold' id='aguaF2Fixo'>Água Industrial F2</p>" +
                                                                  "</td>" +
                                                
                                                                  "<td colspan='2'>" +
                                                                     "<label id='labelVapor' class='d-flex'>Temperatura</label>" +
                                                                     "<p class='read-only'><span class='reais'>" + temperatura[0][1].value.toFixed(2) + "</span></p>" +
                                                                  "</td>" +
                                                                  // "<td colspan='1'>" +
                                                                  //    "<p class='reais' style='font-weight: 500' id='aguaF2Movel'>Água Industrial F2</p>" +
                                                                  // "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='2'>" +
                                                                     "<label id='labelVapor' class='d-flex'>Temperatura</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.vaporLadoFixo3 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     // "<p class='cadastrados' style='font-weight: 500' id='geladaFixo'>Água Gelada</p>" +
                                                                     "<p style='font-weight: bold' id='geladaFixo'>Água Gelada</p>" +
                                                                  "</td>" +
                                                
                                                                  "<td colspan='2'>" +
                                                                     "<label id='labelVapor' class='d-flex'>Temperatura</label>" +
                                                                     "<p class='read-only'><span class='reais'>" + temperatura[0][2].value.toFixed(2) + "</span></p>" +
                                                                  "</td>" +
                                                                  // "<td colspan='1'>" +
                                                                  //    "<p class='reais' style='font-weight: 500' id='geladaMovel'>Água Gelada</p>" +
                                                                  // "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='2'>" +
                                                                     "<label id='labelVapor' class='d-flex'>Bar</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.vaporLadoFixo4 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     // "<p class='cadastrados' style='font-weight: 500' id='vaporFixo'>Vapor</p>" +
                                                                     "<p style='font-weight: bold' id='vaporFixo'>Vapor</p>" +
                                                                  "</td>" +
                                                
                                                                  "<td colspan='2'>" +
                                                                     "<label id='labelVapor' class='d-flex'>Bar</label>" +
                                                                     "<p class='read-only'><span class='reais'>" + temperatura[0][3].value.toFixed(2) + "</span></p>" +
                                                                  "</td>" +
                                                                  // "<td colspan='1'>" +
                                                                  //    "<p class='reais' style='font-weight: 500' id='vaporMovel'>Vapor</p>" +
                                                                  // "</td>" +
                                                               "</tr>" +
                                                               "<tr>" +
                                                                  "<td colspan='2'>" +
                                                                     "<label id='labelVapor' class='d-flex'>Bar</label>" +
                                                                     "<p class='read-only'><span class='cadastrados'>" + perifericos.vaporLadoFixo5 + "</span></p>" +
                                                                  "</td>" +
                                                                  "<td colspan='3'>" +
                                                                     // "<p class='cadastrados' style='font-weight: 500' id='arFixo'>Ar Comprimido</p>" +
                                                                     "<p style='font-weight: bold' id='arFixo'>Ar Comprimido</p>" +
                                                                  "</td>" +
                                                
                                                                  "<td colspan='2'>" +
                                                                     "<label id='labelVapor' class='d-flex'>Bar</label>" +
                                                                     "<p class='read-only'><span class='reais'>" + temperatura[0][4].value.toFixed(2) + "</span></p>" +
                                                                  "</td>" +
                                                                  // "<td colspan='1'>" +
                                                                  //    "<p class='reais' style='font-weight: 500' id='arMovel'>Ar Comprimido</p>" +
                                                                  // "</td>" +
                                                               "</tr>"
   
                                                tableBody = $("#vapor tbody");
                                                tableBody.html(vapor);
   
                                                //refrigeracao fixo
                                                if (perifericos.fixoRefrig1 === "Gelada") {
                                                   document.getElementById("GeladaFixo1Params").style.fontWeight = "bold";
                                                   document.getElementById("GeladaFixo1Params").style.fontStyle = "italic";
                                                   document.getElementById("GeladaFixo1Params").style.textDecoration = "underline";
                                                } else {
                                                   document.getElementById("FriaFixo1Params").style.fontWeight = "bold";
                                                   document.getElementById("FriaFixo1Params").style.fontStyle = "italic";
                                                   document.getElementById("FriaFixo1Params").style.textDecoration = "underline";
                                                }
   
                                                if (perifericos.fixoRefrig2 === "Gelada") {
                                                   document.getElementById("GeladaFixo2Params").style.fontWeight = "bold";
                                                   document.getElementById("GeladaFixo2Params").style.fontStyle = "italic";
                                                   document.getElementById("GeladaFixo2Params").style.textDecoration = "underline";
                                                } else {
                                                   document.getElementById("FriaFixo2Params").style.fontWeight = "bold";
                                                   document.getElementById("FriaFixo2Params").style.fontStyle = "italic";
                                                   document.getElementById("FriaFixo2Params").style.textDecoration = "underline";
                                                }
   
                                                if (perifericos.fixoRefrig3 === "Gelada") {
                                                   document.getElementById("GeladaFixo3Params").style.fontWeight = "bold";
                                                   document.getElementById("GeladaFixo3Params").style.fontStyle = "italic";
                                                   document.getElementById("GeladaFixo3Params").style.textDecoration = "underline";
                                                } else {
                                                   document.getElementById("FriaFixo3Params").style.fontWeight = "bold";
                                                   document.getElementById("FriaFixo3Params").style.fontStyle = "italic";
                                                   document.getElementById("FriaFixo3Params").style.textDecoration = "underline";
                                                }
   
                                                if (perifericos.fixoRefrig4 === "Gelada") {
                                                   document.getElementById("GeladaFixo4Params").style.fontWeight = "bold";
                                                   document.getElementById("GeladaFixo4Params").style.fontStyle = "italic";
                                                   document.getElementById("GeladaFixo4Params").style.textDecoration = "underline";
                                                } else {
                                                   document.getElementById("FriaFixo4Params").style.fontWeight = "bold";
                                                   document.getElementById("FriaFixo4Params").style.fontStyle = "italic";
                                                   document.getElementById("FriaFixo4Params").style.textDecoration = "underline";
                                                }
   
                                                // refrigeracao movel
                                                if (perifericos.movelRefrig1 === "Gelada") {
                                                   document.getElementById("GeladaMovel1Params").style.fontWeight = "bold";
                                                   document.getElementById("GeladaMovel1Params").style.fontStyle = "italic";
                                                   document.getElementById("GeladaMovel1Params").style.textDecoration = "underline";
                                                } else {
                                                   document.getElementById("FriaMovel1Params").style.fontWeight = "bold";
                                                   document.getElementById("FriaMovel1Params").style.fontStyle = "italic";
                                                   document.getElementById("FriaMovel1Params").style.textDecoration = "underline";
                                                }
   
                                                if (perifericos.movelRefrig2 === "Gelada") {
                                                   document.getElementById("GeladaMovel2Params").style.fontWeight = "bold";
                                                   document.getElementById("GeladaMovel2Params").style.fontStyle = "italic";
                                                   document.getElementById("GeladaMovel2Params").style.textDecoration = "underline";
                                                } else {
                                                   document.getElementById("FriaMovel2Params").style.fontWeight = "bold";
                                                   document.getElementById("FriaMovel2Params").style.fontStyle = "italic";
                                                   document.getElementById("FriaMovel2Params").style.textDecoration = "underline";
                                                }
   
                                                if (perifericos.movelRefrig3 === "Gelada") {
                                                   document.getElementById("GeladaMovel3Params").style.fontWeight = "bold";
                                                   document.getElementById("GeladaMovel3Params").style.fontStyle = "italic";
                                                   document.getElementById("GeladaMovel3Params").style.textDecoration = "underline";
                                                } else {
                                                   document.getElementById("FriaMovel3Params").style.fontWeight = "bold";
                                                   document.getElementById("FriaMovel3Params").style.fontStyle = "italic";
                                                   document.getElementById("FriaMovel3Params").style.textDecoration = "underline";
                                                }
   
                                                if (perifericos.movelRefrig4 === "Gelada") {
                                                   document.getElementById("GeladaMovel4Params").style.fontWeight = "bold";
                                                   document.getElementById("GeladaMovel4Params").style.fontStyle = "italic";
                                                   document.getElementById("GeladaMovel4Params").style.textDecoration = "underline";
                                                } else {
                                                   document.getElementById("FriaMovel4Params").style.fontWeight = "bold";
                                                   document.getElementById("FriaMovel4Params").style.fontStyle = "italic";
                                                   document.getElementById("FriaMovel4Params").style.textDecoration = "underline";
                                                }
                                                
                                                // CLICK EVENT
                                                document.getElementById("cilindro1Params").addEventListener("click", function () {
                                                   console.log('teste');
                                                   plotaGrafico("cilindro1");
                                                }, false);
                                                document.getElementById("cilindro2Params").addEventListener("click", function () {
                                                   plotaGrafico("cilindro2");
                                                }, false);
                                                document.getElementById("cilindro3Params").addEventListener("click", function () {
                                                   plotaGrafico("cilindro3");
                                                }, false);
                                                document.getElementById("cilindro4Params").addEventListener("click", function () {
                                                   plotaGrafico("cilindro4");
                                                }, false);
                                                document.getElementById("cilindro5Params").addEventListener("click", function () {
                                                   plotaGrafico("cilindro5");
                                                }, false);
                                                document.getElementById("cilindro6Params").addEventListener("click", function () {
                                                   plotaGrafico("cilindro6");
                                                }, false);
                                                document.getElementById("cilindro7Params").addEventListener("click", function () {
                                                   plotaGrafico("cilindro7");
                                                }, false);
                                                document.getElementById("posInjecao1Params").addEventListener("click", function () {
                                                   plotaGrafico("posInjecao1");
                                                }, false);
                                                document.getElementById("posInjecao2Params").addEventListener("click", function () {
                                                   plotaGrafico("posInjecao2");
                                                }, false);
                                                document.getElementById("posInjecao3Params").addEventListener("click", function () {
                                                   plotaGrafico("posInjecao3");
                                                }, false);
                                                document.getElementById("posInjecao4Params").addEventListener("click", function () {
                                                   plotaGrafico("posInjecao4");
                                                }, false);
                                                document.getElementById("posInjecao5Params").addEventListener("click", function () {
                                                   plotaGrafico("posInjecao5");
                                                }, false);
                                                document.getElementById("presInjecao1Params").addEventListener("click", function () {
                                                   plotaGrafico("presInjecao1");
                                                }, false);
                                                document.getElementById("presInjecao2Params").addEventListener("click", function () {
                                                   plotaGrafico("presInjecao2");
                                                }, false);
                                                document.getElementById("presInjecao3Params").addEventListener("click", function () {
                                                   plotaGrafico("presInjecao3");
                                                }, false);
                                                document.getElementById("presInjecao4Params").addEventListener("click", function () {
                                                   plotaGrafico("presInjecao4");
                                                }, false);
                                                document.getElementById("presInjecao5Params").addEventListener("click", function () {
                                                   plotaGrafico("presInjecao5");
                                                }, false);
                                                document.getElementById("fluxoInjecao1Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoInjecao1");
                                                }, false);
                                                document.getElementById("fluxoInjecao2Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoInjecao2");
                                                }, false);
                                                document.getElementById("fluxoInjecao3Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoInjecao3");
                                                }, false);
                                                document.getElementById("fluxoInjecao4Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoInjecao4");
                                                }, false);
                                                document.getElementById("fluxoInjecao5Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoInjecao5");
                                                }, false);
                                                document.getElementById("tempoDisparoParams").addEventListener("click", function () {
                                                   plotaGrafico("tempoDisparo");
                                                }, false);
                                                document.getElementById("pressaoInjParams").addEventListener("click", function () {
                                                   plotaGrafico("pressaoInj");
                                                }, false);
                                                document.getElementById("presRecalque1Params").addEventListener("click", function () {
                                                   plotaGrafico("presRecalque1");
                                                }, false);
                                                document.getElementById("presRecalque2Params").addEventListener("click", function () {
                                                   plotaGrafico("presRecalque2");
                                                }, false);
                                                document.getElementById("presRecalque3Params").addEventListener("click", function () {
                                                   plotaGrafico("presRecalque3");
                                                }, false);
                                                document.getElementById("presRecalque4Params").addEventListener("click", function () {
                                                   plotaGrafico("presRecalque4");
                                                }, false);
                                                document.getElementById("presRecalque5Params").addEventListener("click", function () {
                                                   plotaGrafico("presRecalque5");
                                                }, false);
                                                document.getElementById("fluxoRecalque1Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoRecalque1");
                                                }, false);
                                                document.getElementById("fluxoRecalque2Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoRecalque2");
                                                }, false);
                                                document.getElementById("fluxoRecalque3Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoRecalque3");
                                                }, false);
                                                document.getElementById("fluxoRecalque4Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoRecalque4");
                                                }, false);
                                                document.getElementById("fluxoRecalque5Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoRecalque5");
                                                }, false);
                                                document.getElementById("tempoRecalque1Params").addEventListener("click", function () {
                                                   plotaGrafico("tempoRecalque1");
                                                }, false);
                                                document.getElementById("tempoRecalque2Params").addEventListener("click", function () {
                                                   plotaGrafico("tempoRecalque2");
                                                }, false);
                                                document.getElementById("tempoRecalque3Params").addEventListener("click", function () {
                                                   plotaGrafico("tempoRecalque3");
                                                }, false);
                                                document.getElementById("tempoRecalque4Params").addEventListener("click", function () {
                                                   plotaGrafico("tempoRecalque4");
                                                }, false);
                                                document.getElementById("tempoRecalque5Params").addEventListener("click", function () {
                                                   plotaGrafico("tempoRecalque5");
                                                }, false);
                                                document.getElementById("partDosagem1Params").addEventListener("click", function () {
                                                   plotaGrafico("partDosagem1");
                                                }, false);
                                                document.getElementById("partDosagem2Params").addEventListener("click", function () {
                                                   plotaGrafico("partDosagem2");
                                                }, false);
                                                document.getElementById("partDosagem3Params").addEventListener("click", function () {
                                                   plotaGrafico("partDosagem3");
                                                }, false);
                                                document.getElementById("partDosagem4Params").addEventListener("click", function () {
                                                   plotaGrafico("partDosagem4");
                                                }, false);
                                                document.getElementById("partDosagem5Params").addEventListener("click", function () {
                                                   plotaGrafico("partDosagem5");
                                                }, false);
                                                document.getElementById("presDosagem1Params").addEventListener("click", function () {
                                                   plotaGrafico("presDosagem1");
                                                }, false);
                                                document.getElementById("presDosagem2Params").addEventListener("click", function () {
                                                   plotaGrafico("presDosagem2");
                                                }, false);
                                                document.getElementById("presDosagem3Params").addEventListener("click", function () {
                                                   plotaGrafico("presDosagem3");
                                                }, false);
                                                document.getElementById("presDosagem4Params").addEventListener("click", function () {
                                                   plotaGrafico("presDosagem4");
                                                }, false);
                                                document.getElementById("presDosagem5Params").addEventListener("click", function () {
                                                   plotaGrafico("presDosagem5");
                                                }, false);
                                                document.getElementById("fluxoDosagem1Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoDosagem1");
                                                }, false);
                                                document.getElementById("fluxoDosagem2Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoDosagem2");
                                                }, false);
                                                document.getElementById("fluxoDosagem3Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoDosagem3");
                                                }, false);
                                                document.getElementById("fluxoDosagem4Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoDosagem4");
                                                }, false);
                                                document.getElementById("fluxoDosagem5Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoDosagem5");
                                                }, false);
                                                document.getElementById("CPDosagem1Params").addEventListener("click", function () {
                                                   plotaGrafico("CPDosagem1");
                                                }, false);
                                                document.getElementById("CPDosagem2Params").addEventListener("click", function () {
                                                   plotaGrafico("CPDosagem2");
                                                }, false);
                                                document.getElementById("CPDosagem3Params").addEventListener("click", function () {
                                                   plotaGrafico("CPDosagem3");
                                                }, false);
                                                document.getElementById("CPDosagem4Params").addEventListener("click", function () {
                                                   plotaGrafico("CPDosagem4");
                                                }, false);
                                                document.getElementById("CPDosagem5Params").addEventListener("click", function () {
                                                   plotaGrafico("CPDosagem5");
                                                }, false);
                                                document.getElementById("tempoDosagemParams").addEventListener("click", function () {
                                                   plotaGrafico("tempoDosagem");
                                                }, false);
                                                document.getElementById("posFecha1Params").addEventListener("click", function () {
                                                   plotaGrafico("posFecha1");
                                                }, false);
                                                document.getElementById("posFecha2Params").addEventListener("click", function () {
                                                   plotaGrafico("posFecha2");
                                                }, false);
                                                document.getElementById("posFecha3Params").addEventListener("click", function () {
                                                   plotaGrafico("posFecha3");
                                                }, false);
                                                document.getElementById("protMPosParams").addEventListener("click", function () {
                                                   plotaGrafico("protMPos");
                                                }, false);
                                                document.getElementById("AltaPresPosParams").addEventListener("click", function () {
                                                   plotaGrafico("AltaPresPos");
                                                }, false);
                                                document.getElementById("presFecha1Params").addEventListener("click", function () {
                                                   plotaGrafico("presFecha1");
                                                }, false);
                                                document.getElementById("presFecha2Params").addEventListener("click", function () {
                                                   plotaGrafico("presFecha2");
                                                }, false);
                                                document.getElementById("presFecha3Params").addEventListener("click", function () {
                                                   plotaGrafico("presFecha3");
                                                }, false);
                                                document.getElementById("protMPresParams").addEventListener("click", function () {
                                                   plotaGrafico("protMPres");
                                                }, false);
                                                document.getElementById("AltaPresPresParams").addEventListener("click", function () {
                                                   plotaGrafico("AltaPresPres");
                                                }, false);
                                                document.getElementById("fluxoFecha1Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoFecha1");
                                                }, false);
                                                document.getElementById("fluxoFecha2Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoFecha2");
                                                }, false);
                                                document.getElementById("fluxoFecha3Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoFecha3");
                                                }, false);
                                                document.getElementById("protMFluxoParams").addEventListener("click", function () {
                                                   plotaGrafico("protMFluxo");
                                                }, false);
                                                document.getElementById("AltaPresFluxoParams").addEventListener("click", function () {
                                                   plotaGrafico("AltaPresFluxo");
                                                }, false);
                                                document.getElementById("tempoProtMoldeParams").addEventListener("click", function () {
                                                   plotaGrafico("tempoProtMolde");
                                                }, false);
                                                document.getElementById("tempoFechaParams").addEventListener("click", function () {
                                                   plotaGrafico("tempoFecha");
                                                }, false);
                                                document.getElementById("posAbertura1Params").addEventListener("click", function () {
                                                   plotaGrafico("posAbertura1");
                                                }, false);
                                                document.getElementById("posAbertura2Params").addEventListener("click", function () {
                                                   plotaGrafico("posAbertura2");
                                                }, false);
                                                document.getElementById("posAbertura3Params").addEventListener("click", function () {
                                                   plotaGrafico("posAbertura3");
                                                }, false);
                                                document.getElementById("posAbertura4Params").addEventListener("click", function () {
                                                   plotaGrafico("posAbertura4");
                                                }, false);
                                                document.getElementById("posAbertura5Params").addEventListener("click", function () {
                                                   plotaGrafico("posAbertura5");
                                                }, false);
                                                document.getElementById("presAbertura1Params").addEventListener("click", function () {
                                                   plotaGrafico("presAbertura1");
                                                }, false);
                                                document.getElementById("presAbertura2Params").addEventListener("click", function () {
                                                   plotaGrafico("presAbertura2");
                                                }, false);
                                                document.getElementById("presAbertura3Params").addEventListener("click", function () {
                                                   plotaGrafico("presAbertura3");
                                                }, false);
                                                document.getElementById("presAbertura4Params").addEventListener("click", function () {
                                                   plotaGrafico("presAbertura4");
                                                }, false);
                                                document.getElementById("presAbertura5Params").addEventListener("click", function () {
                                                   plotaGrafico("presAbertura5");
                                                }, false);
                                                document.getElementById("fluxoAbertura1Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoAbertura1");
                                                }, false);
                                                document.getElementById("fluxoAbertura2Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoAbertura2");
                                                }, false);
                                                document.getElementById("fluxoAbertura3Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoAbertura3");
                                                }, false);
                                                document.getElementById("fluxoAbertura4Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoAbertura4");
                                                }, false);
                                                document.getElementById("fluxoAbertura5Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoAbertura5");
                                                }, false);
                                                document.getElementById("resfriamentoParams").addEventListener("click", function () {
                                                   plotaGrafico("resfriamento");
                                                }, false);
                                                document.getElementById("tempoAberturaParams").addEventListener("click", function () {
                                                   plotaGrafico("tempoAbertura");
                                                }, false);
                                                document.getElementById("posAvanco1Params").addEventListener("click", function () {
                                                   plotaGrafico("posAvanco1");
                                                }, false);
                                                document.getElementById("posAvanco2Params").addEventListener("click", function () {
                                                   plotaGrafico("posAvanco2");
                                                }, false);
                                                document.getElementById("posAvanco3Params").addEventListener("click", function () {
                                                   plotaGrafico("posAvanco3");
                                                }, false);
                                                document.getElementById("posRecuo1Params").addEventListener("click", function () {
                                                   plotaGrafico("posRecuo1");
                                                }, false);
                                                document.getElementById("posRecuo2Params").addEventListener("click", function () {
                                                   plotaGrafico("posRecuo2");
                                                }, false);
                                                document.getElementById("posRecuo3Params").addEventListener("click", function () {
                                                   plotaGrafico("posRecuo3");
                                                }, false);
                                                document.getElementById("presAvanco1Params").addEventListener("click", function () {
                                                   plotaGrafico("presAvanco1");
                                                }, false);
                                                document.getElementById("presAvanco2Params").addEventListener("click", function () {
                                                   plotaGrafico("presAvanco2");
                                                }, false);
                                                document.getElementById("presAvanco3Params").addEventListener("click", function () {
                                                   plotaGrafico("presAvanco3");
                                                }, false);
                                                document.getElementById("presRecuo1Params").addEventListener("click", function () {
                                                   plotaGrafico("presRecuo1");
                                                }, false);
                                                document.getElementById("presRecuo2Params").addEventListener("click", function () {
                                                   plotaGrafico("presRecuo2");
                                                }, false);
                                                document.getElementById("presRecuo3Params").addEventListener("click", function () {
                                                   plotaGrafico("presRecuo3");
                                                }, false);
                                                document.getElementById("fluxoAvanco1Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoAvanco1");
                                                }, false);
                                                document.getElementById("fluxoAvanco2Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoAvanco2");
                                                }, false);
                                                document.getElementById("fluxoAvanco3Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoAvanco3");
                                                }, false);
                                                document.getElementById("fluxoRecuo1Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoRecuo1");
                                                }, false);
                                                document.getElementById("fluxoRecuo2Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoRecuo2");
                                                }, false);
                                                document.getElementById("fluxoRecuo3Params").addEventListener("click", function () {
                                                   plotaGrafico("fluxoRecuo3");
                                                }, false);
                                                document.getElementById("radialPresEntrada1Params").addEventListener("click", function () {
                                                   plotaGrafico("radialPresEntrada1");
                                                }, false);
                                                document.getElementById("radialPresSaida1Params").addEventListener("click", function () {
                                                   plotaGrafico("radialPresSaida1");
                                                }, false);
                                                document.getElementById("radialPresEntrada2Params").addEventListener("click", function () {
                                                   plotaGrafico("radialPresEntrada2");
                                                }, false);
                                                document.getElementById("radialPresSaida2Params").addEventListener("click", function () {
                                                   plotaGrafico("radialPresSaida2");
                                                }, false);
                                                document.getElementById("radialPresEntrada3Params").addEventListener("click", function () {
                                                   plotaGrafico("radialPresEntrada3");
                                                }, false);
                                                document.getElementById("radialPresSaida3Params").addEventListener("click", function () {
                                                   plotaGrafico("radialPresSaida3");
                                                }, false);
                                                document.getElementById("radialFluxoEntrada1Params").addEventListener("click", function () {
                                                   plotaGrafico("radialFluxoEntrada1");
                                                }, false);
                                                document.getElementById("radialFluxoSaida1Params").addEventListener("click", function () {
                                                   plotaGrafico("radialFluxoSaida1");
                                                }, false);
                                                document.getElementById("radialFluxoEntrada2Params").addEventListener("click", function () {
                                                   plotaGrafico("radialFluxoEntrada2");
                                                }, false);
                                                document.getElementById("radialFluxoSaida2Params").addEventListener("click", function () {
                                                   plotaGrafico("radialFluxoSaida2");
                                                }, false);
                                                document.getElementById("radialFluxoEntrada3Params").addEventListener("click", function () {
                                                   plotaGrafico("radialFluxoEntrada3");
                                                }, false);
                                                document.getElementById("radialFluxoSaida3Params").addEventListener("click", function () {
                                                   plotaGrafico("radialFluxoSaida3");
                                                }, false);
                                                document.getElementById("radialPosEntrada1Params").addEventListener("click", function () {
                                                   plotaGrafico("radialPosEntrada1");
                                                }, false);
                                                document.getElementById("radialPosSaida1Params").addEventListener("click", function () {
                                                   plotaGrafico("radialPosSaida1");
                                                }, false);
                                                document.getElementById("radialPosEntrada2Params").addEventListener("click", function () {
                                                   plotaGrafico("radialPosEntrada2");
                                                }, false);
                                                document.getElementById("radialPosSaida2Params").addEventListener("click", function () {
                                                   plotaGrafico("radialPosSaida2");
                                                }, false);
                                                document.getElementById("radialPosEntrada3Params").addEventListener("click", function () {
                                                   plotaGrafico("radialPosEntrada3");
                                                }, false);
                                                document.getElementById("radialPosSaida3Params").addEventListener("click", function () {
                                                   plotaGrafico("radialPosSaida3");
                                                }, false);
                                                document.getElementById("radialTempoEntrada1Params").addEventListener("click", function () {
                                                   plotaGrafico("radialTempoEntrada1");
                                                }, false);
                                                document.getElementById("radialTempoSaida1Params").addEventListener("click", function () {
                                                   plotaGrafico("radialTempoSaida1");
                                                }, false);
                                                document.getElementById("radialTempoEntrada2Params").addEventListener("click", function () {
                                                   plotaGrafico("radialTempoEntrada2");
                                                }, false);
                                                document.getElementById("radialTempoSaida2Params").addEventListener("click", function () {
                                                   plotaGrafico("radialTempoSaida2");
                                                }, false);
                                                document.getElementById("radialTempoEntrada3Params").addEventListener("click", function () {
                                                   plotaGrafico("radialTempoEntrada3");
                                                }, false);
                                                document.getElementById("radialTempoSaida3Params").addEventListener("click", function () {
                                                   plotaGrafico("radialTempoSaida3");
                                                }, false);
                                                document.getElementById("radialSCREntrada1Params").addEventListener("click", function () {
                                                   plotaGrafico("radialSCREntrada1");
                                                }, false);
                                                document.getElementById("radialSCRSaida1Params").addEventListener("click", function () {
                                                   plotaGrafico("radialSCRSaida1");
                                                }, false);
                                                document.getElementById("radialSCREntrada2Params").addEventListener("click", function () {
                                                   plotaGrafico("radialSCREntrada2");
                                                }, false);
                                                document.getElementById("radialSCRSaida2Params").addEventListener("click", function () {
                                                   plotaGrafico("radialSCRSaida2");
                                                }, false);
                                                document.getElementById("radialSCREntrada3Params").addEventListener("click", function () {
                                                   plotaGrafico("radialSCREntrada3");
                                                }, false);
                                                document.getElementById("radialSCRSaida3Params").addEventListener("click", function () {
                                                   plotaGrafico("radialSCRSaida3");
                                                }, false);
                                          }
                                       })
                                    }
                                 }) //aqui
                              }
                           }); //!
                           
                        } else {
                           var texto = "<h1 style='text-align: center'>Ficha não encontrada.</h1>"
                           var main = $("#parametrosRevisao");
                           main.html(texto);
                        }

                     }
                  });
               }
            });
         }
      })
   }, 3000);
}

// GRAFICO PLOTLY
function plotaGrafico(area) {
   var dados = [];
   
   $.ajax({
      url: '/parametrosReais/' + $("#maquina").val() + '/' + today,
      method: 'get',
      dataType: 'json',
      success: function (parametrosMaquina) {
         console.log("Entrou no parametrosReais")
         console.log(parametrosMaquina)
         var center;
         var limite_;
         var range_;
         
         if (area === "cilindro1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPERATURA_ZONA_1 - (nome.TEMPERATURA_ZONA_1 * tolCilindro)).toFixed(1));
               var max = parseInt((nome.TEMPERATURA_ZONA_1 + (nome.TEMPERATURA_ZONA_1 * tolCilindro)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPERATURA_ZONA_1)
            })
         }
         if (area === "cilindro2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPERATURA_ZONA_2 - (nome.TEMPERATURA_ZONA_2 * tolCilindro)).toFixed(1));
               var max = parseInt((nome.TEMPERATURA_ZONA_2 + (nome.TEMPERATURA_ZONA_2 * tolCilindro)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPERATURA_ZONA_2)
            })
         }
         if (area === "cilindro3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPERATURA_ZONA_3 - (nome.TEMPERATURA_ZONA_3 * tolCilindro)).toFixed(1));
               var max = parseInt((nome.TEMPERATURA_ZONA_3 + (nome.TEMPERATURA_ZONA_3 * tolCilindro)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPERATURA_ZONA_3)
            })
         }
         if (area === "cilindro4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPERATURA_ZONA_4 - (nome.TEMPERATURA_ZONA_4 * tolCilindro)).toFixed(1));
               var max = parseInt((nome.TEMPERATURA_ZONA_4 + (nome.TEMPERATURA_ZONA_4 * tolCilindro)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPERATURA_ZONA_4)
            })
         }
         if (area === "cilindro5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPERATURA_ZONA_5 - (nome.TEMPERATURA_ZONA_5 * tolCilindro)).toFixed(1));
               var max = parseInt((nome.TEMPERATURA_ZONA_5 + (nome.TEMPERATURA_ZONA_5 * tolCilindro)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPERATURA_ZONA_5)
            })
         }
         if (area === "cilindro6") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPERATURA_ZONA_6 - (nome.TEMPERATURA_ZONA_6 * tolCilindro)).toFixed(1));
               var max = parseInt((nome.TEMPERATURA_ZONA_6 + (nome.TEMPERATURA_ZONA_6 * tolCilindro)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPERATURA_ZONA_6)
            })
         }
         if (area === "cilindro7") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPERATURA_ZONA_7 - (nome.TEMPERATURA_ZONA_7 * tolCilindro)).toFixed(1));
               var max = parseInt((nome.TEMPERATURA_ZONA_7 + (nome.TEMPERATURA_ZONA_7 * tolCilindro)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPERATURA_ZONA_7)
            })
         }
         if (area === "posInjecao1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_POSICAO_5 - (nome.INJECAO_POSICAO_5 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_POSICAO_5 + (nome.INJECAO_POSICAO_5 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_POSICAO_5)
            })
         }
         if (area === "posInjecao2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_POSICAO_4 - (nome.INJECAO_POSICAO_4 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_POSICAO_4 + (nome.INJECAO_POSICAO_4 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_POSICAO_4)
            })
         }
         if (area === "posInjecao3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_POSICAO_3 - (nome.INJECAO_POSICAO_3 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_POSICAO_3 + (nome.INJECAO_POSICAO_3 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_POSICAO_3)
            })
         }
         if (area === "posInjecao4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_POSICAO_2 - (nome.INJECAO_POSICAO_2 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_POSICAO_2 + (nome.INJECAO_POSICAO_2 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_POSICAO_2)
            })
         }
         if (area === "posInjecao5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_POSICAO_1 - (nome.INJECAO_POSICAO_1 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_POSICAO_1 + (nome.INJECAO_POSICAO_1 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_POSICAO_1)
            })
         }
         if (area === "presInjecao1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_PRESSAO_5 - (nome.INJECAO_PRESSAO_5 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_PRESSAO_5 + (nome.INJECAO_PRESSAO_5 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_PRESSAO_5)
            })
         }
         if (area === "presInjecao2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_PRESSAO_4 - (nome.INJECAO_PRESSAO_4 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_PRESSAO_4 + (nome.INJECAO_PRESSAO_4 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_PRESSAO_4)
            })
         }
         if (area === "presInjecao3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_PRESSAO_3 - (nome.INJECAO_PRESSAO_3 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_PRESSAO_3 + (nome.INJECAO_PRESSAO_3 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_PRESSAO_3)
            })
         }
         if (area === "presInjecao4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_PRESSAO_2 - (nome.INJECAO_PRESSAO_2 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_PRESSAO_2 + (nome.INJECAO_PRESSAO_2 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_PRESSAO_2)
            })
         }
         if (area === "presInjecao5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_PRESSAO_1 - (nome.INJECAO_PRESSAO_1 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_PRESSAO_1 + (nome.INJECAO_PRESSAO_1 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_PRESSAO_1)
            })
         }
         if (area === "fluxoInjecao1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_FLUXO_5 - (nome.INJECAO_FLUXO_5 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_FLUXO_5 + (nome.INJECAO_FLUXO_5 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_FLUXO_5)
            })
         }
         if (area === "fluxoInjecao2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_FLUXO_4 - (nome.INJECAO_FLUXO_4 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_FLUXO_4 + (nome.INJECAO_FLUXO_4 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_FLUXO_4)
            })
         }
         if (area === "fluxoInjecao3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_FLUXO_3 - (nome.INJECAO_FLUXO_3 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_FLUXO_3 + (nome.INJECAO_FLUXO_3 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_FLUXO_3)
            })
         }
         if (area === "fluxoInjecao4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_FLUXO_2 - (nome.INJECAO_FLUXO_2 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_FLUXO_2 + (nome.INJECAO_FLUXO_2 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_FLUXO_2)
            })
         }
         if (area === "fluxoInjecao5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.INJECAO_FLUXO_1 - (nome.INJECAO_FLUXO_1 * tolInjecao)).toFixed(1));
               var max = parseInt((nome.INJECAO_FLUXO_1 + (nome.INJECAO_FLUXO_1 * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.INJECAO_FLUXO_1)
            })
         }
         if (area === "tempoDisparo") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPO_DISPARO - (nome.TEMPO_DISPARO * tolInjecao)).toFixed(1));
               var max = parseInt((nome.TEMPO_DISPARO + (nome.TEMPO_DISPARO * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPO_DISPARO)
            })
         }
         if (area === "pressaoInj") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPO_INJECAO - (nome.TEMPO_INJECAO * tolInjecao)).toFixed(1));
               var max = parseInt((nome.TEMPO_INJECAO + (nome.TEMPO_INJECAO * tolInjecao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPO_INJECAO)
            })
         }
         if (area === "presRecalque1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_PRESSAO_5 - (nome.RECALQUE_PRESSAO_5 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_PRESSAO_5 + (nome.RECALQUE_PRESSAO_5 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_PRESSAO_5)
            })
         }
         if (area === "presRecalque2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_PRESSAO_4 - (nome.RECALQUE_PRESSAO_4 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_PRESSAO_4 + (nome.RECALQUE_PRESSAO_4 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_PRESSAO_4)
            })
         }
         if (area === "presRecalque3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_PRESSAO_3 - (nome.RECALQUE_PRESSAO_3 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_PRESSAO_3 + (nome.RECALQUE_PRESSAO_3 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_PRESSAO_3)
            })
         }
         if (area === "presRecalque4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_PRESSAO_2 - (nome.RECALQUE_PRESSAO_2 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_PRESSAO_2 + (nome.RECALQUE_PRESSAO_2 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_PRESSAO_2)
            })
         }
         if (area === "presRecalque5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_PRESSAO_1 - (nome.RECALQUE_PRESSAO_1 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_PRESSAO_1 + (nome.RECALQUE_PRESSAO_1 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_PRESSAO_1)
            })
         }
         if (area === "fluxoRecalque1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_FLUXO_5 - (nome.RECALQUE_FLUXO_5 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_FLUXO_5 + (nome.RECALQUE_FLUXO_5 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_FLUXO_5)
            })
         }
         if (area === "fluxoRecalque2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_FLUXO_4 - (nome.RECALQUE_FLUXO_4 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_FLUXO_4 + (nome.RECALQUE_FLUXO_4 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_FLUXO_4)
            })
         }
         if (area === "fluxoRecalque3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_FLUXO_3 - (nome.RECALQUE_FLUXO_3 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_FLUXO_3 + (nome.RECALQUE_FLUXO_3 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_FLUXO_3)
            })
         }
         if (area === "fluxoRecalque4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_FLUXO_2 - (nome.RECALQUE_FLUXO_2 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_FLUXO_2 + (nome.RECALQUE_FLUXO_2 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_FLUXO_2)
            })
         }
         if (area === "fluxoRecalque5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_FLUXO_1 - (nome.RECALQUE_FLUXO_1 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_FLUXO_1 + (nome.RECALQUE_FLUXO_1 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_FLUXO_1)
            })
         }
         if (area === "tempoRecalque1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_TEMPO_5 - (nome.RECALQUE_TEMPO_5 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_TEMPO_5 + (nome.RECALQUE_TEMPO_5 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_TEMPO_5)
            })
         }
         if (area === "tempoRecalque2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_TEMPO_4 - (nome.RECALQUE_TEMPO_4 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_TEMPO_4 + (nome.RECALQUE_TEMPO_4 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_TEMPO_4)
            })
         }
         if (area === "tempoRecalque3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_TEMPO_3 - (nome.RECALQUE_TEMPO_3 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_TEMPO_3 + (nome.RECALQUE_TEMPO_3 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_TEMPO_3)
            })
         }
         if (area === "tempoRecalque4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_TEMPO_2 - (nome.RECALQUE_TEMPO_2 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_TEMPO_2 + (nome.RECALQUE_TEMPO_2 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_TEMPO_2)
            })
         }
         if (area === "tempoRecalque5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RECALQUE_TEMPO_1 - (nome.RECALQUE_TEMPO_1 * tolRecalque)).toFixed(1));
               var max = parseInt((nome.RECALQUE_TEMPO_1 + (nome.RECALQUE_TEMPO_1 * tolRecalque)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RECALQUE_TEMPO_1)
            })
         }
         if (area === "partDosagem1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PARTIDA_1 - (nome.DOSAGEM_PARTIDA_1 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PARTIDA_1 + (nome.DOSAGEM_PARTIDA_1 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PARTIDA_1)
            })
         }
         if (area === "partDosagem2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PARTIDA_2 - (nome.DOSAGEM_PARTIDA_2 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PARTIDA_2 + (nome.DOSAGEM_PARTIDA_2 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PARTIDA_2)
            })
         }
         if (area === "partDosagem3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PARTIDA_3 - (nome.DOSAGEM_PARTIDA_3 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PARTIDA_3 + (nome.DOSAGEM_PARTIDA_3 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PARTIDA_3)
            })
         }
         if (area === "partDosagem4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PARTIDA_4 - (nome.DOSAGEM_PARTIDA_4 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PARTIDA_4 + (nome.DOSAGEM_PARTIDA_4 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PARTIDA_4)
            })
         }
         if (area === "partDosagem5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PARTIDA_5 - (nome.DOSAGEM_PARTIDA_5 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PARTIDA_5 + (nome.DOSAGEM_PARTIDA_5 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PARTIDA_5)
            })
         }
         if (area === "presDosagem1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PRESSAO_1 - (nome.DOSAGEM_PRESSAO_1 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PRESSAO_1 + (nome.DOSAGEM_PRESSAO_1 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PRESSAO_1)
            })
         }
         if (area === "presDosagem2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PRESSAO_2 - (nome.DOSAGEM_PRESSAO_2 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PRESSAO_2 + (nome.DOSAGEM_PRESSAO_2 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PRESSAO_2)
            })
         }
         if (area === "presDosagem3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PRESSAO_3 - (nome.DOSAGEM_PRESSAO_1 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PRESSAO_3 + (nome.DOSAGEM_PRESSAO_1 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PRESSAO_3)
            })
         }
         if (area === "presDosagem4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PRESSAO_4 - (nome.DOSAGEM_PRESSAO_4 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PRESSAO_4 + (nome.DOSAGEM_PRESSAO_4 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PRESSAO_4)
            })
         }
         if (area === "presDosagem5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_PRESSAO_5 - (nome.DOSAGEM_PRESSAO_5 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_PRESSAO_5 + (nome.DOSAGEM_PRESSAO_5 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_PRESSAO_5)
            })
         }
         if (area === "fluxoDosagem1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_FLUXO_1 - (nome.DOSAGEM_FLUXO_1 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_FLUXO_1 + (nome.DOSAGEM_FLUXO_1 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_FLUXO_1)
            })
         }
         if (area === "fluxoDosagem2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_FLUXO_2 - (nome.DOSAGEM_FLUXO_2 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_FLUXO_2 + (nome.DOSAGEM_FLUXO_2 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_FLUXO_2)
            })
         }
         if (area === "fluxoDosagem3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_FLUXO_3 - (nome.DOSAGEM_FLUXO_3 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_FLUXO_3 + (nome.DOSAGEM_FLUXO_3 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_FLUXO_3)
            })
         }
         if (area === "fluxoDosagem4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_FLUXO_4 - (nome.DOSAGEM_FLUXO_4 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_FLUXO_4 + (nome.DOSAGEM_FLUXO_4 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_FLUXO_4)
            })
         }
         if (area === "fluxoDosagem5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_FLUXO_5 - (nome.DOSAGEM_FLUXO_5 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_FLUXO_5 + (nome.DOSAGEM_FLUXO_5 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_FLUXO_5)
            })
         }
         if (area === "CPDosagem1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_CONTRAPRESSAO_1 - (nome.DOSAGEM_CONTRAPRESSAO_1 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_CONTRAPRESSAO_1 + (nome.DOSAGEM_CONTRAPRESSAO_1 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_CONTRAPRESSAO_1)
            })
         }
         if (area === "CPDosagem2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_CONTRAPRESSAO_2 - (nome.DOSAGEM_CONTRAPRESSAO_2 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_CONTRAPRESSAO_2 + (nome.DOSAGEM_CONTRAPRESSAO_2 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_CONTRAPRESSAO_2)
            })
         }
         if (area === "CPDosagem3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_CONTRAPRESSAO_3 - (nome.DOSAGEM_CONTRAPRESSAO_3 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_CONTRAPRESSAO_3 + (nome.DOSAGEM_CONTRAPRESSAO_3 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_CONTRAPRESSAO_3)
            })
         }
         if (area === "CPDosagem4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_CONTRAPRESSAO_4 - (nome.DOSAGEM_CONTRAPRESSAO_4 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_CONTRAPRESSAO_4 + (nome.DOSAGEM_CONTRAPRESSAO_4 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_CONTRAPRESSAO_4)
            })
         }
         if (area === "CPDosagem5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.DOSAGEM_CONTRAPRESSAO_5 - (nome.DOSAGEM_CONTRAPRESSAO_5 * tolDosagem)).toFixed(1));
               var max = parseInt((nome.DOSAGEM_CONTRAPRESSAO_5 + (nome.DOSAGEM_CONTRAPRESSAO_5 * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.DOSAGEM_CONTRAPRESSAO_5)
            })
         }
         if (area === "tempoDosagem") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPO_DOSAGEM - (nome.TEMPO_DOSAGEM * tolDosagem)).toFixed(1));
               var max = parseInt((nome.TEMPO_DOSAGEM + (nome.TEMPO_DOSAGEM * tolDosagem)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPO_DOSAGEM)
            })
         }
         if (area === "posFecha1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_POSICAO_1 - (nome.FECHAMENTO_POSICAO_1 * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_POSICAO_1 + (nome.FECHAMENTO_POSICAO_1 * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_POSICAO_1)
            })
         }
         if (area === "posFecha2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_POSICAO_2 - (nome.FECHAMENTO_POSICAO_2 * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_POSICAO_2 + (nome.FECHAMENTO_POSICAO_2 * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_POSICAO_2)
            })
         }
         if (area === "posFecha3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_POSICAO_3 - (nome.FECHAMENTO_POSICAO_3 * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_POSICAO_3 + (nome.FECHAMENTO_POSICAO_3 * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_POSICAO_3)
            })
         }
         if (area === "protMPos") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_POSICAO_PROTECAO_MOLDE - (nome.FECHAMENTO_POSICAO_PROTECAO_MOLDE * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_POSICAO_PROTECAO_MOLDE + (nome.FECHAMENTO_POSICAO_PROTECAO_MOLDE * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_POSICAO_PROTECAO_MOLDE)
            })
         }
         if (area === "AltaPresPos") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_POSICAO_ALTA_PRESSAO - (nome.FECHAMENTO_POSICAO_ALTA_PRESSAO * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_POSICAO_ALTA_PRESSAO + (nome.FECHAMENTO_POSICAO_ALTA_PRESSAO * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_POSICAO_ALTA_PRESSAO)
            })
         }
         if (area === "presFecha1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_PRESSAO_1 - (nome.FECHAMENTO_PRESSAO_1 * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_PRESSAO_1 + (nome.FECHAMENTO_PRESSAO_1 * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_PRESSAO_1)
            })
         }
         if (area === "presFecha2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_PRESSAO_2 - (nome.FECHAMENTO_PRESSAO_2 * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_PRESSAO_2 + (nome.FECHAMENTO_PRESSAO_2 * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_PRESSAO_2)
            })
         }
         if (area === "presFecha3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_PRESSAO_3 - (nome.FECHAMENTO_PRESSAO_3 * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_PRESSAO_3 + (nome.FECHAMENTO_PRESSAO_3 * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_PRESSAO_3)
            })
         }
         if (area === "protMPres") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_PRESSAO_PROTECAO_MOLDE - (nome.FECHAMENTO_PRESSAO_PROTECAO_MOLDE * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_PRESSAO_PROTECAO_MOLDE + (nome.FECHAMENTO_PRESSAO_PROTECAO_MOLDE * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_PRESSAO_PROTECAO_MOLDE)
            })
         }
         if (area === "AltaPresPres") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_PRESSAO_ALTA_PRESSAO - (nome.FECHAMENTO_PRESSAO_ALTA_PRESSAO * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_PRESSAO_ALTA_PRESSAO + (nome.FECHAMENTO_PRESSAO_ALTA_PRESSAO * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_PRESSAO_ALTA_PRESSAO)
            })
         }
         if (area === "fluxoFecha1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_FLUXO_1 - (nome.FECHAMENTO_FLUXO_1 * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_FLUXO_1 + (nome.FECHAMENTO_FLUXO_1 * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_FLUXO_1)
            })
         }
         if (area === "fluxoFecha2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_FLUXO_2 - (nome.FECHAMENTO_FLUXO_2 * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_FLUXO_2 + (nome.FECHAMENTO_FLUXO_2 * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_FLUXO_2)
            })
         }
         if (area === "fluxoFecha3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_FLUXO_3 - (nome.FECHAMENTO_FLUXO_3 * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_FLUXO_3 + (nome.FECHAMENTO_FLUXO_3 * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_FLUXO_3)
            })
         }
         if (area === "protMFluxo") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_FLUXO_PROTECAO_MOLDE - (nome.FECHAMENTO_FLUXO_PROTECAO_MOLDE * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_FLUXO_PROTECAO_MOLDE + (nome.FECHAMENTO_FLUXO_PROTECAO_MOLDE * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_FLUXO_PROTECAO_MOLDE)
            })
         }
         if (area === "AltaPresFluxo") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.FECHAMENTO_FLUXO_ALTA_PRESSAO - (nome.FECHAMENTO_FLUXO_ALTA_PRESSAO * tolFechamento)).toFixed(1));
               var max = parseInt((nome.FECHAMENTO_FLUXO_ALTA_PRESSAO + (nome.FECHAMENTO_FLUXO_ALTA_PRESSAO * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.FECHAMENTO_FLUXO_ALTA_PRESSAO)
            })
         }
         if (area === "tempoProtMolde") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPO_PROTECAO_MOLDE - (nome.TEMPO_PROTECAO_MOLDE * tolFechamento)).toFixed(1));
               var max = parseInt((nome.TEMPO_PROTECAO_MOLDE + (nome.TEMPO_PROTECAO_MOLDE * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPO_PROTECAO_MOLDE)
            })
         }
         if (area === "tempoFecha") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPO_FECHAMENTO - (nome.TEMPO_FECHAMENTO * tolFechamento)).toFixed(1));
               var max = parseInt((nome.TEMPO_FECHAMENTO + (nome.TEMPO_FECHAMENTO * tolFechamento)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPO_FECHAMENTO)
            })
         }
         if (area === "posAbertura1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_POSICAO_5 - (nome.ABERTURA_POSICAO_5 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_POSICAO_5 + (nome.ABERTURA_POSICAO_5 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_POSICAO_5)
            })
         }
         if (area === "posAbertura2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_POSICAO_4 - (nome.ABERTURA_POSICAO_4 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_POSICAO_4 + (nome.ABERTURA_POSICAO_4 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_POSICAO_4)
            })
         }
         if (area === "posAbertura3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_POSICAO_3 - (nome.ABERTURA_POSICAO_3 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_POSICAO_3 + (nome.ABERTURA_POSICAO_3 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_POSICAO_3)
            })
         }
         if (area === "posAbertura4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_POSICAO_2 - (nome.ABERTURA_POSICAO_2 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_POSICAO_2 + (nome.ABERTURA_POSICAO_2 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_POSICAO_2)
            })
         }
         if (area === "posAbertura5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_POSICAO_1 - (nome.ABERTURA_POSICAO_1 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_POSICAO_1 + (nome.ABERTURA_POSICAO_1 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_POSICAO_1)
            })
         }
         if (area === "presAbertura1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_PRESSAO_5 - (nome.ABERTURA_PRESSAO_5 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_PRESSAO_5 + (nome.ABERTURA_PRESSAO_5 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_PRESSAO_5)
            })
         }
         if (area === "presAbertura2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_PRESSAO_4 - (nome.ABERTURA_PRESSAO_4 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_PRESSAO_4 + (nome.ABERTURA_PRESSAO_4 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_PRESSAO_4)
            })
         }
         if (area === "presAbertura3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_PRESSAO_3 - (nome.ABERTURA_PRESSAO_3 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_PRESSAO_3 + (nome.ABERTURA_PRESSAO_3 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_PRESSAO_3)
            })
         }
         if (area === "presAbertura4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_PRESSAO_2 - (nome.ABERTURA_PRESSAO_2 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_PRESSAO_2 + (nome.ABERTURA_PRESSAO_2 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_PRESSAO_2)
            })
         }
         if (area === "presAbertura5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_PRESSAO_1 - (nome.ABERTURA_PRESSAO_1 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_PRESSAO_1 + (nome.ABERTURA_PRESSAO_1 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_PRESSAO_1)
            })
         }
         if (area === "fluxoAbertura1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_FLUXO_5 - (nome.ABERTURA_FLUXO_5 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_FLUXO_5 + (nome.ABERTURA_FLUXO_5 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_FLUXO_5)
            })
         }
         if (area === "fluxoAbertura2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_FLUXO_4 - (nome.ABERTURA_FLUXO_4 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_FLUXO_4 + (nome.ABERTURA_FLUXO_4 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_FLUXO_4)
            })
         }
         if (area === "fluxoAbertura3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_FLUXO_3 - (nome.ABERTURA_FLUXO_3 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_FLUXO_3 + (nome.ABERTURA_FLUXO_3 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_FLUXO_3)
            })
         }
         if (area === "fluxoAbertura4") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_FLUXO_2 - (nome.ABERTURA_FLUXO_2 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_FLUXO_2 + (nome.ABERTURA_FLUXO_2 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_FLUXO_2)
            })
         }
         if (area === "fluxoAbertura5") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.ABERTURA_FLUXO_1 - (nome.ABERTURA_FLUXO_1 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.ABERTURA_FLUXO_1 + (nome.ABERTURA_FLUXO_1 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.ABERTURA_FLUXO_1)
            })
         }
         if (area === "resfriamento") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPO_RESFRIAMENT0 - (nome.TEMPO_RESFRIAMENT0 * tolAbertura)).toFixed(1));
               var max = parseInt((nome.TEMPO_RESFRIAMENT0 + (nome.TEMPO_RESFRIAMENT0 * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPO_RESFRIAMENT0)
            })
         }
         if (area === "tempoAbertura") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.TEMPO_ABERTURA - (nome.TEMPO_ABERTURA * tolAbertura)).toFixed(1));
               var max = parseInt((nome.TEMPO_ABERTURA + (nome.TEMPO_ABERTURA * tolAbertura)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.TEMPO_ABERTURA)
            })
         }
         if (area === "posAvanco1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_POSICAO_AVANCO_1 - (nome.EXTRACAO_POSICAO_AVANCO_1 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_POSICAO_AVANCO_1 + (nome.EXTRACAO_POSICAO_AVANCO_1 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_POSICAO_AVANCO_1)
            })
         }
         if (area === "posAvanco2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_POSICAO_AVANCO_2 - (nome.EXTRACAO_POSICAO_AVANCO_2 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_POSICAO_AVANCO_2 + (nome.EXTRACAO_POSICAO_AVANCO_2 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_POSICAO_AVANCO_2)
            })
         }
         if (area === "posAvanco3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_POSICAO_AVANCO_3 - (nome.EXTRACAO_POSICAO_AVANCO_3 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_POSICAO_AVANCO_3 + (nome.EXTRACAO_POSICAO_AVANCO_3 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_POSICAO_AVANCO_3)
            })
         }
         if (area === "posRecuo1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_POSICAO_RECUO_3 - (nome.EXTRACAO_POSICAO_RECUO_3 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_POSICAO_RECUO_3 + (nome.EXTRACAO_POSICAO_RECUO_3 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_POSICAO_RECUO_3)
            })
         }
         if (area === "posRecuo2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_POSICAO_RECUO_2 - (nome.EXTRACAO_POSICAO_RECUO_2 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_POSICAO_RECUO_2 + (nome.EXTRACAO_POSICAO_RECUO_2 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_POSICAO_RECUO_2)
            })
         }
         if (area === "posRecuo3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_POSICAO_RECUO_1 - (nome.EXTRACAO_POSICAO_RECUO_1 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_POSICAO_RECUO_1 + (nome.EXTRACAO_POSICAO_RECUO_1 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_POSICAO_RECUO_1)
            })
         }
         if (area === "presAvanco1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_PRESSAO_AVANCO_1 - (nome.EXTRACAO_PRESSAO_AVANCO_1 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_PRESSAO_AVANCO_1 + (nome.EXTRACAO_PRESSAO_AVANCO_1 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_PRESSAO_AVANCO_1)
            })
         }
         if (area === "presAvanco2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_PRESSAO_AVANCO_2 - (nome.EXTRACAO_PRESSAO_AVANCO_2 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_PRESSAO_AVANCO_2 + (nome.EXTRACAO_PRESSAO_AVANCO_2 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_PRESSAO_AVANCO_2)
            })
         }
         if (area === "presAvanco3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_PRESSAO_AVANCO_3 - (nome.EXTRACAO_PRESSAO_AVANCO_3 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_PRESSAO_AVANCO_3 + (nome.EXTRACAO_PRESSAO_AVANCO_3 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_PRESSAO_AVANCO_3)
            })
         }
         if (area === "presRecuo1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_PRESSAO_RECUO_3 - (nome.EXTRACAO_PRESSAO_RECUO_3 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_PRESSAO_RECUO_3 + (nome.EXTRACAO_PRESSAO_RECUO_3 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_PRESSAO_RECUO_3)
            })
         }
         if (area === "presRecuo2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_PRESSAO_RECUO_2 - (nome.EXTRACAO_PRESSAO_RECUO_2 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_PRESSAO_RECUO_2 + (nome.EXTRACAO_PRESSAO_RECUO_2 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_PRESSAO_RECUO_2)
            })
         }
         if (area === "presRecuo3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_PRESSAO_RECUO_1 - (nome.EXTRACAO_PRESSAO_RECUO_1 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_PRESSAO_RECUO_1 + (nome.EXTRACAO_PRESSAO_RECUO_1 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_PRESSAO_RECUO_1)
            })
         }
         if (area === "fluxoAvanco1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_FLUXO_AVANCO_1 - (nome.EXTRACAO_FLUXO_AVANCO_1 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_FLUXO_AVANCO_1 + (nome.EXTRACAO_FLUXO_AVANCO_1 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_FLUXO_AVANCO_1)
            })
         }
         if (area === "fluxoAvanco2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_FLUXO_AVANCO_2 - (nome.EXTRACAO_FLUXO_AVANCO_2 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_FLUXO_AVANCO_2 + (nome.EXTRACAO_FLUXO_AVANCO_2 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_FLUXO_AVANCO_2)
            })
         }
         if (area === "fluxoAvanco3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_FLUXO_AVANCO_3 - (nome.EXTRACAO_FLUXO_AVANCO_3 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_FLUXO_AVANCO_3 + (nome.EXTRACAO_FLUXO_AVANCO_3 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_FLUXO_AVANCO_3)
            })
         }
         if (area === "fluxoRecuo1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_FLUXO_RECUO_3 - (nome.EXTRACAO_FLUXO_RECUO_3 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_FLUXO_RECUO_3 + (nome.EXTRACAO_FLUXO_RECUO_3 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_FLUXO_RECUO_3)
            })
         }
         if (area === "fluxoRecuo2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_FLUXO_RECUO_2 - (nome.EXTRACAO_FLUXO_RECUO_2 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_FLUXO_RECUO_2 + (nome.EXTRACAO_FLUXO_RECUO_2 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_FLUXO_RECUO_2)
            })
         }
         if (area === "fluxoRecuo3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.EXTRACAO_FLUXO_RECUO_1 - (nome.EXTRACAO_FLUXO_RECUO_1 * tolExtracao)).toFixed(1));
               var max = parseInt((nome.EXTRACAO_FLUXO_RECUO_1 + (nome.EXTRACAO_FLUXO_RECUO_1 * tolExtracao)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.EXTRACAO_FLUXO_RECUO_1)
            })
         }
         if (area === "radialPresEntrada1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_PRESSAO_ENTRADA_1 - (nome.RADIAL_PRESSAO_ENTRADA_1 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_PRESSAO_ENTRADA_1 + (nome.RADIAL_PRESSAO_ENTRADA_1 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_PRESSAO_ENTRADA_1)
            })
         }
         if (area === "radialPresSaida1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_PRESSAO_SAIDA_1 - (nome.RADIAL_PRESSAO_SAIDA_1 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_PRESSAO_SAIDA_1 + (nome.RADIAL_PRESSAO_SAIDA_1 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_PRESSAO_SAIDA_1)
            })
         }
         if (area === "radialPresEntrada2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_PRESSAO_ENTRADA_2 - (nome.RADIAL_PRESSAO_ENTRADA_2 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_PRESSAO_ENTRADA_2 + (nome.RADIAL_PRESSAO_ENTRADA_2 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_PRESSAO_ENTRADA_2)
            })
         }
         if (area === "radialPresSaida2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_PRESSAO_SAIDA_2 - (nome.RADIAL_PRESSAO_SAIDA_2 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_PRESSAO_SAIDA_2 + (nome.RADIAL_PRESSAO_SAIDA_2 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_PRESSAO_SAIDA_2)
            })
         }
         if (area === "radialPresEntrada3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_PRESSAO_ENTRADA_3 - (nome.RADIAL_PRESSAO_ENTRADA_3 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_PRESSAO_ENTRADA_3 + (nome.RADIAL_PRESSAO_ENTRADA_3 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_PRESSAO_ENTRADA_3)
            })
         }
         if (area === "radialPresSaida3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_PRESSAO_SAIDA_3 - (nome.RADIAL_PRESSAO_SAIDA_3 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_PRESSAO_SAIDA_3 + (nome.RADIAL_PRESSAO_SAIDA_3 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_PRESSAO_SAIDA_3)
            })
         }
         if (area === "radialFluxoEntrada1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_FLUXO_ENTRADA_1 - (nome.RADIAL_FLUXO_ENTRADA_1 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_FLUXO_ENTRADA_1 + (nome.RADIAL_FLUXO_ENTRADA_1 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_FLUXO_ENTRADA_1)
            })
         }
         if (area === "radialFluxoSaida1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_FLUXO_SAIDA_1 - (nome.RADIAL_FLUXO_SAIDA_1 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_FLUXO_SAIDA_1 + (nome.RADIAL_FLUXO_SAIDA_1 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_FLUXO_SAIDA_1)
            })
         }
         if (area === "radialFluxoEntrada2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_FLUXO_ENTRADA_2 - (nome.RADIAL_FLUXO_ENTRADA_2 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_FLUXO_ENTRADA_2 + (nome.RADIAL_FLUXO_ENTRADA_2 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_FLUXO_ENTRADA_2)
            })
         }
         if (area === "radialFluxoSaida2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_FLUXO_SAIDA_2 - (nome.RADIAL_FLUXO_SAIDA_2 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_FLUXO_SAIDA_2 + (nome.RADIAL_FLUXO_SAIDA_2 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_FLUXO_SAIDA_2)
            })
         }
         if (area === "radialFluxoEntrada3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_FLUXO_ENTRADA_3 - (nome.RADIAL_FLUXO_ENTRADA_3 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_FLUXO_ENTRADA_3 + (nome.RADIAL_FLUXO_ENTRADA_3 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_FLUXO_ENTRADA_3)
            })
         }
         if (area === "radialFluxoSaida3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_FLUXO_SAIDA_3 - (nome.RADIAL_FLUXO_SAIDA_3 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_FLUXO_SAIDA_3 + (nome.RADIAL_FLUXO_SAIDA_3 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_FLUXO_SAIDA_3)
            })
         }
         if (area === "radialPosEntrada1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_POSICAO_ENTRADA_1 - (nome.RADIAL_ACT_POSICAO_ENTRADA_1 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_POSICAO_ENTRADA_1 + (nome.RADIAL_ACT_POSICAO_ENTRADA_1 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_POSICAO_ENTRADA_1)
            })
         }
         if (area === "radialPosSaida1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_POSICAO_SAIDA_1 - (nome.RADIAL_ACT_POSICAO_SAIDA_1 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_POSICAO_SAIDA_1 + (nome.RADIAL_ACT_POSICAO_SAIDA_1 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_POSICAO_SAIDA_1)
            })
         }
         if (area === "radialPosEntrada2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_POSICAO_ENTRADA_2 - (nome.RADIAL_ACT_POSICAO_ENTRADA_2 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_POSICAO_ENTRADA_2 + (nome.RADIAL_ACT_POSICAO_ENTRADA_2 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_POSICAO_ENTRADA_2)
            })
         }
         if (area === "radialPosSaida2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_POSICAO_SAIDA_2 - (nome.RADIAL_ACT_POSICAO_SAIDA_2 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_POSICAO_SAIDA_2 + (nome.RADIAL_ACT_POSICAO_SAIDA_2 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_POSICAO_SAIDA_2)
            })
         }
         if (area === "radialPosEntrada3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_POSICAO_ENTRADA_3 - (nome.RADIAL_ACT_POSICAO_ENTRADA_3 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_POSICAO_ENTRADA_3 + (nome.RADIAL_ACT_POSICAO_ENTRADA_3 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_POSICAO_ENTRADA_3)
            })
         }
         if (area === "radialPosSaida3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_POSICAO_SAIDA_3 - (nome.RADIAL_ACT_POSICAO_SAIDA_3 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_POSICAO_SAIDA_3 + (nome.RADIAL_ACT_POSICAO_SAIDA_3 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_POSICAO_SAIDA_3)
            })
         }
         if (area === "radialTempoEntrada1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_TEMPO_ENTRADA_1 - (nome.RADIAL_ACT_TEMPO_ENTRADA_1 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_TEMPO_ENTRADA_1 + (nome.RADIAL_ACT_TEMPO_ENTRADA_1 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_TEMPO_ENTRADA_1)
            })
         }
         if (area === "radialTempoSaida1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_TEMPO_SAIDA_1 - (nome.RADIAL_ACT_TEMPO_SAIDA_1 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_TEMPO_SAIDA_1 + (nome.RADIAL_ACT_TEMPO_SAIDA_1 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_TEMPO_SAIDA_1)
            })
         }
         if (area === "radialTempoEntrada2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_TEMPO_ENTRADA_2 - (nome.RADIAL_ACT_TEMPO_ENTRADA_2 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_TEMPO_ENTRADA_2 + (nome.RADIAL_ACT_TEMPO_ENTRADA_2 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_TEMPO_ENTRADA_2)
            })
         }
         if (area === "radialTempoSaida2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_TEMPO_SAIDA_2 - (nome.RADIAL_ACT_TEMPO_SAIDA_2 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_TEMPO_SAIDA_2 + (nome.RADIAL_ACT_TEMPO_SAIDA_2 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_TEMPO_SAIDA_2)
            })
         }
         if (area === "radialTempoEntrada3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_TEMPO_ENTRADA_3 - (nome.RADIAL_ACT_TEMPO_ENTRADA_3 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_TEMPO_ENTRADA_3 + (nome.RADIAL_ACT_TEMPO_ENTRADA_3 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_TEMPO_ENTRADA_3)
            })
         }
         if (area === "radialTempoSaida3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_ACT_TEMPO_SAIDA_3 - (nome.RADIAL_ACT_TEMPO_SAIDA_3 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_ACT_TEMPO_SAIDA_3 + (nome.RADIAL_ACT_TEMPO_SAIDA_3 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_ACT_TEMPO_SAIDA_3)
            })
         }
         if (area === "radialSCREntrada1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_SCRCOUNT_ENTRADA_1 - (nome.RADIAL_SCRCOUNT_ENTRADA_1 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_SCRCOUNT_ENTRADA_1 + (nome.RADIAL_SCRCOUNT_ENTRADA_1 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_SCRCOUNT_ENTRADA_1)
            })
         }
         if (area === "radialSCRSaida1") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_SCRCOUNT_SAIDA_1 - (nome.RADIAL_SCRCOUNT_SAIDA_1 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_SCRCOUNT_SAIDA_1 + (nome.RADIAL_SCRCOUNT_SAIDA_1 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_SCRCOUNT_SAIDA_1)
            })
         }
         if (area === "radialSCREntrada2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_SCRCOUNT_ENTRADA_2 - (nome.RADIAL_SCRCOUNT_ENTRADA_2 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_SCRCOUNT_ENTRADA_2 + (nome.RADIAL_SCRCOUNT_ENTRADA_2 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_SCRCOUNT_ENTRADA_2)
            })
         }
         if (area === "radialSCRSaida2") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_SCRCOUNT_SAIDA_2 - (nome.RADIAL_SCRCOUNT_SAIDA_2 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_SCRCOUNT_SAIDA_2 + (nome.RADIAL_SCRCOUNT_SAIDA_2 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_SCRCOUNT_SAIDA_2)
            })
         }
         if (area === "radialSCREntrada3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_SCRCOUNT_ENTRADA_3 - (nome.RADIAL_SCRCOUNT_ENTRADA_3 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_SCRCOUNT_ENTRADA_3 + (nome.RADIAL_SCRCOUNT_ENTRADA_3 * tolRadial)).toFixed(1));
               var soma =  Math.floor((min + max)/2);
               
               center = [soma, soma];
               limite_ = [min, min, null, max, max]
               range_ = [min, max]
               
               dados.push(nome.RADIAL_SCRCOUNT_ENTRADA_3)
            })
         }
         if (area === "radialSCRSaida3") {            
            parametrosMaquina.forEach(function (nome) {
               var min = parseInt((nome.RADIAL_SCRCOUNT_SAIDA_3 - (nome.RADIAL_SCRCOUNT_SAIDA_3 * tolRadial)).toFixed(1));
               var max = parseInt((nome.RADIAL_SCRCOUNT_SAIDA_3 + (nome.RADIAL_SCRCOUNT_SAIDA_3 * tolRadial)).toFixed(1));
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