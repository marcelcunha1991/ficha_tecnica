
 $("#haitian").hide();

$('#maquinas').on('change', function() {
    var value = $(this).val();
  
    $.get('/maquinaById/' + value, function(data, status){

        if(data.tipoId == 3 ){
            $("#main").hide("slow");
            $("#haitian").show();          
        }        
      
      });

  });