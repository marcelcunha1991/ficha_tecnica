$("#toshiba").hide()    
$("#pastore").hide()
$("#pastoreList").hide()
$("#toshibaList").hide()

//usado em fichas/new.ejs para mostrar uma ficha diferente quando trocar
$('#maquinas').change(e => {
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

//usado em fichas/list.ejs para mostrar a listagem de fichas de cada maquina
$('#maquinasList').change(e => {
   var split = e.target.value.split(",");
   var v1 = split[0];
   var v2 = split[1];
   var v2 = split[1];
   var splitName = v2.split(" ");
   var v3 = splitName[0]

   $.ajax({
      url: "/maquinaById/"+ v1,
      type: "get", //send it through get method
      success: function(responseMaquina) {
         // console.log(responseMaquina)

         $.ajax({
            url: "/ficha/lista/"+ v1 + "/" + v2,
            type: "get", //send it through get method
            success: function(response) {
               if (v2 === 'HAITIAN' || v3 === "Haitian") {
                  addRow(response.length, response, 'Haitian', responseMaquina.descricao)
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

function addRow(rows, data, path, maquina) {
   var tbody = '';
   for (var i = 0; i < rows; i++) {
      tbody +=  "<tr> <td>" + data[i].id +" </td> \
                  <td>" + data[i].maq +"</td> \
                  <td>" + maquina +"</td> \
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