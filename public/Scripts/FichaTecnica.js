$("#toshiba").hide()    
$("#pastore").hide()
$(".moldes").hide()
$(".materiais").hide()

//usado em fichas/new.ejs para mostrar uma ficha diferente quando trocar
$('#maquinasId').change(e => {
   var split = e.target.value.split(",");
   var v1 = split[0];
   var v2 = split[1];
   var splitName = v2.split(" ");
   var v3 = splitName[0]

   if (v2 === 'HAITIAN' || v3 === "Haitian") {

      $("#maquinaHaitian").val(v1)
      $("#pastore").show()
      $("#toshiba").hide()
      
   } else if (v2 === 'Toshiba') {
      
      $("#maquinaToshiba").val(v1)
      $("#toshiba").show()    
      $("#pastore").hide()
   }

});

var split;
var v1;
var v2;
var v2;
var splitName;
var v3;
//usado em fichas/list.ejs para mostrar a listagem de fichas de cada maquina
$('#maquinasList').change(e => {
   split = e.target.value.split(",");
   v1 = split[0];
   v2 = split[1];
   v2 = split[1];
   splitName = v2.split(" ");
   v3 = splitName[0]
   $(".moldes").show()

   $.ajax({
      url: "/maquinaById/"+ v1,
      type: "get", //send it through get method
      success: function(responseMaquina) {
         // console.log(responseMaquina)

         $.ajax({
            url: "/ficha/lista/"+ v1 + "/" + v2,
            type: "get", //send it through get method
            success: function(response) {
               var numRevisao = [];
               
               if (v2 === 'HAITIAN' || v3 === "Haitian") {
                  //passando o numero da revisao atual da ficha tecnica
                  response.forEach(element => {

                     $.ajax({
                        url: "/idRevisaoHaitian/" + element.id,
                        type: "get", //send it through get method
                        success: function(res) {
                           numRevisao.push(res.revisao)
                        }
                     });

                  });
                  
                  setTimeout(() => {
                     addRow(response.length, response, 'Haitian', responseMaquina.descricao, numRevisao)
                  }, 200);

               } else if (v2 === 'Toshiba') {
                  addRow(response.length, response, 'Toshiba', responseMaquina.descricao, numRevisao)
               }
               
            },
            error: function(xhr) {
               console.log(xhr)
            }
         });
        
      },
      error: function(xhr) {
         console.log(xhr)
      }
   });

   

});

var molde;
var arrayMolde = [];
$('.moldes').change(e => {
   molde = e.target.value;
   arrayMolde = [];
   var material = [];
   $(".materiais").show()

   $.ajax({
      url: "/maquinaById/"+ v1,
      type: "get", //send it through get method
      success: function(responseMaquina) {
         // console.log(responseMaquina)

         $.ajax({
            url: "/ficha/lista/"+ v1 + "/" + v2,
            type: "get", //send it through get method
            success: function(response) {

               if (molde !== "0") {
                  for (let i = 0; i < response.length; i++) {
                     if (response[i].NúmeroMolde === molde) {
                        arrayMolde.push(response[i])
                           
                        if (!material.includes(response[i].Material)) {
                           material.push(response[i].Material)   
                        }
                     }
                  }
               } else {
                  for (let i = 0; i < response.length; i++) {
                     arrayMolde.push(response[i])
                  }
               }
               
               selectMaterial(material);     
                        
               if (v2 === 'HAITIAN' || v3 === "Haitian") {
                  addRow(arrayMolde.length, arrayMolde, 'Haitian', responseMaquina.descricao)
               } else if (v2 === 'Toshiba') {
                  addRow(response.length, response, 'Toshiba', responseMaquina.descricao)
               }
               
            },
            error: function(xhr) {
               console.log(xhr)
            }
         });
        
      },
      error: function(xhr) {
         console.log(xhr)
      }
   });
});

var material;
$('.materiais').change(e => {
   material = e.target.value;
   var arrayMaterial = [];

   $.ajax({
      url: "/maquinaById/"+ v1,
      type: "get", //send it through get method
      success: function(responseMaquina) {

         if (material !== "0") {
            for (let i = 0; i < arrayMolde.length; i++) {
               if (arrayMolde[i].Material === material) {
                  arrayMaterial.push(arrayMolde[i])                     
               }
            }
         } else {
            for (let i = 0; i < arrayMolde.length; i++) {
               arrayMaterial.push(arrayMolde[i])                     
            }
         }

         
      
         addRow(arrayMaterial.length, arrayMaterial, 'Haitian', responseMaquina.descricao)
      }
   });
   
});

function addRow(rows, data, path, maquina, revisao) {
   var tbody = '';
   for (var i = 0; i < rows; i++) {
      tbody +=  "<tr> <td>" + revisao[i] +"</td> \
                  <td>" + data[i].id +" </td> \
                  <td>" + maquina +"</td> \
                  <td>" + data[i].NúmeroMolde +"</td> \
                  <td>" + data[i].Material +"</td> \
                  <td>\
                  <form method='GET' action='/fichas/edit" + path  + "/" + data[i].id  + "' style='display: inline;'><button class='btn btn-warning'> Editar</button></form> \
                  <form method='POST' action='/fichas/delete" + path + "'" +  "style='display: inline;' onsubmit='confirmarDelecao(event, this)'> \
                     <input type='hidden' name='id' value='" + data[i].id  + "'> \
                     <button class='btn btn-danger'> Remover</button> \
                  </form> \
                  <form method='GET' action='/ficha/revisao" + path  + "/" + data[i].id  + "' style='display: inline;'><button class='btn btn-info'> Revisão</button></form></td> \
               </tr>";
   }

   $('#tableBody').html(tbody);
   
}

function selectMaterial(array) {
   var opt = "<option value='0'>Filtre por material</option>";

   for (let i = 0; i < array.length; i++) {
      opt +='<option value="' + array[i] + '">' + array[i] + '</option>'
   }

   $('#materiais').html(opt);
}