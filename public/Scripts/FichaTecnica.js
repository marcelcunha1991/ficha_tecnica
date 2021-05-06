$("#toshiba").hide()    
$("#pastore").hide()
$("#pastoreList").hide()
$("#toshibaList").hide()

//usado em fichas/new.ejs para mostrar uma ficha diferente quando trocar
$('#maquinas').change(e => {
   var split = e.target.value.split(",");
   var v1 = split[0];
   var v2 = split[1];

   if (v2 === 'HAITIAN') {

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

   if (v2 === 'HAITIAN') {

      $("#pastoreList").show()
      $("#toshibaList").hide()
      
   } else if (v2 === 'Toshiba') {
      
      $("#toshibaList").show()    
      $("#pastoreList").hide()
   }

   // $.ajax({
   //    url: "/ficha/lista/"+ v1,
   //    type: "get", //send it through get method
   //    success: function(response) {
   //      console.log('sucesso')
   //    },
   //    error: function(xhr) {
   //       console.log(xhr)
   //    }
   //  });

});

$('#tiposList').change(e => {
   var split = e.target.value.split(",");

   if (e.target.value === 'HAITIAN') {

      $("#pastoreList").show()
      $("#toshibaList").hide()
      
   } else if (e.target.value === 'Toshiba') {
      
      $("#toshibaList").show()    
      $("#pastoreList").hide()
   }
});